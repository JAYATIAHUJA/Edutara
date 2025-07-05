import { Question } from '../types';

export const mathQuestions: Record<number, Question[]> = {
  1: [
    {
      id: 'math-1-1',
      text: 'Which shape has 3 sides?',
      options: ['Circle', 'Square', 'Triangle', 'Rectangle'],
      correctAnswer: 2,
      difficulty: 'easy',
      topic: 'Shapes and Space',
      explanation: 'A triangle has 3 sides. It is one of the basic 2D shapes we learn about!'
    },
    {
      id: 'math-1-2',
      text: 'Count the mangoes: 🥭🥭🥭🥭🥭. How many mangoes are there?',
      options: ['4', '5', '6', '7'],
      correctAnswer: 1,
      difficulty: 'easy',
      topic: 'Numbers from 1 to 9',
      explanation: 'There are 5 mangoes. Counting helps us know how many objects we have!'
    },
    {
      id: 'math-1-3',
      text: 'If you have 3 apples and get 2 more apples, how many apples do you have in total?',
      options: ['4', '5', '6', '1'],
      correctAnswer: 1,
      difficulty: 'easy',
      topic: 'Addition',
      explanation: '3 + 2 = 5. When we combine groups of objects, we add them together!'
    },
    {
      id: 'math-1-4',
      text: 'Which number comes after 7?',
      options: ['6', '8', '9', '5'],
      correctAnswer: 1,
      difficulty: 'easy',
      topic: 'Numbers from 1 to 9',
      explanation: 'The number that comes after 7 is 8. Numbers follow a sequence!'
    }
  ],
  2: [
    {
      id: 'math-2-1',
      text: 'How many faces does a cube have?',
      options: ['4', '5', '6', '8'],
      correctAnswer: 2,
      difficulty: 'easy',
      topic: 'Shapes and Faces',
      explanation: 'A cube has 6 faces. Each face is a square!'
    },
    {
      id: 'math-2-2',
      text: 'What is 25 + 17?',
      options: ['40', '41', '42', '43'],
      correctAnswer: 2,
      difficulty: 'medium',
      topic: 'Addition and Subtraction',
      explanation: '25 + 17 = 42. We can add the tens first (20 + 10 = 30) then the ones (5 + 7 = 12), so 30 + 12 = 42!'
    },
    {
      id: 'math-2-3',
      text: 'If 2 × 4 = 8, what is 2 × 5?',
      options: ['8', '9', '10', '12'],
      correctAnswer: 2,
      difficulty: 'medium',
      topic: 'Multiplication',
      explanation: '2 × 5 = 10. This means 2 groups of 5, or 5 + 5 = 10!'
    },
    {
      id: 'math-2-4',
      text: 'What time is shown when the hour hand points to 3 and minute hand points to 12?',
      options: ['2 o\'clock', '3 o\'clock', '4 o\'clock', '12 o\'clock'],
      correctAnswer: 1,
      difficulty: 'easy',
      topic: 'Time',
      explanation: 'When the hour hand points to 3 and minute hand points to 12, it shows 3 o\'clock!'
    }
  ],
  3: [
    {
      id: 'math-3-1',
      text: 'What is 456 + 278?',
      options: ['724', '734', '744', '754'],
      correctAnswer: 1,
      difficulty: 'medium',
      topic: 'Addition and Subtraction',
      explanation: '456 + 278 = 734. Add ones: 6+8=14 (write 4, carry 1), tens: 5+7+1=13 (write 3, carry 1), hundreds: 4+2+1=7!'
    },
    {
      id: 'math-3-2',
      text: 'Which fraction is bigger: 1/2 or 1/4?',
      options: ['1/4', '1/2', 'Both are equal', 'Cannot tell'],
      correctAnswer: 1,
      difficulty: 'medium',
      topic: 'Fractions',
      explanation: '1/2 is bigger than 1/4. Think of a pizza: half a pizza is more than one-fourth of a pizza!'
    },
    {
      id: 'math-3-3',
      text: 'What is 7 × 8?',
      options: ['54', '55', '56', '57'],
      correctAnswer: 2,
      difficulty: 'medium',
      topic: 'Multiplication',
      explanation: '7 × 8 = 56. This is from the multiplication table of 7 and 8!'
    },
    {
      id: 'math-3-4',
      text: 'If 24 sweets are shared equally among 6 children, how many sweets does each child get?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      difficulty: 'medium',
      topic: 'Division',
      explanation: '24 ÷ 6 = 4. Each child gets 4 sweets when 24 sweets are shared equally among 6 children!'
    }
  ],
  4: [
    {
      id: 'math-4-1',
      text: 'What is the place value of 7 in the number 47,356?',
      options: ['7', '70', '700', '7000'],
      correctAnswer: 3,
      difficulty: 'medium',
      topic: 'Large Numbers',
      explanation: 'In 47,356, the digit 7 is in the thousands place, so its place value is 7000!'
    },
    {
      id: 'math-4-2',
      text: 'What is 144 ÷ 12?',
      options: ['11', '12', '13', '14'],
      correctAnswer: 1,
      difficulty: 'medium',
      topic: 'Division',
      explanation: '144 ÷ 12 = 12. We can think: 12 × 12 = 144!'
    },
    {
      id: 'math-4-3',
      text: 'Which angle is exactly 90 degrees?',
      options: ['Acute angle', 'Right angle', 'Obtuse angle', 'Straight angle'],
      correctAnswer: 1,
      difficulty: 'easy',
      topic: 'Geometry',
      explanation: 'A right angle is exactly 90 degrees. It looks like the corner of a square!'
    },
    {
      id: 'math-4-4',
      text: 'What is 0.5 + 0.3?',
      options: ['0.7', '0.8', '0.9', '1.0'],
      correctAnswer: 1,
      difficulty: 'medium',
      topic: 'Decimals',
      explanation: '0.5 + 0.3 = 0.8. We add the decimal parts: 5 + 3 = 8 tenths!'
    }
  ],
  5: [
    {
      id: 'math-5-1',
      text: 'What is the LCM of 4 and 6?',
      options: ['10', '12', '14', '24'],
      correctAnswer: 1,
      difficulty: 'hard',
      topic: 'Factors and Multiples',
      explanation: 'LCM of 4 and 6 is 12. Multiples of 4: 4,8,12,16... Multiples of 6: 6,12,18... The smallest common multiple is 12!'
    },
    {
      id: 'math-5-2',
      text: 'If a rectangle has length 8 cm and width 5 cm, what is its area?',
      options: ['13 cm²', '26 cm²', '40 cm²', '45 cm²'],
      correctAnswer: 2,
      difficulty: 'medium',
      topic: 'Measurement',
      explanation: 'Area of rectangle = length × width = 8 × 5 = 40 cm²!'
    },
    {
      id: 'math-5-3',
      text: 'What is 3/4 + 1/4?',
      options: ['4/8', '4/4', '1', '2'],
      correctAnswer: 2,
      difficulty: 'medium',
      topic: 'Fractions',
      explanation: '3/4 + 1/4 = 4/4 = 1. When denominators are same, we add the numerators!'
    },
    {
      id: 'math-5-4',
      text: 'What is 25% of 80?',
      options: ['15', '20', '25', '30'],
      correctAnswer: 1,
      difficulty: 'hard',
      topic: 'Percentages',
      explanation: '25% of 80 = (25/100) × 80 = 20. 25% means 25 out of 100!'
    }
  ]
};

