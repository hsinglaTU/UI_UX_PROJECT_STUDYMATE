import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Planner from "./components/planner";
import Footer from "./components/footer";

function App() {
  const [page, setPage] = useState("home");
  const [totalTasks, setTotalTasks] = useState(0);

  const [time, setTime] = useState(1500);
  const [running, setRunning] = useState(false);
  const [custom, setCustom] = useState("");
  const [session, setSession] = useState(25);
  const [done, setDone] = useState(false);
  const [focus, setFocus] = useState(0);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    let t;
    if (running && time > 0) {
      t = setInterval(() => setTime((x) => x - 1), 1000);
    }
    if (time === 0 && !done) {
      setRunning(false);
      setFocus((p) => p + session);
      setDone(true);
    }
    return () => clearInterval(t);
  }, [running, time, done, session]);

  const start = () => {
    if (time > 0) {
      setRunning(true);
      setDone(false);
    }
  };

  const pause = () => setRunning(false);

  const reset = () => {
    setRunning(false);
    setTime(1500);
    setSession(25);
    setDone(false);
  };

  const setCustomTime = () => {
    if (custom.trim() === "" || isNaN(custom)) return;
    const m = Number(custom);
    setTime(m * 60);
    setSession(m);
    setDone(false);
    setCustom("");
  };

  const save = () => {
    if (title.trim() === "" || text.trim() === "") return;

    if (edit !== null) {
      const updated = [...notes];
      updated[edit] = { title, text };
      setNotes(updated);
      setEdit(null);
    } else {
      setNotes([...notes, { title, text }]);
    }
    setTitle("");
    setText("");
  };

  const del = (i) => {
    setNotes(notes.filter((_, index) => index !== i));
  };

  return (
    <div
      className="app-container"
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/study.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        overflowX: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(6px)",
          background: "rgba(255,255,255,0.4)",
        }}
      ></div>

      <div style={{ position: "relative", zIndex: 2, flex: 1 }}>
        <Navbar setPage={setPage} />

        <main style={{ padding: "30px" }}>
          {page === "home" && (
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "40px", color: "#1f2937" }}>
                Welcome to StudyMate
              </h1>

              <div style={card}>
                <h3>Total tasks added: {totalTasks}</h3>
                <h3>Focus time completed: {focus} minutes</h3>
              </div>
            </div>
          )}

          {page === "planner" && (
            <Planner onTaskChange={setTotalTasks} />
          )}

          {page === "notes" && (
            <div style={{ textAlign: "center" }}>
              <h2>Notes</h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                style={noteInput}
              />

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your note..."
                style={noteArea}
              />

              <br />

              <button onClick={save} style={btn}>
                {edit !== null ? "Save Changes" : "Save Note"}
              </button>

              <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
                {notes.map((n, i) => (
                  <li key={i} style={noteCard}>
                    <div>
                      <strong>{n.title}:</strong> {n.text}
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        style={smallBtn}
                        onClick={() => {
                          setEdit(i);
                          setTitle(n.title);
                          setText(n.text);
                        }}
                      >
                        Edit
                      </button>

                      <button style={delBtn} onClick={() => del(i)}>
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {page === "timer" && (
            <div style={{ textAlign: "center" }}>
              <h2>Focus Timer</h2>

              <h1 style={timerText}>
                {Math.floor(time / 60)} :
                {String(time % 60).padStart(2, "0")}
              </h1>

              <button style={btn} onClick={start}>Start</button>
              <button style={btn} onClick={pause}>Pause</button>
              <button style={btn} onClick={reset}>Reset</button>

              <div style={{ marginTop: "20px" }}>
                <input
                  type="number"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="Minutes"
                  style={customInput}
                />

                <button style={btn} onClick={setCustomTime}>
                  Set
                </button>
              </div>
            </div>
          )}

          {page === "summary" && (
            <div style={{ textAlign: "center" }}>
              <h2>Daily Summary</h2>

              <div style={card}>
                <p>Total tasks: {totalTasks}</p>
                <p>Focus time: {focus} minutes</p>
              </div>
            </div>
          )}

          {page === "about" && (
            <div style={{ textAlign: "center" }}>
              <h2>About StudyMate</h2>

              <div style={card}>
                StudyMate helps students plan tasks, write notes,
                and stay focused using an easy study timer.
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ⭐ FOOTER IS FINALLY ADDED HERE ⭐ */}
      <Footer />

    </div>
  );
}


/* ==== STYLES ==== */

const card = {
  background: "rgba(255,255,255,0.85)",
  padding: "20px",
  borderRadius: "14px",
  width: "60%",
  margin: "20px auto",
  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
};

const noteInput = {
  width: "70%",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  marginBottom: "10px",
};

const noteArea = {
  width: "70%",
  height: "120px",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
};

const btn = {
  padding: "10px 18px",
  margin: "8px",
  background: "#5DD0BB",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const smallBtn = {
  background: "#5DD0BB",
  padding: "6px 10px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  color: "white",
};

const delBtn = {
  background: "#ef4444",
  padding: "6px 10px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  color: "white",
};

const noteCard = {
  background: "rgba(255,255,255,0.85)",
  padding: "12px",
  borderRadius: "12px",
  margin: "10px auto",
  width: "70%",
  display: "flex",
  justifyContent: "space-between",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const customInput = {
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  marginRight: "10px",
};

const timerText = {
  fontSize: "50px",
  fontWeight: "bold",
  margin: "20px 0",
  color: "#1f2937",
};

export default App;
