import { Heart, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { PartnerProfile, UserProfile } from '../types';

interface MatchCelebrationModalProps {
  partner: PartnerProfile | null;
  userProfile: UserProfile;
  onClose: () => void;
  onStartChat: (partnerId: string) => void;
}

export function MatchCelebrationModal({
  partner,
  userProfile,
  onClose,
  onStartChat,
}: MatchCelebrationModalProps) {
  if (!partner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="w-full max-w-md bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border border-rose-500/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-6 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow backdrop decorative */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-rose-500/20 to-transparent pointer-events-none" />

        <div className="space-y-2 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Mutual Connection!
          </div>
          <h2 className="font-serif text-3xl font-bold text-white tracking-tight">
            It's a Match!
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            You and <span className="text-white font-semibold">{partner.name}</span> both share{' '}
            <span className="text-rose-300 font-medium">{partner.intent}</span> and have a{' '}
            <span className="text-emerald-400 font-bold">{partner.compatibilityScore}%</span> alignment score!
          </p>
        </div>

        {/* Overlapping Avatars */}
        <div className="flex items-center justify-center -space-x-4 py-2 relative">
          <div className="relative">
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-rose-500 shadow-xl"
            />
            <span className="absolute bottom-0 right-0 text-[11px] font-bold px-2 py-0.5 rounded-full bg-stone-900 text-stone-200 border border-stone-700">
              You
            </span>
          </div>

          <div className="z-10 w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl ring-4 ring-stone-900 animate-bounce">
            <Heart className="w-5 h-5 fill-white" />
          </div>

          <div className="relative">
            <img
              src={partner.photos[0]}
              alt={partner.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-rose-500 shadow-xl"
            />
            <span className="absolute bottom-0 right-0 text-[11px] font-bold px-2 py-0.5 rounded-full bg-stone-900 text-stone-200 border border-stone-700">
              {partner.name.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Icebreaker Teaser */}
        <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-800 text-left space-y-1">
          <p className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
            Suggested Icebreaker:
          </p>
          <p className="text-xs text-stone-200 italic font-serif">
            "{partner.icebreakers[0]}"
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-2">
          <button
            id="start-chatting-btn"
            onClick={() => onStartChat(partner.id)}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 text-white text-sm font-semibold transition-all shadow-lg shadow-rose-950/40 flex items-center justify-center gap-2 active:scale-98"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send First Message</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-2xl bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs font-medium border border-stone-700 transition-colors"
          >
            Keep Browsing Candidates
          </button>
        </div>
      </div>
    </div>
  );
}
