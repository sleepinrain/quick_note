import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="app-shell">
      <section className="intro">
        <p className="eyebrow">Stage 2</p>
        <h1>Quick Note</h1>
        <p className="summary">
          Tauri + React + TypeScript is running. The note workflow starts in the
          next stage.
        </p>
      </section>

      <section className="status-grid" aria-label="Project status">
        <div className="status-card">
          <span className="status-label">Desktop shell</span>
          <strong>Tauri 2</strong>
        </div>
        <div className="status-card">
          <span className="status-label">Frontend</span>
          <strong>React + TypeScript</strong>
        </div>
        <div className="status-card">
          <span className="status-label">Persistence</span>
          <strong>SQLite planned</strong>
        </div>
      </section>

      <form
        className="bridge-check"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <label htmlFor="greet-input">Rust command check</label>
        <div className="input-row">
          <input
            id="greet-input"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Type your name"
          />
          <button type="submit">Run</button>
        </div>
        <p className="result">{greetMsg || "Waiting for a Rust response."}</p>
      </form>
    </main>
  );
}

export default App;
