export function normalizeTags(value: string): string[] {
  const normalizedTags = value
    .split(",")
    .map((tag) =>
      tag.trim().replace(/^#+/, "").trim().toLowerCase(),
    )
    .filter(Boolean);

  return [...new Set(normalizedTags)];
}