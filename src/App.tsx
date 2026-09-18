import { useState, useMemo, useEffect } from 'react';
import {
  Heart,
  Sparkles,
  Compass,
  Bookmark,
  MessageCircle,
  SlidersHorizontal,
  RotateCcw,
  UserCheck,
  Flame,
  ArrowRight,
} from 'lucide-react';
import {
  PartnerProfile,
  UserProfile,
  ChatThread,
  FilterOptions,
  RelationshipIntent,
} from './types';
import { PARTNER_PROFILES } from './data/partners';
import {
  loadStoredUserProfile,
  saveStoredUserProfile,
  loadLikedIds,
  saveLikedIds,
  loadPassedIds,
  savePassedIds,
  loadMatchedIds,
  saveMatchedIds,
  loadBookmarkedIds,
  saveBookmarkedIds,
  loadQuizAnswers,
  saveQuizAnswers,
  loadChatThreads,
  saveChatThreads,
} from './utils/partnerStorage';
import { Navbar } from './components/Navbar';
import { CandidateCard } from './components/CandidateCard';
import { PartnerDetailModal } from './components/PartnerDetailModal';
import { MatchCelebrationModal } from './components/MatchCelebrationModal';
import { DateProposalModal } from './components/DateProposalModal';
import { MyProfileModal } from './components/MyProfileModal';
import { CompatibilityQuizView } from './components/CompatibilityQuizView';
import { ChatView } from './components/ChatView';
import { FilterBar } from './components/FilterBar';

const INITIAL_FILTERS: FilterOptions = {
  intent: 'All Relationship Goals',
  minAge: 18,
  maxAge: 45,
  maxDistance: 30,
  minScore: 80,
  selectedInterest: 'All Interests',
  searchQuery: '',
};

