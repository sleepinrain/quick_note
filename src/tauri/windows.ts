import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { getCurrentWindow } from "@tauri-apps/api/window";

export async function showQuickSearchWindow(): Promise<void> {
  const quickSearchWindow =
    await WebviewWindow.getByLabel("quick-search");

  if (!quickSearchWindow) {
    throw new Error("Quick search window is not available");
  }

  await quickSearchWindow.show();
  await quickSearchWindow.setFocus();
}

export function hideCurrentWindow(): Promise<void> {
  return getCurrentWindow().hide();
}