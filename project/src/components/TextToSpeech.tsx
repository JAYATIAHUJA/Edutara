import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Volume2, ChevronDown, Check } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
  voiceName?: string;
}

const languages: Language[] = [
  {
    code: 'en-IN',
    name: 'English',
    flag: '🇮🇳',
    voiceName: 'Microsoft Heera - English (India)'
  },
  {
    code: 'hi-IN',
    name: 'हिंदी (Hindi)',
    flag: '🇮🇳',
    voiceName: 'Microsoft Hemant - Hindi (India)'
  }
];

interface TextToSpeechProps {
  text: string;
  className?: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [ttsError, setTtsError] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      
      // Load available voices
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        setAvailableVoices(voices);
      };

      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;

      // Load saved language preference
      const savedLang = localStorage.getItem('tts-language');
      if (savedLang) {
        const lang = languages.find(l => l.code === savedLang);
        if (lang) setSelectedLanguage(lang);
      }
    }

    return () => {
      // Cleanup: stop any ongoing speech
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX
      });
    }
  }, [isOpen]);

  const findBestVoice = (langCode: string): SpeechSynthesisVoice | null => {
    // Try to find the best voice for the selected language
    const voices = availableVoices.filter(voice => voice.lang.startsWith(langCode.split('-')[0]));
    
    // Prefer Indian voices for both English and Hindi
    const indianVoices = voices.filter(voice => 
      voice.lang.includes('IN') || 
      voice.name.toLowerCase().includes('india') ||
      voice.name.toLowerCase().includes('heera') ||
      voice.name.toLowerCase().includes('hemant')
    );
    
    if (indianVoices.length > 0) {
      return indianVoices[0];
    }
    
    // Fallback to any voice in the language
    return voices[0] || null;
  };

  const translateToHindi = (englishText: string): string => {
    // Simple translation mapping for common assessment terms
    const translations: Record<string, string> = {
      'Which shape has 3 sides?': 'कौन सा आकार 3 भुजाओं वाला है?',
      'Count the mangoes': 'आमों को गिनें',
      'How many mangoes are there?': 'कितने आम हैं?',
      'If you have 3 apples and get 2 more apples, how many apples do you have in total?': 'यदि आपके पास 3 सेब हैं और 2 और सेब मिलते हैं, तो कुल कितने सेब हैं?',
      'Which number comes after 7?': '7 के बाद कौन सा नंबर आता है?',
      'Circle': 'वृत्त',
      'Square': 'वर्ग',
      'Triangle': 'त्रिभुज',
      'Rectangle': 'आयत',
      'What is': 'क्या है',
      'How many': 'कितने',
      'Which': 'कौन सा',
      'What': 'क्या',
      'Where': 'कहाँ',
      'When': 'कब',
      'Why': 'क्यों',
      'How': 'कैसे'
    };

    // Try exact match first
    if (translations[englishText]) {
      return translations[englishText];
    }

    // Try partial matches for common words
    let translatedText = englishText;
    Object.entries(translations).forEach(([english, hindi]) => {
      if (englishText.includes(english)) {
        translatedText = translatedText.replace(english, hindi);
      }
    });

    return translatedText;
  };

  const speak = () => {
    if (!isSupported || !text) return;

    // Clear any previous error state
    setTtsError(false);

    // Stop any ongoing speech
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    // Prepare text based on selected language
    let textToSpeak = text;
    if (selectedLanguage.code === 'hi-IN') {
      textToSpeak = translateToHindi(text);
    }

    // Create speech utterance
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;

    // Configure utterance
    utterance.lang = selectedLanguage.code;
    utterance.rate = 0.8; // Slightly slower for better comprehension
    utterance.pitch = 1.1; // Slightly higher pitch for friendliness
    utterance.volume = 0.9;

    // Find and set the best voice
    const voice = findBestVoice(selectedLanguage.code);
    if (voice) {
      utterance.voice = voice;
    }

    // Event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
      setIsPlaying(false);
      setTtsError(true);
      console.error('Speech synthesis error:', {
        error: event.error,
        message: event.message || 'No message provided',
        utterance: {
          text: utterance.text,
          lang: utterance.lang,
          voice: utterance.voice?.name || 'No voice selected'
        }
      });
    };

    // Speak the text
    speechSynthesis.speak(utterance);
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    localStorage.setItem('tts-language', language.code);
    
    // If currently playing, restart with new language
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      setTimeout(() => speak(), 100);
    }
  };

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center space-x-2">
        {/* Language Selector */}
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-1 px-3 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200 text-sm"
            title="Select language for text-to-speech"
          >
            <span className="text-lg">{selectedLanguage.flag}</span>
            <span className="font-medium text-gray-700">{selectedLanguage.name}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Language Dropdown */}
          {isOpen && createPortal(
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-[9998]" 
                onClick={() => setIsOpen(false)}
              />
              {/* Dropdown */}
              <div 
                className="fixed w-48 bg-white rounded-xl shadow-xl border-2 border-gray-200 overflow-hidden z-[9999]"
                style={{
                  top: `${dropdownPosition.top}px`,
                  left: `${dropdownPosition.left}px`
                }}
              >
                <div className="p-2 border-b border-gray-100">
                  <p className="text-xs font-medium text-gray-600 text-center">Choose Language</p>
                </div>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language)}
                    className={`w-full p-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                      selectedLanguage.code === language.code ? 'bg-blue-50' : ''
                    }`}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <span className="flex-1 text-left font-medium text-gray-700">{language.name}</span>
                    {selectedLanguage.code === language.code && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </>,
            document.body
          )}
        </div>

        {/* Speaker Button */}
        <button
          onClick={speak}
          disabled={!text}
          className={`p-3 rounded-full transition-all duration-200 ${
            ttsError
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 
            isPlaying
              ? 'bg-blue-500 text-white shadow-lg animate-pulse'
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200 hover:shadow-md'
          } ${!text ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          title={
            ttsError 
              ? 'Audio not available - click to retry'
              : isPlaying 
                ? 'Stop reading' 
                : `Read aloud in ${selectedLanguage.name}`
          }
        >
          <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
        </button>
      </div>

      {/* Status indicator */}
      {(isPlaying || ttsError) && (
        <div className="absolute -bottom-8 left-0 right-0 text-center">
          <span className={`text-xs px-2 py-1 rounded-full ${
            ttsError 
              ? 'text-red-600 bg-red-50' 
              : 'text-blue-600 bg-blue-50'
          }`}>
            {ttsError ? '⚠️ Audio not available' : `🔊 Reading in ${selectedLanguage.name}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;