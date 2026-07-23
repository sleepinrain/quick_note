import { getDatabase } from "./client";

export async function replaceNoteTags(
  noteId: string,
  tagNames: string[],
): Promise<void> {
  const db = await getDatabase();

  await db.execute(
    "DELETE FROM note_tags WHERE note_id = $1",
    [noteId],
  );

  for (const name of tagNames) {
    const tagId = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await db.execute(
      `
      INSERT INTO tags (id, name, created_at)
      VALUES ($1, $2, $3)
      ON CONFLICT(name) DO NOTHING
      `,
      [tagId, name, createdAt],
    );

    await db.execute(
      `
      INSERT OR IGNORE INTO note_tags (note_id, tag_id)
      SELECT $1, id
      FROM tags
      WHERE name = $2
      `,
      [noteId, name],
    );
  }
}
