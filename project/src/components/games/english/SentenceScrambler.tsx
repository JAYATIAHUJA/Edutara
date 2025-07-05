import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Shuffle, Check } from 'lucide-react';

interface SentenceScramblerProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface SentenceChallenge {
  original: string;
  words: string[];
  hint: string;
}

const SentenceScrambler: React.FC<SentenceScramblerProps> = ({ onComplete, onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [challenge, setChallenge] = useState<SentenceChallenge | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [totalQuestions] = useState(10);

  const sentences: SentenceChallenge[] = [
    {
      original: "I like to eat cake",
      words: ["I", "like", "to", "eat", "cake"],
      hint: "Someone enjoys a sweet dessert"
    },
    {
      original: "The cat is sleeping",
      words: ["The", "cat", "is", "sleeping"],
      hint: "An animal is resting"
    },
    {
      original: "We play in the park",
      words: ["We", "play", "in", "the", "park"],
      hint: "Children having fun outside"
    },
    {
      original: "My mother cooks dinner",
      words: ["My", "mother", "cooks", "dinner"],
      hint: "Someone prepares an evening meal"
    },
    {
      original: "The sun is bright today",
      words: ["The", "sun", "is", "bright", "today"],
      hint: "Weather description for this day"
    },
    {
      original: "Birds fly in the sky",
      words: ["Birds", "fly", "in", "the", "sky"],
      hint: "Animals moving through the air"
    },
    {
      original: "I read books every day",
      words: ["I", "read", "books", "every", "day"],
      hint: "Daily learning activity"
    },
    {
      original: "The dog runs very fast",
      words: ["The", "dog", "runs", "very", "fast"],
      hint: "Pet moving at high speed"
    },
    {
      original: "Children love to play games",
      words: ["Children", "love", "to", "play", "games"],
      hint: "Young people enjoying activities"
    },
    {
      original: "My teacher is very kind",
      words: ["My", "teacher", "is", "very", "kind"],
      hint: "Description of an educator"
    }
  ];

  const generateChallenge = () => {
    const challengeIndex = (currentLevel - 1) % sentences.length;
    const newChallenge = sentences[challengeIndex];
    
    // Shuffle the words
    const shuffled = [...newChallenge.words].sort(() => Math.random() - 0.5);
    
    setChallenge(newChallenge);
    setAvailableWords(shuffled);
    setSelectedWords([]);
    setShowFeedback(false);
    setShowHint(false);
  };

  useEffect(() => {
    generateChallenge();
  }, [currentLevel]);

  const handleWordClick = (word: string, index: number, fromAvailable: boolean) => {
    if (showFeedback) return;
    
    if (fromAvailable) {
      // Move from available to selected
      setSelectedWords([...selectedWords, word]);
      setAvailableWords(availableWords.filter((_, i) => i !== index));
    } else {
      // Move from selected back to available
      setAvailableWords([...availableWords, word]);
      setSelectedWords(selectedWords.filter((_, i) => i !== index));
    }
  };

  const checkAnswer = () => {
    if (!challenge) return;
    
    const userSentence = selectedWords.join(' ');
    const isCorrect = userSentence.toLowerCase() === challenge.original.toLowerCase();
    
    if (isCorrect) {
      setScore(score + 10);
      setFeedback(`Perfect! You formed the sentence correctly: "${challenge.original}" 🎉`);
    } else {
      setFeedback(`Not quite! The correct sentence is: "${challenge.original}". Try again! 💪`);
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      if (currentLevel >= totalQuestions) {
        onComplete(Math.round((score + (isCorrect ? 10 : 0)) / totalQuestions));
      } else {
        setCurrentLevel(currentLevel + 1);
      }
    }, 3000);
  };

  const shuffleAvailable = () => {
    setAvailableWords([...availableWords].sort(() => Math.random() - 0.5));
  };

  const clearSentence = () => {
    if (challenge) {
      setAvailableWords([...challenge.words].sort(() => Math.random() - 0.5));
      setSelectedWords([]);
    }
  };

  if (!challenge) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Games
          </button>
          <div className="flex items-center space-x-4">
            <div className="bg-white px-4 py-2 rounded-full shadow-lg">
              <span className="font-bold text-gray-800">Level: {currentLevel}/{totalQuestions}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-gray-800">{score}</span>
            </div>
          </div>
        </div>

        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🧩 Sentence Scrambler</h1>
          <p className="text-xl text-gray-600">Arrange the words to make a correct sentence!</p>
        </div>

        {/* Challenge */}
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-6">
          {/* Hint Section */}
          <div className="text-center mb-6">
            <button
              onClick={() => setShowHint(!showHint)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-full font-medium hover:bg-yellow-600 transition-colors"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'} 💡
            </button>
            {showHint && (
              <p className="text-lg text-gray-600 mt-3 bg-yellow-50 p-4 rounded-lg">
                💡 {challenge.hint}
              </p>
            )}
          </div>

          {/* Sentence Building Area */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Build your sentence:</h3>
            <div className="min-h-[100px] p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 mb-4">
              {selectedWords.length === 0 ? (
                <div className="text-gray-400 text-lg text-center flex items-center justify-center h-full">
                  Click words below to build your sentence...
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedWords.map((word, index) => (
                    <button
                      key={index}
                      onClick={() => handleWordClick(word, index, false)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Current sentence display */}
            {selectedWords.length > 0 && (
              <div className="text-center mb-4">
                <p className="text-xl text-gray-800">
                  <span className="font-bold">Your sentence:</span> "{selectedWords.join(' ')}"
                </p>
              </div>
            )}
          </div>

          {/* Available Words */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Available words:</h3>
              <div className="flex space-x-2">
                <button
                  onClick={shuffleAvailable}
                  className="bg-purple-500 text-white px-4 py-2 rounded-full font-medium hover:bg-purple-600 transition-colors flex items-center space-x-2"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Shuffle</span>
                </button>
                <button
                  onClick={clearSentence}
                  className="bg-gray-500 text-white px-4 py-2 rounded-full font-medium hover:bg-gray-600 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {availableWords.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleWordClick(word, index, true)}
                  className="bg-green-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors hover:scale-105"
                  disabled={showFeedback}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Check Answer Button */}
          {selectedWords.length === challenge.words.length && !showFeedback && (
            <div className="text-center">
              <button
                onClick={checkAnswer}
                className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-xl hover:bg-orange-600 transition-colors shadow-lg flex items-center space-x-2 mx-auto"
              >
                <Check className="w-6 h-6" />
                <span>Check My Sentence! ✨</span>
              </button>
            </div>
          )}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-purple-200 text-center">
            <div className="text-4xl mb-4">
              {selectedWords.join(' ').toLowerCase() === challenge.original.toLowerCase() ? '🎉' : '💪'}
            </div>
            <p className="text-lg text-gray-700">{feedback}</p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Progress</span>
              <span className="text-sm font-bold text-gray-700">{currentLevel}/{totalQuestions}</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300"
                style={{ width: `${(currentLevel / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentenceScrambler;