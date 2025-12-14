import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CoffeeList from '../components/CoffeeList';
import { Item } from '@/types';

describe('CoffeeList Integration', () => {
  const mockItems: Item[] = [
    {
      id: '1',
      title: 'Coffee bag',
      description: 'Test desc',
      imageUrl: 'https://epacflexibles.com/wp-content/uploads/2020/04/coffee_bag_mockup.png',
      price: '12.99',
      type: 'arabic',
    },
    {
      id: '2',
      title: 'Espresso',
      description: 'Test desc',
      imageUrl: 'https://purepng.com/public/uploads/large/purepng.com-cup-mug-coffeecupmufcoffeebean-1411527406201d2571.png',
      price: '1.99',
      type: 'robusta',
    },
  ];

  it('renders all coffee items', () => {
    render(<CoffeeList items={mockItems} />);

    expect(screen.getByText('Coffee bag')).toBeInTheDocument();
    expect(screen.getByText('Espresso')).toBeInTheDocument();
  });

  it('filters coffees by type', async () => {
    render(<CoffeeList items={mockItems} />);

    const arabicFilter = screen.getByRole('button', { name: 'Arabic' });
    fireEvent.click(arabicFilter);

    await waitFor(() => {
      expect(screen.getByText('Coffee bag')).toBeInTheDocument();
      expect(screen.queryByText('Espresso')).not.toBeInTheDocument();
    });
  });

  it('shows all coffees when "All" filter is selected', async () => {
    render(<CoffeeList items={mockItems} />);

    const allFilter = screen.getByRole('button', { name: 'All' });
    fireEvent.click(allFilter);

    await waitFor(() => {
      expect(screen.getByText('Coffee bag')).toBeInTheDocument();
      expect(screen.getByText('Espresso')).toBeInTheDocument();
    });
  });

  it('displays empty state when no items', () => {
    render(<CoffeeList items={[]} />);

    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });
});