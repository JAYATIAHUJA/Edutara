import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, CheckCircle, XCircle, Brain, BookOpen, Calculator, Star, Heart } from 'lucide-react';
import { Assessment as AssessmentType, Question, Response } from '../types';
import { mathQuestions, englishQuestions } from '../data/assessmentData';
import TextToSpeech from './TextToSpeech';

interface AssessmentProps {
  grade: number;
  subject: 'math' | 'english';
  onComplete: (mathScore: number, englishScore: number) => void;
  onBack?: () => void;
}

const Assessment: React.FC<AssessmentProps> = ({ grade, subject, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const currentQuestions = subject === 'math' ? mathQuestions[grade] : englishQuestions[grade];
  const currentQuestion = currentQuestions[currentQuestionIndex];

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

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft, showResult]);

  const handleTimeUp = () => {
    if (selectedAnswer !== null) {
      handleAnswerSubmit();
    } else {
      const newResponse: Response = {
        questionId: currentQuestion.id,
        selectedAnswer: -1,
        isCorrect: false,
        timeTaken: 30
      };
      setResponses([...responses, newResponse]);
      moveToNextQuestion();
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newResponse: Response = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeTaken: 30 - timeLeft
    };

    setResponses([...responses, newResponse]);
    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
      moveToNextQuestion();
    }, 2000);
  };

  const moveToNextQuestion = () => {
    setSelectedAnswer(null);
    setTimeLeft(30);

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeAssessment();
    }
  };

  const completeAssessment = () => {
    const score = (responses.filter(r => r.isCorrect).length / currentQuestions.length) * 100;

    // Show detailed results before completing
    setShowDetailedResults(true);
  };

  const handleViewResults = () => {
    const score = (responses.filter(r => r.isCorrect).length / currentQuestions.length) * 100;
    
    if (subject === 'math') {
      onComplete(score, 0);
    } else {
      onComplete(0, score);
    }
  };

  // Add state for detailed results
  const [showDetailedResults, setShowDetailedResults] = useState(false);

  // Show detailed results screen
  if (showDetailedResults) {
    const correctAnswers = responses.filter(r => r.isCorrect).length;
    const totalQuestions = currentQuestions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    return (
      <div className={`min-h-screen bg-gradient-to-br ${currentSubject.bgGradient} p-4`}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-gray-100 mb-6 text-center">
            <div className={`w-20 h-20 bg-gradient-to-br from-${currentSubject.color}-400 to-${currentSubject.color}-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              <span className="text-3xl">{currentSubject.emoji}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              EduTara Assessment Complete! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Your Score: <span className={`font-bold ${score >= 80 ? 'text-green-600' : score >= 60 ? 'text-blue-600' : 'text-orange-600'}`}>
                {score}% ({correctAnswers}/{totalQuestions})
              </span>
            </p>
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden mb-4">
              <div
                className={`h-full bg-gradient-to-r ${score >= 80 ? 'from-green-400 to-green-600' : score >= 60 ? 'from-blue-400 to-blue-600' : 'from-orange-400 to-orange-600'} transition-all duration-300`}
                style={{ width: `${score}%` }}
              />
            </div>
            <p className="text-gray-600">
              {score >= 80 ? 'Excellent work! You\'re doing amazing! 🌟' :
               score >= 60 ? 'Good job! Let\'s review and improve together! 💪' :
               'Great effort! Let\'s learn from these questions! 📚'}
            </p>
          </div>

          {/* Question Review */}
          <div className="space-y-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Let's Review Your Answers 📝
            </h2>
            
            {currentQuestions.map((question, index) => {
              const response = responses[index];
              const isCorrect = response?.isCorrect;
              
              return (
                <div key={question.id} className="bg-white p-6 rounded-2xl shadow-lg border-4 border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {isCorrect ? '✓' : '✗'}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Question {index + 1}: {question.text}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border-2 ${
                              optionIndex === question.correctAnswer
                                ? 'border-green-500 bg-green-50 text-green-800'
                                : optionIndex === response?.selectedAnswer && !isCorrect
                                ? 'border-red-500 bg-red-50 text-red-800'
                                : 'border-gray-200 bg-gray-50 text-gray-700'
                            }`}
                          >
                            <div className="flex items-center">
                              <span className="font-medium mr-3">
                                {String.fromCharCode(65 + optionIndex)}.
                              </span>
                              <span>{option}</span>
                              {optionIndex === question.correctAnswer && (
                                <span className="ml-auto text-green-600 font-bold">✓ Correct</span>
                              )}
                              {optionIndex === response?.selectedAnswer && !isCorrect && (
                                <span className="ml-auto text-red-600 font-bold">Your Answer</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {!isCorrect && (
                        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                          <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                            <span className="text-lg mr-2">💡</span>
                            Let's Learn Together!
                          </h4>
                          <p className="text-blue-700 mb-2">
                            <strong>Correct Answer:</strong> {question.options[question.correctAnswer]}
                          </p>
                          <p className="text-blue-700">
                            <strong>Why:</strong> {question.explanation}
                          </p>
                        </div>
                      )}
                      
                      {isCorrect && (
                        <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                          <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                            <span className="text-lg mr-2">🌟</span>
                            Great Job!
                          </h4>
                          <p className="text-green-700">
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <button
              onClick={handleViewResults}
              className={`bg-gradient-to-r from-${currentSubject.color}-500 to-${currentSubject.color}-600 hover:from-${currentSubject.color}-600 hover:to-${currentSubject.color}-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200`}
            >
              Continue to Dashboard 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    return (
      <div className={`min-h-screen bg-gradient-to-br ${currentSubject.bgGradient} flex items-center justify-center p-4 relative overflow-hidden`}>
        {/* Floating celebration elements */}
        {isCorrect && (
          <>
            <div className="absolute top-20 left-20 animate-bounce">
              <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="absolute top-32 right-24 animate-pulse">
              <div className="w-6 h-6 bg-pink-300 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-pink-600" />
              </div>
            </div>
          </>
        )}

        <div className="max-w-2xl w-full">
          <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-gray-100 text-center">
            <div className={`p-6 rounded-full w-fit mx-auto mb-6 ${isCorrect ? 'bg-green-100' : 'bg-orange-100'}`}>
              {isCorrect ? (
                <div className="relative">
                  <CheckCircle className="w-16 h-16 text-green-600" />
                  <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🎉</div>
                </div>
              ) : (
                <div className="relative">
                  <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-3xl">😊</span>
                  </div>
                </div>
              )}
            </div>
            <h2 className={`text-3xl font-bold mb-4 ${isCorrect ? 'text-green-800' : 'text-orange-800'}`}>
              {isCorrect ? 'Amazing! You got it! 🌟' : 'Good try! Let\'s learn together! 💪'}
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              {currentQuestion.explanation}
            </p>
            <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200">
              <p className="text-sm text-gray-700 font-medium">
                <strong>The right answer is:</strong> {currentQuestion.options[currentQuestion.correctAnswer]}
              </p>
            </div>
            {isCorrect && (
              <div className="mt-4 text-2xl animate-bounce">
                🏆 Keep going, superstar!
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

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
        <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center">
          <Star className="w-5 h-5 text-yellow-600" />
        </div>
      </div>
      <div className="absolute top-20 right-20 animate-pulse">
        <div className="w-6 h-6 bg-pink-300 rounded-full flex items-center justify-center">
          <Heart className="w-4 h-4 text-pink-600" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-gray-100 mb-6 mt-20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className={`bg-gradient-to-br from-${currentSubject.color}-400 to-${currentSubject.color}-500 p-4 rounded-2xl shadow-lg`}>
                <span className="text-2xl">{currentSubject.emoji}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {currentSubject.title} Time! 🚀
                </h1>
                <p className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {currentQuestions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-gray-500" />
              <div className={`text-2xl font-bold px-4 py-2 rounded-2xl ${timeLeft <= 10 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                {timeLeft}s
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r from-${currentSubject.color}-400 to-${currentSubject.color}-600 transition-all duration-300 rounded-full`}
                style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Back Button - positioned below logo */}
        <button
          onClick={onBack || (() => window.history.back())}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {onBack ? 'Back to Chapters' : 'Back'}
        </button>

        {/* Question card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-gray-100">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <Brain className="w-8 h-8 text-purple-600 mr-3" />
              <span className="text-lg font-bold text-purple-600 uppercase tracking-wide bg-purple-100 px-4 py-2 rounded-full">
                {currentQuestion.topic}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 leading-relaxed">
              {currentQuestion.text}
            </h2>
            
            {/* Text-to-Speech Component */}
            <div className="mb-6 flex justify-center">
              <TextToSpeech 
                text={currentQuestion.text} 
                className="transform hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Answer options */}
          <div className="grid gap-4 mb-8 relative">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`p-6 rounded-2xl text-left transition-all duration-200 border-4 transform hover:scale-102 relative ${
                  selectedAnswer === index
                    ? `border-${currentSubject.color}-500 bg-${currentSubject.color}-50 shadow-lg scale-102`
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md'
                }`}
              >
                <div className="flex items-center relative">
                  <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center mr-4 font-bold text-lg ${
                    selectedAnswer === index
                      ? `border-${currentSubject.color}-500 bg-${currentSubject.color}-500 text-white`
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-xl font-medium text-gray-800">
                    {option}
                  </span>
                  {/* Text-to-Speech for options */}
                  <div className="ml-auto">
                    <TextToSpeech 
                      text={option} 
                      className="opacity-70 hover:opacity-100 transition-opacity scale-75 relative z-10"
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Submit button */}
          <div className="flex justify-end">
            <button
              onClick={handleAnswerSubmit}
              disabled={selectedAnswer === null}
              className={`flex items-center px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 transform ${
                selectedAnswer !== null
                  ? `bg-gradient-to-r from-${currentSubject.color}-500 to-${currentSubject.color}-600 hover:from-${currentSubject.color}-600 hover:to-${currentSubject.color}-700 text-white shadow-xl hover:shadow-2xl hover:scale-105`
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>Submit Answer</span>
              <ChevronRight className="w-6 h-6 ml-2" />
            </button>
          </div>
        </div>

        {/* Encouragement */}
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-600 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-gray-100 inline-block">
            🌟 You're doing great! Take your time and think carefully! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default Assessment;