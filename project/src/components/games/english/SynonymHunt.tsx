import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Target, Timer } from 'lucide-react';

interface SynonymHuntProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface SynonymPair {
  word: string;
  synonym: string;
  options: string[];
}

const SynonymHunt: React.FC<SynonymHuntProps> = ({ onComplete, onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [currentPair, setCurrentPair] = useState<SynonymPair | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [totalQuestions] = useState(10);

  const synonymPairs: SynonymPair[] = [
    {
      word: "Happy",
      synonym: "Joyful",
      options: ["Sad", "Joyful", "Angry", "Tired"]
    },
    {
      word: "Big",
      synonym: "Large",
      options: ["Small", "Large", "Tiny", "Short"]
    },
    {
      word: "Fast",
      synonym: "Quick",
      options: ["Slow", "Quick", "Heavy", "Light"]
    },
    {
      word: "Smart",
      synonym: "Clever",
      options: ["Silly", "Clever", "Lazy", "Loud"]
    },
    {
      word: "Beautiful",
      synonym: "Pretty",
      options: ["Ugly", "Pretty", "Dirty", "Old"]
    },
    {
      word: "Brave",
      synonym: "Courageous",
      options: ["Scared", "Courageous", "Weak", "Shy"]
    },
    {
      word: "Funny",
      synonym: "Amusing",
      options: ["Boring", "Amusing", "Serious", "Quiet"]
    },
    {
      word: "Kind",
      synonym: "Nice",
      options: ["Mean", "Nice", "Rude", "Selfish"]
    },
    {
      word: "Strong",
      synonym: "Powerful",
      options: ["Weak", "Powerful", "Gentle", "Soft"]
    },
    {
      word: "Bright",
      synonym: "Shiny",
      options: ["Dark", "Shiny", "Dull", "Cloudy"]
    }
  ];

  const generateChallenge = () => {
    const pairIndex = (currentLevel - 1) % synonymPairs.length;
    const pair = synonymPairs[pairIndex];
    
    // Shuffle the options
    const shuffledOptions = [...pair.options].sort(() => Math.random() - 0.5);
    
    setCurrentPair({
      ...pair,
      options: shuffledOptions
    });
    setSelectedAnswer('');
    setShowFeedback(false);
    setTimeLeft(15);
  };

  useEffect(() => {
    generateChallenge();
  }, [currentLevel]);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback) {
      handleTimeUp();
    }
  }, [timeLeft, showFeedback]);

  const handleTimeUp = () => {
    if (!currentPair) return;
    
    setFeedback(`Time's up! The correct synonym for "${currentPair.word}" is "${currentPair.synonym}". ⏰`);
    setShowFeedback(true);
    
    setTimeout(() => {
      if (currentLevel >= totalQuestions) {
        onComplete(Math.round((score / totalQuestions) * 10));
      } else {
        setCurrentLevel(currentLevel + 1);
      }
    }, 2500);
  };

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    
    if (!currentPair) return;
    
    const isCorrect = answer === currentPair.synonym;
    
    if (isCorrect) {
      const timeBonus = Math.max(0, timeLeft - 5); // Bonus points for speed
      const points = 10 + timeBonus;
      setScore(score + points);
      setFeedback(`Excellent! "${currentPair.word}" and "${currentPair.synonym}" are synonyms! ${timeBonus > 0 ? `+${timeBonus} speed bonus!` : ''} 🎉`);
    } else {
      setFeedback(`Not quite! "${currentPair.word}" means the same as "${currentPair.synonym}", not "${answer}". Try again next time! 💪`);
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      if (currentLevel >= totalQuestions) {
        onComplete(Math.round((score + (isCorrect ? 10 + Math.max(0, timeLeft - 5) : 0)) / (totalQuestions * 15) * 100));
      } else {
        setCurrentLevel(currentLevel + 1);
      }
    }, 2500);
  };

  if (!currentPair) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100 p-4">
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
            <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
              <Timer className="w-5 h-5 text-red-500" />
              <span className={`font-bold ${timeLeft <= 5 ? 'text-red-600' : 'text-gray-800'}`}>
                {timeLeft}s
              </span>
            </div>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🕵️‍♀️ Synonym Hunt</h1>
          <p className="text-xl text-gray-600">Find words that mean the same thing!</p>
        </div>

        {/* Challenge */}
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-6">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Find a synonym for:</h2>
            <div className="text-6xl font-bold text-teal-600 mb-4">{currentPair.word}</div>
            <p className="text-lg text-gray-600">
              Which word means the same as "{currentPair.word}"?
            </p>
          </div>

          {/* Timer Bar */}
          <div className="mb-8">
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  timeLeft <= 5 ? 'bg-red-500' : timeLeft <= 10 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${(timeLeft / 15) * 100}%` }}
              />
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {currentPair.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`p-6 rounded-2xl font-bold text-xl transition-all duration-200 ${
                  selectedAnswer === option
                    ? option === currentPair.synonym
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800 hover:scale-105'
                } shadow-lg`}
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Hint */}
          <div className="text-center">
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <p className="text-sm text-blue-700">
                💡 <strong>Hint:</strong> Synonyms are words that have the same or very similar meanings!
              </p>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-teal-200 text-center">
            <div className="text-4xl mb-4">
              {feedback.includes('Excellent') ? '🎉' : feedback.includes('Time\'s up') ? '⏰' : '💪'}
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
                className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-300"
                style={{ width: `${(currentLevel / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SynonymHunt;