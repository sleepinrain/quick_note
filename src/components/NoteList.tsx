import type { Note } from "../types/note";

type NoteListProps = {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (noteId: string) => void;
};

function formatPreview(note: Note) {
  if (note.content.trim()) {
    return note.content.trim();
  }

  return "No content yet.";
}

export function NoteList({
  notes,
  selectedNoteId,
  onSelectNote,
}: NoteListProps) {
  return (
    <aside className="note-list" aria-label="Notes">
      {notes.length === 0 ? (
        <p className="list-empty">No notes yet.</p>
      ) : (
        notes.map((note) => (
          <button
            type="button"
            key={note.id}
            className={
              note.id === selectedNoteId ? "note-list-item active" : "note-list-item"
            }
            onClick={() => onSelectNote(note.id)}
          >
            <strong>{note.title || "Untitled note"}</strong>
            <span>{formatPreview(note)}</span>
            {note.tags.length > 0 ? (
              <small>{note.tags.map((tag) => `#${tag}`).join(" ")}</small>
            ) : null}
          </button>
        ))
      )}
    </aside>
  );
}
