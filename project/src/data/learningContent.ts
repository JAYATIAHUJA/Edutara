import { Activity, Challenge } from '../types';

export const mathActivities: Record<number, Activity[]> = {
  1: [
    {
      id: 'math-act-1-1',
      title: 'Number Line Adventure',
      description: 'Help the rabbit jump on the correct numbers!',
      type: 'game',
      difficulty: 'easy',
      estimatedTime: 15,
      completed: false,
      topic: 'Numbers 1-10'
    },
    {
      id: 'math-act-1-2',
      title: 'Shape Detective',
      description: 'Find all the triangles, circles, and squares around you!',
      type: 'exercise',
      difficulty: 'easy',
      estimatedTime: 20,
      completed: false,
      topic: 'Basic Shapes'
    },
    {
      id: 'math-act-1-3',
      title: 'Counting Mangoes',
      description: 'Count the mangoes in the basket and write the number',
      type: 'practice',
      difficulty: 'easy',
      estimatedTime: 10,
      completed: false,
      topic: 'Counting'
    }
  ],
  2: [
    {
      id: 'math-act-2-1',
      title: 'Addition Garden',
      description: 'Plant flowers by solving addition problems!',
      type: 'game',
      difficulty: 'easy',
      estimatedTime: 20,
      completed: false,
      topic: 'Addition'
    },
    {
      id: 'math-act-2-2',
      title: 'Subtraction Market',
      description: 'Help the shopkeeper with subtraction while buying vegetables',
      type: 'exercise',
      difficulty: 'medium',
      estimatedTime: 25,
      completed: false,
      topic: 'Subtraction'
    }
  ],
  3: [
    {
      id: 'math-act-3-1',
      title: 'Fraction Pizza Party',
      description: 'Share pizzas equally among friends using fractions!',
      type: 'game',
      difficulty: 'medium',
      estimatedTime: 30,
      completed: false,
      topic: 'Fractions'
    },
    {
      id: 'math-act-3-2',
      title: 'Multiplication Tables Race',
      description: 'Race against time to complete multiplication tables',
      type: 'practice',
      difficulty: 'medium',
      estimatedTime: 20,
      completed: false,
      topic: 'Multiplication'
    }
  ],
  4: [
    {
      id: 'math-act-4-1',
      title: 'Decimal Detective',
      description: 'Solve mysteries using decimal numbers!',
      type: 'game',
      difficulty: 'medium',
      estimatedTime: 25,
      completed: false,
      topic: 'Decimals'
    },
    {
      id: 'math-act-4-2',
      title: 'Percentage Calculator',
      description: 'Calculate discounts at the village fair',
      type: 'exercise',
      difficulty: 'hard',
      estimatedTime: 30,
      completed: false,
      topic: 'Percentages'
    }
  ],
  5: [
    {
      id: 'math-act-5-1',
      title: 'LCM & HCF Explorer',
      description: 'Discover patterns in numbers with LCM and HCF',
      type: 'exercise',
      difficulty: 'hard',
      estimatedTime: 35,
      completed: false,
      topic: 'LCM & HCF'
    },
    {
      id: 'math-act-5-2',
      title: 'Geometry Builder',
      description: 'Build houses using geometric shapes and measurements',
      type: 'game',
      difficulty: 'hard',
      estimatedTime: 40,
      completed: false,
      topic: 'Geometry'
    }
  ]
};

export const englishActivities: Record<number, Activity[]> = {
  1: [
    {
      id: 'eng-act-1-1',
      title: 'Alphabet Song',
      description: 'Sing along and learn the alphabet with actions!',
      type: 'game',
      difficulty: 'easy',
      estimatedTime: 15,
      completed: false,
      topic: 'Alphabet'
    },
    {
      id: 'eng-act-1-2',
      title: 'Word Building Blocks',
      description: 'Build simple words using letter blocks',
      type: 'exercise',
      difficulty: 'easy',
      estimatedTime: 20,
      completed: false,
      topic: 'Word Formation'
    }
  ],
  2: [
    {
      id: 'eng-act-2-1',
      title: 'Rhyme Time',
      description: 'Find words that rhyme and create your own poems!',
      type: 'game',
      difficulty: 'easy',
      estimatedTime: 25,
      completed: false,
      topic: 'Rhyming'
    },
    {
      id: 'eng-act-2-2',
      title: 'Story Sequencing',
      description: 'Put the story pictures in the right order',
      type: 'exercise',
      difficulty: 'medium',
      estimatedTime: 20,
      completed: false,
      topic: 'Reading Comprehension'
    }
  ],
  3: [
    {
      id: 'eng-act-3-1',
      title: 'Grammar Detective',
      description: 'Find and fix grammar mistakes in sentences',
      type: 'exercise',
      difficulty: 'medium',
      estimatedTime: 30,
      completed: false,
      topic: 'Grammar'
    },
    {
      id: 'eng-act-3-2',
      title: 'Creative Writing Workshop',
      description: 'Write your own story about village life',
      type: 'exercise',
      difficulty: 'medium',
      estimatedTime: 35,
      completed: false,
      topic: 'Creative Writing'
    }
  ],
  4: [
    {
      id: 'eng-act-4-1',
      title: 'Vocabulary Builder',
      description: 'Learn new words and their meanings through games',
      type: 'game',
      difficulty: 'medium',
      estimatedTime: 25,
      completed: false,
      topic: 'Vocabulary'
    },
    {
      id: 'eng-act-4-2',
      title: 'Reading Adventures',
      description: 'Read exciting stories and answer questions',
      type: 'story',
      difficulty: 'medium',
      estimatedTime: 30,
      completed: false,
      topic: 'Reading Comprehension'
    }
  ],
  5: [
    {
      id: 'eng-act-5-1',
      title: 'Essay Writing Master',
      description: 'Write essays on topics close to your heart',
      type: 'exercise',
      difficulty: 'hard',
      estimatedTime: 45,
      completed: false,
      topic: 'Essay Writing'
    },
    {
      id: 'eng-act-5-2',
      title: 'Literature Explorer',
      description: 'Explore famous poems and stories from India',
      type: 'story',
      difficulty: 'hard',
      estimatedTime: 40,
      completed: false,
      topic: 'Literature'
    }
  ]
};

export const dailyChallenges: Challenge[] = [
  {
    id: 'daily-math-1',
    title: 'Quick Math Challenge',
    description: 'Solve 5 addition problems in 3 minutes',
    type: 'daily',
    subject: 'math',
    difficulty: 'easy',
    points: 10,
    completed: false,
    dueDate: new Date()
  },
  {
    id: 'daily-eng-1',
    title: 'Word of the Day',
    description: 'Learn a new word and use it in a sentence',
    type: 'daily',
    subject: 'english',
    difficulty: 'easy',
    points: 10,
    completed: false,
    dueDate: new Date()
  },
  {
    id: 'daily-math-2',
    title: 'Fraction Fun',
    description: 'Compare 3 different fractions',
    type: 'daily',
    subject: 'math',
    difficulty: 'medium',
    points: 15,
    completed: false,
    dueDate: new Date()
  }
];

export const weeklyChallenges: Challenge[] = [
  {
    id: 'weekly-math-1',
    title: 'Math Story Problem',
    description: 'Create and solve a story problem using multiplication',
    type: 'weekly',
    subject: 'math',
    difficulty: 'medium',
    points: 50,
    completed: false,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'weekly-eng-1',
    title: 'Creative Story Writing',
    description: 'Write a 200-word story about your favorite festival',
    type: 'weekly',
    subject: 'english',
    difficulty: 'medium',
    points: 50,
    completed: false,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }
];