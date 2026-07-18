import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { NoteEditor } from "../components/NoteEditor";
import { NoteList } from "../components/NoteList";
import type { Note } from "../types/note";
import { getDatabase } from "../db/client";

function createNote(): Note {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    title: "",
    content: "",
    tags: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function MainWindow() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [databaseStatus, setDatabaseStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");

  useEffect(() => {
    let isMounted = true;

    getDatabase()
      .then(() => {
        if (isMounted) {
          setDatabaseStatus("ready");
        }
      })
      .catch((error) => {
        console.error("Failed to initialize database", error);

        if (isMounted) {
          setDatabaseStatus("error");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedNote = useMemo(
    () => notes.find((note) => note.id === selectedNoteId) ?? null,
    [notes, selectedNoteId],
  );

  function handleCreateNote() {
    const note = createNote();
    setNotes((currentNotes) => [note, ...currentNotes]);
    setSelectedNoteId(note.id);
  }

  function handleUpdateNote(updates: Pick<Note, "title" | "content" | "tags">) {
    if (!selectedNoteId) {
      return;
    }

    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === selectedNoteId
          ? {
            ...note,
            ...updates,
            updatedAt: new Date().toISOString(),
          }
          : note,
      ),
    );
  }

  function handleDeleteNote() {
    if (!selectedNoteId) {
      return;
    }

    setNotes((currentNotes) => {
      const nextNotes = currentNotes.filter((note) => note.id !== selectedNoteId);
      setSelectedNoteId(nextNotes[0]?.id ?? null);
      return nextNotes;
    });
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Stage 4</p>
          <h1>Quick Note</h1>
        </div>
        <div className="header-actions">
          <span className={`database-pill ${databaseStatus}`}>
            SQLite: {databaseStatus}
          </span>

          <button type="button" onClick={handleCreateNote}>
            New note
          </button>
        </div>
      </header>

      <section className="workspace">
        <NoteList
          notes={notes}
          selectedNoteId={selectedNoteId}
          onSelectNote={setSelectedNoteId}
        />

        {selectedNote ? (
          <NoteEditor
            note={selectedNote}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
          />
        ) : (
          <EmptyState onCreateNote={handleCreateNote} />
        )}
      </section>
    </main>
  );
}
