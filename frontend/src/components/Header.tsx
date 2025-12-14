'use client';

import Link from 'next/link';
import { useAddCoffee } from '@/context/AddCoffeeContext';

export function Header() {
  const { openPopup } = useAddCoffee();

  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <nav className="max-w-[1440px] mx-auto px-6 md:px-10 py-6 flex items-center justify-between">
        <Link href="/" className="text-[#FAFFFC] hover:text-gray-200 transition-colors">
          <span className="text-3xl">MVST</span>
          <span className="text-xl ml-1">Coffee</span>
        </Link>
        <button 
          className="relative overflow-hidden group bg-[#BA8039] text-white text-[14px] py-2 px-6 rounded-full transition-colors curtain-hover"
          onClick={openPopup}
        >
          <span className="relative z-10">Create</span>
        </button>
      </nav>
    </header>
  );
}