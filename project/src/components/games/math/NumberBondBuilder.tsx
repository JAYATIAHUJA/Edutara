import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Check, X } from 'lucide-react';

interface NumberBondBuilderProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface Bond {
  part1: number;
  part2: number;
  whole: number;
}

const NumberBondBuilder: React.FC<NumberBondBuilderProps> = ({ onComplete, onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetNumber, setTargetNumber] = useState(10);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [totalQuestions] = useState(10);

  const generateChallenge = () => {
    const target = Math.floor(Math.random() * 10) + 5; // 5-14
    setTargetNumber(target);
    
    // Generate available numbers (some correct pairs, some distractors)
    const numbers = [];
    for (let i = 1; i < target; i++) {
      numbers.push(i);
    }
    
    // Add some extra numbers as distractors
    for (let i = target + 1; i <= target + 5; i++) {
      numbers.push(i);
    }
    
    // Shuffle the array
    setAvailableNumbers(numbers.sort(() => Math.random() - 0.5));
    setSelectedNumbers([]);
    setShowFeedback(false);
  };

  useEffect(() => {
    generateChallenge();
  }, [currentLevel]);

  const handleNumberClick = (number: number) => {
    if (showFeedback) return;
    
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number));
    } else if (selectedNumbers.length < 2) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const checkAnswer = () => {
    if (selectedNumbers.length !== 2) return;
    
    const sum = selectedNumbers.reduce((a, b) => a + b, 0);
    const isCorrect = sum === targetNumber;
    
    if (isCorrect) {
      setScore(score + 10);
      setFeedback(`Perfect! ${selectedNumbers[0]} + ${selectedNumbers[1]} = ${targetNumber} 🎉`);
    } else {
      setFeedback(`Not quite! ${selectedNumbers[0]} + ${selectedNumbers[1]} = ${sum}, but we need ${targetNumber}. Try again! 💪`);
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

  const canCheck = selectedNumbers.length === 2;
  const currentSum = selectedNumbers.reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🔗 Number Bond Builder</h1>
          <p className="text-xl text-gray-600">Find two numbers that add up to the target!</p>
        </div>

        {/* Challenge */}
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Find two numbers that make:</h2>
            <div className="text-8xl font-bold text-blue-600 mb-4">{targetNumber}</div>
            <p className="text-lg text-gray-600">Click on two numbers to create a number bond</p>
          </div>

          {/* Number Bond Visual */}
          <div className="flex justify-center items-center mb-8">
            <div className="flex items-center space-x-4">
              {/* First number */}
              <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center text-2xl font-bold ${
                selectedNumbers.length > 0 
                  ? 'bg-blue-100 border-blue-400 text-blue-800' 
                  : 'bg-gray-100 border-gray-300 text-gray-400'
              }`}>
                {selectedNumbers[0] || '?'}
              </div>
              
              {/* Plus sign */}
              <div className="text-4xl font-bold text-gray-600">+</div>
              
              {/* Second number */}
              <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center text-2xl font-bold ${
                selectedNumbers.length > 1 
                  ? 'bg-green-100 border-green-400 text-green-800' 
                  : 'bg-gray-100 border-gray-300 text-gray-400'
              }`}>
                {selectedNumbers[1] || '?'}
              </div>
              
              {/* Equals sign */}
              <div className="text-4xl font-bold text-gray-600">=</div>
              
              {/* Target number */}
              <div className="w-20 h-20 rounded-full border-4 bg-purple-100 border-purple-400 flex items-center justify-center text-2xl font-bold text-purple-800">
                {targetNumber}
              </div>
            </div>
          </div>

          {/* Current sum display */}
          {selectedNumbers.length === 2 && (
            <div className="text-center mb-6">
              <p className="text-xl text-gray-700">
                Your sum: <span className={`font-bold ${currentSum === targetNumber ? 'text-green-600' : 'text-red-600'}`}>
                  {currentSum}
                </span>
              </p>
            </div>
          )}

          {/* Available Numbers */}
          <div className="grid grid-cols-6 gap-4 mb-8">
            {availableNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handleNumberClick(number)}
                className={`w-16 h-16 rounded-xl font-bold text-xl transition-all duration-200 ${
                  selectedNumbers.includes(number)
                    ? 'bg-yellow-400 border-4 border-yellow-600 text-yellow-900 scale-110'
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:scale-105'
                } shadow-lg`}
                disabled={showFeedback}
              >
                {number}
              </button>
            ))}
          </div>

          {/* Check Answer Button */}
          {canCheck && !showFeedback && (
            <div className="text-center">
              <button
                onClick={checkAnswer}
                className="bg-green-500 text-white px-8 py-4 rounded-2xl font-bold text-xl hover:bg-green-600 transition-colors shadow-lg"
              >
                Check My Bond! ✨
              </button>
            </div>
          )}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-blue-200 text-center">
            <div className="text-4xl mb-4">
              {currentSum === targetNumber ? '🎉' : '💪'}
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
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300"
                style={{ width: `${(currentLevel / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberBondBuilder;