import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Register.css'

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);  // Spinner opcional
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos del registro:", { email, password, username });
    setLoading(true);
    setMessage('');

    try {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),  // Envía JSON al backend
    });
          const data = await response.json();
      if (response.ok) {  // 201 o 200
        setMessage(`¡${data.message}! ID: ${data.user_id}`);
        // Limpia form
        setEmail('');
        setPassword('');
        // Redirigir a login después de 2s
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error en register:', error);
      setMessage(`Error de conexión: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className = "register-container">
      <form className = "form" onSubmit={handleSubmit}>
        <h2 className = "register-h2">Regístrate</h2>

        <input className = "input"
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input className = "input"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}  //para que tenga minimo 6 caracteres
        />
        
        <input className = "input"
          type="username"
          placeholder="Ingresa tu nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}    
        />

        <button className = "button"
          type="submit"
          disabled={loading}
          style={{
            background: loading ? '#ccc' : '#007bff',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
           {loading ? 'Registrando...' : 'Registrarse'}
        </button>
        <p className="regis-p">
        ¿Ya tienes cuenta? <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Inicia sesión</a>
        </p>
        </form>
      {message && (
        <div
          style={{
            background: message.includes('Error') ? '#f8d7da' : '#d4edda',
            color: message.includes('Error') ? '#721c24' : '#155724',
          }}>
          {message}
        </div>
      )} 
    </div>
  );
}
/////