import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Target } from 'lucide-react';

interface PlaceValuePopProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface Balloon {
  id: number;
  number: number;
  x: number;
  y: number;
  color: string;
  popped: boolean;
}

interface PlaceValueChallenge {
  targetNumber: number;
  targetPlace: 'ones' | 'tens' | 'hundreds' | 'thousands';
  targetValue: number;
}

const PlaceValuePop: React.FC<PlaceValuePopProps> = ({ onComplete, onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [challenge, setChallenge] = useState<PlaceValueChallenge | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [totalQuestions] = useState(10);

  const balloonColors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400'];

  const generateChallenge = () => {
    // Generate a number based on current level
    let targetNumber: number;
    let places: ('ones' | 'tens' | 'hundreds' | 'thousands')[];
    
    if (currentLevel <= 3) {
      // Two-digit numbers
      targetNumber = Math.floor(Math.random() * 90) + 10;
      places = ['ones', 'tens'];
    } else if (currentLevel <= 6) {
      // Three-digit numbers
      targetNumber = Math.floor(Math.random() * 900) + 100;
      places = ['ones', 'tens', 'hundreds'];
    } else {
      // Four-digit numbers
      targetNumber = Math.floor(Math.random() * 9000) + 1000;
      places = ['ones', 'tens', 'hundreds', 'thousands'];
    }
    
    const targetPlace = places[Math.floor(Math.random() * places.length)];
    const targetValue = getPlaceValue(targetNumber, targetPlace);
    
    setChallenge({ targetNumber, targetPlace, targetValue });
    generateBalloons(targetValue);
  };

  const getPlaceValue = (number: number, place: string): number => {
    const str = number.toString();
    const len = str.length;
    
    switch (place) {
      case 'ones':
        return parseInt(str[len - 1]);
      case 'tens':
        return len >= 2 ? parseInt(str[len - 2]) : 0;
      case 'hundreds':
        return len >= 3 ? parseInt(str[len - 3]) : 0;
      case 'thousands':
        return len >= 4 ? parseInt(str[len - 4]) : 0;
      default:
        return 0;
    }
  };

  const generateBalloons = (correctValue: number) => {
    const newBalloons: Balloon[] = [];
    const numbers = new Set<number>();
    
    // Add the correct answer
    numbers.add(correctValue);
    
    // Add wrong answers
    while (numbers.size < 8) {
      const wrongNumber = Math.floor(Math.random() * 10);
      numbers.add(wrongNumber);
    }
    
    const numbersArray = Array.from(numbers);
    
    // Create balloons with random positions
    numbersArray.forEach((number, index) => {
      newBalloons.push({
        id: index,
        number,
        x: Math.random() * 80 + 10, // 10% to 90% of container width
        y: Math.random() * 70 + 15, // 15% to 85% of container height
        color: balloonColors[index % balloonColors.length],
        popped: false
      });
    });
    
    setBalloons(newBalloons);
  };

  useEffect(() => {
    generateChallenge();
  }, [currentLevel]);

  const handleBalloonPop = (balloonId: number) => {
    if (showFeedback || !challenge) return;
    
    const balloon = balloons.find(b => b.id === balloonId);
    if (!balloon || balloon.popped) return;
    
    const isCorrect = balloon.number === challenge.targetValue;
    
    // Mark balloon as popped
    setBalloons(balloons.map(b => 
      b.id === balloonId ? { ...b, popped: true } : b
    ));
    
    if (isCorrect) {
      setScore(score + 10);
      setFeedback(`Perfect! The ${challenge.targetPlace} place in ${challenge.targetNumber} is ${challenge.targetValue}! 🎈`);
    } else {
      setFeedback(`Oops! The ${challenge.targetPlace} place in ${challenge.targetNumber} is ${challenge.targetValue}, not ${balloon.number}. Try again! 💪`);
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

  const getPlaceDescription = (place: string) => {
    switch (place) {
      case 'ones': return 'ones place (rightmost digit)';
      case 'tens': return 'tens place (second from right)';
      case 'hundreds': return 'hundreds place (third from right)';
      case 'thousands': return 'thousands place (fourth from right)';
      default: return place;
    }
  };

  if (!challenge) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 p-4">
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">💥 Place Value Pop</h1>
          <p className="text-xl text-gray-600">Pop the balloon with the correct place value!</p>
        </div>

        {/* Challenge */}
        <div className="bg-white p-6 rounded-3xl shadow-xl mb-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Find the place value:</h2>
            <div className="bg-blue-50 p-6 rounded-2xl mb-4">
              <div className="text-5xl font-bold text-blue-600 mb-2">{challenge.targetNumber}</div>
              <p className="text-lg text-gray-700">
                What digit is in the <span className="font-bold text-blue-600">{getPlaceDescription(challenge.targetPlace)}</span>?
              </p>
            </div>
            
            {/* Place value breakdown */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex justify-center items-center space-x-2 text-lg font-mono">
                {challenge.targetNumber.toString().split('').map((digit, index, array) => {
                  const places = ['thousands', 'hundreds', 'tens', 'ones'];
                  const placeIndex = places.length - (array.length - index);
                  const placeName = places[placeIndex];
                  const isTarget = placeName === challenge.targetPlace;
                  
                  return (
                    <div key={index} className="text-center">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-lg font-bold text-xl ${
                        isTarget ? 'bg-yellow-300 text-yellow-800 border-2 border-yellow-500' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {digit}
                      </div>
                      <div className="text-xs mt-1 text-gray-600">{placeName}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Balloon Field */}
          <div className="relative bg-gradient-to-b from-sky-200 to-sky-300 h-96 rounded-2xl overflow-hidden border-4 border-sky-400">
            <div className="absolute inset-0">
              {/* Clouds */}
              <div className="absolute top-4 left-8 w-16 h-8 bg-white rounded-full opacity-70"></div>
              <div className="absolute top-8 right-12 w-12 h-6 bg-white rounded-full opacity-60"></div>
              <div className="absolute top-12 left-1/3 w-20 h-10 bg-white rounded-full opacity-50"></div>
              
              {/* Balloons */}
              {balloons.map((balloon) => (
                <button
                  key={balloon.id}
                  onClick={() => handleBalloonPop(balloon.id)}
                  className={`absolute w-16 h-20 transition-all duration-200 ${
                    balloon.popped ? 'opacity-0 scale-0' : 'hover:scale-110'
                  }`}
                  style={{
                    left: `${balloon.x}%`,
                    top: `${balloon.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  disabled={showFeedback || balloon.popped}
                >
                  <div className={`w-full h-16 ${balloon.color} rounded-full shadow-lg flex items-center justify-center text-white font-bold text-xl border-2 border-white`}>
                    {balloon.number}
                  </div>
                  <div className="w-1 h-8 bg-gray-600 mx-auto"></div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              🎯 Click on the balloon with the correct digit!
            </p>
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-sky-200 text-center">
            <div className="text-4xl mb-4">
              {feedback.includes('Perfect') ? '🎈' : '💪'}
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
                className="h-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-300"
                style={{ width: `${(currentLevel / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceValuePop;