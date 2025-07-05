import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Clock } from 'lucide-react';

interface TimeTellerChallengeProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface TimeChallenge {
  hour: number;
  minute: number;
  type: 'analog-to-digital' | 'digital-to-analog' | 'time-word';
  question: string;
  options: string[];
  correct: number;
}

const TimeTellerChallenge: React.FC<TimeTellerChallengeProps> = ({ onComplete, onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [challenge, setChallenge] = useState<TimeChallenge | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [totalQuestions] = useState(10);

  const generateChallenge = (): TimeChallenge => {
    const hour = Math.floor(Math.random() * 12) + 1;
    const minutes = [0, 15, 30, 45]; // Quarter hours for simplicity
    const minute = minutes[Math.floor(Math.random() * minutes.length)];
    
    const types: ('analog-to-digital' | 'digital-to-analog' | 'time-word')[] = 
      ['analog-to-digital', 'digital-to-analog', 'time-word'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const formatTime = (h: number, m: number) => {
      return `${h}:${m.toString().padStart(2, '0')}`;
    };
    
    const getTimeInWords = (h: number, m: number) => {
      if (m === 0) return `${h} o'clock`;
      if (m === 15) return `quarter past ${h}`;
      if (m === 30) return `half past ${h}`;
      if (m === 45) return `quarter to ${h + 1}`;
      return formatTime(h, m);
    };
    
    switch (type) {
      case 'analog-to-digital':
        const wrongTimes = [
          formatTime(hour + 1, minute),
          formatTime(hour, (minute + 15) % 60),
          formatTime(hour - 1 || 12, minute)
        ];
        const correctTime = formatTime(hour, minute);
        const digitalOptions = [correctTime, ...wrongTimes].sort(() => Math.random() - 0.5);
        
        return {
          hour,
          minute,
          type: 'analog-to-digital',
          question: 'What time does the clock show?',
          options: digitalOptions,
          correct: digitalOptions.indexOf(correctTime)
        };
        
      case 'digital-to-analog':
        return {
          hour,
          minute,
          type: 'digital-to-analog',
          question: `Set the clock to show ${formatTime(hour, minute)}`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correct: 0 // Will be handled differently for analog clocks
        };
        
      case 'time-word':
        const correctWords = getTimeInWords(hour, minute);
        const wrongWords = [
          getTimeInWords(hour + 1, minute),
          getTimeInWords(hour, (minute + 15) % 60),
          getTimeInWords(hour - 1 || 12, minute)
        ];
        const wordOptions = [correctWords, ...wrongWords].sort(() => Math.random() - 0.5);
        
        return {
          hour,
          minute,
          type: 'time-word',
          question: 'How do you say this time in words?',
          options: wordOptions,
          correct: wordOptions.indexOf(correctWords)
        };
        
      default:
        return generateChallenge();
    }
  };

  const newChallenge = () => {
    setChallenge(generateChallenge());
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  useEffect(() => {
    newChallenge();
  }, [currentLevel]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback || !challenge) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === challenge.correct;
    
    if (isCorrect) {
      setScore(score + 10);
      setFeedback(`Excellent! You read the time correctly! 🕐`);
    } else {
      setFeedback(`Not quite! The correct answer is "${challenge.options[challenge.correct]}". Keep practicing! ⏰`);
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      if (currentLevel >= totalQuestions) {
        onComplete(Math.round((score + (isCorrect ? 10 : 0)) / totalQuestions));
      } else {
        setCurrentLevel(currentLevel + 1);
      }
    }, 2500);
  };

  const renderAnalogClock = (hour: number, minute: number, size: string = 'w-48 h-48') => {
    const hourAngle = ((hour % 12) * 30) + (minute * 0.5) - 90;
    const minuteAngle = (minute * 6) - 90;
    
    return (
      <div className={`${size} relative bg-white rounded-full border-8 border-gray-800 shadow-xl mx-auto`}>
        {/* Clock face numbers */}
        {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, index) => {
          const angle = (index * 30) - 90;
          const x = Math.cos(angle * Math.PI / 180) * 70;
          const y = Math.sin(angle * Math.PI / 180) * 70;
          
          return (
            <div
              key={num}
              className="absolute w-8 h-8 flex items-center justify-center font-bold text-lg"
              style={{
                left: `calc(50% + ${x}px - 16px)`,
                top: `calc(50% + ${y}px - 16px)`
              }}
            >
              {num}
            </div>
          );
        })}
        
        {/* Hour marks */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = i * 30;
          return (
            <div
              key={i}
              className="absolute w-1 h-6 bg-gray-600"
              style={{
                left: '50%',
                top: '8px',
                transformOrigin: '50% 88px',
                transform: `translateX(-50%) rotate(${angle}deg)`
              }}
            />
          );
        })}
        
        {/* Hour hand */}
        <div
          className="absolute w-1 bg-gray-800 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            height: '50px',
            transformOrigin: '50% 100%',
            transform: `translateX(-50%) translateY(-100%) rotate(${hourAngle}deg)`
          }}
        />
        
        {/* Minute hand */}
        <div
          className="absolute w-0.5 bg-gray-600 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            height: '70px',
            transformOrigin: '50% 100%',
            transform: `translateX(-50%) translateY(-100%) rotate(${minuteAngle}deg)`
          }}
        />
        
        {/* Center dot */}
        <div className="absolute w-4 h-4 bg-gray-800 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    );
  };

  if (!challenge) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-4">
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
              <span className="font-bold text-gray-800">Level: {currentLevel}/{totalQuestions}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-gray-800">{score}</span>
            </div>
          </div>
        </div>

        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">⏰ Time Teller Challenge</h1>
          <p className="text-xl text-gray-600">Learn to read and tell time!</p>
        </div>

        {/* Challenge */}
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{challenge.question}</h2>
            
            {/* Show analog clock for relevant challenge types */}
            {(challenge.type === 'analog-to-digital' || challenge.type === 'time-word') && (
              <div className="mb-8">
                {renderAnalogClock(challenge.hour, challenge.minute)}
              </div>
            )}
            
            {/* Show digital time for digital-to-analog challenges */}
            {challenge.type === 'digital-to-analog' && (
              <div className="mb-8">
                <div className="bg-gray-800 text-green-400 text-6xl font-mono p-6 rounded-2xl inline-block shadow-lg">
                  {challenge.hour}:{challenge.minute.toString().padStart(2, '0')}
                </div>
              </div>
            )}
          </div>

          {/* Answer Options */}
          {challenge.type !== 'digital-to-analog' ? (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {challenge.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`p-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                    selectedAnswer === index
                      ? index === challenge.correct
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800 hover:scale-105'
                  } shadow-lg`}
                  disabled={showFeedback}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            /* Multiple analog clocks for digital-to-analog challenges */
            <div className="grid grid-cols-2 gap-6 mb-6">
              {[
                { h: challenge.hour, m: challenge.minute },
                { h: (challenge.hour + 1) % 12 || 12, m: challenge.minute },
                { h: challenge.hour, m: (challenge.minute + 15) % 60 },
                { h: (challenge.hour - 1) || 12, m: challenge.minute }
              ].map((time, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`p-4 rounded-xl transition-all duration-200 ${
                    selectedAnswer === index
                      ? index === 0
                        ? 'bg-green-100 border-4 border-green-500'
                        : 'bg-red-100 border-4 border-red-500'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-300 hover:scale-105'
                  } shadow-lg`}
                  disabled={showFeedback}
                >
                  {renderAnalogClock(time.h, time.m, 'w-32 h-32')}
                  <div className="mt-2 text-sm font-medium text-gray-600">
                    Option {String.fromCharCode(65 + index)}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Time Learning Tip */}
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <p className="text-sm text-blue-700 text-center">
              💡 <strong>Tip:</strong> The short hand shows hours, the long hand shows minutes!
            </p>
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-blue-200 text-center">
            <div className="text-4xl mb-4">
              {feedback.includes('Excellent') ? '🕐' : '⏰'}
            </div>
            <p className="text-lg text-gray-700">{feedback}</p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Progress</span>
              <span className="text-sm font-bold text-gray-700">{currentLevel}/{totalQuestions}</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-300"
                style={{ width: `${(currentLevel / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTellerChallenge;