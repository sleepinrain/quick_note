import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { NoteEditor } from "../components/NoteEditor";
import { NoteList } from "../components/NoteList";
import type { Note } from "../types/note";
import {
  deleteNote as deleteStoredNote,
  insertNote,
  listNotes,
  updateNote as updateStoredNote,
} from "../db/notes";

function buildNewNote(): Note {
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

    listNotes()
      .then((storedNotes) => {
        if (isMounted) {
          setNotes(storedNotes);
          setSelectedNoteId(storedNotes[0]?.id ?? null);
          setDatabaseStatus("ready");
        }
      })
      .catch((error) => {
        console.error("Failed to load notes", error);

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

  async function handleCreateNote() {
    const note = buildNewNote();

    try {
      await insertNote(note);
      setNotes((currentNotes) => [note, ...currentNotes]);
      setSelectedNoteId(note.id);
    } catch (error) {
      console.error("Failed to create note", error);
      setDatabaseStatus("error");
    }
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

  async function handleSaveNote() {
    if (!selectedNote) {
      return;
    }

    try {
      await updateStoredNote(selectedNote);
    } catch (error) {
      console.error("Failed to save note", error);
      setDatabaseStatus("error");
    }
  }

  async function handleSaveTags(tags: string[]) {
    if (!selectedNote) {
      return;
    }

    const noteToSave: Note = {
      ...selectedNote,
      tags,
      updatedAt: new Date().toISOString(),
    };

    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === noteToSave.id ? noteToSave : note,
      ),
    );

    try {
      await updateStoredNote(noteToSave);
    } catch (error) {
      console.error("Failed to save tags", error);
      setDatabaseStatus("error");
    }
  }

  async function handleDeleteNote() {
    if (!selectedNoteId) {
      return;
    }

    const noteId = selectedNoteId;

    try {
      await deleteStoredNote(noteId);

      const nextNotes = notes.filter((note) => note.id !== noteId);
      setNotes(nextNotes);
      setSelectedNoteId(nextNotes[0]?.id ?? null);
    } catch (error) {
      console.error("Failed to delete note", error);
      setDatabaseStatus("error");
    }
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
            onSaveNote={handleSaveNote}
            onDeleteNote={handleDeleteNote}
            onSaveTags={handleSaveTags}
          />
        ) : (
          <EmptyState onCreateNote={handleCreateNote} />
        )}
      </section>
    </main>
  );
}
