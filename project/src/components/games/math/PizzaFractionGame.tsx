import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, X, Star, Trophy } from 'lucide-react';

interface PizzaFractionGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface FractionChallenge {
  numerator: number;
  denominator: number;
}

const PizzaFractionGame: React.FC<PizzaFractionGameProps> = ({ onComplete, onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [selectedSlices, setSelectedSlices] = useState<boolean[]>([]);
  const [challenge, setChallenge] = useState<FractionChallenge>({ numerator: 1, denominator: 2 });
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [totalQuestions] = useState(10);

  const generateChallenge = () => {
    const denominators = [2, 3, 4, 6, 8];
    const denominator = denominators[Math.floor(Math.random() * denominators.length)];
    const numerator = Math.floor(Math.random() * denominator) + 1;
    
    setChallenge({ numerator, denominator });
    setSelectedSlices(new Array(denominator).fill(false));
    setShowFeedback(false);
  };

  useEffect(() => {
    generateChallenge();
  }, [currentLevel]);

  const handleSliceClick = (sliceIndex: number) => {
    if (showFeedback) return;
    
    const newSelectedSlices = [...selectedSlices];
    newSelectedSlices[sliceIndex] = !newSelectedSlices[sliceIndex];
    setSelectedSlices(newSelectedSlices);
  };

  const checkAnswer = () => {
    const selectedCount = selectedSlices.filter(slice => slice).length;
    const isCorrect = selectedCount === challenge.numerator;
    
    if (isCorrect) {
      setScore(score + 10);
      setFeedback(`Excellent! ${challenge.numerator}/${challenge.denominator} means ${challenge.numerator} out of ${challenge.denominator} slices! 🎉`);
    } else {
      setFeedback(`Not quite! ${challenge.numerator}/${challenge.denominator} means ${challenge.numerator} slices, not ${selectedCount}. Try again! 💪`);
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

  const renderPizzaSlice = (index: number, total: number, isSelected: boolean) => {
    const angle = 360 / total;
    const startAngle = index * angle - 90; // Start from top
    const endAngle = (index + 1) * angle - 90;
    
    const radius = 140;
    const centerX = 150;
    const centerY = 150;
    
    // Calculate path for the slice
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');
    
    return (
      <g key={index}>
        <path
          d={pathData}
          fill={isSelected ? '#FCD34D' : '#FED7AA'}
          stroke="#D97706"
          strokeWidth="3"
          className="cursor-pointer transition-all duration-200 hover:brightness-110"
          onClick={() => handleSliceClick(index)}
        />
        {/* Add slice number for clarity */}
        {total <= 8 && (
          <text
            x={centerX + (radius * 0.7) * Math.cos((startAngle + angle/2) * Math.PI / 180)}
            y={centerY + (radius * 0.7) * Math.sin((startAngle + angle/2) * Math.PI / 180)}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#92400E"
            className="pointer-events-none"
          >
            {index + 1}
          </text>
        )}
      </g>
    );
  };

  const renderPizza = () => {
    const slices = [];
    
    for (let i = 0; i < challenge.denominator; i++) {
      const isSelected = selectedSlices[i] || false;
      slices.push(renderPizzaSlice(i, challenge.denominator, isSelected));
    }
    
    return (
      <div className="flex justify-center mb-8">
        <div className="relative">
          <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-2xl">
            {/* Pizza base */}
            <circle
              cx="150"
              cy="150"
              r="145"
              fill="#D97706"
              stroke="#92400E"
              strokeWidth="4"
            />
            <circle
              cx="150"
              cy="150"
              r="140"
              fill="#FED7AA"
              stroke="#D97706"
              strokeWidth="2"
            />
            
            {/* Pizza slices */}
            {slices}
            
            {/* Pizza toppings - only show on unselected slices for contrast */}
            {challenge.denominator <= 6 && (
              <>
                <circle cx="130" cy="120" r="3" fill="#DC2626" />
                <circle cx="170" cy="130" r="3" fill="#DC2626" />
                <circle cx="140" cy="160" r="3" fill="#DC2626" />
                <circle cx="180" cy="170" r="3" fill="#DC2626" />
                <circle cx="120" cy="180" r="3" fill="#DC2626" />
                <circle cx="160" cy="190" r="3" fill="#DC2626" />
              </>
            )}
            
            {/* Center dot */}
            <circle cx="150" cy="150" r="3" fill="#92400E" />
          </svg>
          
          {/* Slice divider lines */}
          <svg width="300" height="300" viewBox="0 0 300 300" className="absolute top-0 left-0 pointer-events-none">
            {Array.from({ length: challenge.denominator }, (_, i) => {
              const angle = (i * 360) / challenge.denominator - 90;
              const angleRad = (angle * Math.PI) / 180;
              const x = 150 + 140 * Math.cos(angleRad);
              const y = 150 + 140 * Math.sin(angleRad);
              
              return (
                <line
                  key={i}
                  x1="150"
                  y1="150"
                  x2={x}
                  y2={y}
                  stroke="#92400E"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>
      </div>
    );
  };

  const selectedCount = selectedSlices.filter(slice => slice).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-red-100 p-4">
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🍕 Pizza Fraction Game</h1>
          <p className="text-xl text-gray-600">Click on the pizza slices to match the fraction!</p>
        </div>

        {/* Challenge */}
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Show me: <span className="text-6xl text-orange-600">{challenge.numerator}/{challenge.denominator}</span>
            </h2>
            <p className="text-lg text-gray-600">
              Click on {challenge.numerator} out of {challenge.denominator} pizza slices
            </p>
          </div>

          {/* Pizza Display */}
          {renderPizza()}

          {/* Selected Info */}
          <div className="text-center mb-6">
            <p className="text-xl text-gray-700">
              You selected: <span className={`font-bold ${selectedCount === challenge.numerator ? 'text-green-600' : 'text-orange-600'}`}>
                {selectedCount}/{challenge.denominator}
              </span>
            </p>
            {selectedCount !== challenge.numerator && (
              <p className="text-sm text-gray-500 mt-2">
                {selectedCount < challenge.numerator 
                  ? `Select ${challenge.numerator - selectedCount} more slice${challenge.numerator - selectedCount > 1 ? 's' : ''}`
                  : `You selected too many! Remove ${selectedCount - challenge.numerator} slice${selectedCount - challenge.numerator > 1 ? 's' : ''}`
                }
              </p>
            )}
          </div>

          {/* Instructions */}
          <div className="text-center mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <p className="text-sm text-blue-700">
                💡 <strong>Tip:</strong> Click on a slice to select it (yellow), click again to unselect it (orange)
              </p>
            </div>
          </div>

          {/* Check Answer Button */}
          {selectedCount > 0 && !showFeedback && (
            <div className="text-center">
              <button
                onClick={checkAnswer}
                className={`px-8 py-4 rounded-2xl font-bold text-xl transition-colors shadow-lg ${
                  selectedCount === challenge.numerator
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-400 text-white hover:bg-gray-500'
                }`}
              >
                Check My Answer! ✨
              </button>
            </div>
          )}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-blue-200 text-center">
            <div className="text-4xl mb-4">
              {selectedCount === challenge.numerator ? '🎉' : '💪'}
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
                className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300"
                style={{ width: `${(currentLevel / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaFractionGame;