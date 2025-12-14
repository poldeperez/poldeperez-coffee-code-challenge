'use client';

import CoffeeList from '@/components/CoffeeList';
import { fetchItems } from '@/services/fetchItems';
import { HeroSection } from '@/components/HeroSection';
import { useEffect, useState } from 'react';
import { Item } from '@/types';
import Lenis from 'lenis';

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Fetch coffe list
    fetchItems().then(setItems);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <HeroSection />
      <CoffeeList items={items} />
    </>
  );
}
