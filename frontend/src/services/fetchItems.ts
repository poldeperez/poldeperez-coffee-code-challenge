import { Item } from '@/types';

export async function fetchItems(): Promise<Item[]> {
  const res = await fetch('http://localhost:3000/api/coffees', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch coffees');
  }

  const data = await res.json();

  // Map image_url to imageUrl
  return data.map((item: any) => ({
    ...item,
    imageUrl: item.image_url,
    image_url: undefined,
  }));
}
