import React, { useState } from 'react';
import { 
  BookOpen, Calculator, Star, Clock, Trophy, Target, 
  Calendar, TrendingUp, Award, Brain, CheckCircle, 
  Play, Users, Globe, Wifi, WifiOff
} from 'lucide-react';
import { Student, Progress } from '../types';
import { mathActivities, englishActivities, dailyChallenges, weeklyChallenges } from '../data/learningContent';

interface DashboardProps {
  student: Student;
  mathScore: number;
  englishScore: number;
  onBack?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ student, mathScore, englishScore, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'challenges' | 'progress'>('overview');
  const [selectedSubject, setSelectedSubject] = useState<'math' | 'english'>(
    mathScore > 0 ? 'math' : 'english'
  );

  const getRecommendations = () => {
    const recommendations = [];
    
    if (mathScore < 60) {
      recommendations.push({
        subject: 'math',
        topic: 'Basic Operations',
        priority: 'high',
        activities: mathActivities[student.grade]?.slice(0, 2) || []
      });
    }
    
    if (englishScore < 60) {
      recommendations.push({
        subject: 'english',
        topic: 'Grammar & Vocabulary',
        priority: 'high',
        activities: englishActivities[student.grade]?.slice(0, 2) || []
      });
    }
    
    return recommendations;
  };

  const recommendations = getRecommendations();
  const currentActivities = selectedSubject === 'math' ? mathActivities[student.grade] : englishActivities[student.grade];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
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

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 mt-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Welcome back to EduTara, {student.name}! 👋
                </h1>
                <p className="text-gray-600">Grade {student.grade} • Ready for today's learning?</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 bg-green-100 px-3 py-1 rounded-full">
                <WifiOff className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">Offline Ready</span>
              </div>
              <div className="flex items-center space-x-1 bg-blue-100 px-3 py-1 rounded-full">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">English Focus</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back Button - positioned below logo */}
        <button
          onClick={onBack || (() => window.location.reload())}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {onBack ? 'Back to Home' : 'Start Over'}
        </button>

