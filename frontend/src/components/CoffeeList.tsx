'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { CoffeeFilter } from '@/components/CoffeeFilter';
import { FilterOption, Item } from '@/types';

type Props = {
    items: Item[];
};

export default function CoffeeList({ items }: Props) {
    const [filter, setFilter] = useState<FilterOption>('all');

    const filteredCoffees = items.filter((coffee) => {
        if (filter === 'all') return true;
        return coffee.type === filter;
    });

    return (
        <main className="bg-[#101011]">
            <section className="max-w-[1440px] mx-auto px-6 py-28 md:px-12 md:py-32 lg:px-20 lg:py-40 text-white flex flex-col items-center">
                <h2 className="font-bebas text-[32px] sm:text-[40px] md:text-[50px] mb-4">MVST. EXCLUSIVE COFFEE</h2>

                <CoffeeFilter activeFilter={filter} onFilterChange={setFilter} />

                {filteredCoffees.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4 w-full place-items-center md:place-items-stretch">
                        {filteredCoffees.map(({ id, ...rest }) => (
                            <Card key={id} {...rest} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full h-[300px] md:h-[490px] bg-[#191919] rounded-md mt-4 flex items-center justify-center">
                        <p className="text-[#909090] text-xl">No results</p>
                    </div>
                )}
            </section>
        </main>
    );
}
