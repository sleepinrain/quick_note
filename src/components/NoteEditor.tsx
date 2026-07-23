import type { Note } from "../types/note";
import { TagInput } from "./TagInput";

type NoteEditorProps = {
  note: Note;
  onUpdateNote: (updates: Pick<Note, "title" | "content" | "tags">) => void;
  onDeleteNote: () => void;
  onSaveNote: () => void;
  onSaveTags: (tags: string[]) => void;
};

export function NoteEditor({
  note,
  onUpdateNote,
  onDeleteNote,
  onSaveNote,
  onSaveTags,
}: NoteEditorProps) {
  return (
    <section className="note-editor">
      <div className="editor-toolbar">
        <div>
          <p className="eyebrow">Editing</p>
          <h2>{note.title || "Untitled note"}</h2>
        </div>
        <button type="button" className="danger-button" onClick={onDeleteNote}>
          Delete
        </button>
      </div>

      <label className="field-group">
        <span>Title</span>
        <input
          value={note.title}
          onBlur={onSaveNote}
          onChange={(event) =>
            onUpdateNote({
              title: event.currentTarget.value,
              content: note.content,
              tags: note.tags,
            })
          }
          placeholder="Note title"
        />
      </label>

      <label className="field-group">
        <span>Content</span>
        <textarea
          value={note.content}
          onBlur={onSaveNote}
          onChange={(event) =>
            onUpdateNote({
              title: note.title,
              content: event.currentTarget.value,
              tags: note.tags,
            })
          }
          placeholder="Write a short note..."
        />
      </label>

      <TagInput
        tags={note.tags}
        onChange={onSaveTags}
      />
    </section>
  );
}