export const englishQuestions: Record<number, Question[]> = {
  1: [
    {
      id: 'eng-1-1',
      text: 'In the story "Three Little Pigs", what did the first pig use to build his house?',
      options: ['Bricks', 'Sticks', 'Straw', 'Stone'],
      correctAnswer: 2,
      difficulty: 'easy',
      topic: 'Three Little Pigs',
      explanation: 'The first pig built his house with straw, which was not very strong!'
    },
    {
      id: 'eng-1-2',
      text: 'In the poem "One Little Kitten", what is the kitten doing?',
      options: ['Sleeping', 'Playing', 'Eating', 'Running'],
      correctAnswer: 1,
      difficulty: 'easy',
      topic: 'One Little Kitten',
      explanation: 'The little kitten is playing in the poem!'
    },
    {
      id: 'eng-1-3',
      text: 'Which letter comes after "M" in the alphabet?',
      options: ['L', 'N', 'O', 'P'],
      correctAnswer: 1,
      difficulty: 'easy',
      topic: 'Alphabet',
      explanation: 'The letter that comes after M is N. The alphabet goes: L, M, N, O, P...'
    },
    {
      id: 'eng-1-4',
      text: 'In "A Kite", where does the kite fly?',
      options: ['In the water', 'In the sky', 'On the ground', 'In the house'],
      correctAnswer: 1,
      difficulty: 'easy',
      topic: 'A Kite',
      explanation: 'The kite flies high in the sky!'
    }
  ],
  2: [
    {
      id: 'eng-2-1',
      text: 'In "The Wind and the Sun", who was stronger?',
      options: ['The Wind', 'The Sun', 'Both were equal', 'Neither'],
      correctAnswer: 1,
      difficulty: 'easy',
      topic: 'The Wind and the Sun',
      explanation: 'The Sun was stronger because it could make the man remove his coat with warmth, not force!'
    },
    {
      id: 'eng-2-2',
      text: 'What is the opposite of "big"?',
      options: ['Large', 'Small', 'Huge', 'Tall'],
      correctAnswer: 1,
      difficulty: 'easy',
      topic: 'Opposites',
      explanation: 'The opposite of big is small. They are opposite in meaning!'
    },
    {
      id: 'eng-2-3',
      text: 'In "Curlylocks and the Three Bears", what did Curlylocks find in the forest?',
      options: ['A castle', 'A house', 'A tree', 'A river'],
      correctAnswer: 1,
      difficulty: 'easy',
      topic: 'Curlylocks and the Three Bears',
      explanation: 'Curlylocks found a house in the forest where the three bears lived!'
    },
    {
      id: 'eng-2-4',
      text: 'Which word rhymes with "cat"?',
      options: ['Dog', 'Hat', 'Sun', 'Ball'],
      correctAnswer: 1,
      difficulty: 'medium',
      topic: 'Rhyming Words',
      explanation: 'Hat rhymes with cat - they both end with the "at" sound!'
    }
  ],
  3: [
    {
      id: 'eng-3-1',
      text: 'In "The Enormous Turnip", who pulled the turnip first?',
      options: ['The farmer', 'The wife', 'The child', 'The mouse'],
      correctAnswer: 0,
      difficulty: 'medium',
      topic: 'The Enormous Turnip',
      explanation: 'The farmer tried to pull the turnip first, but it was too big for him alone!'
    },
    {
      id: 'eng-3-2',
      text: 'What is the plural of "child"?',
      options: ['Childs', 'Children', 'Childes', 'Child'],
      correctAnswer: 1,
      difficulty: 'medium',
      topic: 'Grammar',
      explanation: 'The plural of child is children. This is an irregular plural form!'
    },
    {
      id: 'eng-3-3',
      text: 'In "Nina and the Baby Sparrows", why was Nina worried?',
      options: ['She lost her toy', 'Baby sparrows fell from nest', 'She was late for school', 'It was raining'],
      correctAnswer: 1,
      difficulty: 'medium',
      topic: 'Nina and the Baby Sparrows',
      explanation: 'Nina was worried because the baby sparrows had fallen from their nest!'
    },
    {
      id: 'eng-3-4',
      text: 'Which sentence is correct?',
      options: ['I are going to school', 'I am going to school', 'I is going to school', 'I be going to school'],
      correctAnswer: 1,
      difficulty: 'medium',
      topic: 'Grammar',
      explanation: 'The correct sentence is "I am going to school". We use "am" with "I"!'
    }
  ],
  4: [
    {
      id: 'eng-4-1',
      text: 'In "Neha\'s Alarm Clock", what woke Neha up?',
      options: ['Her mother', 'The alarm clock', 'The birds', 'The sun'],
      correctAnswer: 2,
      difficulty: 'medium',
      topic: 'Neha\'s Alarm Clock',
      explanation: 'The birds woke Neha up with their chirping, not her alarm clock!'
    },
    {
      id: 'eng-4-2',
      text: 'What is a synonym for "happy"?',
      options: ['Sad', 'Joyful', 'Angry', 'Tired'],
      correctAnswer: 1,
      difficulty: 'medium',
      topic: 'Synonyms',
      explanation: 'Joyful is a synonym for happy - they both mean feeling good and cheerful!'
    },
    {
      id: 'eng-4-3',
      text: 'In "Alice in Wonderland", how did Alice feel when she saw strange things?',
      options: ['Bored', 'Curious', 'Sleepy', 'Hungry'],
      correctAnswer: 1,
      difficulty: 'medium',
      topic: 'Alice in Wonderland',
      explanation: 'Alice felt curious about all the strange and wonderful things she saw!'
    },
    {
      id: 'eng-4-4',
      text: 'Which word is an adjective in "The red car is fast"?',
      options: ['Car', 'Red', 'Is', 'Fast'],
      correctAnswer: 1,
      difficulty: 'hard',
      topic: 'Parts of Speech',
      explanation: 'Red is an adjective because it describes the car. Adjectives describe nouns!'
    }
  ],
  5: [
    {
      id: 'eng-5-1',
      text: 'In "Robinson Crusoe Discovers a Footprint", how did Robinson feel after seeing the footprint?',
      options: ['Happy', 'Excited', 'Scared', 'Sleepy'],
      correctAnswer: 2,
      difficulty: 'medium',
      topic: 'Robinson Crusoe',
      explanation: 'Robinson felt scared because he thought someone else was on the island with him!'
    },
    {
      id: 'eng-5-2',
      text: 'What is the past tense of "write"?',
      options: ['Writed', 'Written', 'Wrote', 'Writes'],
      correctAnswer: 2,
      difficulty: 'hard',
      topic: 'Verb Tenses',
      explanation: 'The past tense of write is wrote. Yesterday I wrote a letter!'
    },
    {
      id: 'eng-5-3',
      text: 'In "Flying Together", how did the geese escape from trouble?',
      options: ['By hiding', 'By working together', 'By flying faster', 'By fighting'],
      correctAnswer: 1,
      difficulty: 'medium',
      topic: 'Flying Together',
      explanation: 'The geese escaped by working together as a team. Teamwork makes us stronger!'
    },
    {
      id: 'eng-5-4',
      text: 'Which sentence uses correct punctuation?',
      options: ['What is your name', 'What is your name.', 'What is your name?', 'What is your name!'],
      correctAnswer: 2,
      difficulty: 'medium',
      topic: 'Punctuation',
      explanation: 'Questions should end with a question mark (?). "What is your name?" is correct!'
    }
  ]
};