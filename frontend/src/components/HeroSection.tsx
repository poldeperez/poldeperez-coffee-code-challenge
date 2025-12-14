'use client';

import { useAddCoffee } from '@/context/AddCoffeeContext';

export function HeroSection() {
  const { openPopup } = useAddCoffee();

  return (
    <section
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-radial from-black/60 to-[#101011]"/>

      <div className="relative z-10 flex h-full max-w-[1440px] mx-auto items-center justify-center md:justify-start px-10">
        <div className="max-w-2xl text-center md:text-left">
          <h1 className="font-bebas text-[64px] md:text-[130px] font-bold text-white">
            ROASTED COFFEE
          </h1>
          <p className="text-[20px] text-[#938E8E] mb-6">
            Choose a coffee from below or create your own.
          </p>
          <button className="relative overflow-hidden group bg-[#BA8039] text-white py-3.5 px-8 rounded-full transition-colors curtain-hover"
            onClick={openPopup}>
            <span className="relative z-10">Create your own coffee</span>
          </button>
        </div>
      </div>
    </section>
  );
}