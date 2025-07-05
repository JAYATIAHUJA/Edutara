import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Map, Trash as Treasure, Key } from 'lucide-react';

interface DivisionQuestProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface QuestLevel {
  dividend: number;
  divisor: number;
  story: string;
  treasure: string;
}

const DivisionQuest: React.FC<DivisionQuestProps> = ({ onComplete, onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [questLevel, setQuestLevel] = useState<QuestLevel | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [treasuresFound, setTreasuresFound] = useState<string[]>([]);
  const [totalLevels] = useState(8);

  const questLevels: QuestLevel[] = [
    {
      dividend: 12,
      divisor: 3,
      story: "You found 12 golden coins in a chest. You need to share them equally among 3 brave adventurers.",
      treasure: "🪙 Golden Coins"
    },
    {
      dividend: 20,
      divisor: 4,
      story: "A dragon guards 20 magical gems. You must divide them equally into 4 treasure bags.",
      treasure: "💎 Magical Gems"
    },
    {
      dividend: 15,
      divisor: 5,
      story: "You discovered 15 ancient scrolls in a temple. Share them equally among 5 wise scholars.",
      treasure: "📜 Ancient Scrolls"
    },
    {
      dividend: 24,
      divisor: 6,
      story: "A pirate's treasure contains 24 silver pieces. Divide them equally among 6 crew members.",
      treasure: "🪙 Silver Pieces"
    },
    {
      dividend: 28,
      divisor: 7,
      story: "You found 28 magical potions in a wizard's tower. Share them equally among 7 apprentices.",
      treasure: "🧪 Magic Potions"
    },
    {
      dividend: 32,
      divisor: 8,
      story: "A treasure map leads to 32 precious pearls. Divide them equally into 8 small pouches.",
      treasure: "🦪 Precious Pearls"
    },
    {
      dividend: 36,
      divisor: 9,
      story: "An ancient vault holds 36 crystal shards. Share them equally among 9 crystal guardians.",
      treasure: "💎 Crystal Shards"
    },
    {
      dividend: 45,
      divisor: 5,
      story: "The final treasure: 45 legendary artifacts! Divide them equally among 5 heroes to complete your quest.",
      treasure: "🏆 Legendary Artifacts"
    }
  ];

  const generateQuest = () => {
    const levelIndex = (currentLevel - 1) % questLevels.length;
    setQuestLevel(questLevels[levelIndex]);
    setUserAnswer('');
    setShowFeedback(false);
  };

  useEffect(() => {
    generateQuest();
  }, [currentLevel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questLevel) return;
    
    const correctAnswer = questLevel.dividend / questLevel.divisor;
    const userNum = parseInt(userAnswer);
    
    if (userNum === correctAnswer) {
      setScore(score + 15);
      setTreasuresFound([...treasuresFound, questLevel.treasure]);
      setFeedback(`Excellent! ${questLevel.dividend} ÷ ${questLevel.divisor} = ${correctAnswer}. You found the ${questLevel.treasure}! 🎉`);
    } else {
      setFeedback(`Not quite! ${questLevel.dividend} ÷ ${questLevel.divisor} = ${correctAnswer}. The treasure remains hidden. Try again! 💪`);
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      if (currentLevel >= totalLevels) {
        onComplete(Math.round((score + (userNum === correctAnswer ? 15 : 0)) / (totalLevels * 15) * 100));
      } else {
        setCurrentLevel(currentLevel + 1);
      }
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  if (!questLevel) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 p-4">
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
              <span className="font-bold text-gray-800">Quest: {currentLevel}/{totalLevels}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
              <Treasure className="w-5 h-5 text-yellow-600" />
              <span className="font-bold text-gray-800">{treasuresFound.length}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-gray-800">{score}</span>
            </div>
          </div>
        </div>

        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🗺️ Division Quest</h1>
          <p className="text-xl text-gray-600">Solve division problems to unlock treasures!</p>
        </div>

        {/* Quest Story */}
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-6 border-4 border-amber-200">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🏰</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quest Level {currentLevel}</h2>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-2xl mb-6">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              {questLevel.story}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="text-center">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Solve the division:</h3>
              <div className="text-5xl font-bold text-orange-600 mb-6">
                {questLevel.dividend} ÷ {questLevel.divisor} = ?
              </div>
              <p className="text-lg text-gray-600 mb-4">
                How many does each person get?
              </p>
            </div>

            <div className="flex justify-center items-center space-x-4 mb-6">
              <input
                type="number"
                value={userAnswer}
                onChange={handleInputChange}
                className="w-32 h-16 text-3xl font-bold text-center border-4 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none"
                placeholder="?"
                autoFocus
                disabled={showFeedback}
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                disabled={!userAnswer || showFeedback}
              >
                <Key className="w-5 h-5" />
                <span>Unlock Treasure!</span>
              </button>
            </div>
          </form>
        </div>

        {/* Treasures Found */}
        {treasuresFound.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🏆 Treasures Found:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {treasuresFound.map((treasure, index) => (
                <div
                  key={index}
                  className="bg-yellow-100 border-2 border-yellow-400 px-4 py-2 rounded-full text-sm font-medium text-yellow-800"
                >
                  {treasure}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-orange-200 text-center">
            <div className="text-4xl mb-4">
              {feedback.includes('Excellent') ? '🎉' : '💪'}
            </div>
            <p className="text-lg text-gray-700">{feedback}</p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Quest Progress</span>
              <span className="text-sm font-bold text-gray-700">{currentLevel}/{totalLevels}</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
                style={{ width: `${(currentLevel / totalLevels) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivisionQuest;