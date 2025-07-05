import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Volume2, Check, X } from 'lucide-react';

interface SpellingBeeChallengeProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface SpellingWord {
  word: string;
  definition: string;
  difficulty: 'easy' | 'medium' | 'hard';
  sentence: string;
}

const SpellingBeeChallenge: React.FC<SpellingBeeChallengeProps> = ({ onComplete, onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState<SpellingWord | null>(null);
  const [userSpelling, setUserSpelling] = useState('');
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts] = useState(2);
  const [totalWords] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);

  const spellingWords: SpellingWord[] = [
    {
      word: "cat",
      definition: "A small furry animal that says meow",
      difficulty: "easy",
      sentence: "The cat is sleeping on the mat."
    },
    {
      word: "book",
      definition: "Something you read with pages",
      difficulty: "easy",
      sentence: "I love to read my favorite book."
    },
    {
      word: "happy",
      definition: "Feeling joyful and cheerful",
      difficulty: "easy",
      sentence: "She was happy to see her friends."
    },
    {
      word: "school",
      definition: "A place where children learn",
      difficulty: "medium",
      sentence: "We go to school every weekday."
    },
    {
      word: "friend",
      definition: "Someone you like and enjoy being with",
      difficulty: "medium",
      sentence: "My best friend lives next door."
    },
    {
      word: "beautiful",
      definition: "Very pretty or lovely to look at",
      difficulty: "medium",
      sentence: "The sunset was beautiful tonight."
    },
    {
      word: "elephant",
      definition: "A very large gray animal with a trunk",
      difficulty: "hard",
      sentence: "The elephant sprayed water with its trunk."
    },
    {
      word: "butterfly",
      definition: "A colorful insect with large wings",
      difficulty: "hard",
      sentence: "A butterfly landed on the flower."
    },
    {
      word: "adventure",
      definition: "An exciting journey or experience",
      difficulty: "hard",
      sentence: "They went on an adventure in the forest."
    },
    {
      word: "wonderful",
      definition: "Extremely good or amazing",
      difficulty: "hard",
      sentence: "We had a wonderful time at the party."
    }
  ];

  const generateWord = () => {
    const wordIndex = (currentLevel - 1) % spellingWords.length;
    setCurrentWord(spellingWords[wordIndex]);
    setUserSpelling('');
    setShowFeedback(false);
    setAttempts(0);
  };

  useEffect(() => {
    generateWord();
  }, [currentLevel]);

  const speakWord = () => {
    if (!currentWord || !('speechSynthesis' in window)) return;
    
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.rate = 0.7;
    utterance.pitch = 1.1;
    utterance.volume = 0.9;
    
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    speechSynthesis.speak(utterance);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWord) return;
    
    const isCorrect = userSpelling.toLowerCase().trim() === currentWord.word.toLowerCase();
    
    if (isCorrect) {
      const points = currentWord.difficulty === 'easy' ? 10 : 
                   currentWord.difficulty === 'medium' ? 15 : 20;
      const attemptBonus = attempts === 0 ? 5 : 0;
      setScore(score + points + attemptBonus);
      setFeedback(`Perfect! You spelled "${currentWord.word}" correctly! ${attemptBonus > 0 ? '+5 first try bonus!' : ''} 🎉`);
    } else {
      setAttempts(attempts + 1);
      if (attempts + 1 >= maxAttempts) {
        setFeedback(`The correct spelling is "${currentWord.word}". Don't worry, keep practicing! 💪`);
      } else {
        setFeedback(`Not quite right. Try again! You have ${maxAttempts - attempts - 1} more attempt. 🤔`);
      }
    }
    
    setShowFeedback(true);
    
    if (isCorrect || attempts + 1 >= maxAttempts) {
      setTimeout(() => {
        if (currentLevel >= totalWords) {
          onComplete(Math.round((score + (isCorrect ? (currentWord.difficulty === 'easy' ? 10 : currentWord.difficulty === 'medium' ? 15 : 20) + (attempts === 0 ? 5 : 0) : 0)) / (totalWords * 20) * 100));
        } else {
          setCurrentLevel(currentLevel + 1);
        }
      }, 2500);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
        setUserSpelling('');
      }, 2000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSpelling(e.target.value);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'hard': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  if (!currentWord) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
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
              <span className="font-bold text-gray-800">Word: {currentLevel}/{totalWords}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-lg">
              <span className="font-bold text-gray-800">Attempts: {attempts}/{maxAttempts}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-gray-800">{score}</span>
            </div>
          </div>
        </div>

        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🔤 Spelling Bee Challenge</h1>
          <p className="text-xl text-gray-600">Listen carefully and spell the word!</p>
        </div>

        {/* Challenge */}
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-6">
          {/* Difficulty Badge */}
          <div className="text-center mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getDifficultyColor(currentWord.difficulty)}`}>
              {currentWord.difficulty.toUpperCase()} WORD
            </span>
          </div>

          {/* Listen Section */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">👂</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Listen to the word:</h2>
            <button
              onClick={speakWord}
              className={`bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-xl hover:bg-blue-600 transition-colors shadow-lg flex items-center space-x-3 mx-auto ${
                isPlaying ? 'animate-pulse' : ''
              }`}
            >
              <Volume2 className="w-6 h-6" />
              <span>{isPlaying ? 'Playing...' : 'Play Word'}</span>
            </button>
          </div>

          {/* Definition and Sentence */}
          <div className="bg-purple-50 p-6 rounded-2xl mb-8">
            <div className="text-center">
              <h3 className="text-lg font-bold text-purple-800 mb-2">Definition:</h3>
              <p className="text-purple-700 mb-4">{currentWord.definition}</p>
              <h3 className="text-lg font-bold text-purple-800 mb-2">Used in a sentence:</h3>
              <p className="text-purple-700 italic">"{currentWord.sentence}"</p>
            </div>
          </div>

          {/* Spelling Input */}
          <form onSubmit={handleSubmit} className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Now spell the word:</h3>
            <div className="flex justify-center items-center space-x-4 mb-6">
              <input
                type="text"
                value={userSpelling}
                onChange={handleInputChange}
                className="w-64 h-16 text-2xl font-bold text-center border-4 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                placeholder="Type your spelling..."
                autoFocus
                disabled={showFeedback && (userSpelling.toLowerCase().trim() === currentWord.word.toLowerCase() || attempts >= maxAttempts)}
              />
              <button
                type="submit"
                className="bg-purple-500 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-purple-600 transition-colors flex items-center space-x-2"
                disabled={!userSpelling.trim() || (showFeedback && (userSpelling.toLowerCase().trim() === currentWord.word.toLowerCase() || attempts >= maxAttempts))}
              >
                <Check className="w-5 h-5" />
                <span>Check Spelling</span>
              </button>
            </div>
          </form>

          {/* Hint */}
          <div className="text-center">
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <p className="text-sm text-blue-700">
                💡 <strong>Tip:</strong> Listen carefully to each sound in the word. Take your time!
              </p>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-purple-200 text-center">
            <div className="text-4xl mb-4">
              {feedback.includes('Perfect') ? '🎉' : 
               feedback.includes('correct spelling') ? '📚' : '💪'}
            </div>
            <p className="text-lg text-gray-700">{feedback}</p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Progress</span>
              <span className="text-sm font-bold text-gray-700">{currentLevel}/{totalWords}</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-300"
                style={{ width: `${(currentLevel / totalWords) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpellingBeeChallenge;