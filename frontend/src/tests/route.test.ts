import { GET, POST } from '../app/api/coffees/route';
import pool from '@/lib/db';

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: any, init?: { status?: number }) => {
      return {
        json: async () => data,
        status: init?.status ?? 200,
      };
    },
  },
}));

// Mock the database pool
jest.mock('@/lib/db', () => ({
  query: jest.fn(),
}));

describe('Coffees API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('returns all coffees', async () => {
      const mockCoffees = [
        { id: 1, title: 'Test Coffee', description: 'Test', image_url: '/test.jpg', price: '9.99', type: 'arabic' },
      ];
      (pool.query as jest.Mock).mockResolvedValue({ rows: mockCoffees });

      const response = await GET();
      const data = await response.json();

      expect(data).toEqual(mockCoffees);
      expect(response.status).toBe(200);
    });

    it('returns 500 on database error', async () => {
      (pool.query as jest.Mock).mockRejectedValue(new Error('DB Error'));

      const response = await GET();
      const data = await response.json();

      expect(data.error).toBe('Failed to fetch coffees');
      expect(response.status).toBe(500);
    });
  });

  describe('POST', () => {
    it('creates a new coffee', async () => {
      const newCoffee = {
        title: 'New Coffee',
        description: 'Delicious',
        imageUrl: '/new.jpg',
        price: '12.99',
        type: 'robusta',
      };

      (pool.query as jest.Mock)
        .mockResolvedValueOnce({ rows: [] }) // No existing coffee
        .mockResolvedValueOnce({
          rows: [{ id: 1, ...newCoffee, image_url: newCoffee.imageUrl }],
        });

      const request = new Request('http://localhost/api/coffees', {
        method: 'POST',
        body: JSON.stringify(newCoffee),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.title).toBe('New Coffee');
      expect(response.status).toBe(201);
    });

    it('returns 400 when required fields are missing', async () => {
      const request = new Request('http://localhost/api/coffees', {
        method: 'POST',
        body: JSON.stringify({ title: 'Test' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.error).toBe('Missing required fields');
      expect(response.status).toBe(400);
    });

    it('returns 409 when coffee with same name exists', async () => {
      const newCoffee = {
        title: 'Existing Coffee',
        description: 'Delicious',
        imageUrl: '/new.jpg',
        price: '12.99',
        type: 'robusta',
      };

      (pool.query as jest.Mock).mockResolvedValueOnce({
        rows: [{ id: 1 }], // Existing coffee found
      });

      const request = new Request('http://localhost/api/coffees', {
        method: 'POST',
        body: JSON.stringify(newCoffee),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.error).toBe('A coffee with the same name already exists');
      expect(response.status).toBe(409);
    });
  });
});