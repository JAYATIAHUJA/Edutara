export interface Student {
  id: string;
  name: string;
  grade: number;
  mathLevel: number;
  englishLevel: number;
  assessmentComplete: boolean;
  createdAt: Date;
}

export interface Assessment {
  id: string;
  subject: 'math' | 'english';
  grade: number;
  questions: Question[];
  currentQuestionIndex: number;
  responses: Response[];
  completed: boolean;
  score: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  explanation: string;
}

export interface Response {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeTaken: number;
}

export interface LearningPlan {
  id: string;
  studentId: string;
  subject: 'math' | 'english';
  week: number;
  activities: Activity[];
  challenges: Challenge[];
  progress: number;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: 'game' | 'exercise' | 'story' | 'practice';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  completed: boolean;
  topic: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  subject: 'math' | 'english';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed: boolean;
  dueDate: Date;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  subject: 'math' | 'english';
  grade: number;
  totalLessons: number;
  completedLessons: number;
  estimatedTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  color: string;
}

export interface Progress {
  studentId: string;
  subject: 'math' | 'english';
  currentLevel: number;
  skillsLearned: string[];
  weakAreas: string[];
  strengths: string[];
  totalTimeSpent: number;
  activitiesCompleted: number;
  streakDays: number;
}