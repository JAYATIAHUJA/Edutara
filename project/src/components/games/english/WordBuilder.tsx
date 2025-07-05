import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Shuffle, Lightbulb } from 'lucide-react';

interface WordBuilderProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface WordChallenge {
  word: string;
  scrambled: string[];
  hint: string;
  image: string;
}

const WordBuilder: React.FC<WordBuilderProps> = ({ onComplete, onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [challenge, setChallenge] = useState<WordChallenge | null>(null);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [totalQuestions] = useState(10);

  const wordChallenges: WordChallenge[] = [
    { word: 'CAT', scrambled: ['T', 'A', 'C'], hint: 'A furry pet that says meow', image: '🐱' },
    { word: 'DOG', scrambled: ['G', 'O', 'D'], hint: 'A loyal pet that barks', image: '🐶' },
    { word: 'SUN', scrambled: ['N', 'S', 'U'], hint: 'Bright star in the sky', image: '☀️' },
    { word: 'TREE', scrambled: ['E', 'T', 'R', 'E'], hint: 'Tall plant with leaves', image: '🌳' },
    { word: 'BOOK', scrambled: ['O', 'K', 'B', 'O'], hint: 'You read this', image: '📚' },
    { word: 'HOUSE', scrambled: ['S', 'E', 'H', 'O', 'U'], hint: 'Where you live', image: '🏠' },
    { word: 'APPLE', scrambled: ['P', 'L', 'E', 'A', 'P'], hint: 'Red or green fruit', image: '🍎' },
    { word: 'WATER', scrambled: ['T', 'E', 'R', 'A', 'W'], hint: 'You drink this', image: '💧' },
    { word: 'FLOWER', scrambled: ['W', 'E', 'R', 'F', 'L', 'O'], hint: 'Beautiful plant that blooms', image: '🌸' },
    { word: 'SCHOOL', scrambled: ['H', 'O', 'O', 'L', 'C', 'S'], hint: 'Where you learn', image: '🏫' }
  ];

  const generateChallenge = () => {
    const challengeIndex = (currentLevel - 1) % wordChallenges.length;
    const newChallenge = wordChallenges[challengeIndex];
    
    // Shuffle the letters
    const shuffled = [...newChallenge.scrambled].sort(() => Math.random() - 0.5);
    
    setChallenge({
      ...newChallenge,
      scrambled: shuffled
    });
    setAvailableLetters(shuffled);
    setSelectedLetters([]);
    setShowFeedback(false);
    setShowHint(false);
  };

  useEffect(() => {
    generateChallenge();
  }, [currentLevel]);

  const handleLetterClick = (letter: string, index: number, fromAvailable: boolean) => {
    if (showFeedback) return;
    
    if (fromAvailable) {
      // Move from available to selected
      setSelectedLetters([...selectedLetters, letter]);
      setAvailableLetters(availableLetters.filter((_, i) => i !== index));
    } else {
      // Move from selected back to available
      setAvailableLetters([...availableLetters, letter]);
      setSelectedLetters(selectedLetters.filter((_, i) => i !== index));
    }
  };

  const checkAnswer = () => {
    if (!challenge) return;
    
    const userWord = selectedLetters.join('');
    const isCorrect = userWord === challenge.word;
    
    if (isCorrect) {
      setScore(score + 10);
      setFeedback(`Excellent! You spelled "${challenge.word}" correctly! 🎉`);
    } else {
      setFeedback(`Not quite! You spelled "${userWord}" but the correct word is "${challenge.word}". Try again! 💪`);
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      if (currentLevel >= totalQuestions) {
        onComplete(Math.round((score + (isCorrect ? 10 : 0)) / totalQuestions));
      } else {
        setCurrentLevel(currentLevel + 1);
      }
    }, 2500);
  };

  const shuffleAvailable = () => {
    setAvailableLetters([...availableLetters].sort(() => Math.random() - 0.5));
  };

  if (!challenge) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-4">
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎯 Word Builder</h1>
          <p className="text-xl text-gray-600">Unscramble the letters to make a word!</p>
        </div>

        {/* Challenge */}
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-6">
          {/* Image Hint */}
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">{challenge.image}</div>
            <button
              onClick={() => setShowHint(!showHint)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-full font-medium hover:bg-yellow-600 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
            </button>
            {showHint && (
              <p className="text-lg text-gray-600 mt-2 bg-yellow-50 p-3 rounded-lg">
                💡 {challenge.hint}
              </p>
            )}
          </div>

          {/* Word Building Area */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Build your word:</h3>
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2 min-h-[80px] p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                {selectedLetters.length === 0 ? (
                  <div className="text-gray-400 text-lg flex items-center">
                    Click letters below to build your word...
                  </div>
                ) : (
                  selectedLetters.map((letter, index) => (
                    <button
                      key={index}
                      onClick={() => handleLetterClick(letter, index, false)}
                      className="w-16 h-16 bg-blue-500 text-white rounded-xl font-bold text-2xl hover:bg-blue-600 transition-colors shadow-lg"
                    >
                      {letter}
                    </button>
                  ))
                )}
              </div>
            </div>
            
            {/* Current word display */}
            {selectedLetters.length > 0 && (
              <div className="text-center mb-4">
                <p className="text-2xl font-bold text-gray-800">
                  Your word: <span className="text-blue-600">{selectedLetters.join('')}</span>
                </p>
              </div>
            )}
          </div>

          {/* Available Letters */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Available letters:</h3>
              <button
                onClick={shuffleAvailable}
                className="bg-purple-500 text-white px-4 py-2 rounded-full font-medium hover:bg-purple-600 transition-colors flex items-center space-x-2"
              >
                <Shuffle className="w-4 h-4" />
                <span>Shuffle</span>
              </button>
            </div>
            <div className="flex justify-center">
              <div className="flex flex-wrap gap-3">
                {availableLetters.map((letter, index) => (
                  <button
                    key={index}
                    onClick={() => handleLetterClick(letter, index, true)}
                    className="w-16 h-16 bg-green-500 text-white rounded-xl font-bold text-2xl hover:bg-green-600 transition-colors shadow-lg hover:scale-105"
                    disabled={showFeedback}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Check Answer Button */}
          {selectedLetters.length === challenge.word.length && !showFeedback && (
            <div className="text-center">
              <button
                onClick={checkAnswer}
                className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-xl hover:bg-orange-600 transition-colors shadow-lg"
              >
                Check My Word! ✨
              </button>
            </div>
          )}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-green-200 text-center">
            <div className="text-4xl mb-4">
              {selectedLetters.join('') === challenge.word ? '🎉' : '💪'}
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
                className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300"
                style={{ width: `${(currentLevel / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordBuilder;