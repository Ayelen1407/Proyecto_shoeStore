import React, { useState } from "react";
import './Register.css'

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del registro:", { email, password, username });

    if (email === "" || password == ""){
      setMessage(`Ingrese un email`)
    }
    else if (password == "") {
      setMessage(`Ingrese una contraseña`)
    }
    else if (username == "") {
      setMessage(`Ingrese un nombre de usuario`)
    }
    else{
      setMessage(`Bienvenido`)
    }
  };

  return (
    <div class = "register-container">
      <form class = "form" onSubmit={handleSubmit}>
        <h2 class = "register-h2">Registro</h2>

        <input class = "input"
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input class = "input"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}    
        />
        
        <input className = "input"
          type="username"
          placeholder="Ingresa tu nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}    
        />

        <button className = "button">
          Registrarse
        </button>
        {message && <p class = "message">{message}</p>}
      </form>
    </div>
  );
}
/////