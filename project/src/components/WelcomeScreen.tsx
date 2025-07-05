import React from 'react';
import { Calculator, BookOpen, Star, Sparkles, Heart } from 'lucide-react';
import ColorThemeSelector, { ColorTheme } from './ColorThemeSelector';
import DyslexiaFontSelector, { FontOption } from './DyslexiaFontSelector';
import { useColorTheme } from '../hooks/useColorTheme';
import { useDyslexiaFont } from '../hooks/useDyslexiaFont';

interface WelcomeScreenProps {
  onStartAssessment: () => void;
  onStartGames: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartAssessment, onStartGames }) => {
  const { currentTheme, updateTheme, getThemeClasses } = useColorTheme();
  const { updateFont } = useDyslexiaFont();

  const handleThemeChange = (theme: ColorTheme) => {
    updateTheme(theme);
  };

  const handleFontChange = (font: FontOption) => {
    updateFont(font);
  };

  // Get theme-aware classes
  const primaryClasses = getThemeClasses('primary');
  const accentClasses = getThemeClasses('accent');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 p-4 relative overflow-hidden">
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

      {/* Color Theme Selector */}
      <ColorThemeSelector onThemeChange={handleThemeChange} />
      
      {/* Dyslexia Font Selector */}
      <DyslexiaFontSelector onFontChange={handleFontChange} />
      
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 animate-bounce">
        <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center">
          <Star className="w-5 h-5 text-yellow-600" />
        </div>
      </div>
      <div className="absolute top-20 right-20 animate-pulse">
        <div className="w-6 h-6 bg-pink-300 rounded-full flex items-center justify-center">
          <Heart className="w-4 h-4 text-pink-600" />
        </div>
      </div>
      <div className="absolute bottom-20 left-20 animate-bounce delay-300">
        <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* Main character/mascot */}
          <div className="mb-8">
            <div className="relative mx-auto w-32 h-32 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <div className="text-4xl">🦉</div>
              </div>
              {/* Eyes */}
              <div className="absolute top-6 left-8 w-3 h-3 bg-black rounded-full animate-pulse"></div>
              <div className="absolute top-6 right-8 w-3 h-3 bg-black rounded-full animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-orange-500">EduTara</span>! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your AI Learning Buddy for Math & English! Let's make learning super fun! ✨
          </p>

          {/* Start button */}
          <div className="mb-8">
            <button
              onClick={onStartAssessment}
              className={`bg-gradient-to-r ${accentClasses.gradient} text-white px-12 py-6 rounded-3xl font-bold text-2xl ${accentClasses.gradientHover} transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl`}
            >
              Start Learning Adventure! 🚀
            </button>
          </div>

          {/* Games button */}
          <div className="mb-10">
            <button
              onClick={onStartGames}
              className={`bg-gradient-to-r ${primaryClasses.gradient} text-white px-12 py-6 rounded-3xl font-bold text-2xl ${primaryClasses.gradientHover} transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl`}
            >
              Play Learning Games! 🎮
            </button>
          </div>
          {/* Info section */}
          <div className={`bg-white p-6 rounded-3xl shadow-lg border-4 ${accentClasses.borderLight} max-w-2xl mx-auto`}>
            <div className="flex items-center justify-center mb-4">
              <div className={`w-12 h-12 ${accentClasses.bg} rounded-full flex items-center justify-center`}>
                <span className="text-2xl">🌟</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">What makes learning with me special?</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🎮</span>
                <span className="text-gray-600">Fun games</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">🏆</span>
                <span className="text-gray-600">Cool rewards</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">🎨</span>
                <span className="text-gray-600">Colorful activities</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-500">
              🎯 Click the button above to begin your learning journey!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;