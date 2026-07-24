import { invoke } from "@tauri-apps/api/core";

export function normalizeTag(tag: string): Promise<string> {
  return invoke<string>("normalize_tag", { tag });
}
