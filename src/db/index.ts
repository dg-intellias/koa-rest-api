import { promises as fs } from 'node:fs';
import path from 'path';

const databasePath = path.resolve('src/db/usersDb.json');

export async function readDatabase() {
  const data = await fs.readFile(databasePath, 'utf-8');

  return JSON.parse(data);
}

export async function writeDatabase(users: object[]): Promise<void> {
  await fs.writeFile(databasePath, JSON.stringify(users, null, 2));
}
