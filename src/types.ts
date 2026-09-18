export type RelationshipIntent =
  | 'Life Partnership'
  | 'Serious Long-Term'
  | 'Marriage Minded'
  | 'Meaningful Romance'
  | 'Deep Companionship';

export interface PromptAnswer {
  question: string;
  answer: string;
}

export interface LifestyleDetails {
  sleepStyle: 'Early Riser' | 'Night Owl' | 'Balanced Rhythm';
  petFriendly: 'Dog Lover' | 'Cat Aficionado' | 'Animal Enthusiast' | 'No Pets';
  socialEnergy: 'Ambivert' | 'Extrovert' | 'Cozy Introvert';
  weekendVibe: 'Outdoor Adventure' | 'Culture & Foodie' | 'Home Sanctuary' | 'Active Exploration';
  dietOrDining: string;
}

export interface PartnerProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  distanceMiles: number;
  occupation: string;
  education: string;
  intent: RelationshipIntent;
  values: string[];
  interests: string[];
  loveLanguage: string;
  lifestyle: LifestyleDetails;
  prompts: PromptAnswer[];
  photos: string[];
  bio: string;
  compatibilityScore: number; // dynamically computed or base
  isVerified: boolean;
  matchScoreBreakdown: {
    values: number;
    lifestyle: number;
    goals: number;
  };
  icebreakers: string[];
}

export interface UserProfile {
  name: string;
  age: number;
  city: string;
  occupation: string;
  bio: string;
  intent: RelationshipIntent;
  values: string[];
  interests: string[];
  loveLanguage: string;
  avatarUrl: string;
  quizCompleted: boolean;
  idealPartnerPrompt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle: string;
  category: 'values' | 'lifestyle' | 'goals' | 'communication';
  options: {
    id: string;
    text: string;
    description: string;
    tag: string;
  }[];
}

export interface ChatMessage {
  id: string;
  senderId: string; // 'user' or partnerId
  text: string;
  timestamp: string;
  isUser: boolean;
  isDateProposal?: boolean;
  dateDetails?: {
    title: string;
    location: string;
    time: string;
    accepted?: boolean;
  };
}

export interface ChatThread {
  partnerId: string;
  partnerName: string;
  partnerPhoto: string;
  unread: boolean;
  messages: ChatMessage[];
  updatedAt: string;
}

export interface FilterOptions {
  intent: string;
  minAge: number;
  maxAge: number;
  maxDistance: number;
  minScore: number;
  selectedInterest: string;
  searchQuery: string;
}
