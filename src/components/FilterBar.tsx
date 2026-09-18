import { SlidersHorizontal, Search, RotateCcw, Sparkles } from 'lucide-react';
import { FilterOptions } from '../types';
import { ALL_INTERESTS_LIST, INTENT_OPTIONS } from '../data/partners';

interface FilterBarProps {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  onResetFilters: () => void;
  activeMatchesCount: number;
}

export function FilterBar({
  filters,
  setFilters,
  onResetFilters,
  activeMatchesCount,
}: FilterBarProps) {
  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Search & Main Selectors */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
          <input
            id="candidate-search-input"
            type="text"
            placeholder="Search candidates by name, value, or occupation..."
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-rose-500 focus:outline-none text-xs sm:text-sm text-stone-100 placeholder-stone-500"
          />
        </div>

        {/* Intent dropdown */}
        <div className="w-full md:w-56">
          <select
            id="intent-filter-select"
            value={filters.intent}
            onChange={(e) => setFilters({ ...filters, intent: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-rose-500 focus:outline-none text-xs text-stone-200"
          >
            {INTENT_OPTIONS.map((intent) => (
              <option key={intent} value={intent}>
                {intent}
              </option>
            ))}
          </select>
        </div>

        {/* Interests dropdown */}
        <div className="w-full md:w-52">
          <select
            id="interest-filter-select"
            value={filters.selectedInterest}
            onChange={(e) => setFilters({ ...filters, selectedInterest: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-rose-500 focus:outline-none text-xs text-stone-200"
          >
            {ALL_INTERESTS_LIST.map((int) => (
              <option key={int} value={int}>
                {int}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sliders: Min Score & Max Distance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2 border-t border-stone-800/80 items-center">
        {/* Min Compatibility Slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              Min Compatibility:
            </span>
            <span className="font-semibold text-rose-300">
              {filters.minScore}%+
            </span>
          </div>
          <input
            type="range"
            min={70}
            max={95}
            step={1}
            value={filters.minScore}
            onChange={(e) => setFilters({ ...filters, minScore: Number(e.target.value) })}
            className="w-full accent-rose-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Max Distance Slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-400">Max Distance:</span>
            <span className="font-semibold text-stone-200">
              Within {filters.maxDistance} miles
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            step={5}
            value={filters.maxDistance}
            onChange={(e) => setFilters({ ...filters, maxDistance: Number(e.target.value) })}
            className="w-full accent-rose-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Match Count & Reset */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0">
          <span className="text-xs text-stone-400">
            Showing <strong className="text-stone-100">{activeMatchesCount}</strong> candidate{activeMatchesCount !== 1 ? 's' : ''}
          </span>
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 px-2.5 py-1.5 rounded-lg bg-stone-800/60 hover:bg-stone-800 border border-stone-700/50 transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
