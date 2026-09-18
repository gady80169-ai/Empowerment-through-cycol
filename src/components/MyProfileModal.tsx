import { useState } from 'react';
import { X, User, Heart, Sparkles, Check, Camera, MapPin, Briefcase } from 'lucide-react';
import { RelationshipIntent, UserProfile } from '../types';
import { INTENT_OPTIONS } from '../data/partners';

interface MyProfileModalProps {
  userProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onClose: () => void;
}

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
];

export function MyProfileModal({
  userProfile,
  onSaveProfile,
  onClose,
}: MyProfileModalProps) {
  const [profile, setProfile] = useState<UserProfile>({ ...userProfile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in">
      <div
        className="w-full max-w-xl bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 text-stone-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                My Partner Profile
              </h3>
              <p className="text-xs text-stone-400">
                How potential partners see you in the network
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-300 block">
              Profile Photo:
            </label>
            <div className="flex items-center gap-3">
              <img
                src={profile.avatarUrl}
                alt="Selected avatar"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-rose-500"
              />
              <div className="flex-1 space-y-1">
                <p className="text-xs text-stone-400">Choose portrait:</p>
                <div className="flex items-center gap-2">
                  {AVATAR_OPTIONS.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setProfile({ ...profile, avatarUrl: url })}
                      className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                        profile.avatarUrl === url
                          ? 'border-rose-500 scale-110'
                          : 'border-stone-700 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Name & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-rose-500 focus:outline-none text-xs sm:text-sm text-stone-100"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">
                Age
              </label>
              <input
                type="number"
                min={18}
                max={99}
                required
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-rose-500 focus:outline-none text-xs sm:text-sm text-stone-100"
              />
            </div>
          </div>

          {/* City & Occupation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">
                City / Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-rose-500 focus:outline-none text-xs sm:text-sm text-stone-100"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">
                Occupation
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={profile.occupation}
                  onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-rose-500 focus:outline-none text-xs sm:text-sm text-stone-100"
                />
              </div>
            </div>
          </div>

          {/* Relationship Intent */}
          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              Relationship Goal / Intent
            </label>
            <select
              value={profile.intent}
              onChange={(e) =>
                setProfile({ ...profile, intent: e.target.value as RelationshipIntent })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-rose-500 focus:outline-none text-xs sm:text-sm text-stone-100"
            >
              {INTENT_OPTIONS.filter((opt) => !opt.startsWith('All')).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Bio */}
          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              About Me & Life Philosophy
            </label>
            <textarea
              rows={3}
              required
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-rose-500 focus:outline-none text-xs sm:text-sm text-stone-100 resize-none"
            />
          </div>

          {/* Ideal Partner Reflection */}
          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              What I seek most in a partner:
            </label>
            <textarea
              rows={2}
              value={profile.idealPartnerPrompt}
              onChange={(e) => setProfile({ ...profile, idealPartnerPrompt: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-rose-500 focus:outline-none text-xs sm:text-sm text-stone-100 resize-none"
              placeholder="e.g. Someone who communicates with empathy, loves quiet Sunday mornings..."
            />
          </div>

          <div className="pt-3 border-t border-stone-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs font-medium border border-stone-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-rose-950/40"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Profile</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
