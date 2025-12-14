'use client';

import { FilterOption } from '@/types';

type Props = {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
};

const OPTIONS: FilterOption[] = ['all', 'arabic', 'robusta'];

export function CoffeeFilter({ activeFilter, onFilterChange }: Props) {
  const activeIndex = OPTIONS.findIndex(x => x === activeFilter);

  return (
    <div
      className="relative flex h-[50px] rounded-full bg-[#383838] mb-8 [--option-width:110px] [--gap:10px] sm:[--option-width:154px] sm:[--gap:29px]"
      style={{
        width: `calc(
          (${OPTIONS.length} * var(--option-width)) +
          (${OPTIONS.length - 1} * var(--gap))
        )`,
      }}
    >
      <div
        className="absolute inset-y-0 rounded-full bg-white transition-transform duration-300"
        style={{
          width: 'var(--option-width)',
          transform: `translateX(calc(${activeIndex} * (var(--option-width) + var(--gap))))`,
        }}
      />

      {OPTIONS.map((option, i) => (
        <button
          key={option}
          onClick={() => onFilterChange(option)}
          className={`relative z-10 flex items-center justify-center font-medium transition-colors text-sm sm:text-base
            ${activeFilter === option ? 'text-[#101011]' : 'text-white hover:text-gray-300'}
          `}
          style={{
            width: 'var(--option-width)',
            marginRight: i < OPTIONS.length - 1 ? 'var(--gap)' : 0,
          }}
        >
          {option[0].toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
}