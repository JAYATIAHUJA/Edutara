import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Ruler, Scale, Beaker } from 'lucide-react';

interface MeasurementMasterProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface MeasurementChallenge {
  type: 'length' | 'weight' | 'volume';
  question: string;
  image: string;
  options: string[];
  correct: number;
  explanation: string;
  unit: string;
}

const MeasurementMaster: React.FC<MeasurementMasterProps> = ({ onComplete, onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [challenge, setChallenge] = useState<MeasurementChallenge | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [totalQuestions] = useState(10);

  const challenges: MeasurementChallenge[] = [
    // Length challenges
    {
      type: 'length',
      question: 'How long is this pencil?',
      image: '✏️',
      options: ['5 cm', '15 cm', '25 cm', '50 cm'],
      correct: 1,
      explanation: 'A typical pencil is about 15 cm long.',
      unit: 'centimeters'
    },
    {
      type: 'length',
      question: 'How tall is a door?',
      image: '🚪',
      options: ['50 cm', '1 meter', '2 meters', '5 meters'],
      correct: 2,
      explanation: 'Most doors are about 2 meters tall.',
      unit: 'meters'
    },
    {
      type: 'length',
      question: 'How wide is your hand?',
      image: '✋',
      options: ['2 cm', '8 cm', '20 cm', '50 cm'],
      correct: 1,
      explanation: 'An adult hand is typically about 8 cm wide.',
      unit: 'centimeters'
    },
    
    // Weight challenges
    {
      type: 'weight',
      question: 'How much does an apple weigh?',
      image: '🍎',
      options: ['10 grams', '100 grams', '1 kg', '5 kg'],
      correct: 1,
      explanation: 'A medium apple weighs about 100 grams.',
      unit: 'grams'
    },
    {
      type: 'weight',
      question: 'How much does a cat weigh?',
      image: '🐱',
      options: ['500 grams', '2 kg', '4 kg', '10 kg'],
      correct: 2,
      explanation: 'A typical house cat weighs about 4 kg.',
      unit: 'kilograms'
    },
    {
      type: 'weight',
      question: 'How much does a book weigh?',
      image: '📚',
      options: ['50 grams', '300 grams', '1 kg', '3 kg'],
      correct: 1,
      explanation: 'A typical book weighs about 300 grams.',
      unit: 'grams'
    },
    
    // Volume challenges
    {
      type: 'volume',
      question: 'How much water does a glass hold?',
      image: '🥛',
      options: ['50 ml', '250 ml', '1 liter', '2 liters'],
      correct: 1,
      explanation: 'A typical drinking glass holds about 250 ml.',
      unit: 'milliliters'
    },
    {
      type: 'volume',
      question: 'How much water does a bathtub hold?',
      image: '🛁',
      options: ['10 liters', '50 liters', '200 liters', '1000 liters'],
      correct: 2,
      explanation: 'A bathtub typically holds about 200 liters of water.',
      unit: 'liters'
    },
    {
      type: 'volume',
      question: 'How much does a teaspoon hold?',
      image: '🥄',
      options: ['1 ml', '5 ml', '25 ml', '100 ml'],
      correct: 1,
      explanation: 'A teaspoon holds about 5 ml.',
      unit: 'milliliters'
    },
    {
      type: 'volume',
      question: 'How much water does a bucket hold?',
      image: '🪣',
      options: ['500 ml', '2 liters', '10 liters', '50 liters'],
      correct: 2,
      explanation: 'A typical bucket holds about 10 liters.',
      unit: 'liters'
    }
  ];

  const generateChallenge = () => {
    const challengeIndex = (currentLevel - 1) % challenges.length;
    setChallenge(challenges[challengeIndex]);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  useEffect(() => {
    generateChallenge();
  }, [currentLevel]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback || !challenge) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === challenge.correct;
    
    if (isCorrect) {
      setScore(score + 10);
      setFeedback(`Excellent! ${challenge.explanation} 📏`);
    } else {
      setFeedback(`Not quite! ${challenge.explanation} Keep measuring! 💪`);
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'length': return <Ruler className="w-6 h-6" />;
      case 'weight': return <Scale className="w-6 h-6" />;
      case 'volume': return <Beaker className="w-6 h-6" />;
      default: return <Ruler className="w-6 h-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'length': return 'from-blue-400 to-blue-600';
      case 'weight': return 'from-green-400 to-green-600';
      case 'volume': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'length': return 'Length';
      case 'weight': return 'Weight';
      case 'volume': return 'Volume';
      default: return 'Measurement';
    }
  };

  if (!challenge) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 p-4">
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📏 Measurement Master</h1>
          <p className="text-xl text-gray-600">Estimate and measure real-world objects!</p>
        </div>

        {/* Challenge */}
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-6">
          {/* Challenge Type Badge */}
          <div className="text-center mb-6">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${getTypeColor(challenge.type)} text-white font-bold`}>
              {getTypeIcon(challenge.type)}
              <span>{getTypeName(challenge.type)} Challenge</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{challenge.question}</h2>
            
            {/* Object Display */}
            <div className="mb-6">
              <div className="text-8xl mb-4">{challenge.image}</div>
              <p className="text-lg text-gray-600">
                Make your best estimate!
              </p>
            </div>
          </div>

          {/* Measurement Tool Visual */}
          <div className="mb-8 flex justify-center">
            {challenge.type === 'length' && (
              <div className="bg-yellow-100 p-4 rounded-xl border-2 border-yellow-300">
                <div className="flex items-center space-x-2 mb-2">
                  <Ruler className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-yellow-800">Ruler</span>
                </div>
                <div className="w-64 h-8 bg-white border-2 border-gray-400 rounded relative">
                  {Array.from({ length: 13 }, (_, i) => (
                    <div key={i} className="absolute h-full border-l border-gray-400" style={{ left: `${i * 20}px` }}>
                      <span className="absolute -bottom-6 text-xs text-gray-600" style={{ left: '-5px' }}>
                        {i}
                      </span>
                    </div>
                  ))}
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                    centimeters
                  </span>
                </div>
              </div>
            )}
            
            {challenge.type === 'weight' && (
              <div className="bg-green-100 p-4 rounded-xl border-2 border-green-300">
                <div className="flex items-center space-x-2 mb-2">
                  <Scale className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-800">Scale</span>
                </div>
                <div className="w-32 h-32 bg-white border-4 border-gray-400 rounded-full relative flex items-center justify-center">
                  <div className="w-2 h-16 bg-red-500 rounded-full transform rotate-45 origin-bottom"></div>
                  <div className="absolute bottom-2 text-xs text-gray-600">kg</div>
                </div>
              </div>
            )}
            
            {challenge.type === 'volume' && (
              <div className="bg-purple-100 p-4 rounded-xl border-2 border-purple-300">
                <div className="flex items-center space-x-2 mb-2">
                  <Beaker className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-purple-800">Measuring Cup</span>
                </div>
                <div className="w-16 h-24 bg-white border-4 border-gray-400 rounded-b-lg relative">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-blue-200 rounded-b-lg"></div>
                  <div className="absolute right-1 top-2 text-xs text-gray-600">ml</div>
                </div>
              </div>
            )}
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {challenge.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`p-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                  selectedAnswer === index
                    ? index === challenge.correct
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

          {/* Learning Tip */}
          <div className="bg-emerald-50 p-4 rounded-lg border-2 border-emerald-200">
            <p className="text-sm text-emerald-700 text-center">
              💡 <strong>Tip:</strong> {
                challenge.type === 'length' 
                  ? 'Compare to things you know! Your finger is about 1 cm wide.'
                  : challenge.type === 'weight'
                  ? 'Think about familiar objects! A paperclip weighs about 1 gram.'
                  : 'Remember: 1 liter = 1000 ml. A water bottle is usually 500 ml.'
              }
            </p>
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-emerald-200 text-center">
            <div className="text-4xl mb-4">
              {feedback.includes('Excellent') ? '📏' : '💪'}
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
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-300"
                style={{ width: `${(currentLevel / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementMaster;