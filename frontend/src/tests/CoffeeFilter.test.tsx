import { render, screen, fireEvent } from '@testing-library/react';
import { CoffeeFilter } from '../components/CoffeeFilter';

describe('CoffeeFilter', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all filter options', () => {
    render(
      <CoffeeFilter activeFilter="all" onFilterChange={mockOnFilterChange} />
    );
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Arabic')).toBeInTheDocument();
    expect(screen.getByText('Robusta')).toBeInTheDocument();
  });

  it('highlights the active filter', () => {
    render(
      <CoffeeFilter activeFilter="arabic" onFilterChange={mockOnFilterChange} />
    );
    const arabicButton = screen.getByText('Arabic');
    expect(arabicButton).toHaveClass('text-[#101011]');
  });

  it('calls onFilterChange when a filter is clicked', () => {
    render(
      <CoffeeFilter activeFilter="all" onFilterChange={mockOnFilterChange} />
    );

    fireEvent.click(screen.getByText('Robusta'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('robusta');
  });
});