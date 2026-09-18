import { ChatThread, UserProfile } from '../types';
import { INITIAL_USER_PROFILE, PARTNER_PROFILES } from '../data/partners';

const USER_PROFILE_KEY = 'meet_partner_user_profile';
const LIKED_KEY = 'meet_partner_liked_ids';
const PASSED_KEY = 'meet_partner_passed_ids';
const MATCHES_KEY = 'meet_partner_matched_ids';
const CHAT_THREADS_KEY = 'meet_partner_chat_threads';
const QUIZ_ANSWERS_KEY = 'meet_partner_quiz_answers';
const BOOKMARKS_KEY = 'meet_partner_bookmarks';

export function loadStoredUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(USER_PROFILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load user profile', e);
  }
  return INITIAL_USER_PROFILE;
}

export function saveStoredUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save user profile', e);
  }
}

export function loadLikedIds(): string[] {
  try {
    const raw = localStorage.getItem(LIKED_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load liked ids', e);
  }
  return [];
}

export function saveLikedIds(ids: string[]): void {
  try {
    localStorage.setItem(LIKED_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save liked ids', e);
  }
}

export function loadPassedIds(): string[] {
  try {
    const raw = localStorage.getItem(PASSED_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load passed ids', e);
  }
  return [];
}

export function savePassedIds(ids: string[]): void {
  try {
    localStorage.setItem(PASSED_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save passed ids', e);
  }
}

export function loadMatchedIds(): string[] {
  try {
    const raw = localStorage.getItem(MATCHES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load matched ids', e);
  }
  // By default, match with partner-1 (Elena) and partner-2 (Julian) initially so the chat and match experience is instantly live and rich!
  return ['partner-1', 'partner-2'];
}

export function saveMatchedIds(ids: string[]): void {
  try {
    localStorage.setItem(MATCHES_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save matched ids', e);
  }
}

export function loadBookmarkedIds(): string[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load bookmarks', e);
  }
  return ['partner-1'];
}

export function saveBookmarkedIds(ids: string[]): void {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save bookmarks', e);
  }
}

export function loadQuizAnswers(): Record<string, string> {
  try {
    const raw = localStorage.getItem(QUIZ_ANSWERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load quiz answers', e);
  }
  return {};
}

export function saveQuizAnswers(answers: Record<string, string>): void {
  try {
    localStorage.setItem(QUIZ_ANSWERS_KEY, JSON.stringify(answers));
  } catch (e) {
    console.error('Failed to save quiz answers', e);
  }
}

export function loadChatThreads(): Record<string, ChatThread> {
  try {
    const raw = localStorage.getItem(CHAT_THREADS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load chat threads', e);
  }

  // Pre-populate realistic, wholesome initial chat thread with matched partner
  const elena = PARTNER_PROFILES.find((p) => p.id === 'partner-1');
  const julian = PARTNER_PROFILES.find((p) => p.id === 'partner-2');

  const initialThreads: Record<string, ChatThread> = {};

  if (elena) {
    initialThreads['partner-1'] = {
      partnerId: 'partner-1',
      partnerName: elena.name,
      partnerPhoto: elena.photos[0],
      unread: true,
      updatedAt: '10 mins ago',
      messages: [
        {
          id: 'm1',
          senderId: 'partner-1',
          text: "Hi Alex! It felt so rare and wonderful reading your profile—especially what you wrote about building a shared future with steady curiosity and laughter. That resonated deeply with me.",
          timestamp: '10:14 AM',
          isUser: false,
        },
        {
          id: 'm2',
          senderId: 'user',
          text: "Elena, thank you! I loved reading about your ocean research and your sourdough experiments. Sourdough requires real patience and love!",
          timestamp: '10:22 AM',
          isUser: true,
        },
        {
          id: 'm3',
          senderId: 'partner-1',
          text: "Haha, you know the secret! It really is about patience. Would you be open to grabbing a specialty pour-over at Saint Frank or taking a scenic walk along Crissy Field this Saturday?",
          timestamp: '10:28 AM',
          isUser: false,
          isDateProposal: true,
          dateDetails: {
            title: 'Coastal Stroll & Artisan Coffee Date',
            location: 'Crissy Field East Beach & Warming Hut Cafe',
            time: 'Saturday at 10:30 AM',
            accepted: false,
          },
        },
      ],
    };
  }

  if (julian) {
    initialThreads['partner-2'] = {
      partnerId: 'partner-2',
      partnerName: julian.name,
      partnerPhoto: julian.photos[0],
      unread: false,
      updatedAt: 'Yesterday',
      messages: [
        {
          id: 'jm1',
          senderId: 'partner-2',
          text: "Hey Alex, noticed your architectural design background! Do you have a favorite mid-century structure in the Bay Area?",
          timestamp: 'Yesterday',
          isUser: false,
        },
        {
          id: 'jm2',
          senderId: 'user',
          text: "Hey Julian! Hands down, the Marin County Civic Center by Frank Lloyd Wright. The light inside the atrium is magnificent.",
          timestamp: 'Yesterday',
          isUser: true,
        },
        {
          id: 'jm3',
          senderId: 'partner-2',
          text: "Incredible choice. The cobalt domes and golden arches are transcendent. Let’s definitely talk more about design and acoustic spaces soon!",
          timestamp: 'Yesterday',
          isUser: false,
        },
      ],
    };
  }

  return initialThreads;
}

export function saveChatThreads(threads: Record<string, ChatThread>): void {
  try {
    localStorage.setItem(CHAT_THREADS_KEY, JSON.stringify(threads));
  } catch (e) {
    console.error('Failed to save chat threads', e);
  }
}
