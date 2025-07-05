import React from 'react';
import { ArrowRight, Clock, Star, BookOpen, Calculator, Heart, Sparkles, Play, Brain } from 'lucide-react';
import { Chapter } from '../types';
import { mathChapters, englishChapters } from '../data/chapters';

interface ChapterSelectionProps {
  grade: number;
  subject: 'math' | 'english';
  onSelectChapter: (chapter: Chapter) => void;
  onBack: () => void;
}

const ChapterSelection: React.FC<ChapterSelectionProps> = ({ 
  grade, 
  subject, 
  onSelectChapter, 
  onBack 
}) => {
  const [selectedChapter, setSelectedChapter] = React.useState<Chapter | null>(null);
  const [showOptions, setShowOptions] = React.useState(false);

  const chapters = subject === 'math' ? mathChapters[grade] : englishChapters[grade];

  const subjectInfo = {
    math: {
      title: 'Math Magic',
      emoji: '🔢',
      color: 'blue',
      bgGradient: 'from-blue-100 via-purple-100 to-pink-100',
      icon: Calculator
    },
    english: {
      title: 'English Quest',
      emoji: '📚',
      color: 'green',
      bgGradient: 'from-green-100 via-blue-100 to-purple-100',
      icon: BookOpen
    }
  };

  const currentSubject = subjectInfo[subject];

  const getProgressPercentage = (chapter: Chapter) => {
    return (chapter.completedLessons / chapter.totalLessons) * 100;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-600';
      case 'medium': return 'bg-yellow-100 text-yellow-600';
      case 'hard': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleChapterClick = (chapter: Chapter) => {
    if (subject === 'english') {
      setSelectedChapter(chapter);
      setShowOptions(true);
    } else {
      onSelectChapter(chapter);
    }
  };

  const handleWatchLesson = () => {
    if (selectedChapter) {
      const youtubeUrl = getYouTubeUrl(selectedChapter.id, grade);
      if (youtubeUrl) {
        window.open(youtubeUrl, '_blank');
      }
    }
    setShowOptions(false);
    setSelectedChapter(null);
  };

  const handleTakeQuiz = () => {
    if (selectedChapter) {
      onSelectChapter(selectedChapter);
    }
    setShowOptions(false);
    setSelectedChapter(null);
  };

  const handleCloseOptions = () => {
    setShowOptions(false);
    setSelectedChapter(null);
  };

  const getYouTubeUrl = (chapterId: string, grade: number): string | null => {
    // YouTube URLs mapping based on the syllabus
    const youtubeLinks: Record<string, string> = {
      // Grade 1
      'eng-1-happy-child': 'https://youtu.be/H76ZkH7ZirY',
      'eng-1-three-pigs': 'https://youtu.be/13xjB72kz5g',
      'eng-1-after-bath': 'https://youtu.be/JI9kVhwhh68',
      'eng-1-bubble-straw-shoe': 'https://youtu.be/VM5vUMrKNyE',
      'eng-1-one-kitten': 'https://youtu.be/IhhLrtrdWvg',
      'eng-1-lalu-peelu': 'https://youtu.be/CzObHC1RTVM',
      'eng-1-little-bird': 'https://youtu.be/Yk6cfF4aGlI',
      'eng-1-mittu-mango': 'https://youtu.be/xUqJdvT6-kI',
      'eng-1-merry-go-round': 'https://youtu.be/TR3AWtInvzA',
      'eng-1-circle': 'https://youtu.be/5JYbk3v4UbA',
      'eng-1-apple': 'https://www.youtube.com/watch?v=cAsfjyn-ii0',
      'eng-1-our-tree': 'https://youtu.be/fIY0qNSUfeY',
      'eng-1-kite': 'https://youtu.be/szYsHeOmxqg',
      'eng-1-sundari': 'https://youtu.be/R1xdD3FbaBc',
      
      // Grade 2
      'eng-2-first-day': 'https://youtu.be/8bgo6WXsZzE',
      'eng-2-haldi-adventure': 'https://youtu.be/EbusoxCSjs4',
      'eng-2-i-am-lucky': 'https://youtu.be/L9DWLMkbjCg',
      'eng-2-i-want': 'https://youtu.be/y8Q0jjdFaWE',
      'eng-2-smile': 'https://youtu.be/nnIr35p3aBU',
      'eng-2-wind-sun': 'https://youtu.be/l0Z8A4u3CtI',
      'eng-2-rain': 'https://youtu.be/MaNJl1xAZcA',
      'eng-2-storm-garden': 'https://youtu.be/NeWcazryUBA',
      'eng-2-zoo-manners': 'https://youtu.be/iYnU755TNI4',
      'eng-2-funny-bunny': 'https://youtu.be/D_pGPDJprrA',
      'eng-2-mr-nobody': 'https://youtu.be/8S_m_WXxkhc',
      'eng-2-curlylocks': 'https://youtu.be/Ic3Mgtmdu9A',
      'eng-2-blackboard-draw': 'https://youtu.be/hnnLDd8Lhqk',
      'eng-2-make-shorter': 'https://youtu.be/Ghb3GnLwuAA',
      
      // Grade 3
      'eng-3-good-morning': 'https://youtu.be/L7UhkrC48Z4',
      'eng-3-magic-garden': 'https://youtu.be/XjJNgZcfDqM',
      'eng-3-bird-talk': 'https://youtu.be/HCxQ9Bi-Gc8',
      'eng-3-nina-sparrows': 'https://youtu.be/XCwrpPrmW0o',
      'eng-3-little-by-little': 'https://youtu.be/FXgsKnMz49U',
      'eng-3-enormous-turnip': 'https://youtu.be/obKlme0FPH0',
      'eng-3-sea-song': 'https://youtu.be/km1f9sfl2DY',
      'eng-3-little-fish': 'https://youtu.be/EjvVRYpUsxg',
      'eng-3-balloon-man': 'https://youtu.be/tZOoEmZRqe4',
      'eng-3-yellow-butterfly': 'https://youtu.be/iziiorvc3LM',
      
      // Grade 4
      'eng-4-wake-up': 'https://youtu.be/NWRni2o-K64',
      'eng-4-neha-alarm': 'https://youtu.be/eZrxwJ6RZUw',
      'eng-4-noses': 'https://youtu.be/DSI6Y1c1Hg8',
      'eng-4-little-fir-tree': 'https://youtu.be/FPBsgv7AtGY',
      'eng-4-run': 'https://youtu.be/jsecYsNiScU',
      'eng-4-nasruddin-aim': 'https://youtu.be/raxTUUl4Az8',
      'eng-4-why': 'https://www.youtube.com/watch?v=QH7sCu6iARo',
      'eng-4-alice-wonderland': 'https://youtu.be/wxG3Vpo4NQs',
      'eng-4-dont-be-afraid': 'https://youtu.be/Ak82NkZmchM',
      'eng-4-helen-keller': 'https://youtu.be/DwR2R6Dxn10',
      
      // Grade 5
      'eng-5-ice-cream-man': 'https://youtu.be/KnmVX-NK9GY',
      'eng-5-wonderful-waste': 'https://youtu.be/sUBmCL_ianQ',
      'eng-5-teamwork': 'https://youtu.be/XREPtgrf4tQ',
      'eng-5-flying-together': 'https://youtu.be/1PYHKBvXMRE',
      'eng-5-my-shadow': 'https://youtu.be/MW7ZJM3MYqg',
      'eng-5-robinson-crusoe': 'https://youtu.be/HKjI1WkvPEc',
      'eng-5-crying': 'https://youtu.be/Y5LAbgXs1yA',
      'eng-5-my-elder-brother': 'https://youtu.be/lkBfKJxb0YY',
      'eng-5-lazy-frog': 'https://youtu.be/7XkImqWa1L4',
      'eng-5-rip-van-winkle': 'https://youtu.be/ZZoAxyrPzFk'
    };
    
    return youtubeLinks[chapterId] || null;
  };

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

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-20">
          {/* Back Button - positioned below logo */}
          <div className="flex justify-start mb-6">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Grade Selection
            </button>
          </div>
          
          <div className={`relative mx-auto w-24 h-24 bg-gradient-to-br from-${currentSubject.color}-400 to-${currentSubject.color}-500 rounded-full flex items-center justify-center shadow-xl mb-6 animate-bounce`}>
            <span className="text-3xl">{currentSubject.emoji}</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Choose Your Chapter! 📖
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Grade {grade} • {currentSubject.title}
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Pick a chapter to start your learning adventure!
          </p>
        </div>

        {/* Chapters Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {chapters?.map((chapter, index) => (
            <div
              key={chapter.id}
              onClick={() => handleChapterClick(chapter)}
              className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-gray-100 hover:border-yellow-300 cursor-pointer transform hover:scale-105 group relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-50 rounded-full -mr-10 -mt-10 opacity-50"></div>
              
              <div className="relative z-10">
                {/* Chapter icon and difficulty */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${chapter.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform`}>
                    <span className="text-2xl">{chapter.icon}</span>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(chapter.difficulty)}`}>
                      {chapter.difficulty}
                    </span>
                  </div>
                </div>

                {/* Chapter info */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                  {chapter.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {chapter.description}
                </p>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-600">Progress</span>
                    <span className="text-xs font-bold text-gray-700">
                      {chapter.completedLessons}/{chapter.totalLessons} lessons
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-${currentSubject.color}-400 to-${currentSubject.color}-600 transition-all duration-300 rounded-full`}
                      style={{ width: `${getProgressPercentage(chapter)}%` }}
                    />
                  </div>
                </div>

                {/* Chapter stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{chapter.estimatedTime} min</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>{chapter.totalLessons} lessons</span>
                  </div>
                </div>

                {/* Start button */}
                <div className="flex items-center justify-center text-purple-600 group-hover:text-purple-700 font-bold">
                  <span className="mr-2">
                    {subject === 'english' ? 'Select Chapter' : chapter.completedLessons > 0 ? 'Continue Learning' : 'Start Chapter'}
                  </span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          )) || (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Chapters Coming Soon!
              </h3>
              <p className="text-gray-600">
                We're preparing amazing chapters for Grade {grade} {currentSubject.title}!
              </p>
            </div>
          )}
        </div>

        {/* Options Modal for English Chapters */}
        {showOptions && selectedChapter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
              {/* Close button */}
              <button
                onClick={handleCloseOptions}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
              
              {/* Chapter info */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 bg-gradient-to-br ${selectedChapter.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <span className="text-2xl">{selectedChapter.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedChapter.title}
                </h3>
                <p className="text-gray-600">
                  {selectedChapter.description}
                </p>
              </div>
              
              {/* Options */}
              <div className="space-y-4">
                <button
                  onClick={handleWatchLesson}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3"
                >
                  <Play className="w-6 h-6" />
                  <span>Watch Lesson on YouTube</span>
                </button>
                
                <button
                  onClick={handleTakeQuiz}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3"
                >
                  <Brain className="w-6 h-6" />
                  <span>Take Quiz</span>
                </button>
              </div>
              
              {/* Info */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  📚 Watch the lesson first, then test your knowledge with the quiz!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info section */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border-4 border-purple-200 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              How Chapter Learning Works
            </h3>
            <div className={`grid ${subject === 'english' ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4 text-sm`}>
              {subject === 'english' ? (
                <>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">📺</span>
                    <span className="font-medium text-gray-700">Watch & Learn</span>
                    <span className="text-gray-600">YouTube video lessons</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">🧠</span>
                    <span className="font-medium text-gray-700">Quiz & Practice</span>
                    <span className="text-gray-600">Test your understanding</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">📖</span>
                    <span className="font-medium text-gray-700">Read & Learn</span>
                    <span className="text-gray-600">Interactive lessons</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">🎮</span>
                    <span className="font-medium text-gray-700">Play & Practice</span>
                    <span className="text-gray-600">Fun activities</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">🏆</span>
                    <span className="font-medium text-gray-700">Complete & Celebrate</span>
                    <span className="text-gray-600">Earn rewards</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            🌟 {subject === 'english' 
              ? 'Each English chapter includes video lessons and interactive quizzes!' 
              : 'Each chapter is designed to make learning fun and easy!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChapterSelection;