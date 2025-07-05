import React from 'react';
import { Calculator, BookOpen, ArrowRight, ArrowLeft, Star, Sparkles, Heart } from 'lucide-react';
import { useColorTheme } from '../hooks/useColorTheme';

interface SubjectSelectionProps {
  onSelectSubject: (subject: 'math' | 'english') => void;
  onBack?: () => void;
}

const SubjectSelection: React.FC<SubjectSelectionProps> = ({ onSelectSubject, onBack }) => {
  const { getThemeClasses } = useColorTheme();
  const primaryClasses = getThemeClasses('primary');
  const secondaryClasses = getThemeClasses('secondary');
  const accentClasses = getThemeClasses('accent');

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-4 relative overflow-hidden">
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
      <div className="absolute top-16 left-16 animate-bounce">
        <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center shadow-lg">
          <Star className="w-6 h-6 text-yellow-600" />
        </div>
      </div>
      <div className="absolute top-32 right-20 animate-pulse">
        <div className="w-8 h-8 bg-pink-300 rounded-full flex items-center justify-center shadow-lg">
          <Heart className="w-5 h-5 text-pink-600" />
        </div>
      </div>
      <div className="absolute bottom-32 left-24 animate-bounce delay-500">
        <div className="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center shadow-lg">
          <Sparkles className="w-7 h-7 text-blue-600" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header with mascot */}
        <div className="text-center mb-12 pt-20">
          {/* Back Button - positioned below logo */}
          <div className="flex justify-start mb-6">
            <button
              onClick={onBack || (() => window.history.back())}
              className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
          </div>
          
          <div className="relative mx-auto w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center shadow-xl mb-6 animate-bounce">
            <span className="text-3xl">🦉</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Which adventure do you want to go on? 🚀
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pick your favorite subject and let's start learning together!
          </p>
        </div>

        {/* Subject cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Math Option */}
          <div
            onClick={() => onSelectSubject('math')}
            className={`bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-4 ${primaryClasses.borderLight} hover:${primaryClasses.border} cursor-pointer transform hover:scale-105 group relative overflow-hidden`}
          >
            {/* Background pattern */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${primaryClasses.bgLight} rounded-full -mr-16 -mt-16 opacity-50`}></div>
            <div className={`absolute bottom-0 left-0 w-24 h-24 ${primaryClasses.bgLight} rounded-full -ml-12 -mb-12 opacity-30`}></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className={`bg-gradient-to-br ${primaryClasses.gradient} w-20 h-20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg`}>
                  <Calculator className="w-10 h-10 text-white" />
                </div>
                <div className="text-right">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🔢</span>
                  </div>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Math Magic! ✨</h2>
              <p className="text-gray-600 mb-6 text-lg">
                Explore numbers, solve puzzles, and discover amazing patterns!
              </p>
              
              <div className="space-y-3 mb-6">
                <div className={`flex items-center ${primaryClasses.bgLight} p-3 rounded-xl`}>
                  <span className="text-lg mr-3">➕</span>
                  <span className="text-sm font-medium text-gray-700">Fun with numbers and counting</span>
                </div>
                <div className={`flex items-center ${primaryClasses.bgLight} p-3 rounded-xl`}>
                  <span className="text-lg mr-3">🔺</span>
                  <span className="text-sm font-medium text-gray-700">Cool shapes and patterns</span>
                </div>
                <div className={`flex items-center ${primaryClasses.bgLight} p-3 rounded-xl`}>
                  <span className="text-lg mr-3">🧩</span>
                  <span className="text-sm font-medium text-gray-700">Exciting math puzzles</span>
                </div>
              </div>

              <div className={`flex items-center justify-center ${primaryClasses.text} group-hover:${primaryClasses.textDark} font-bold text-lg`}>
                <span className="mr-2">Start Math Adventure</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* English Option */}
          <div
            onClick={() => onSelectSubject('english')}
            className={`bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-4 ${secondaryClasses.borderLight} hover:${secondaryClasses.border} cursor-pointer transform hover:scale-105 group relative overflow-hidden`}
          >
            {/* Background pattern */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${secondaryClasses.bgLight} rounded-full -mr-16 -mt-16 opacity-50`}></div>
            <div className={`absolute bottom-0 left-0 w-24 h-24 ${secondaryClasses.bgLight} rounded-full -ml-12 -mb-12 opacity-30`}></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className={`bg-gradient-to-br ${secondaryClasses.gradient} w-20 h-20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg`}>
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <div className="text-right">
                  <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">📚</span>
                  </div>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">English Quest! 🌟</h2>
              <p className="text-gray-600 mb-6 text-lg">
                Discover amazing words, create stories, and become a reading hero!
              </p>
              
              <div className="space-y-3 mb-6">
                <div className={`flex items-center ${secondaryClasses.bgLight} p-3 rounded-xl`}>
                  <span className="text-lg mr-3">🔤</span>
                  <span className="text-sm font-medium text-gray-700">Letters and word building</span>
                </div>
                <div className={`flex items-center ${secondaryClasses.bgLight} p-3 rounded-xl`}>
                  <span className="text-lg mr-3">📖</span>
                  <span className="text-sm font-medium text-gray-700">Exciting stories and reading</span>
                </div>
                <div className={`flex items-center ${secondaryClasses.bgLight} p-3 rounded-xl`}>
                  <span className="text-lg mr-3">✍️</span>
                  <span className="text-sm font-medium text-gray-700">Creative writing adventures</span>
                </div>
              </div>

              <div className={`flex items-center justify-center ${secondaryClasses.text} group-hover:${secondaryClasses.textDark} font-bold text-lg`}>
                <span className="mr-2">Start English Quest</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom encouragement */}
        <div className={`bg-white p-6 rounded-3xl shadow-lg border-4 ${accentClasses.borderLight} max-w-2xl mx-auto`}>
          <div className="text-center">
            <div className={`w-16 h-16 bg-gradient-to-br ${accentClasses.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Ready for an amazing learning journey?
            </h3>
            <p className="text-gray-600">
              I'll create a special learning path just for you with fun games, cool challenges, and awesome rewards! 🏆
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            🌈 Pick your adventure and let's make learning super fun!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubjectSelection;