import { useEffect, useState } from "react";
import { hideCurrentWindow } from "../tauri/windows";

export function QuickSearchWindow() {
  const [searchValue, setSearchValue] = useState("");

  function hideWindow() {
    hideCurrentWindow().catch((error) => {
      console.error("Failed to hide quick search", error);
    });
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        hideWindow();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="quick-search-shell">
      <header className="quick-search-toolbar" data-tauri-drag-region>
        <strong data-tauri-drag-region>Quick Search</strong>
        <button
          type="button"
          className="window-close-button"
          aria-label="Hide quick search"
          title="Hide quick search"
          onClick={hideWindow}
        >
          X
        </button>
      </header>

      <input
        type="search"
        aria-label="Quick search"
        placeholder="Search notes or #tag"
        value={searchValue}
        onChange={(event) => setSearchValue(event.currentTarget.value)}
        autoFocus
      />
    </main>
  );
}