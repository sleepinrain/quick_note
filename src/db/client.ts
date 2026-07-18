import Database from "@tauri-apps/plugin-sql";
import { DATABASE_SCHEMA } from "./schema";

type SqlDatabase = Awaited<ReturnType<typeof Database.load>>;

let databasePromise: Promise<SqlDatabase> | null = null;

async function initializeDatabase() {
  const db = await Database.load("sqlite:quick_note.db");

  await db.execute("PRAGMA foreign_keys = ON");

  for (const statement of DATABASE_SCHEMA) {
    await db.execute(statement);
  }

  return db;
}

export function getDatabase() {
  databasePromise ??= initializeDatabase();
  return databasePromise;
}
