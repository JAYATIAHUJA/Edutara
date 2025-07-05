import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Trophy } from 'lucide-react';

interface MultiplicationBingoProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface BingoCell {
  answer: number;
  marked: boolean;
  correct: boolean;
}

const MultiplicationBingo: React.FC<MultiplicationBingoProps> = ({ onComplete, onBack }) => {
  const [score, setScore] = useState(0);
  const [bingoBoard, setBingoBoard] = useState<BingoCell[][]>([]);
  const [currentProblem, setCurrentProblem] = useState<{num1: number, num2: number} | null>(null);
  const [problemsAnswered, setProblemsAnswered] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [totalProblems] = useState(15);

  const generateBingoBoard = () => {
    const board: BingoCell[][] = [];
    const usedAnswers = new Set<number>();
    
    for (let row = 0; row < 5; row++) {
      board[row] = [];
      for (let col = 0; col < 5; col++) {
        if (row === 2 && col === 2) {
          // Free space in center
          board[row][col] = { answer: 0, marked: true, correct: true };
        } else {
          let answer;
          do {
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            answer = num1 * num2;
          } while (usedAnswers.has(answer));
          
          usedAnswers.add(answer);
          board[row][col] = { answer, marked: false, correct: false };
        }
      }
    }
    
    setBingoBoard(board);
  };

  const generateProblem = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCurrentProblem({ num1, num2 });
  };

  useEffect(() => {
    generateBingoBoard();
    generateProblem();
  }, []);

  const handleCellClick = (row: number, col: number) => {
    if (!currentProblem || showFeedback || bingoBoard[row][col].marked) return;
    
    const cell = bingoBoard[row][col];
    const correctAnswer = currentProblem.num1 * currentProblem.num2;
    const isCorrect = cell.answer === correctAnswer;
    
    if (isCorrect) {
      const newBoard = [...bingoBoard];
      newBoard[row][col] = { ...cell, marked: true, correct: true };
      setBingoBoard(newBoard);
      setScore(score + 10);
      setFeedback(`Correct! ${currentProblem.num1} × ${currentProblem.num2} = ${correctAnswer} 🎉`);
      
      // Check for bingo
      if (checkForBingo(newBoard)) {
        setGameWon(true);
        setFeedback(`BINGO! You won! 🏆`);
      }
    } else {
      setFeedback(`Not quite! ${currentProblem.num1} × ${currentProblem.num2} = ${correctAnswer}, not ${cell.answer}. Try again! 💪`);
    }
    
    setShowFeedback(true);
    setProblemsAnswered(problemsAnswered + 1);
    
    setTimeout(() => {
      setShowFeedback(false);
      if (gameWon || problemsAnswered >= totalProblems) {
        onComplete(Math.round((score + (isCorrect ? 10 : 0)) / totalProblems * 10));
      } else {
        generateProblem();
      }
    }, 2000);
  };

  const checkForBingo = (board: BingoCell[][]): boolean => {
    // Check rows
    for (let row = 0; row < 5; row++) {
      if (board[row].every(cell => cell.marked)) return true;
    }
    
    // Check columns
    for (let col = 0; col < 5; col++) {
      if (board.every(row => row[col].marked)) return true;
    }
    
    // Check diagonals
    if (board.every((row, i) => row[i].marked)) return true;
    if (board.every((row, i) => row[4 - i].marked)) return true;
    
    return false;
  };

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
              <span className="font-bold text-gray-800">Problems: {problemsAnswered}/{totalProblems}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-gray-800">{score}</span>
            </div>
          </div>
        </div>

        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎱 Multiplication Bingo</h1>
          <p className="text-xl text-gray-600">Solve multiplication problems to mark your bingo card!</p>
        </div>

        {/* Current Problem */}
        {currentProblem && !gameWon && (
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Solve this problem:</h2>
            <div className="text-6xl font-bold text-purple-600 mb-4">
              {currentProblem.num1} × {currentProblem.num2} = ?
            </div>
            <p className="text-lg text-gray-600">Click on the correct answer on your bingo card!</p>
          </div>
        )}

        {/* Bingo Board */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800">BINGO</h3>
          </div>
          <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
            {bingoBoard.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`w-16 h-16 rounded-lg font-bold text-lg transition-all duration-200 ${
                    cell.marked
                      ? cell.correct
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  } ${rowIndex === 2 && colIndex === 2 ? 'bg-yellow-400 text-yellow-900' : ''}`}
                  disabled={showFeedback || cell.marked}
                >
                  {rowIndex === 2 && colIndex === 2 ? 'FREE' : cell.answer}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-purple-200 text-center">
            <div className="text-4xl mb-4">
              {gameWon ? '🏆' : feedback.includes('Correct') ? '🎉' : '💪'}
            </div>
            <p className="text-lg text-gray-700">{feedback}</p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Progress</span>
              <span className="text-sm font-bold text-gray-700">{problemsAnswered}/{totalProblems}</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300"
                style={{ width: `${(problemsAnswered / totalProblems) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiplicationBingo;