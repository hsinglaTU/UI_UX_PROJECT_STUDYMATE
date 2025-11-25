import React, { useState, useEffect, useMemo } from "react";

function Planner({ onTaskChange }) {
  const days = useMemo(
    () => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    []
  );

  const empty = {
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  };

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("plannerTasks");
    return saved ? JSON.parse(saved) : empty;
  });

  const [newTask, setNewTask] = useState({});

  useEffect(() => {
    localStorage.setItem("plannerTasks", JSON.stringify(tasks));

    let total = 0;
    days.forEach((d) => (total += tasks[d].length));
    onTaskChange(total);
  }, [tasks, days, onTaskChange]);

  const addTask = (day) => {
    if (!newTask[day] || newTask[day].trim() === "") return;

    setTasks({
      ...tasks,
      [day]: [...tasks[day], newTask[day]],
    });

    setNewTask({ ...newTask, [day]: "" });
  };

  const deleteTask = (day, index) => {
    setTasks({
      ...tasks,
      [day]: tasks[day].filter((_, i) => i !== index),
    });
  };

  const clearAll = () => {
    setTasks(empty);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ color: "#1f2937", marginBottom: "20px" }}>
        Weekly Planner
      </h2>

      <button
        onClick={clearAll}
        style={{
          padding: "10px 18px",
          background: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Clear All Tasks
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "15px",
          padding: "0 20px",
        }}
      >
        {days.map((day) => (
          <div
            key={day}
            style={{
              background: "rgba(255,255,255,0.85)",
              padding: "15px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>{day}</h3>

            <ul style={{ padding: 0, listStyle: "none" }}>
              {tasks[day].map((t, i) => (
                <li
                  key={i}
                  style={{
                    background: "#e2e8f0",
                    padding: "6px 8px",
                    marginBottom: "6px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {t}

                  <button
                    onClick={() => deleteTask(day, i)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <input
              type="text"
              placeholder="Add task"
              value={newTask[day] || ""}
              onChange={(e) =>
                setNewTask({ ...newTask, [day]: e.target.value })
              }
              style={{
                width: "80%",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                marginTop: "5px",
              }}
            />

            <button
              onClick={() => addTask(day)}
              style={{
                marginTop: "8px",
                padding: "6px 12px",
                background: "#5DD0BB",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Planner;
