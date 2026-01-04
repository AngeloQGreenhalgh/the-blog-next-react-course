import { drizzle } from 'drizzle-orm/better-sqlite3';
import { postTable } from './schemas';
import Database from 'better-sqlite3';
import { resolve } from 'path';

const sqleDatabasePath = resolve(process.cwd(), 'db.sqlite3');
const sqleDatabase = new Database(sqleDatabasePath);

export const drizzleDb = drizzle(sqleDatabase, {
  schema: { posts: postTable },
  //logger: true,
});
