import React from "react";

function Navbar({ setPage }) {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>StudyMate</h2>
      <ul style={styles.links}>
        <li onClick={() => setPage("home")}>Home</li>
        <li onClick={() => setPage("planner")}>Planner</li>
        <li onClick={() => setPage("notes")}>Notes</li>
        <li onClick={() => setPage("timer")}>Timer</li>
        <li onClick={() => setPage("summary")}>Summary</li>
        <li onClick={() => setPage("about")}>About</li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(90deg, #5DD0BB, #F4C7A1)",
    padding: "15px 40px",
    color: "#1f2937",
    fontWeight: "bold",
  },
  logo: {
    fontSize: "24px",
  },
  links: {
    display: "flex",
    gap: "25px",
    listStyle: "none",
    cursor: "pointer",
  },
};

export default Navbar;
