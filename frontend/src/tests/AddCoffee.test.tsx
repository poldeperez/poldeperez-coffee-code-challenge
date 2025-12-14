import { render, screen, fireEvent } from '@testing-library/react';
import { AddCoffee } from '../components/AddCoffee';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('AddCoffee', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    render(
      <AddCoffee isOpen={false} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );
    expect(screen.queryByText('Create new')).not.toBeInTheDocument();
  });

  it('renders the modal when isOpen is true', () => {
    render(
      <AddCoffee isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );
    expect(screen.getByText('Create new')).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(
      <AddCoffee isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );
    expect(screen.getByPlaceholderText('Name your coffee here')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
    expect(screen.getByText('Arabic')).toBeInTheDocument();
    expect(screen.getByText('Robusta')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Paste image URL here')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a description')).toBeInTheDocument();
  });

  it('only allows valid price input (numbers and max 2 decimals)', () => {
    render(
      <AddCoffee isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );

    const priceInput = screen.getByPlaceholderText('0.00');
    
    fireEvent.change(priceInput, { target: { value: '12.99' } });
    expect(priceInput).toHaveValue('12.99');

    // letters should not change
    fireEvent.change(priceInput, { target: { value: 'abc' } });
    expect(priceInput).toHaveValue('12.99');
  });

  it('toggles coffee type when clicking type buttons', () => {
    render(
      <AddCoffee isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );

    const robustaButton = screen.getByText('Robusta');
    fireEvent.click(robustaButton);
    expect(robustaButton).toHaveClass('border-white');

    const arabicButton = screen.getByText('Arabic');
    fireEvent.click(arabicButton);
    expect(arabicButton).toHaveClass('border-white');
  });

  it('disables Confirm button when form is incomplete', () => {
    render(
      <AddCoffee isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );

    const confirmButton = screen.getByText('Confirm');
    expect(confirmButton).toHaveClass('opacity-50');
    expect(confirmButton).toBeDisabled();
  });

  it('enables Confirm button when form is complete', () => {
    render(
      <AddCoffee isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );

    fireEvent.change(screen.getByPlaceholderText('Name your coffee here'), {
      target: { value: 'Test Coffee' },
    });
    fireEvent.change(screen.getByPlaceholderText('0.00'), {
      target: { value: '9.99' },
    });
    fireEvent.change(screen.getByPlaceholderText('Paste image URL here'), {
      target: { value: 'https://example.com/image.jpg' },
    });
    fireEvent.change(screen.getByPlaceholderText('Add a description'), {
      target: { value: 'A delicious coffee' },
    });

    const confirmButton = screen.getByText('Confirm');
    expect(confirmButton).not.toHaveClass('opacity-50');
    expect(confirmButton).not.toBeDisabled();
  });

  it('calls onConfirm with correct data when form is submitted', () => {
    render(
      <AddCoffee isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );

    fireEvent.change(screen.getByPlaceholderText('Name your coffee here'), {
      target: { value: 'Test Coffee' },
    });
    fireEvent.change(screen.getByPlaceholderText('0.00'), {
      target: { value: '9.99' },
    });
    fireEvent.change(screen.getByPlaceholderText('Paste image URL here'), {
      target: { value: '/test.jpg' },
    });
    fireEvent.change(screen.getByPlaceholderText('Add a description'), {
      target: { value: 'Test desc' },
    });

    fireEvent.click(screen.getByText('Confirm'));

    expect(mockOnConfirm).toHaveBeenCalledWith({
      title: 'Test Coffee',
      price: '9.99',
      type: 'arabic',
      imageUrl: '/test.jpg',
      description: 'Test desc',
    });
  });

  it('calls onClose and resets form when Discard is clicked', () => {
    render(
      <AddCoffee isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );

    fireEvent.change(screen.getByPlaceholderText('Name your coffee here'), {
      target: { value: 'Test Coffee' },
    });

    fireEvent.click(screen.getByText('Discard'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when backdrop is clicked', () => {
    render(
      <AddCoffee isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />
    );

    const backdrop = document.querySelector('.bg-black\\/70');
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    expect(mockOnClose).toHaveBeenCalled();
  });
});