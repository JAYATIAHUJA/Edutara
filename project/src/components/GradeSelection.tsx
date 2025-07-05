import React from 'react';
import { ArrowRight, BookOpen, Star, Heart, Sparkles } from 'lucide-react';

interface GradeSelectionProps {
  onSelectGrade: (grade: number) => void;
  selectedSubject: 'math' | 'english';
  onBack: () => void;
}

const GradeSelection: React.FC<GradeSelectionProps> = ({ onSelectGrade, selectedSubject, onBack }) => {
  const grades = [
    { 
      number: 1, 
      description: selectedSubject === 'math' ? 'Learning shapes and counting!' : 'Learning letters and simple words!', 
      icon: '🌟', 
      color: 'from-pink-400 to-pink-500' 
    },
    { 
      number: 2, 
      description: selectedSubject === 'math' ? 'Adding numbers and shapes!' : 'Reading stories and rhyming words!', 
      icon: '🚀', 
      color: 'from-blue-400 to-blue-500' 
    },
    { 
      number: 3, 
      description: selectedSubject === 'math' ? 'Multiplication and fractions!' : 'Grammar and creative writing!', 
      icon: '🎯', 
      color: 'from-green-400 to-green-500' 
    },
    { 
      number: 4, 
      description: selectedSubject === 'math' ? 'Decimals and geometry!' : 'Vocabulary and comprehension!', 
      icon: '🏆', 
      color: 'from-purple-400 to-purple-500' 
    },
    { 
      number: 5, 
      description: selectedSubject === 'math' ? 'Advanced numbers and patterns!' : 'Essays and literature!', 
      icon: '👑', 
      color: 'from-orange-400 to-orange-500' 
    }
  ];

  const subjectInfo = {
    math: {
      title: 'Math Magic',
      emoji: '🔢',
      color: 'blue',
      bgGradient: 'from-blue-100 via-purple-100 to-pink-100'
    },
    english: {
      title: 'English Quest',
      emoji: '📚',
      color: 'green',
      bgGradient: 'from-green-100 via-blue-100 to-purple-100'
    }
  };

  const currentSubject = subjectInfo[selectedSubject];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentSubject.bgGradient} p-4 relative overflow-hidden`}>
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

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-20">
          {/* Back Button - positioned below logo */}
          <div className="flex justify-start mb-6">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Subject Selection
            </button>
          </div>
          
          <div className={`relative mx-auto w-24 h-24 bg-gradient-to-br from-${currentSubject.color}-400 to-${currentSubject.color}-500 rounded-full flex items-center justify-center shadow-xl mb-6 animate-bounce`}>
            <span className="text-3xl">{currentSubject.emoji}</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Which grade are you in? 🎓
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {currentSubject.title} Adventure • Grade Selection
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Choose your grade so I can prepare the perfect {selectedSubject} activities for you!
          </p>
        </div>

        {/* Grade cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {grades.map((grade) => (
            <div
              key={grade.number}
              onClick={() => onSelectGrade(grade.number)}
              className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-gray-100 hover:border-yellow-300 cursor-pointer transform hover:scale-105 group relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-50 rounded-full -mr-10 -mt-10 opacity-50"></div>
              
              <div className="relative z-10 text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${grade.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:rotate-12 transition-transform`}>
                  <span className="text-2xl">{grade.icon}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Grade {grade.number}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {grade.description}
                </p>
                
                {/* Fun level indicator */}
                <div className="flex justify-center mb-4">
                  {[...Array(grade.number)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full mx-1 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                  ))}
                </div>
                
                <div className="flex items-center justify-center text-purple-600 group-hover:text-purple-700 font-bold">
                  <span className="mr-2">Let's Go!</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-lg border-4 border-yellow-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Fun Learning</h3>
              <p className="text-sm text-gray-600">
                Games and activities made just for your grade level!
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg border-4 border-green-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{selectedSubject === 'math' ? '⭐' : '📖'}</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Perfect for You</h3>
              <p className="text-sm text-gray-600">
                {selectedSubject === 'math' 
                  ? 'Math concepts designed for Indian students!' 
                  : 'English stories from Indian curriculum!'}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg border-4 border-blue-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{selectedSubject === 'math' ? '🏆' : '✍️'}</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Awesome Rewards</h3>
              <p className="text-sm text-gray-600">
                {selectedSubject === 'math' 
                  ? 'Solve problems and earn math badges!' 
                  : 'Read stories and earn reading rewards!'}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            🌟 Each grade has special {selectedSubject === 'math' ? 'math problems' : 'stories and poems'} designed just for you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GradeSelection;