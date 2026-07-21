import { normalizeTags } from "../tags/normalizeTags";

type TagInputProps = {
  tags: string[];
  onChange: (tags: string[]) => void;
};

export function TagInput({ tags, onChange }: TagInputProps) {
  return (
    <label className="field-group">
      <span>Tags</span>
      <input
        value={tags.join(", ")}
        onChange={(event) =>
          onChange(normalizeTags(event.currentTarget.value))
        }
        placeholder="work, idea, todo"
      />
    </label>
  );
}