export default function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<'discover' | 'quiz' | 'chats' | 'saved' | 'profile'>('discover');

  // Core Persistent State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => loadStoredUserProfile());
  const [likedIds, setLikedIds] = useState<string[]>(() => loadLikedIds());
  const [passedIds, setPassedIds] = useState<string[]>(() => loadPassedIds());
  const [matchedIds, setMatchedIds] = useState<string[]>(() => loadMatchedIds());
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => loadBookmarkedIds());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>(() => loadQuizAnswers());
  const [chatThreads, setChatThreads] = useState<Record<string, ChatThread>>(() => loadChatThreads());

  // Active UI Selection
  const [activePartnerDetail, setActivePartnerDetail] = useState<PartnerProfile | null>(null);
  const [celebrationPartner, setCelebrationPartner] = useState<PartnerProfile | null>(null);
  const [dateProposalPartner, setDateProposalPartner] = useState<PartnerProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activeChatPartnerId, setActiveChatPartnerId] = useState<string | null>(() => {
    const matched = loadMatchedIds();
    return matched.length > 0 ? matched[0] : null;
  });

  // Filters
  const [filters, setFilters] = useState<FilterOptions>(INITIAL_FILTERS);

  // Sync state to local storage
  useEffect(() => {
    saveStoredUserProfile(userProfile);
  }, [userProfile]);

  useEffect(() => {
    saveLikedIds(likedIds);
  }, [likedIds]);

  useEffect(() => {
    savePassedIds(passedIds);
  }, [passedIds]);

  useEffect(() => {
    saveMatchedIds(matchedIds);
  }, [matchedIds]);

  useEffect(() => {
    saveBookmarkedIds(bookmarkedIds);
  }, [bookmarkedIds]);

  useEffect(() => {
    saveQuizAnswers(quizAnswers);
  }, [quizAnswers]);

  useEffect(() => {
    saveChatThreads(chatThreads);
  }, [chatThreads]);

  // Dynamically compute calibrated compatibility scores based on quiz answers
  const partnersWithCalibratedScores = useMemo(() => {
    const answeredCount = Object.keys(quizAnswers).length;
    if (answeredCount === 0) return PARTNER_PROFILES;

    return PARTNER_PROFILES.map((p) => {
      let scoreBonus = 0;
      // If user answered q1 (communication)
      if (quizAnswers['q1'] === 'q1-a' && p.values.includes('Emotional Honesty')) scoreBonus += 3;
      if (quizAnswers['q1'] === 'q1-c' && p.values.includes('Kindness & Empathy')) scoreBonus += 3;

      // If user answered q2 (lifestyle/weekend)
      if (quizAnswers['q2'] === 'q2-a' && p.lifestyle.weekendVibe === 'Outdoor Adventure') scoreBonus += 3;
      if (quizAnswers['q2'] === 'q2-b' && p.lifestyle.weekendVibe === 'Home Sanctuary') scoreBonus += 3;
      if (quizAnswers['q2'] === 'q2-c' && p.lifestyle.weekendVibe === 'Culture & Foodie') scoreBonus += 3;

      // If user answered q3 (5-year vision)
      if (quizAnswers['q3'] === 'q3-a' && p.intent === 'Life Partnership') scoreBonus += 2;
      if (quizAnswers['q3'] === 'q3-c' && p.intent === 'Marriage Minded') scoreBonus += 2;

      const dynamicScore = Math.min(99, Math.max(78, p.compatibilityScore + scoreBonus));
      return {
        ...p,
        compatibilityScore: dynamicScore,
      };
    });
  }, [quizAnswers]);

  // Filtered Candidates for Discover Tab
  const displayedCandidates = useMemo(() => {
    return partnersWithCalibratedScores.filter((p) => {
      // Don't show passed ones in discover
      if (passedIds.includes(p.id)) return false;

      // Intent filter
      if (filters.intent !== 'All Relationship Goals' && p.intent !== filters.intent) {
        return false;
      }

      // Max Distance
      if (p.distanceMiles > filters.maxDistance) {
        return false;
      }

      // Min Compatibility Score
      if (p.compatibilityScore < filters.minScore) {
        return false;
      }

      // Interests filter
      if (
        filters.selectedInterest !== 'All Interests' &&
        !p.interests.includes(filters.selectedInterest)
      ) {
        return false;
      }

      // Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesOccupation = p.occupation.toLowerCase().includes(query);
        const matchesLocation = p.location.toLowerCase().includes(query);
        const matchesValue = p.values.some((v) => v.toLowerCase().includes(query));
        if (!matchesName && !matchesOccupation && !matchesLocation && !matchesValue) {
          return false;
        }
      }

      return true;
    });
  }, [partnersWithCalibratedScores, passedIds, filters]);

  // Bookmarked Partners
  const bookmarkedPartners = useMemo(() => {
    return partnersWithCalibratedScores.filter((p) => bookmarkedIds.includes(p.id));
  }, [partnersWithCalibratedScores, bookmarkedIds]);

  // Handlers
  const handleLike = (partner: PartnerProfile) => {
    if (!likedIds.includes(partner.id)) {
      const updatedLiked = [...likedIds, partner.id];
      setLikedIds(updatedLiked);
    }

    // Connect & trigger reciprocal match
    if (!matchedIds.includes(partner.id)) {
      const updatedMatches = [partner.id, ...matchedIds];
      setMatchedIds(updatedMatches);

      // Create new chat thread if missing
      if (!chatThreads[partner.id]) {
        setChatThreads((prev) => ({
          ...prev,
          [partner.id]: {
            partnerId: partner.id,
            partnerName: partner.name,
            partnerPhoto: partner.photos[0],
            unread: false,
            updatedAt: 'Just now',
            messages: [
              {
                id: `m-init-${Date.now()}`,
                senderId: partner.id,
                text: `Hi ${userProfile.name.split(' ')[0]}! I was so delighted to match with you. Your profile really caught my eye!`,
                timestamp: 'Just now',
                isUser: false,
              },
            ],
          },
        }));
      }

      setCelebrationPartner(partner);
    }
  };

  const handlePass = (partnerId: string) => {
    setPassedIds((prev) => [...prev, partnerId]);
  };

  const handleResetPasses = () => {
    setPassedIds([]);
  };

  const handleToggleBookmark = (partnerId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(partnerId) ? prev.filter((id) => id !== partnerId) : [...prev, partnerId]
    );
  };

  const handleSendIcebreaker = (partner: PartnerProfile, icebreakerText: string) => {
    // Like & Match
    handleLike(partner);

    // Append to messages
    const thread = chatThreads[partner.id] || {
      partnerId: partner.id,
      partnerName: partner.name,
      partnerPhoto: partner.photos[0],
      unread: false,
      updatedAt: 'Just now',
      messages: [],
    };

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: 'user',
      text: icebreakerText,
      timestamp: 'Just now',
      isUser: true,
    };

    setChatThreads((prev) => ({
      ...prev,
      [partner.id]: {
        ...thread,
        messages: [...thread.messages, newMsg],
        updatedAt: 'Just now',
      },
    }));

    setActiveChatPartnerId(partner.id);
    setCurrentTab('chats');
  };

  const handleSendMessage = (partnerId: string, text: string) => {
    const isPartnerReply = text.startsWith('[partner_reply]:');
    const cleanText = isPartnerReply ? text.replace('[partner_reply]:', '') : text;

    setChatThreads((prev) => {
      const thread = prev[partnerId];
      if (!thread) return prev;

      const newMsg = {
        id: `msg-${Date.now()}-${Math.random()}`,
        senderId: isPartnerReply ? partnerId : 'user',
        text: cleanText,
        timestamp: 'Just now',
        isUser: !isPartnerReply,
      };

      return {
        ...prev,
        [partnerId]: {
          ...thread,
          messages: [...thread.messages, newMsg],
          updatedAt: 'Just now',
        },
      };
    });
  };

  const handleAcceptDateProposal = (partnerId: string, messageId: string) => {
    setChatThreads((prev) => {
      const thread = prev[partnerId];
      if (!thread) return prev;

      const updatedMessages = thread.messages.map((m) => {
        if (m.id === messageId && m.dateDetails) {
          return {
            ...m,
            dateDetails: {
              ...m.dateDetails,
              accepted: true,
            },
          };
        }
        return m;
      });

      return {
        ...prev,
        [partnerId]: {
          ...thread,
          messages: updatedMessages,
        },
      };
    });
  };

  const handleSubmitDateProposal = (
    partnerId: string,
    proposal: { title: string; location: string; time: string; note: string }
  ) => {
    const thread = chatThreads[partnerId] || {
      partnerId,
      partnerName:
        PARTNER_PROFILES.find((p) => p.id === partnerId)?.name || 'Matched Partner',
      partnerPhoto:
        PARTNER_PROFILES.find((p) => p.id === partnerId)?.photos[0] || '',
      unread: false,
      updatedAt: 'Just now',
      messages: [],
    };

    const newMsg = {
      id: `msg-date-${Date.now()}`,
      senderId: 'user',
      text: proposal.note,
      timestamp: 'Just now',
      isUser: true,
      isDateProposal: true,
      dateDetails: {
        title: proposal.title,
        location: proposal.location,
        time: proposal.time,
        accepted: false,
      },
    };

    setChatThreads((prev) => ({
      ...prev,
      [partnerId]: {
        ...thread,
        messages: [...thread.messages, newMsg],
        updatedAt: 'Just now',
      },
    }));

    setActiveChatPartnerId(partnerId);
    setCurrentTab('chats');
  };

  const handleSaveQuizAnswers = (newAnswers: Record<string, string>) => {
    setQuizAnswers(newAnswers);
    setUserProfile((prev) => ({ ...prev, quizCompleted: true }));
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'profile') {
            setShowProfileModal(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        matchesCount={matchedIds.length}
        unreadCount={0}
        savedCount={bookmarkedIds.length}
        userProfile={userProfile}
        quizCompleted={Object.keys(quizAnswers).length >= 5}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB 1: DISCOVER CANDIDATES */}
        {currentTab === 'discover' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Top Value Banner */}
            <div className="bg-gradient-to-r from-stone-900 via-rose-950/20 to-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Curated Matchmaking Deck
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Meet Your Ideal Partner
                </h1>
                <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                  Every profile is curated around emotional honesty, shared life goals, and genuine values.
                  Take the <strong className="text-rose-300">Partner Compass quiz</strong> to calibrate your personalized compatibility scores.
                </p>
              </div>

              <button
                id="hero-take-quiz-btn"
                onClick={() => setCurrentTab('quiz')}
                className="px-4 py-2.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all flex items-center gap-2 shrink-0 active:scale-95 shadow-lg shadow-amber-950/20"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>{Object.keys(quizAnswers).length >= 5 ? 'Recalibrate Compass' : 'Take Compatibility Quiz'}</span>
              </button>
            </div>

            {/* Filter Bar */}
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              onResetFilters={() => setFilters(INITIAL_FILTERS)}
              activeMatchesCount={displayedCandidates.length}
            />

            {/* Candidate Cards Grid */}
            {displayedCandidates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {displayedCandidates.map((partner) => (
                  <CandidateCard
                    key={partner.id}
                    partner={partner}
                    onLike={handleLike}
                    onPass={handlePass}
                    onToggleBookmark={handleToggleBookmark}
                    isBookmarked={bookmarkedIds.includes(partner.id)}
                    onViewDetails={(p) => setActivePartnerDetail(p)}
                    onSendIcebreaker={handleSendIcebreaker}
                    isMatched={matchedIds.includes(partner.id)}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="p-12 text-center bg-stone-900 border border-stone-800 rounded-3xl space-y-4 max-w-lg mx-auto my-6">
                <div className="w-12 h-12 rounded-full bg-stone-800 text-stone-400 mx-auto flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  No Candidates Match Current Filters
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Try lowering your minimum compatibility threshold, increasing distance, or resetting passed profiles.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setFilters(INITIAL_FILTERS)}
                    className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                  {passedIds.length > 0 && (
                    <button
                      onClick={handleResetPasses}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Review Passed Candidates ({passedIds.length})</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: COMPATIBILITY QUIZ */}
        {currentTab === 'quiz' && (
          <CompatibilityQuizView
            answers={quizAnswers}
            onSaveAnswers={handleSaveQuizAnswers}
            partners={partnersWithCalibratedScores}
            onViewPartner={(p) => setActivePartnerDetail(p)}
            onGoToDiscover={() => setCurrentTab('discover')}
          />
        )}

        {/* TAB 3: CHATS & MATCHES */}
        {currentTab === 'chats' && (
          <ChatView
            chatThreads={chatThreads}
            activePartnerId={activeChatPartnerId}
            setActivePartnerId={setActiveChatPartnerId}
            partners={partnersWithCalibratedScores}
            onSendMessage={handleSendMessage}
            onAcceptDateProposal={handleAcceptDateProposal}
            onViewPartner={(p) => setActivePartnerDetail(p)}
            onOpenDateModal={(p) => setDateProposalPartner(p)}
          />
        )}

        {/* TAB 4: SAVED CANDIDATES */}
        {currentTab === 'saved' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                  Saved Partner Profiles
                </h1>
                <p className="text-xs sm:text-sm text-stone-400">
                  Profiles you bookmarked to reflect on or message later
                </p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-300 font-medium">
                {bookmarkedPartners.length} Saved
              </span>
            </div>

            {bookmarkedPartners.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedPartners.map((partner) => (
                  <CandidateCard
                    key={partner.id}
                    partner={partner}
                    onLike={handleLike}
                    onPass={handlePass}
                    onToggleBookmark={handleToggleBookmark}
                    isBookmarked={true}
                    onViewDetails={(p) => setActivePartnerDetail(p)}
                    onSendIcebreaker={handleSendIcebreaker}
                    isMatched={matchedIds.includes(partner.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-stone-900 border border-stone-800 rounded-3xl space-y-3 max-w-md mx-auto my-12">
                <Bookmark className="w-8 h-8 text-stone-600 mx-auto" />
                <h3 className="font-serif text-base font-bold text-white">
                  No Saved Profiles Yet
                </h3>
                <p className="text-xs text-stone-400">
                  Click the bookmark icon on any candidate card in Discover to save them here for later reflection.
                </p>
                <button
                  onClick={() => setCurrentTab('discover')}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors"
                >
                  Explore Discover
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODALS */}
      {/* 1. Partner Full Detail Modal */}
      {activePartnerDetail && (
        <PartnerDetailModal
          partner={activePartnerDetail}
          onClose={() => setActivePartnerDetail(null)}
          onLike={handleLike}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={bookmarkedIds.includes(activePartnerDetail.id)}
          onOpenChat={(id) => {
            setActivePartnerDetail(null);
            setActiveChatPartnerId(id);
            setCurrentTab('chats');
          }}
          isMatched={matchedIds.includes(activePartnerDetail.id)}
          onProposeDate={(p) => {
            setActivePartnerDetail(null);
            setDateProposalPartner(p);
          }}
        />
      )}

      {/* 2. Match Celebration Modal */}
      {celebrationPartner && (
        <MatchCelebrationModal
          partner={celebrationPartner}
          userProfile={userProfile}
          onClose={() => setCelebrationPartner(null)}
          onStartChat={(partnerId) => {
            setCelebrationPartner(null);
            setActiveChatPartnerId(partnerId);
            setCurrentTab('chats');
          }}
        />
      )}

      {/* 3. Date Proposal Modal */}
      {dateProposalPartner && (
        <DateProposalModal
          partner={dateProposalPartner}
          onClose={() => setDateProposalPartner(null)}
          onSubmitProposal={handleSubmitDateProposal}
        />
      )}

      {/* 4. My Profile Modal */}
      {showProfileModal && (
        <MyProfileModal
          userProfile={userProfile}
          onSaveProfile={(updated) => setUserProfile(updated)}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
}
