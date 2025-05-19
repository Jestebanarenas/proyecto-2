import React from "react";

const Header = () => {
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    if (token) {
      console.log("Google Token (from localStorage):", token);
    }
  }, [token]);

  return (
    <header style={{
      width: "100%",
      background: "#1976d2",
      color: "#fff",
      padding: "12px 24px",
      marginBottom: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <span style={{ fontWeight: "bold" }}>Mi App</span>
      {token && (
        <span style={{ fontSize: 13, opacity: 0.8 }}>
          Sesión Google activa
        </span>
      )}
    </header>
  );
};

export default Header;