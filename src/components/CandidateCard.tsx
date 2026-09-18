import { useState } from 'react';
import {
  Heart,
  X,
  Bookmark,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MessageSquareHeart,
  Info,
  CheckCircle2,
  Moon,
  Sun,
  Dog,
  Coffee,
  Compass,
} from 'lucide-react';
import { PartnerProfile } from '../types';

interface CandidateCardProps {
  partner: PartnerProfile;
  onLike: (partner: PartnerProfile) => void;
  onPass: (partnerId: string) => void;
  onToggleBookmark: (partnerId: string) => void;
  isBookmarked: boolean;
  onViewDetails: (partner: PartnerProfile) => void;
  onSendIcebreaker: (partner: PartnerProfile, icebreakerText: string) => void;
  isMatched?: boolean;
}

export function CandidateCard({
  partner,
  onLike,
  onPass,
  onToggleBookmark,
  isBookmarked,
  onViewDetails,
  onSendIcebreaker,
  isMatched = false,
}: CandidateCardProps) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [showIcebreakerMenu, setShowIcebreakerMenu] = useState(false);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % partner.photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + partner.photos.length) % partner.photos.length);
  };

  return (
    <div
      id={`candidate-card-${partner.id}`}
      className="group bg-stone-900 rounded-3xl border border-stone-800 shadow-xl shadow-stone-950/40 overflow-hidden flex flex-col transition-all duration-300 hover:border-stone-700 hover:shadow-2xl"
    >
      {/* Photo Stage */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-stone-950 select-none">
        <img
          src={partner.photos[activePhotoIdx] || partner.photos[0]}
          alt={`${partner.name}, ${partner.age}`}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />

        {/* Gradient Overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-stone-900/40" />

        {/* Top Badges */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
          {/* Compatibility Pill */}
          <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-rose-500/40 text-rose-300 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span className="text-xs font-semibold tracking-wide">
              {partner.compatibilityScore}% Compatible
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            id={`bookmark-btn-${partner.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(partner.id);
            }}
            className={`pointer-events-auto p-2.5 rounded-full backdrop-blur-md transition-transform active:scale-95 ${
              isBookmarked
                ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/30'
                : 'bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700/60'
            }`}
            title={isBookmarked ? 'Saved to Favorites' : 'Save for later'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-stone-950' : ''}`} />
          </button>
        </div>

        {/* Photo Navigation arrows (if multiple photos) */}
        {partner.photos.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevPhoto}
              className="p-1.5 rounded-full bg-stone-900/70 text-stone-200 hover:bg-stone-900 hover:text-white transition-all backdrop-blur-sm"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPhoto}
              className="p-1.5 rounded-full bg-stone-900/70 text-stone-200 hover:bg-stone-900 hover:text-white transition-all backdrop-blur-sm"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Photo indicator dots */}
        {partner.photos.length > 1 && (
          <div className="absolute bottom-28 inset-x-0 flex justify-center gap-1.5 pointer-events-none">
            {partner.photos.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activePhotoIdx
                    ? 'w-6 bg-white shadow-sm'
                    : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Hero Overlay Info at bottom of photo */}
        <div className="absolute bottom-4 inset-x-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-serif text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              {partner.name}, {partner.age}
              {partner.isVerified && (
                <span title="Verified Profile">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 fill-sky-400/20" />
                </span>
              )}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-stone-300 mb-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              {partner.location} ({partner.distanceMiles} mi)
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-stone-400" />
              {partner.occupation}
            </span>
          </div>

          {/* Relationship Intent Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-200 text-xs font-medium">
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
            Seeking: {partner.intent}
          </div>
        </div>
      </div>

      {/* Card Content & Prompts */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Core Values Tag Cloud */}
        <div>
          <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
            <span className="font-medium text-stone-300">Core Values:</span>
            <span className="text-[11px] text-emerald-400 font-medium">
              {partner.matchScoreBreakdown.values}% Value Match
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {partner.values.slice(0, 3).map((val) => (
              <span
                key={val}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-stone-800 text-stone-200 border border-stone-700/80"
              >
                {val}
              </span>
            ))}
          </div>
        </div>

        {/* Featured Prompt */}
        {partner.prompts.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-stone-800/60 border border-stone-800 text-stone-200 relative">
            <p className="text-[11px] uppercase tracking-wider text-rose-300 font-semibold mb-1">
              {partner.prompts[0].question}
            </p>
            <p className="text-xs text-stone-300 line-clamp-3 italic font-sans leading-relaxed">
              "{partner.prompts[0].answer}"
            </p>
          </div>
        )}

        {/* Lifestyle Quick Traits */}
        <div className="grid grid-cols-2 gap-2 text-xs text-stone-400 pt-1">
          <div className="flex items-center gap-1.5 truncate">
            {partner.lifestyle.sleepStyle === 'Early Riser' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            )}
            <span className="truncate">{partner.lifestyle.sleepStyle}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Dog className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">{partner.lifestyle.petFriendly}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Compass className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="truncate">{partner.lifestyle.weekendVibe}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Coffee className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="truncate">{partner.loveLanguage.split('&')[0]}</span>
          </div>
        </div>

        {/* Icebreaker Picker (Collapsible) */}
        {showIcebreakerMenu && (
          <div className="p-3 rounded-xl bg-stone-950 border border-rose-500/30 space-y-2 animate-in fade-in">
            <p className="text-xs font-semibold text-rose-200 flex items-center gap-1.5">
              <MessageSquareHeart className="w-3.5 h-3.5 text-rose-400" />
              Pick a thoughtful icebreaker to send:
            </p>
            <div className="space-y-1.5">
              {partner.icebreakers.map((ib, i) => (
                <button
                  key={i}
                  onClick={() => {
                    onSendIcebreaker(partner, ib);
                    setShowIcebreakerMenu(false);
                  }}
                  className="w-full text-left p-2 rounded-lg text-xs text-stone-300 bg-stone-900 hover:bg-stone-800 hover:text-white border border-stone-800 transition-colors"
                >
                  "{ib}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Controls Bar */}
        <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-2">
          {/* Pass Button */}
          <button
            id={`pass-btn-${partner.id}`}
            onClick={() => onPass(partner.id)}
            className="p-3 rounded-2xl bg-stone-800 text-stone-400 hover:text-stone-100 hover:bg-stone-700/80 transition-all active:scale-95 border border-stone-700/50"
            title="Pass candidate"
          >
            <X className="w-5 h-5" />
          </button>

          {/* View Full Story / Details */}
          <button
            id={`details-btn-${partner.id}`}
            onClick={() => onViewDetails(partner)}
            className="flex-1 py-3 px-3 rounded-2xl bg-stone-800/80 hover:bg-stone-800 text-xs font-semibold text-stone-200 hover:text-white border border-stone-700/60 transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
          >
            <Info className="w-4 h-4 text-rose-400" />
            <span>Full Story</span>
          </button>

          {/* Icebreaker button */}
          <button
            id={`icebreaker-btn-${partner.id}`}
            onClick={() => setShowIcebreakerMenu(!showIcebreakerMenu)}
            className={`p-3 rounded-2xl border transition-all active:scale-95 ${
              showIcebreakerMenu
                ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                : 'bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700/80 border-stone-700/50'
            }`}
            title="Start conversation with an icebreaker"
          >
            <MessageSquareHeart className="w-5 h-5 text-rose-400" />
          </button>

          {/* Like / Connect Button */}
          <button
            id={`like-btn-${partner.id}`}
            onClick={() => onLike(partner)}
            className={`p-3 rounded-2xl transition-all active:scale-95 flex items-center justify-center shadow-lg ${
              isMatched
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
                : 'bg-gradient-to-tr from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-rose-950/50'
            }`}
            title={isMatched ? 'Already matched! Message now' : 'Connect & Like'}
          >
            <Heart className="w-5 h-5 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
