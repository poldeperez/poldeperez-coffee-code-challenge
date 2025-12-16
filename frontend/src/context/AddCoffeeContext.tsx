'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { createItem } from '@/services/createItem';
import { AddCoffee } from '@/components/AddCoffee';
import { ErrorBanner } from '@/components/ErrorBanner';
import { Item } from '@/types';

type AddCoffeeContextType = {
  openPopup: () => void;
  closePopup: () => void;
};

const AddCoffeeContext = createContext<AddCoffeeContextType | null>(null);

export function AddCoffeeProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const handleAddCoffee = async (coffee: Omit<Item, 'id'>) => {
    try {
      setError(null);
      await createItem(coffee);
      closePopup();
      window.location.reload(); 
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create coffee');
      }
    }
  };

  return (
    <AddCoffeeContext.Provider value={{ openPopup, closePopup }}>
      {children}
      <ErrorBanner message={error} onClose={() => setError(null)} />
      <AddCoffee isOpen={isOpen} onClose={closePopup} onConfirm={handleAddCoffee}/>
    </AddCoffeeContext.Provider>
  );
}

export function useAddCoffee() {
  const context = useContext(AddCoffeeContext);
  if (!context) {
    throw new Error('useAddCoffee must be used within an AddCoffeeProvider');
  }
  return context;
}