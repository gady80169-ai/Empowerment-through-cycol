import { useState } from 'react';
import {
  X,
  Heart,
  MessageCircle,
  Sparkles,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Bookmark,
  Sun,
  Moon,
  Dog,
  Compass,
  Utensils,
  Share2,
  Send,
} from 'lucide-react';
import { PartnerProfile } from '../types';

interface PartnerDetailModalProps {
  partner: PartnerProfile | null;
  onClose: () => void;
  onLike: (partner: PartnerProfile) => void;
  onToggleBookmark: (partnerId: string) => void;
  isBookmarked: boolean;
  onOpenChat: (partnerId: string) => void;
  isMatched: boolean;
  onProposeDate: (partner: PartnerProfile) => void;
}

export function PartnerDetailModal({
  partner,
  onClose,
  onLike,
  onToggleBookmark,
  isBookmarked,
  onOpenChat,
  isMatched,
  onProposeDate,
}: PartnerDetailModalProps) {
  if (!partner) return null;

  const [selectedPhoto, setSelectedPhoto] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-900/90 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl font-bold flex items-center gap-2 text-white">
              {partner.name}, {partner.age}
              {partner.isVerified && (
                <CheckCircle2 className="w-5 h-5 text-sky-400 fill-sky-400/20" />
              )}
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {partner.compatibilityScore}% Match
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(partner.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-amber-500 text-stone-950 border-amber-400'
                  : 'bg-stone-800 text-stone-300 border-stone-700 hover:text-white'
              }`}
              title="Bookmark"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-stone-950' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 border border-stone-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Photos Display */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-950">
              <img
                src={partner.photos[selectedPhoto]}
                alt={partner.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-stone-950/70 backdrop-blur-md text-xs text-stone-300">
                Photo {selectedPhoto + 1} of {partner.photos.length}
              </div>
            </div>

            {partner.photos.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {partner.photos.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPhoto(i)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedPhoto === i
                        ? 'border-rose-500 ring-2 ring-rose-500/30'
                        : 'border-stone-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Info Strip */}
          <div className="flex flex-wrap gap-4 py-3 px-4 rounded-2xl bg-stone-800/60 border border-stone-800 text-sm text-stone-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>{partner.location} ({partner.distanceMiles} miles away)</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>{partner.occupation}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>{partner.education}</span>
            </div>
          </div>

          {/* Compatibility Deep Breakdown */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/30 via-stone-850 to-stone-900 border border-rose-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <h3 className="font-serif text-base font-semibold text-rose-100">
                  Compatibility Matrix
                </h3>
              </div>
              <span className="font-bold text-rose-300 text-sm">
                Overall: {partner.compatibilityScore}%
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 text-center">
                <span className="text-xs text-stone-400 block mb-1">Core Values</span>
                <span className="text-lg font-bold text-emerald-400">
                  {partner.matchScoreBreakdown.values}%
                </span>
              </div>
              <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 text-center">
                <span className="text-xs text-stone-400 block mb-1">Lifestyle Sync</span>
                <span className="text-lg font-bold text-sky-400">
                  {partner.matchScoreBreakdown.lifestyle}%
                </span>
              </div>
              <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 text-center">
                <span className="text-xs text-stone-400 block mb-1">Vision & Goals</span>
                <span className="text-lg font-bold text-amber-400">
                  {partner.matchScoreBreakdown.goals}%
                </span>
              </div>
            </div>
          </div>

          {/* Personal Bio */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-400">
              About {partner.name}
            </h3>
            <p className="text-sm text-stone-200 leading-relaxed font-sans">
              {partner.bio}
            </p>
          </div>

          {/* Core Values */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-400">
              Core Principles & Non-Negotiables
            </h3>
            <div className="flex flex-wrap gap-2">
              {partner.values.map((v) => (
                <span
                  key={v}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-800 border border-stone-700 text-stone-200"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Thoughtful Prompts Showcase */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-400">
              Relationship Reflections
            </h3>
            {partner.prompts.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-stone-800/70 border border-stone-700/60 space-y-1.5"
              >
                <p className="text-xs font-semibold text-rose-300 uppercase tracking-wide">
                  {p.question}
                </p>
                <p className="text-sm text-stone-200 italic font-serif leading-relaxed">
                  "{p.answer}"
                </p>
              </div>
            ))}
          </div>

          {/* Lifestyle Matrix */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-400">
              Daily Rhythm & Habits
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300">
              <div className="p-3 rounded-xl bg-stone-800/40 border border-stone-800 flex items-center gap-3">
                <Sun className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-stone-400 block text-[11px]">Sleep Rhythm</span>
                  <span className="font-medium text-stone-200">{partner.lifestyle.sleepStyle}</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-stone-800/40 border border-stone-800 flex items-center gap-3">
                <Dog className="w-4 h-4 text-amber-500" />
                <div>
                  <span className="text-stone-400 block text-[11px]">Pet Philosophy</span>
                  <span className="font-medium text-stone-200">{partner.lifestyle.petFriendly}</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-stone-800/40 border border-stone-800 flex items-center gap-3">
                <Compass className="w-4 h-4 text-teal-400" />
                <div>
                  <span className="text-stone-400 block text-[11px]">Weekend Tempo</span>
                  <span className="font-medium text-stone-200">{partner.lifestyle.weekendVibe}</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-stone-800/40 border border-stone-800 flex items-center gap-3">
                <Utensils className="w-4 h-4 text-rose-400" />
                <div>
                  <span className="text-stone-400 block text-[11px]">Dining & Cooking</span>
                  <span className="font-medium text-stone-200">{partner.lifestyle.dietOrDining}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shared Interests */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-400">
              Favorite Pastimes & Passions
            </h3>
            <div className="flex flex-wrap gap-2">
              {partner.interests.map((int) => (
                <span
                  key={int}
                  className="px-3 py-1 rounded-full text-xs bg-stone-800/90 text-stone-300 border border-stone-700"
                >
                  {int}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-900/95 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onProposeDate(partner)}
            className="flex-1 py-3 px-4 rounded-2xl bg-stone-800 hover:bg-stone-700/80 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Plan a Meetup</span>
          </button>

          {isMatched ? (
            <button
              onClick={() => onOpenChat(partner.id)}
              className="flex-1 py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open Conversation</span>
            </button>
          ) : (
            <button
              onClick={() => onLike(partner)}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Connect & Like</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
