import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Zap, Timer } from 'lucide-react';

interface DecimalDashProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface DecimalChallenge {
  type: 'compare' | 'add' | 'subtract';
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const DecimalDash: React.FC<DecimalDashProps> = ({ onComplete, onBack }) => {
  const [score, setScore] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState<DecimalChallenge | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [challengesSolved, setChallengesSolved] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [dashPosition, setDashPosition] = useState(0);
  const [totalChallenges] = useState(15);

  const generateChallenge = (): DecimalChallenge => {
    const types: ('compare' | 'add' | 'subtract')[] = ['compare', 'add', 'subtract'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    switch (type) {
      case 'compare':
        const num1 = (Math.random() * 10).toFixed(1);
        const num2 = (Math.random() * 10).toFixed(1);
        const correctIndex = parseFloat(num1) > parseFloat(num2) ? 0 : 1;
        return {
          type: 'compare',
          question: `Which decimal is larger?`,
          options: [num1, num2],
          correct: correctIndex,
          explanation: `${parseFloat(num1) > parseFloat(num2) ? num1 : num2} is larger because ${parseFloat(num1) > parseFloat(num2) ? `${num1} > ${num2}` : `${num2} > ${num1}`}`
        };
        
      case 'add':
        const addNum1 = (Math.random() * 5).toFixed(1);
        const addNum2 = (Math.random() * 5).toFixed(1);
        const sum = (parseFloat(addNum1) + parseFloat(addNum2)).toFixed(1);
        const wrongAnswers = [
          (parseFloat(sum) + 0.1).toFixed(1),
          (parseFloat(sum) - 0.1).toFixed(1),
          (parseFloat(sum) + 0.2).toFixed(1)
        ];
        const addOptions = [sum, ...wrongAnswers].sort(() => Math.random() - 0.5);
        return {
          type: 'add',
          question: `${addNum1} + ${addNum2} = ?`,
          options: addOptions,
          correct: addOptions.indexOf(sum),
          explanation: `${addNum1} + ${addNum2} = ${sum}`
        };
        
      case 'subtract':
        const subNum1 = (Math.random() * 5 + 2).toFixed(1);
        const subNum2 = (Math.random() * parseFloat(subNum1)).toFixed(1);
        const difference = (parseFloat(subNum1) - parseFloat(subNum2)).toFixed(1);
        const wrongSubAnswers = [
          (parseFloat(difference) + 0.1).toFixed(1),
          (parseFloat(difference) - 0.1).toFixed(1),
          (parseFloat(difference) + 0.2).toFixed(1)
        ];
        const subOptions = [difference, ...wrongSubAnswers].sort(() => Math.random() - 0.5);
        return {
          type: 'subtract',
          question: `${subNum1} - ${subNum2} = ?`,
          options: subOptions,
          correct: subOptions.indexOf(difference),
          explanation: `${subNum1} - ${subNum2} = ${difference}`
        };
        
      default:
        return generateChallenge();
    }
  };

  const newChallenge = () => {
    setCurrentChallenge(generateChallenge());
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTimeLeft(10);
  };

  useEffect(() => {
    newChallenge();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback && !gameEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback) {
      handleTimeUp();
    }
  }, [timeLeft, showFeedback, gameEnded]);

  const handleTimeUp = () => {
    if (!currentChallenge) return;
    
    setFeedback(`Time's up! ${currentChallenge.explanation} ⏰`);
    setShowFeedback(true);
    
    setTimeout(() => {
      if (challengesSolved >= totalChallenges - 1) {
        setGameEnded(true);
        onComplete(Math.round((score / totalChallenges) * 10));
      } else {
        setChallengesSolved(challengesSolved + 1);
        newChallenge();
      }
    }, 2000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback || !currentChallenge) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentChallenge.correct;
    
    if (isCorrect) {
      const timeBonus = Math.max(0, timeLeft - 3);
      const points = 10 + timeBonus;
      setScore(score + points);
      setDashPosition(Math.min(dashPosition + 7, 100));
      setFeedback(`Correct! ${currentChallenge.explanation} ${timeBonus > 0 ? `+${timeBonus} speed bonus!` : ''} 💨`);
    } else {
      setFeedback(`Not quite! ${currentChallenge.explanation} Keep dashing! 💪`);
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      if (challengesSolved >= totalChallenges - 1) {
        setGameEnded(true);
        onComplete(Math.round((score + (isCorrect ? 10 + Math.max(0, timeLeft - 3) : 0)) / (totalChallenges * 15) * 100));
      } else {
        setChallengesSolved(challengesSolved + 1);
        newChallenge();
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-100 p-4">
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
              <span className={`font-bold ${timeLeft <= 3 ? 'text-red-600' : 'text-gray-800'}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-lg">
              <span className="font-bold text-gray-800">Solved: {challengesSolved}/{totalChallenges}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-gray-800">{score}</span>
            </div>
          </div>
        </div>

        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">💨 Decimal Dash</h1>
          <p className="text-xl text-gray-600">Race through decimal problems as fast as you can!</p>
        </div>

        {/* Dash Track */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Dash Progress</h3>
          </div>
          <div className="relative bg-gray-200 h-8 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${dashPosition}%` }}
            >
              <span className="text-2xl">🏃‍♂️💨</span>
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl">
              🏁
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="text-sm text-gray-600">{dashPosition}% to finish line!</span>
          </div>
        </div>

        {/* Current Challenge */}
        {currentChallenge && !gameEnded && (
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-6">
            {/* Timer Bar */}
            <div className="mb-6">
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    timeLeft <= 3 ? 'bg-red-500' : timeLeft <= 6 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(timeLeft / 10) * 100}%` }}
                />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick! Solve this:</h2>
              <div className="text-4xl font-bold text-cyan-600 mb-8">
                {currentChallenge.question}
              </div>

              {/* Answer Options */}
              <div className={`grid ${currentChallenge.options.length === 2 ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'} gap-4`}>
                {currentChallenge.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-4 rounded-xl font-bold text-xl transition-all duration-200 ${
                      selectedAnswer === index
                        ? index === currentChallenge.correct
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
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameEnded && (
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-6xl mb-4">🏁</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Dash Complete!</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-cyan-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-cyan-600">{challengesSolved}</div>
                <div className="text-sm text-gray-600">Challenges Solved</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-gray-600">Total Score</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">{dashPosition}%</div>
                <div className="text-sm text-gray-600">Dash Progress</div>
              </div>
            </div>
            <p className="text-lg text-gray-600">
              {dashPosition >= 100 ? 'Amazing! You completed the decimal dash! 🏆' : 
               dashPosition >= 50 ? 'Great job! You made it halfway through the dash! 🌟' : 
               'Good effort! Keep practicing decimals to dash faster! 💪'}
            </p>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && !gameEnded && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-cyan-200 text-center">
            <div className="text-4xl mb-4">
              {feedback.includes('Correct') ? '💨' : feedback.includes('Time\'s up') ? '⏰' : '💪'}
            </div>
            <p className="text-lg text-gray-700">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecimalDash;