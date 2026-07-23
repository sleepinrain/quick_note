export type ParsedQuery =
  | { type: "recent" }
  | { type: "tag"; value: string }
  | { type: "text"; value: string };

export function parseQuery(input: string): ParsedQuery {
  const value = input.trim();

  if (!value) {
    return { type: "recent" };
  }

  if (value.startsWith("#")) {
    const tag = value.slice(1).trim().toLowerCase();

    if (tag) {
      return { type: "tag", value: tag };
    }

    return { type: "recent" };
  }

  return { type: "text", value };
}
