import { Heart, Compass, MessageCircle, Bookmark, User, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentTab: 'discover' | 'quiz' | 'chats' | 'saved' | 'profile';
  setCurrentTab: (tab: 'discover' | 'quiz' | 'chats' | 'saved' | 'profile') => void;
  matchesCount: number;
  unreadCount: number;
  savedCount: number;
  userProfile: UserProfile;
  quizCompleted: boolean;
}

export function Navbar({
  currentTab,
  setCurrentTab,
  matchesCount,
  unreadCount,
  savedCount,
  userProfile,
  quizCompleted,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div
            id="brand-logo-button"
            onClick={() => setCurrentTab('discover')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-950/40 group-hover:scale-105 transition-transform duration-200">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg font-semibold tracking-tight text-stone-100">
                  Meet Your Partner
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Curated
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans hidden sm:block">
                Values-First Relationship Discovery
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              id="nav-tab-discover"
              onClick={() => setCurrentTab('discover')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                currentTab === 'discover'
                  ? 'bg-stone-800 text-white shadow-sm border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              }`}
            >
              <Heart className={`w-4 h-4 ${currentTab === 'discover' ? 'text-rose-400 fill-rose-400/30' : ''}`} />
              <span className="hidden sm:inline">Discover</span>
            </button>

            <button
              id="nav-tab-quiz"
              onClick={() => setCurrentTab('quiz')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all relative ${
                currentTab === 'quiz'
                  ? 'bg-stone-800 text-white shadow-sm border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              }`}
            >
              <Compass className={`w-4 h-4 ${currentTab === 'quiz' ? 'text-amber-400' : ''}`} />
              <span className="hidden sm:inline">Partner Compass</span>
              {!quizCompleted && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>

            <button
              id="nav-tab-chats"
              onClick={() => setCurrentTab('chats')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all relative ${
                currentTab === 'chats'
                  ? 'bg-stone-800 text-white shadow-sm border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              }`}
            >
              <MessageCircle className={`w-4 h-4 ${currentTab === 'chats' ? 'text-rose-400' : ''}`} />
              <span className="hidden sm:inline">Matches & Chat</span>
              {matchesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-600 text-white">
                  {matchesCount}
                </span>
              )}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-stone-900" />
              )}
            </button>

            <button
              id="nav-tab-saved"
              onClick={() => setCurrentTab('saved')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                currentTab === 'saved'
                  ? 'bg-stone-800 text-white shadow-sm border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${currentTab === 'saved' ? 'text-amber-300 fill-amber-300/30' : ''}`} />
              <span className="hidden md:inline">Saved</span>
              {savedCount > 0 && (
                <span className="text-[11px] text-stone-400">({savedCount})</span>
              )}
            </button>

            {/* Profile Avatar / Tab */}
            <button
              id="nav-tab-profile"
              onClick={() => setCurrentTab('profile')}
              className={`flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full text-xs sm:text-sm transition-all border ${
                currentTab === 'profile'
                  ? 'bg-rose-950/40 border-rose-500/50 text-white ring-1 ring-rose-500/40'
                  : 'border-stone-800 hover:border-stone-700 bg-stone-900/60 text-stone-300'
              }`}
            >
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-stone-700"
              />
              <span className="hidden lg:inline font-medium text-stone-200">
                {userProfile.name.split(' ')[0]}
              </span>
              <User className="w-3.5 h-3.5 text-stone-400 lg:hidden" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
