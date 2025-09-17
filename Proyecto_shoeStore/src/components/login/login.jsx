import React, { useState } from "react";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState(""); //ingresa como vacio pero luego va cambiando su estado
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Usuario y contraseña fijos para probar
    if (username === "admin" && password === "1234") {
      setMessage(`Bienvenido, ${username}!`);
    } else {
      setMessage("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div class="login-container">
      <form class ="form" onSubmit={handleSubmit}>
        <h2 class = "h2">Iniciar Sesión</h2>
        <input class = "input"
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input class = "input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button class = "button" type="submit">Entrar</button>
        {message && <p class="message">{message}</p>}
      </form>
    </div>
  );
}

