const ThemeToggle = ({ dark, toggle }) => {
  return (
    <button
      onClick={toggle}
      style={{
        padding: "10px 16px",
        borderRadius: "999px",
        background: dark ? "#facc15" : "#1e293b",
        color: dark ? "#1e293b" : "#f8fafc",
        border: "none",
        cursor: "pointer",
        fontWeight: 800,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        transition: "all 0.3s ease",
      }}
    >
      {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
