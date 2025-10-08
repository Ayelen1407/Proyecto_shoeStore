import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState(""); //ingresa como vacio pero luego va cambiando su estado
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); //evita que recarge la pagina 
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {  // 200
        setMessage(`¡Bienvenido, ${data.username}!`);
        setMessage(`¡${data.message}! Bienvenido, ${data.user_email}`);
        //Guarda la info en el localStorage (token)
        localStorage.setItem('access_token', data.access_token);
        setEmail('');
        setPassword('');
        // Redirigir a home después de 2s
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setMessage(`Error: ${data.error}`);
      }
          } catch (error) {
      console.error('Error en login:', error);
      setMessage(`Error de conexión: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-container">
      <form className ="form" onSubmit={handleSubmit}>
        <h2 className = "h2">Iniciar Sesión</h2>
        <input class = "input"
          type="text"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input className = "input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className = "button"
        type="submit"
        disabled={loading}
        style={{
          background: loading ? '#ccc' : '#007bff',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}>
          {loading ? 'Iniciando...' : 'Iniciar Sesión'}
        </button>

        <p className="log-p">
          ¿No tienes cuenta? <a href="/register" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>Regístrate</a>
        </p>
        </form>
        {message && (
          <div
            style={{
              marginTop: '10px',
              padding: '10px',
              borderRadius: '5px',
              background: message.includes('Error') ? '#f8d7da' : '#d4edda',
              color: message.includes('Error') ? '#721c24' : '#155724'
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

