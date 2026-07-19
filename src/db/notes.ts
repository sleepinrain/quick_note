import type { Note } from "../types/note";
import { getDatabase } from "./client";

type NoteRow = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

function rowToNote(row: NoteRow): Note {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    tags: [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listNotes(): Promise<Note[]> {
  const db = await getDatabase();

  const rows = await db.select<NoteRow[]>(
    `
    SELECT id, title, content, created_at, updated_at
    FROM notes
    ORDER BY updated_at DESC
    `,
  );

  return rows.map(rowToNote);
}

export async function insertNote(note: Note): Promise<void> {
  const db = await getDatabase();

  await db.execute(
    `
    INSERT INTO notes (id, title, content, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5)
    `,
    [note.id, note.title, note.content, note.createdAt, note.updatedAt],
  );
}

export async function updateNote(note: Note): Promise<void> {
  const db = await getDatabase();

  await db.execute(
    `
    UPDATE notes
    SET title = $1, content = $2, updated_at = $3
    WHERE id = $4
    `,
    [note.title, note.content, note.updatedAt, note.id],
  );
}

export async function deleteNote(noteId: string): Promise<void> {
  const db = await getDatabase();

  await db.execute("DELETE FROM notes WHERE id = $1", [noteId]);
}