import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2';
import * as dotenv from 'dotenv';
import * as schema from './schema';

dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const connection = mysql.createConnection(process.env.DATABASE_URL);

// Should change to planetscale when using planetscale
export const db = drizzle(connection, { schema, mode: 'default' });
