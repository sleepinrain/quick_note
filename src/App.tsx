import { getCurrentWindow } from "@tauri-apps/api/window";
import { MainWindow } from "./pages/MainWindow";
import { NotePreviewWindow } from "./pages/NotePreviewWindow";
import { QuickSearchWindow } from "./pages/QuickSearchWindow";
import "./App.css";

function App() {
  switch (getCurrentWindow().label) {
    case "quick-search":
      return <QuickSearchWindow />;

    case "note-preview":
      return <NotePreviewWindow />;

    default:
      return <MainWindow />;
  }
}

export default App;