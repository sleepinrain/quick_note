import type { Note } from "../types/note";
import { parseQuery } from "../search/parseQuery";
import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { NoteEditor } from "../components/NoteEditor";
import { NoteList } from "../components/NoteList";
import { getAppInfo, type AppInfo } from "../tauri/appInfo";
import { showQuickSearchWindow } from "../tauri/windows";
import {
  deleteNote as deleteStoredNote,
  insertNote,
  searchNotes,
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
  const [searchValue, setSearchValue] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [databaseStatus, setDatabaseStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);

  useEffect(() => {
    let isCurrent = true;

    setDatabaseStatus("loading");

    searchNotes(parseQuery(searchValue))
      .then((storedNotes) => {
        if (!isCurrent) {
          return;
        }

        setNotes(storedNotes);
        setSelectedNoteId((currentId) =>
          storedNotes.some((note) => note.id === currentId)
            ? currentId
            : storedNotes[0]?.id ?? null,
        );
        setDatabaseStatus("ready");
      })
      .catch((error) => {
        console.error("Failed to search notes", error);

        if (isCurrent) {
          setDatabaseStatus("error");
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [searchValue]);

  useEffect(() => {
    getAppInfo()
      .then(setAppInfo)
      .catch((error) => {
        console.error("Failed to load app info", error);
      });
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
          <p className="eyebrow">Stage 6</p>
          <div className="app-title">
            <h1>{appInfo?.name ?? "Quick Note"}</h1>
            {appInfo ? (
              <span className="app-version">v{appInfo.version}</span>
            ) : null}
          </div>
        </div>
        <div className="header-actions">
          <input
            className="search-input"
            type="search"
            aria-label="Search notes"
            placeholder="Search notes or #tag"
            value={searchValue}
            onChange={(event) => setSearchValue(event.currentTarget.value)}
          />
          <span className={`database-pill ${databaseStatus}`}>
            SQLite: {databaseStatus}
          </span>

          <button type="button" onClick={handleCreateNote}>
            New note
          </button>
          <button type="button" onClick={handleOpenQuickSearch}>
            Quick search
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

async function handleOpenQuickSearch() {
  try {
    await showQuickSearchWindow();
  } catch (error) {
    console.error("Failed to open quick search", error);
  }
}
