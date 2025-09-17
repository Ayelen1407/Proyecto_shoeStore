import React, { useState } from "react";
import './Register.css'

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del registro:", { email, password });

    if (email === "" || password == ""){
      setMessage(`Complete con un email o contraseña`)
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
        
        <button class = "button">
          Registrarse
        </button>
        {message && <p class = "message">{message}</p>}
      </form>
    </div>
  );
}
/////////