import React, { useState } from "react";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState(""); //ingresa como vacio pero luego va cambiando su estado
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); //evita que recarge la pagina 



    // Usuario y contraseña fijos para probar
    if (username === "" || password === "") {
      setMessage(`Bienvenido, ${username}!`);
    } else {
      setMessage("Usuario o contraseña incorrectos");
    }
  };


  return (
    <div className="login-container">
      <form className ="form" onSubmit={handleSubmit}>
        <h2 className = "h2">Iniciar Sesión</h2>
        <input class = "input"
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input className = "input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className = "button" type="submit">Entrar</button>
        {message && <p class="message">{message}</p>}
      </form>
    </div>
  );
}

