type EmptyStateProps = {
  onCreateNote: () => void;
};

export function EmptyState({ onCreateNote }: EmptyStateProps) {
  return (
    <section className="empty-state">
      <p className="eyebrow">No note selected</p>
      <h2>Start with a quick note.</h2>
      <p>
        Create a note, add a few tags, and switch between notes from the list.
      </p>
      <button type="button" onClick={onCreateNote}>
        New note
      </button>
    </section>
  );
}
