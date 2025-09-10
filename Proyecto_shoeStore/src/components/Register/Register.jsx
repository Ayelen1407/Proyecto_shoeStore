import React, { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del registro:", { email, password });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "20px auto" }}>
      <h2>Registro</h2>
      <input
        type="email"
        placeholder="Ingresa tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
      />
      
      <input
        type="password"
        placeholder="Ingresa tu contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
      />
      
      <button type="submit" style={{ padding: "8px", width: "100%" }}>
        Registrarse
      </button>
    </form>
  );
}
