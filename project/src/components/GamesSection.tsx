import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, Sparkles, Trophy, Clock, Target, Zap } from 'lucide-react';
import { useColorTheme } from '../hooks/useColorTheme';
import GameContainer from './games/GameContainer';

interface GamesSectionProps {
  onBack: () => void;
}

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  skills: string[];
  color: string;
}

const mathGames: Game[] = [
  {
    id: 'pizza-fraction',
    title: 'Pizza Fraction Game',
    description: 'Slice virtual pizzas to match given fractions. Helps players visualize parts of a whole and practice fraction comparisons and equivalents.',
    icon: '🍕',
    difficulty: 'medium',
    estimatedTime: '15-20 min',
    skills: ['Fractions', 'Visual Learning', 'Comparisons'],
    color: 'from-orange-400 to-red-500'
  },
  {
    id: 'number-bond',
    title: 'Number Bond Builder',
    description: 'Connect numbers to form number bonds that add up to a target sum. Builds a strong foundation in addition and subtraction.',
    icon: '🔗',
    difficulty: 'easy',
    estimatedTime: '10-15 min',
    skills: ['Addition', 'Subtraction', 'Number Bonds'],
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'multiplication-bingo',
    title: 'Multiplication Bingo',
    description: 'Solve multiplication problems to mark off answers on a bingo card. A fun way to reinforce times tables through fast recall.',
    icon: '🎱',
    difficulty: 'medium',
    estimatedTime: '20-25 min',
    skills: ['Multiplication', 'Times Tables', 'Quick Recall'],
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 'addition-race',
    title: 'Addition Race',
    description: 'Race against others or a timer to solve addition problems. The quicker you solve, the faster your character moves on the track.',
    icon: '🏁',
    difficulty: 'easy',
    estimatedTime: '10-15 min',
    skills: ['Addition', 'Speed', 'Competition'],
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'division-quest',
    title: 'Division Quest',
    description: 'Embark on a math adventure where solving division problems unlocks paths and treasure. Strengthens long and short division skills.',
    icon: '🗺️',
    difficulty: 'hard',
    estimatedTime: '25-30 min',
    skills: ['Division', 'Problem Solving', 'Adventure'],
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'decimal-dash',
    title: 'Decimal Dash',
    description: 'Quick-paced game where players compare, add, or subtract decimal numbers to move ahead. Sharpens understanding of place value and operations with decimals.',
    icon: '💨',
    difficulty: 'hard',
    estimatedTime: '15-20 min',
    skills: ['Decimals', 'Place Value', 'Operations'],
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'time-teller',
    title: 'Time Teller Challenge',
    description: 'Set analog and digital clocks to match given times or interpret displayed times. Builds time-reading and telling skills.',
    icon: '⏰',
    difficulty: 'medium',
    estimatedTime: '15-20 min',
    skills: ['Time', 'Clock Reading', 'Daily Skills'],
    color: 'from-indigo-400 to-purple-500'
  },
  {
    id: 'place-value-pop',
    title: 'Place Value Pop',
    description: 'Pop balloons with numbers to match the correct place value (ones, tens, hundreds, etc.). Reinforces number structure and digit value.',
    icon: '💥',
    difficulty: 'easy',
    estimatedTime: '10-15 min',
    skills: ['Place Value', 'Number Structure', 'Recognition'],
    color: 'from-pink-400 to-red-500'
  },
  {
    id: 'shapes-symmetry',
    title: 'Shapes & Symmetry Match',
    description: 'Match geometric shapes with their names, properties, or lines of symmetry. Enhances spatial awareness and symmetry recognition.',
    icon: '🔷',
    difficulty: 'medium',
    estimatedTime: '15-20 min',
    skills: ['Geometry', 'Shapes', 'Symmetry'],
    color: 'from-teal-400 to-cyan-500'
  },
  {
    id: 'measurement-master',
    title: 'Measurement Master',
    description: 'Use rulers, scales, or containers to estimate and measure length, weight, or volume. Encourages real-world application of measurement concepts.',
    icon: '📏',
    difficulty: 'medium',
    estimatedTime: '20-25 min',
    skills: ['Measurement', 'Estimation', 'Real-world Skills'],
    color: 'from-emerald-400 to-green-500'
  }
];

const englishGames: Game[] = [
  {
    id: 'word-builder',
    title: 'Word Builder',
    description: 'Unscramble letters to make a correct word. Great for spelling and vocabulary with image hints to help you learn!',
    icon: '🎯',
    difficulty: 'easy',
    estimatedTime: '10-15 min',
    skills: ['Spelling', 'Vocabulary', 'Word Recognition'],
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'sentence-scrambler',
    title: 'Sentence Scrambler',
    description: 'Arrange shuffled words to form a correct sentence. Example: "cake / I / eat / like" → "I like to eat cake". Improves grammar and syntax.',
    icon: '🧩',
    difficulty: 'medium',
    estimatedTime: '15-20 min',
    skills: ['Grammar', 'Syntax', 'Sentence Structure'],
    color: 'from-green-400 to-emerald-500'
  },
  {
    id: 'synonym-hunt',
    title: 'Synonym Hunt',
    description: 'Match words with their synonyms. Example: "Happy → Joyful". Timer-based or drag-and-drop format that boosts vocabulary building.',
    icon: '🕵️‍♀️',
    difficulty: 'medium',
    estimatedTime: '15-20 min',
    skills: ['Synonyms', 'Vocabulary', 'Word Relationships'],
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 'spelling-bee',
    title: 'Spelling Bee Challenge',
    description: 'Hear a word and spell it correctly using text-to-speech. Type in your spelling and get instant feedback with retry options.',
    icon: '🔤',
    difficulty: 'hard',
    estimatedTime: '20-25 min',
    skills: ['Spelling', 'Listening', 'Phonics'],
    color: 'from-yellow-400 to-orange-500'
  }
];

