import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, RotateCw } from 'lucide-react';

interface ShapesSymmetryMatchProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface Shape {
  id: string;
  name: string;
  sides: number;
  symmetryLines: number;
  svg: string;
  properties: string[];
}

interface Challenge {
  type: 'name-shape' | 'count-sides' | 'symmetry-lines' | 'properties';
  question: string;
  shape: Shape;
  options: string[];
  correct: number;
}

const ShapesSymmetryMatch: React.FC<ShapesSymmetryMatchProps> = ({ onComplete, onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSymmetryLines, setShowSymmetryLines] = useState(false);
  const [totalQuestions] = useState(10);

  const shapes: Shape[] = [
    {
      id: 'triangle',
      name: 'Triangle',
      sides: 3,
      symmetryLines: 3,
      svg: `<polygon points="50,10 10,90 90,90" fill="#3B82F6" stroke="#1E40AF" stroke-width="2"/>`,
      properties: ['3 sides', '3 angles', '3 vertices']
    },
    {
      id: 'square',
      name: 'Square',
      sides: 4,
      symmetryLines: 4,
      svg: `<rect x="20" y="20" width="60" height="60" fill="#10B981" stroke="#047857" stroke-width="2"/>`,
      properties: ['4 equal sides', '4 right angles', '4 vertices']
    },
    {
      id: 'rectangle',
      name: 'Rectangle',
      sides: 4,
      symmetryLines: 2,
      svg: `<rect x="15" y="30" width="70" height="40" fill="#F59E0B" stroke="#D97706" stroke-width="2"/>`,
      properties: ['4 sides', '4 right angles', 'opposite sides equal']
    },
    {
      id: 'pentagon',
      name: 'Pentagon',
      sides: 5,
      symmetryLines: 5,
      svg: `<polygon points="50,15 80,35 70,70 30,70 20,35" fill="#8B5CF6" stroke="#7C3AED" stroke-width="2"/>`,
      properties: ['5 sides', '5 angles', '5 vertices']
    },
    {
      id: 'hexagon',
      name: 'Hexagon',
      sides: 6,
      symmetryLines: 6,
      svg: `<polygon points="50,10 75,25 75,55 50,70 25,55 25,25" fill="#EF4444" stroke="#DC2626" stroke-width="2"/>`,
      properties: ['6 sides', '6 angles', '6 vertices']
    },
    {
      id: 'circle',
      name: 'Circle',
      sides: 0,
      symmetryLines: 999, // Infinite
      svg: `<circle cx="50" cy="50" r="35" fill="#EC4899" stroke="#DB2777" stroke-width="2"/>`,
      properties: ['curved line', 'no sides', 'infinite symmetry lines']
    }
  ];

  const generateChallenge = (): Challenge => {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const types: Challenge['type'][] = ['name-shape', 'count-sides', 'symmetry-lines', 'properties'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    switch (type) {
      case 'name-shape':
        const wrongNames = shapes.filter(s => s.id !== shape.id).map(s => s.name);
        const nameOptions = [shape.name, ...wrongNames.slice(0, 3)].sort(() => Math.random() - 0.5);
        return {
          type: 'name-shape',
          question: 'What is the name of this shape?',
          shape,
          options: nameOptions,
          correct: nameOptions.indexOf(shape.name)
        };
        
      case 'count-sides':
        if (shape.id === 'circle') {
          return generateChallenge(); // Skip circles for side counting
        }
        const wrongSides = [shape.sides - 1, shape.sides + 1, shape.sides + 2].filter(n => n > 0);
        const sideOptions = [shape.sides.toString(), ...wrongSides.map(n => n.toString())].sort(() => Math.random() - 0.5);
        return {
          type: 'count-sides',
          question: 'How many sides does this shape have?',
          shape,
          options: sideOptions,
          correct: sideOptions.indexOf(shape.sides.toString())
        };
        
      case 'symmetry-lines':
        if (shape.id === 'circle') {
          const circleOptions = ['1', '4', '8', 'Infinite'];
          return {
            type: 'symmetry-lines',
            question: 'How many lines of symmetry does this shape have?',
            shape,
            options: circleOptions,
            correct: 3 // 'Infinite'
          };
        }
        const wrongSymmetry = [shape.symmetryLines - 1, shape.symmetryLines + 1, shape.symmetryLines + 2].filter(n => n > 0);
        const symmetryOptions = [shape.symmetryLines.toString(), ...wrongSymmetry.map(n => n.toString())].sort(() => Math.random() - 0.5);
        return {
          type: 'symmetry-lines',
          question: 'How many lines of symmetry does this shape have?',
          shape,
          options: symmetryOptions,
          correct: symmetryOptions.indexOf(shape.symmetryLines.toString())
        };
        
      case 'properties':
        const correctProperty = shape.properties[Math.floor(Math.random() * shape.properties.length)];
        const wrongProperties = shapes
          .filter(s => s.id !== shape.id)
          .flatMap(s => s.properties)
          .filter(p => !shape.properties.includes(p));
        const propertyOptions = [correctProperty, ...wrongProperties.slice(0, 3)].sort(() => Math.random() - 0.5);
        return {
          type: 'properties',
          question: 'Which property describes this shape?',
          shape,
          options: propertyOptions,
          correct: propertyOptions.indexOf(correctProperty)
        };
        
      default:
        return generateChallenge();
    }
  };

  const newChallenge = () => {
    setChallenge(generateChallenge());
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowSymmetryLines(false);
  };

  useEffect(() => {
    newChallenge();
  }, [currentLevel]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback || !challenge) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === challenge.correct;
    
    if (isCorrect) {
      setScore(score + 10);
      setFeedback(`Excellent! ${getCorrectAnswerExplanation(challenge)} 🔷`);
    } else {
      setFeedback(`Not quite! ${getCorrectAnswerExplanation(challenge)} Keep learning! 💪`);
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

  const getCorrectAnswerExplanation = (challenge: Challenge): string => {
    const { shape, type } = challenge;
    
    switch (type) {
      case 'name-shape':
        return `This is a ${shape.name}.`;
      case 'count-sides':
        return `A ${shape.name} has ${shape.sides} sides.`;
      case 'symmetry-lines':
        return shape.id === 'circle' 
          ? `A circle has infinite lines of symmetry.`
          : `A ${shape.name} has ${shape.symmetryLines} lines of symmetry.`;
      case 'properties':
        return `A ${shape.name} ${challenge.options[challenge.correct]}.`;
      default:
        return '';
    }
  };

  const renderSymmetryLines = (shape: Shape) => {
    if (shape.id === 'circle') {
      return (
        <>
          <line x1="15" y1="50" x2="85" y2="50" stroke="#FF0000" strokeWidth="2" strokeDasharray="5,5"/>
          <line x1="50" y1="15" x2="50" y2="85" stroke="#FF0000" strokeWidth="2" strokeDasharray="5,5"/>
          <line x1="25" y1="25" x2="75" y2="75" stroke="#FF0000" strokeWidth="2" strokeDasharray="5,5"/>
          <line x1="75" y1="25" x2="25" y2="75" stroke="#FF0000" strokeWidth="2" strokeDasharray="5,5"/>
          <text x="50" y="95" textAnchor="middle" fontSize="10" fill="#FF0000">+ more lines</text>
        </>
      );
    }
    
    const lines = [];
    if (shape.id === 'square') {
      lines.push(
        <line key="v" x1="50" y1="20" x2="50" y2="80" stroke="#FF0000" strokeWidth="2" strokeDasharray="5,5"/>,
        <line key="h" x1="20" y1="50" x2="80" y2="50" stroke="#FF0000" strokeWidth="2" strokeDasharray="5,5"/>,
        <line key="d1" x1="20" y1="20" x2="80" y2="80" stroke="#FF0000" strokeWidth="2" strokeDasharray="5,5"/>,
        <line key="d2" x1="80" y1="20" x2="20" y2="80" stroke="#FF0000" strokeWidth="2" strokeDasharray="5,5"/>
      );
    } else if (shape.id === 'triangle') {
      lines.push(
        <line key="1" x1="50" y1="10" x2="50" y2="90" stroke="#FF0000" strokeWidth="2" strokeDasharray="5,5"/>,
        <line key="2" x1="50" y1="50" x2="10" y2="90" stroke="#FF0000" strokeWidth="2" strokeDasharray="5,5"/>,
        <line key="3" x1="50" y1="50" x2="90" y2="90" stroke="#FF0000" strokeWidth="2" strokeDasharray="5,5"/>
      );
    } else if (shape.id === 'rectangle') {
      lines.push(
        <line key="v" x1="50" y1="30" x2="50" y2="70" stroke="#FF0000" strokeWidth="2" strokeDasharray="5,5"/>,
        <line key="h" x1="15" y1="50" x2="85" y2="50" stroke="#FF0000" strokeWidth="2" strokeDasharray="5,5"/>
      );
    }
    
    return lines;
  };

  if (!challenge) return null;

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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🔷 Shapes & Symmetry Match</h1>
          <p className="text-xl text-gray-600">Learn about shapes and their properties!</p>
        </div>

        {/* Challenge */}
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{challenge.question}</h2>
            
            {/* Shape Display */}
            <div className="mb-6">
              <div className="relative inline-block">
                <svg width="200" height="200" viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg shadow-lg">
                  <g dangerouslySetInnerHTML={{ __html: challenge.shape.svg }} />
                  {showSymmetryLines && challenge.type === 'symmetry-lines' && renderSymmetryLines(challenge.shape)}
                </svg>
                
                {/* Symmetry toggle button */}
                {challenge.type === 'symmetry-lines' && (
                  <button
                    onClick={() => setShowSymmetryLines(!showSymmetryLines)}
                    className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center space-x-2"
                  >
                    <RotateCw className="w-4 h-4" />
                    <span>{showSymmetryLines ? 'Hide' : 'Show'} Symmetry Lines</span>
                  </button>
                )}
              </div>
            </div>
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
          <div className="bg-teal-50 p-4 rounded-lg border-2 border-teal-200">
            <p className="text-sm text-teal-700 text-center">
              💡 <strong>Tip:</strong> {
                challenge.type === 'symmetry-lines' 
                  ? 'A line of symmetry divides a shape into two identical halves!'
                  : challenge.type === 'count-sides'
                  ? 'Count each straight edge of the shape!'
                  : challenge.type === 'properties'
                  ? 'Look at the shape\'s sides, angles, and special features!'
                  : 'Look carefully at the shape\'s form and structure!'
              }
            </p>
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-teal-200 text-center">
            <div className="text-4xl mb-4">
              {feedback.includes('Excellent') ? '🔷' : '💪'}
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

export default ShapesSymmetryMatch;