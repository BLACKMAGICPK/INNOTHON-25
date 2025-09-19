import React from "react";
import Header from "../Components/Header";

function Register() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #000, #1a273a)",
        color: "white",
        fontFamily: "'Courier New', monospace",
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          fontSize: "32px",
          fontWeight: "bold",
          textAlign: "center",
          padding: "20px",
        }}
      >
        Registration Closed
      </div>
    </div>
  );
}

export default Register;
