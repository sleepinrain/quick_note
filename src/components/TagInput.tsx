import { useEffect, useState } from "react";
import { normalizeTags } from "../tags/normalizeTags";

type TagInputProps = {
  tags: string[];
  onChange: (tags: string[]) => void;
};

export function TagInput({ tags, onChange }: TagInputProps) {
  const [value, setValue] = useState(tags.join(", "));

  useEffect(() => {
    setValue(tags.join(", "));
  }, [tags]);

  function handleBlur() {
    const normalizedTags = normalizeTags(value);

    setValue(normalizedTags.join(", "));
    onChange(normalizedTags);
  }

  return (
    <label className="field-group">
      <span>Tags</span>
      <input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        onBlur={handleBlur}
        placeholder="work, idea, todo"
      />
    </label>
  );
}
