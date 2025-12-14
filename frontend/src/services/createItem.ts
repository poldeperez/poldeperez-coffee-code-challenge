import { Item } from '@/types';

export async function createItem(coffee: Omit<Item, 'id'>): Promise<Item> {
  const res = await fetch('/api/coffees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(coffee),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to create coffee');
  }

  return await res.json();
}