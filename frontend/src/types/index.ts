export type FilterOption = 'all' | 'arabic' | 'robusta';

export type Item = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  type: 'arabic' | 'robusta';
};