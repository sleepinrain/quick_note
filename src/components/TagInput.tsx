type TagInputProps = {
  tags: string[];
  onChange: (tags: string[]) => void;
};

function parseTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim().replace(/^#/, "").toLowerCase())
    .filter(Boolean)
    .filter((tag, index, tags) => tags.indexOf(tag) === index);
}

export function TagInput({ tags, onChange }: TagInputProps) {
  return (
    <label className="field-group">
      <span>Tags</span>
      <input
        value={tags.join(", ")}
        onChange={(event) => onChange(parseTags(event.currentTarget.value))}
        placeholder="work, idea, todo"
      />
    </label>
  );
}
