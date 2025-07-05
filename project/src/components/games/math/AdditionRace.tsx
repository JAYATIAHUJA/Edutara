import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Zap, Timer } from 'lucide-react';

interface AdditionRaceProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const AdditionRace: React.FC<AdditionRaceProps> = ({ onComplete, onBack }) => {
  const [score, setScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState<{num1: number, num2: number} | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [problemsSolved, setProblemsSolved] = useState(0);
  const [racePosition, setRacePosition] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const generateProblem = () => {
    const num1 = Math.floor(Math.random() * 50) + 1;
    const num2 = Math.floor(Math.random() * 50) + 1;
    setCurrentProblem({ num1, num2 });
    setUserAnswer('');
  };

  useEffect(() => {
    generateProblem();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameEnded(true);
      onComplete(score);
    }
  }, [timeLeft, gameEnded, score, onComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProblem || gameEnded) return;
    
    const correctAnswer = currentProblem.num1 + currentProblem.num2;
    const userNum = parseInt(userAnswer);
    
    if (userNum === correctAnswer) {
      setScore(score + 10);
      setProblemsSolved(problemsSolved + 1);
      setRacePosition(Math.min(racePosition + 10, 100));
      setFeedback(`Correct! ${currentProblem.num1} + ${currentProblem.num2} = ${correctAnswer} 🏁`);
      
      setTimeout(() => {
        generateProblem();
        setShowFeedback(false);
      }, 1000);
    } else {
      setFeedback(`Not quite! ${currentProblem.num1} + ${currentProblem.num2} = ${correctAnswer}. Keep going! 💪`);
      setTimeout(() => {
        setShowFeedback(false);
        setUserAnswer('');
      }, 1500);
    }
    
    setShowFeedback(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

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
            <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
              <Timer className="w-5 h-5 text-red-500" />
              <span className="font-bold text-gray-800">{timeLeft}s</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-lg">
              <span className="font-bold text-gray-800">Solved: {problemsSolved}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-gray-800">{score}</span>
            </div>
          </div>
        </div>

        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏁 Addition Race</h1>
          <p className="text-xl text-gray-600">Solve addition problems as fast as you can!</p>
        </div>

        {/* Race Track */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Race Progress</h3>
          </div>
          <div className="relative bg-gray-200 h-8 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${racePosition}%` }}
            >
              <span className="text-2xl">🏃‍♂️</span>
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl">
              🏁
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="text-sm text-gray-600">{racePosition}% to finish line!</span>
          </div>
        </div>

        {/* Current Problem */}
        {currentProblem && !gameEnded && (
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-6">
            <form onSubmit={handleSubmit} className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Solve quickly:</h2>
              <div className="text-6xl font-bold text-green-600 mb-6">
                {currentProblem.num1} + {currentProblem.num2} = ?
              </div>
              <div className="flex justify-center items-center space-x-4 mb-6">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={handleInputChange}
                  className="w-32 h-16 text-3xl font-bold text-center border-4 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="?"
                  autoFocus
                  disabled={showFeedback}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                  disabled={!userAnswer || showFeedback}
                >
                  <Zap className="w-5 h-5" />
                  <span>Go!</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Game Over Screen */}
        {gameEnded && (
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-6xl mb-4">🏁</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Race Finished!</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">{problemsSolved}</div>
                <div className="text-sm text-gray-600">Problems Solved</div>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-600">Total Score</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">{racePosition}%</div>
                <div className="text-sm text-gray-600">Race Progress</div>
              </div>
            </div>
            <p className="text-lg text-gray-600">
              {racePosition >= 100 ? 'Congratulations! You finished the race! 🏆' : 
               racePosition >= 50 ? 'Great job! You made it halfway! 🌟' : 
               'Good effort! Keep practicing to go faster! 💪'}
            </p>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && !gameEnded && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-green-200 text-center">
            <div className="text-4xl mb-4">
              {feedback.includes('Correct') ? '🎉' : '💪'}
            </div>
            <p className="text-lg text-gray-700">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionRace;