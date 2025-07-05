import React, { useState, useEffect } from 'react';
import { Type, Check } from 'lucide-react';

interface FontOption {
  id: string;
  name: string;
  description: string;
  fontFamily: string;
}

const fontOptions: FontOption[] = [
  {
    id: 'normal',
    name: 'Normal Font',
    description: 'Standard reading font (Lexend)',
    fontFamily: 'Lexend, Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  },
  {
    id: 'dyslexia',
    name: 'Dyslexie Font',
    description: 'Specially designed for dyslexia',
    fontFamily: 'Dyslexie, OpenDyslexic, Arial, sans-serif'
  }
];

interface DyslexiaFontSelectorProps {
  onFontChange: (font: FontOption) => void;
}

const DyslexiaFontSelector: React.FC<DyslexiaFontSelectorProps> = ({ onFontChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState<FontOption>(fontOptions[0]);

  useEffect(() => {
    // Load saved font from localStorage
    const savedFontId = localStorage.getItem('dyslexiaFont');
    if (savedFontId) {
      const font = fontOptions.find(f => f.id === savedFontId) || fontOptions[0];
      setSelectedFont(font);
      onFontChange(font);
    }
  }, [onFontChange]);

  const handleFontSelect = (font: FontOption) => {
    setSelectedFont(font);
    setIsOpen(false);
    localStorage.setItem('dyslexiaFont', font.id);
    onFontChange(font);
    
    // Apply font to document root
    document.documentElement.style.setProperty('--font-family', font.fontFamily);
    document.body.style.fontFamily = font.fontFamily;
  };

  return (
    <div className="fixed top-4 right-20 z-50">
      <div className="relative">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white p-3 rounded-full shadow-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 group"
          title="Font Options for Dyslexia"
        >
          <Type className="w-6 h-6 text-gray-600 group-hover:text-gray-800" />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 mb-1">Reading Font</h3>
              <p className="text-sm text-gray-600">Choose a font that's comfortable for you</p>
            </div>
            
            <div className="p-2">
              {fontOptions.map((font) => (
                <button
                  key={font.id}
                  onClick={() => handleFontSelect(font)}
                  className={`w-full p-3 rounded-xl transition-all duration-200 flex items-center space-x-3 ${
                    selectedFont.id === font.id
                      ? 'bg-blue-50 border-2 border-blue-300'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                  style={{ fontFamily: font.fontFamily }}
                >
                  {/* Font Preview */}
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-800 text-lg">{font.name}</div>
                    <div className="text-sm text-gray-600">{font.description}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      The quick brown fox jumps over the lazy dog
                    </div>
                  </div>
                  
                  {/* Selected Indicator */}
                  {selectedFont.id === font.id && (
                    <Check className="w-5 h-5 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-600 text-center">
                Dyslexia-friendly fonts help with reading difficulties
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DyslexiaFontSelector;
export type { FontOption };