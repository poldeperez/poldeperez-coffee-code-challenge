import { Pool } from 'pg';

const globalForDb = globalThis as unknown as { pool: Pool | undefined };

const pool = globalForDb.pool ?? new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'mvst-coffee-challenge-db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
});

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pool = pool;
}

export default pool;