import React, { useState } from 'react';
import { Student, Chapter } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import GradeSelection from './components/GradeSelection';
import ChapterSelection from './components/ChapterSelection';
import Assessment from './components/Assessment';
import Dashboard from './components/Dashboard';
import SubjectSelection from './components/SubjectSelection';
import GamesSection from './components/GamesSection';
import { useColorTheme } from './hooks/useColorTheme';

type AppState = 'welcome' | 'subject-selection' | 'grade-selection' | 'chapter-selection' | 'assessment' | 'dashboard' | 'games';

function App() {
  const { currentTheme } = useColorTheme();
  const [appState, setAppState] = useState<AppState>('welcome');
  const [selectedSubject, setSelectedSubject] = useState<'math' | 'english' | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [mathScore, setMathScore] = useState<number>(0);
  const [englishScore, setEnglishScore] = useState<number>(0);

  const handleStartAssessment = () => {
    setAppState('subject-selection');
  };

  const handleStartGames = () => {
    setAppState('games');
  };

  const handleBackToWelcome = () => {
    setAppState('welcome');
    setSelectedSubject(null);
    setSelectedGrade(null);
    setSelectedChapter(null);
    setStudent(null);
  };

  const handleBackToSubjectSelection = () => {
    setAppState('subject-selection');
    setSelectedGrade(null);
    setSelectedChapter(null);
  };

  const handleBackToChapterSelection = () => {
    setAppState('chapter-selection');
    setSelectedChapter(null);
  };
  const handleSubjectSelection = (subject: 'math' | 'english') => {
    setSelectedSubject(subject);
    setAppState('grade-selection');
  };

  const handleGradeSelection = (grade: number) => {
    setSelectedGrade(grade);
    setAppState('chapter-selection');
  };

  const handleChapterSelection = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setAppState('assessment');
  };

  const handleBackToGradeSelection = () => {
    setAppState('grade-selection');
  };

  const handleAssessmentComplete = (mathScore: number, englishScore: number) => {
    setMathScore(mathScore);
    setEnglishScore(englishScore);
    
    // Create student profile
    const newStudent: Student = {
      id: `student-${Date.now()}`,
      name: `Student`, // In real app, this would be collected
      grade: selectedGrade!,
      mathLevel: mathScore,
      englishLevel: englishScore,
      assessmentComplete: true,
      createdAt: new Date()
    };
    
    setStudent(newStudent);
    setAppState('dashboard');
  };

  return (
    <div className="App" data-theme={currentTheme.id}>
      {appState === 'welcome' && (
        <WelcomeScreen 
          onStartAssessment={handleStartAssessment}
          onStartGames={handleStartGames}
        />
      )}
      
      {appState === 'games' && (
        <GamesSection onBack={handleBackToWelcome} />
      )}
      
      {appState === 'subject-selection' && (
        <SubjectSelection 
          onSelectSubject={handleSubjectSelection} 
          onBack={handleBackToWelcome}
        />
      )}
      
      {appState === 'grade-selection' && (
        <GradeSelection 
          onSelectGrade={handleGradeSelection} 
          selectedSubject={selectedSubject!}
          onBack={handleBackToSubjectSelection}
        />
      )}
      
      {appState === 'chapter-selection' && selectedGrade && selectedSubject && (
        <ChapterSelection
          grade={selectedGrade}
          subject={selectedSubject}
          onSelectChapter={handleChapterSelection}
          onBack={handleBackToGradeSelection}
        />
      )}
      
      {appState === 'assessment' && selectedGrade && selectedSubject && (
        <Assessment
          grade={selectedGrade}
          subject={selectedSubject}
          onComplete={handleAssessmentComplete}
          onBack={handleBackToChapterSelection}
        />
      )}
      
      {appState === 'dashboard' && student && (
        <Dashboard
          student={student}
          mathScore={mathScore}
          englishScore={englishScore}
          onBack={handleBackToWelcome}
        />
      )}
    </div>
  );
}

export default App;