// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setMessage('No estás autenticado. Redirigiendo...');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    // Llamar a ruta protegida
    fetch('http://localhost:5000/protected', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // ¡Usa el token aquí!
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Token inválido');
        }
        return res.json();
      })
      .then((data) => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error en dashboard:', error);
        localStorage.removeItem('access_token');  // Limpia token inválido
        setMessage('Sesión expirada. Redirigiendo...');
        setTimeout(() => navigate('/login'), 2000);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1>Dashboard</h1>
      <p>{message}</p>  {/* e.g., "Acceso concedido para test@example.com" */}
      <button onClick={handleLogout} style={{ padding: '10px', background: '#dc3545', color: 'white', border: 'none' }}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Dashboard;