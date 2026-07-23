import type { Note } from "../types/note";
import { getDatabase } from "./client";
import { replaceNoteTags } from "./tags";

type NoteRow = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  tag_name: string | null;
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
    SELECT
      n.id,
      n.title,
      n.content,
      n.created_at,
      n.updated_at,
      t.name AS tag_name
    FROM notes AS n
    LEFT JOIN note_tags AS nt ON nt.note_id = n.id
    LEFT JOIN tags AS t ON t.id = nt.tag_id
    ORDER BY n.updated_at DESC, t.name ASC
    `,
  );

  const notesById = new Map<string, Note>();

  for (const row of rows) {
    let note = notesById.get(row.id);

    if (!note) {
      note = rowToNote(row);
      notesById.set(row.id, note);
    }

    if (row.tag_name !== null) {
      note.tags.push(row.tag_name);
    }
  }

  return [...notesById.values()];
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
  await replaceNoteTags(note.id, note.tags);
}

export async function deleteNote(noteId: string): Promise<void> {
  const db = await getDatabase();

  await db.execute("DELETE FROM notes WHERE id = $1", [noteId]);
}