const GamesSection: React.FC<GamesSectionProps> = ({ onBack }) => {
  const { getThemeClasses } = useColorTheme();
  const [activeTab, setActiveTab] = useState<'math' | 'english'>('math');
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const primaryClasses = getThemeClasses('primary');
  const secondaryClasses = getThemeClasses('secondary');

  const currentGames = activeTab === 'math' ? mathGames : englishGames;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '⭐';
      case 'medium': return '⭐⭐';
      case 'hard': return '⭐⭐⭐';
      default: return '⭐';
    }
  };

  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId);
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
  };

  const handleBackToHome = () => {
    setSelectedGame(null);
    onBack();
  };

  // If a game is selected, show the game container
  if (selectedGame) {
    return (
      <GameContainer 
        gameId={selectedGame} 
        onBack={handleBackToGames}
        onHome={handleBackToHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 p-4 relative overflow-hidden">
      {/* EduTara Logo */}
      <div className="absolute top-4 left-4 z-40">
        <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg border border-white/20">
          <img 
            src="/WhatsApp_Image_2025-07-05_at_13.27.46_f950cd72-removebg-preview.png" 
            alt="EduTara Logo" 
            className="w-10 h-10 object-contain"
          />
          <span className="font-bold text-gray-800 text-lg">EduTara</span>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 animate-bounce">
        <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center shadow-lg">
          <Star className="w-5 h-5 text-yellow-600" />
        </div>
      </div>
      <div className="absolute top-20 right-20 animate-pulse">
        <div className="w-6 h-6 bg-pink-300 rounded-full flex items-center justify-center shadow-lg">
          <Heart className="w-4 h-4 text-pink-600" />
        </div>
      </div>
      <div className="absolute bottom-20 left-20 animate-bounce delay-300">
        <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center shadow-lg">
          <Sparkles className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-20">
          {/* Back Button - positioned below logo */}
          <div className="flex justify-start mb-6">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
          </div>
          
          <div className="relative mx-auto w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center shadow-xl mb-6 animate-bounce">
            <span className="text-3xl">🎮</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            EduTara Learning Games! 🌟
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Play, Learn, and Have Fun!
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Choose from exciting math and English games designed by EduTara to make learning enjoyable and effective!
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white p-2 rounded-2xl shadow-lg mb-8 max-w-md mx-auto">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('math')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex-1 justify-center ${
                activeTab === 'math'
                  ? `${primaryClasses.bg} text-white shadow-lg`
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">🎲</span>
              <span>Math Games</span>
            </button>
            <button
              onClick={() => setActiveTab('english')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex-1 justify-center ${
                activeTab === 'english'
                  ? `${secondaryClasses.bg} text-white shadow-lg`
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">📚</span>
              <span>English Games</span>
            </button>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentGames.map((game) => (
            <div
              key={game.id}
              onClick={() => handleGameSelect(game.id)}
              className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-gray-100 hover:border-yellow-300 cursor-pointer transform hover:scale-105 group relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-50 rounded-full -mr-10 -mt-10 opacity-50"></div>
              
              <div className="relative z-10">
                {/* Game icon and difficulty */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${game.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform`}>
                    <span className="text-2xl">{game.icon}</span>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(game.difficulty)}`}>
                      {getDifficultyIcon(game.difficulty)} {game.difficulty}
                    </div>
                  </div>
                </div>

                {/* Game info */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                  {game.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {game.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {game.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Game stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{game.estimatedTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 mr-1" />
                    <span>Earn Points</span>
                  </div>
                </div>

                {/* Play button */}
                <div className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
                  <span>Play Game</span>
                  <Zap className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info section */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border-4 border-purple-200 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Why Learning Games Are Amazing!
            </h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-2">🧠</span>
                <span className="font-medium text-gray-700">Brain Training</span>
                <span className="text-gray-600">Strengthen thinking skills</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-2">🎉</span>
                <span className="font-medium text-gray-700">Fun Learning</span>
                <span className="text-gray-600">Enjoy while you learn</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-2">⚡</span>
                <span className="font-medium text-gray-700">Quick Progress</span>
                <span className="text-gray-600">See results faster</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-2">🏆</span>
                <span className="font-medium text-gray-700">Achievements</span>
                <span className="text-gray-600">Earn rewards & badges</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            🌟 All games are designed to match your grade level and learning pace!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamesSection;