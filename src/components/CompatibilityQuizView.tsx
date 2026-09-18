import { useState } from 'react';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Heart,
  UserCheck,
} from 'lucide-react';
import { COMPATIBILITY_QUIZ_QUESTIONS } from '../data/quiz';
import { PartnerProfile } from '../types';

interface CompatibilityQuizViewProps {
  answers: Record<string, string>;
  onSaveAnswers: (answers: Record<string, string>) => void;
  partners: PartnerProfile[];
  onViewPartner: (partner: PartnerProfile) => void;
  onGoToDiscover: () => void;
}

export function CompatibilityQuizView({
  answers,
  onSaveAnswers,
  partners,
  onViewPartner,
  onGoToDiscover,
}: CompatibilityQuizViewProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(answers);
  const [isCompleted, setIsCompleted] = useState<boolean>(
    Object.keys(answers).length >= COMPATIBILITY_QUIZ_QUESTIONS.length
  );

  const question = COMPATIBILITY_QUIZ_QUESTIONS[currentIdx];
  const progressPercent = ((currentIdx + 1) / COMPATIBILITY_QUIZ_QUESTIONS.length) * 100;

  const handleSelectOption = (optionId: string) => {
    const updated = { ...selectedOptions, [question.id]: optionId };
    setSelectedOptions(updated);
  };

  const handleNext = () => {
    if (currentIdx < COMPATIBILITY_QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Finished all questions!
      onSaveAnswers(selectedOptions);
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleRetake = () => {
    setSelectedOptions({});
    setCurrentIdx(0);
    setIsCompleted(false);
  };

  // Sort partners by compatibility score
  const topMatches = [...partners].sort((a, b) => b.compatibilityScore - a.compatibilityScore);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Compass className="w-4 h-4 text-amber-400" />
          The Partner Compass • Values & Compatibility
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 tracking-tight">
          Calibrate Your Partner Compatibility
        </h1>
        <p className="text-sm sm:text-base text-stone-400 max-w-xl mx-auto leading-relaxed">
          Meaningful companionship isn’t about identical hobbies—it’s about aligned values, emotional pacing, and shared long-term life vision.
        </p>
      </div>

      {!isCompleted ? (
        /* Quiz Active Form */
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="font-medium text-stone-300">
                Question {currentIdx + 1} of {COMPATIBILITY_QUIZ_QUESTIONS.length}
              </span>
              <span className="text-rose-400 font-semibold uppercase tracking-wider text-[11px]">
                {question.category}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2 pt-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {question.question}
            </h2>
            <p className="text-sm text-stone-400">
              {question.subtitle}
            </p>
          </div>

          {/* Options Grid */}
          <div className="space-y-3 pt-2">
            {question.options.map((opt) => {
              const isSelected = selectedOptions[question.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  id={`quiz-opt-${opt.id}`}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                    isSelected
                      ? 'bg-rose-950/40 border-rose-500 text-white shadow-lg shadow-rose-950/30 ring-1 ring-rose-500/40'
                      : 'bg-stone-800/60 border-stone-800 hover:border-stone-700 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? 'border-rose-500 bg-rose-500 text-white'
                        : 'border-stone-600 bg-stone-900'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm sm:text-base font-semibold text-stone-100">
                      {opt.text}
                    </p>
                    <p className="text-xs text-stone-400 font-sans leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-800">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium border transition-colors ${
                currentIdx === 0
                  ? 'opacity-30 cursor-not-allowed border-transparent text-stone-500'
                  : 'border-stone-700 bg-stone-800 text-stone-300 hover:text-white'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              id="quiz-next-submit-btn"
              onClick={handleNext}
              disabled={!selectedOptions[question.id]}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-lg ${
                selectedOptions[question.id]
                  ? 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-rose-950/40 active:scale-95'
                  : 'opacity-40 cursor-not-allowed bg-stone-800 text-stone-500'
              }`}
            >
              <span>
                {currentIdx === COMPATIBILITY_QUIZ_QUESTIONS.length - 1
                  ? 'Complete & View Matches'
                  : 'Next Question'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Completed Results & Recommendations View */
        <div className="space-y-8 animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-rose-950/40">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Your Compass is Calibrated!
            </h2>
            <p className="text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
              We’ve weighted your core values, conflict resolution habits, and weekend rhythm against each potential partner in the network.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                id="view-curated-candidates-btn"
                onClick={onGoToDiscover}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-rose-950/40 flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Explore Calibrated Candidates</span>
              </button>

              <button
                onClick={handleRetake}
                className="px-5 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700/80 text-stone-300 font-medium text-xs sm:text-sm transition-colors border border-stone-700 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>

          {/* Top 3 Highest Matched Partners */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                Your Highest Aligned Candidates
              </h3>
              <span className="text-xs text-stone-400">Based on your 5 answers</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topMatches.slice(0, 3).map((partner) => (
                <div
                  key={partner.id}
                  onClick={() => onViewPartner(partner)}
                  className="group bg-stone-900 border border-stone-800 hover:border-rose-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-xl p-4 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-950">
                      <img
                        src={partner.photos[0]}
                        alt={partner.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-[11px] font-bold text-rose-300 border border-rose-500/30">
                        {partner.compatibilityScore}% Sync
                      </div>
                    </div>

                    <div>
                      <h4 className="font-serif font-bold text-lg text-white group-hover:text-rose-300 transition-colors">
                        {partner.name}, {partner.age}
                      </h4>
                      <p className="text-xs text-stone-400">
                        {partner.occupation} • {partner.location}
                      </p>
                    </div>

                    <p className="text-xs text-stone-300 line-clamp-2 italic">
                      "{partner.prompts[0]?.answer}"
                    </p>
                  </div>

                  <button className="w-full py-2 px-3 rounded-xl bg-stone-800 group-hover:bg-rose-600 text-xs font-semibold text-stone-200 group-hover:text-white transition-colors flex items-center justify-center gap-1.5">
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
