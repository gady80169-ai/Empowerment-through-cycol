import { useState } from 'react';
import { X, Calendar, MapPin, Clock, Coffee, Heart, Send } from 'lucide-react';
import { PartnerProfile } from '../types';

interface DateProposalModalProps {
  partner: PartnerProfile | null;
  onClose: () => void;
  onSubmitProposal: (
    partnerId: string,
    proposal: { title: string; location: string; time: string; note: string }
  ) => void;
}

const DATE_IDEAS = [
  {
    title: 'Specialty Pour-Over & Coastal Walk',
    location: 'Saint Frank Coffee & Crissy Field Promenade',
    defaultTime: 'Saturday at 10:30 AM',
  },
  {
    title: 'Botanical Garden Stroll & Tea',
    location: 'Conservatory of Flowers & Japanese Tea Garden',
    defaultTime: 'Sunday at 2:00 PM',
  },
  {
    title: 'Cozy Bookstore & Neighborhood Bistro',
    location: 'City Lights Books & Tosca Cafe',
    defaultTime: 'Thursday at 6:30 PM',
  },
  {
    title: 'Farmers Market Breakfast & Flower Market',
    location: 'Ferry Building Farmers Market',
    defaultTime: 'Saturday at 9:30 AM',
  },
];

export function DateProposalModal({
  partner,
  onClose,
  onSubmitProposal,
}: DateProposalModalProps) {
  if (!partner) return null;

  const [selectedIdea, setSelectedIdea] = useState(DATE_IDEAS[0]);
  const [title, setTitle] = useState(DATE_IDEAS[0].title);
  const [location, setLocation] = useState(DATE_IDEAS[0].location);
  const [time, setTime] = useState(DATE_IDEAS[0].defaultTime);
  const [note, setNote] = useState(
    `Hi ${partner.name.split(' ')[0]}, I'd love to meet up in person for a relaxed, low-pressure conversation!`
  );

  const handleSelectIdea = (idea: typeof DATE_IDEAS[0]) => {
    setSelectedIdea(idea);
    setTitle(idea.title);
    setLocation(idea.location);
    setTime(idea.defaultTime);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitProposal(partner.id, { title, location, time, note });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in">
      <div
        className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-stone-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-white">
                Plan a Meetup with {partner.name}
              </h3>
              <p className="text-xs text-stone-400">
                Low-pressure, thoughtful first date proposal
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

        {/* Preset Idea Chips */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-stone-300">
            Select a curated date vibe:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {DATE_IDEAS.map((idea, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectIdea(idea)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-colors ${
                  selectedIdea.title === idea.title
                    ? 'bg-amber-500/15 border-amber-500 text-amber-200 font-medium'
                    : 'bg-stone-800/60 border-stone-700/60 text-stone-300 hover:bg-stone-800'
                }`}
              >
                {idea.title}
              </button>
            ))}
          </div>
        </div>

        {/* Date Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              Date Activity Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 focus:outline-none text-xs sm:text-sm text-stone-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">
                Location / Venue
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 focus:outline-none text-xs text-stone-100"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">
                Suggested Day & Time
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 focus:outline-none text-xs text-stone-100"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              Personal Note / Invitation Message
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 focus:outline-none text-xs text-stone-100 resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs font-medium border border-stone-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-950/40"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Invitation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