        {/* Tab Navigation */}
        <div className="bg-white p-2 rounded-2xl shadow-lg mb-6">
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: Target },
              { id: 'activities', label: 'Activities', icon: Play },
              { id: 'challenges', label: 'Challenges', icon: Trophy },
              { id: 'progress', label: 'Progress', icon: TrendingUp }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Score Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {mathScore > 0 && (
                <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Calculator className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Math Assessment</h3>
                      <p className="text-sm text-gray-600">Mathematics Evaluation</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{mathScore}%</div>
                    <div className="text-sm text-gray-500">Score</div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">
                    {mathScore >= 80 ? 'Excellent! You have strong math skills.' :
                     mathScore >= 60 ? 'Good work! Let\'s strengthen some areas.' :
                     'Let\'s work together to improve your math skills!'}
                  </p>
                </div>
              </div>
              )}

              {englishScore > 0 && (
                <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-3 rounded-full">
                      <BookOpen className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">English Assessment</h3>
                      <p className="text-sm text-gray-600">English Language Evaluation</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{englishScore}%</div>
                    <div className="text-sm text-gray-500">Score</div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700">
                    {englishScore >= 80 ? 'Wonderful! Your English skills are impressive.' :
                     englishScore >= 60 ? 'Nice progress! Let\'s enhance your English further.' :
                     'Let\'s make English fun and easy for you!'}
                  </p>
                </div>
              </div>
              )}
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-yellow-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Brain className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Recommended for You</h3>
                    <p className="text-sm text-gray-600">Personalized Learning Suggestions</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800 capitalize">
                          {rec.subject} - {rec.topic}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rec.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {rec.priority} priority
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Let's work on these activities to strengthen your understanding!
                      </p>
                      <div className="flex space-x-2">
                        {rec.activities.slice(0, 2).map((activity, idx) => (
                          <div key={idx} className="bg-white p-2 rounded-lg border border-gray-200 flex-1">
                            <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                            <p className="text-xs text-gray-600">{activity.estimatedTime} min</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Daily Challenges Preview */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Today's Challenges</h3>
                    <p className="text-sm text-gray-600">Daily Learning Challenges</p>
                  </div>
                </div>
                <button className="text-purple-600 hover:text-purple-700 font-medium">
                  View All
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {dailyChallenges.slice(0, 2).map((challenge, index) => (
                  <div key={index} className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{challenge.title}</h4>
                      <div className="flex items-center space-x-1">
                        <Trophy className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-600">{challenge.points} pts</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                    <button className="w-full bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors">
                      Start Challenge
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="space-y-6">
            {/* Subject Selector */}
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedSubject('math')}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 flex-1 justify-center ${
                    selectedSubject === 'math'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Calculator className="w-5 h-5" />
                  <span>Mathematics</span>
                </button>
                <button
                  onClick={() => setSelectedSubject('english')}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 flex-1 justify-center ${
                    selectedSubject === 'english'
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>English</span>
                </button>
              </div>
            </div>

            {/* Activities Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentActivities?.map((activity, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-blue-300 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'game' ? 'bg-purple-100' :
                      activity.type === 'exercise' ? 'bg-blue-100' :
                      activity.type === 'story' ? 'bg-green-100' :
                      'bg-orange-100'
                    }`}>
                      <div className={`w-6 h-6 ${
                        activity.type === 'game' ? 'text-purple-600' :
                        activity.type === 'exercise' ? 'text-blue-600' :
                        activity.type === 'story' ? 'text-green-600' :
                        'text-orange-600'
                      }`}>
                        {activity.type === 'game' ? '🎮' :
                         activity.type === 'exercise' ? '📝' :
                         activity.type === 'story' ? '📚' :
                         '💪'}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{activity.estimatedTime} min</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{activity.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                      activity.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {activity.difficulty}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {activity.topic}
                    </span>
                  </div>
                  <button className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    activity.completed
                      ? 'bg-green-500 text-white'
                      : selectedSubject === 'math'
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}>
                    {activity.completed ? 'Completed ✓' : 'Start Activity'}
                  </button>
                </div>
              )) || (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No activities available for this grade yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Daily Challenges */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Daily Challenges</h3>
                  <p className="text-sm text-gray-600">Daily Learning Tasks</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {dailyChallenges.map((challenge, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{challenge.title}</h4>
                      <div className="flex items-center space-x-1">
                        <Trophy className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">{challenge.points} pts</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        challenge.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                        challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {challenge.difficulty}
                      </span>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                        Start
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Challenges */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Weekly Challenges</h3>
                  <p className="text-sm text-gray-600">Weekly Learning Goals</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {weeklyChallenges.map((challenge, index) => (
                  <div key={index} className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{challenge.title}</h4>
                      <div className="flex items-center space-x-1">
                        <Trophy className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-600">{challenge.points} pts</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        challenge.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                        challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {challenge.difficulty}
                      </span>
                      <button className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors">
                        Start
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            {/* Progress Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Learning Progress</h3>
                    <p className="text-sm text-gray-600">Academic Progress Tracking</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Math</span>
                      <span className="text-sm font-bold text-blue-600">{mathScore}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
                        style={{ width: `${mathScore}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">English</span>
                      <span className="text-sm font-bold text-green-600">{englishScore}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
                        style={{ width: `${englishScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-orange-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Learning Stats</h3>
                    <p className="text-sm text-gray-600">Performance Statistics</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Activities Completed</span>
                    <span className="font-bold text-orange-600">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Streak Days</span>
                    <span className="font-bold text-orange-600">5 🔥</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Time</span>
                    <span className="font-bold text-orange-600">3h 45m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Points Earned</span>
                    <span className="font-bold text-orange-600">245 ⭐</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Breakdown */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Skills Mastered</h3>
                  <p className="text-sm text-gray-600">Completed Learning Objectives</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Math Skills</h4>
                  <div className="space-y-2">
                    {['Addition', 'Subtraction', 'Basic Fractions', 'Shapes'].map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">English Skills</h4>
                  <div className="space-y-2">
                    {['Alphabet', 'Basic Grammar', 'Vocabulary', 'Reading'].map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;