import { QuizQuestion } from '../types';

export const COMPATIBILITY_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'How do you prefer to handle disagreements or heavy emotional moments?',
    subtitle: 'Emotional honesty and communication style form the bedrock of lasting partnership.',
    category: 'communication',
    options: [
      {
        id: 'q1-a',
        text: 'Gentle, immediate open-hearted dialogue',
        description: 'Talk it through calmly right away with vulnerability and validation.',
        tag: 'Emotional Honesty',
      },
      {
        id: 'q1-b',
        text: 'Brief quiet reflection first, then thoughtful connection',
        description: 'Take 20-30 minutes to organize thoughts before reconvening with warmth.',
        tag: 'Mindfulness',
      },
      {
        id: 'q1-c',
        text: 'Physical comfort first, talking once soothed',
        description: 'A long hug, tea, or holding hands before digging into the words.',
        tag: 'Kindness & Empathy',
      },
    ],
  },
  {
    id: 'q2',
    question: 'What does your dream restorative weekend with your partner look like?',
    subtitle: 'Rhythm and downtime compatibility keeps daily life harmonious.',
    category: 'lifestyle',
    options: [
      {
        id: 'q2-a',
        text: 'Morning trail hike, local farmers market, slow home-cooked dinner',
        description: 'Active in nature early, grounding culinary exploration late.',
        tag: 'Outdoor Adventure',
      },
      {
        id: 'q2-b',
        text: 'Lush plants, reading side-by-side, cozy acoustic music & zero rush',
        description: 'Unapologetic home sanctuary recharge and deep uninterrupted rest.',
        tag: 'Home Sanctuary',
      },
      {
        id: 'q2-c',
        text: 'Bustling art gallery, neighborhood jazz club, trying new culinary spots',
        description: 'Cultural stimulation, conversation with friends, vibrant vibes.',
        tag: 'Culture & Foodie',
      },
    ],
  },
  {
    id: 'q3',
    question: 'When envisioning your future in 5 years, what anchor matters most?',
    subtitle: 'Shared vision and mutual goals make two paths converge into one.',
    category: 'goals',
    options: [
      {
        id: 'q3-a',
        text: 'Building a peaceful home sanctuary with deep roots and unconditional safety',
        description: 'A steady haven where both people feel completely supported and cherished.',
        tag: 'Life Partnership',
      },
      {
        id: 'q3-b',
        text: 'Continuous personal growth, creative pursuits, and shared adventures',
        description: 'Mutual inspiration, exploring the world together, and learning endlessly.',
        tag: 'Growth Mindset',
      },
      {
        id: 'q3-c',
        text: 'Strong family bonds, nourishing our community, and raising warmth together',
        description: 'Creating a generous circle of love, family, and lifelong legacy.',
        tag: 'Family & Community',
      },
    ],
  },
  {
    id: 'q4',
    question: 'What makes you feel most profoundly loved and valued by your partner?',
    subtitle: 'Knowing each other’s primary love languages transforms daily connection.',
    category: 'values',
    options: [
      {
        id: 'q4-a',
        text: 'Undivided presence and unrushed quality time together',
        description: 'No phones, eye contact, listening deeply to thoughts and hopes.',
        tag: 'Quality Time & Words of Affirmation',
      },
      {
        id: 'q4-b',
        text: 'Quiet, proactive acts of service and dependable support',
        description: 'Making morning coffee, handling a chore when stressed, being a rock.',
        tag: 'Acts of Service & Physical Touch',
      },
      {
        id: 'q4-c',
        text: 'Spontaneous affection, warm embrace, and verbal affirmations of faith in me',
        description: 'Gentle touch, hearing "I believe in you" and sincere words from the heart.',
        tag: 'Emotional Honesty',
      },
    ],
  },
  {
    id: 'q5',
    question: 'How do you view balance between shared couple time and individual independence?',
    subtitle: 'Healthy interdependent love allows both partners to flourish individually.',
    category: 'lifestyle',
    options: [
      {
        id: 'q5-a',
        text: 'Strong interdependence: distinct passions that enrich our evening reunion',
        description: 'We encourage each other’s solo hobbies and friendships with full trust.',
        tag: 'Lifelong Learning',
      },
      {
        id: 'q5-b',
        text: 'High collaborative union: we love doing almost everything as a team',
        description: 'Best friends first, sharing cooking, workouts, projects, and social life.',
        tag: 'Shared Curiosity',
      },
      {
        id: 'q5-c',
        text: 'Fluid organic balance that shifts with life seasons and workloads',
        description: 'Intuitive check-ins where we flex between high togetherness and space.',
        tag: 'Integrity',
      },
    ],
  },
];
