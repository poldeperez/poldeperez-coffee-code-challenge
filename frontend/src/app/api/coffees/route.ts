import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all coffees
export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM coffees ORDER BY id DESC'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Failed to fetch coffees:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coffees' },
      { status: 500 }
    );
  }
}

// POST new coffee
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, imageUrl, price, type } = body;

    // Validate required fields
    if (!title || !description || !imageUrl || !price || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check coffees with same name
    const existingCoffee = await pool.query(
      'SELECT id FROM coffees WHERE LOWER(title) = LOWER($1)',
      [title.trim()]
    );

    if (existingCoffee.rows.length > 0) {
      return NextResponse.json(
        { error: 'A coffee with the same name already exists' },
        { status: 409 }
      );
    }

    const result = await pool.query(
      `INSERT INTO coffees (title, description, image_url, price, type)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, description, image_url as "imageUrl", price, type`,
      [title, description, imageUrl, price, type]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Failed to create coffee:', error);
    return NextResponse.json(
      { error: 'Failed to create coffee' },
      { status: 500 }
    );
  }
}