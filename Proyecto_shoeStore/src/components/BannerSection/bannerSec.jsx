import React, { useEffect, useState } from "react";
import "./bannerSec.css";

export default function BannerPrincipal() {
  const [featuredShoes, setFeaturedShoes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/seccion/destacadas")
      .then((res) => res.json())
      .then((data) => setFeaturedShoes(data))
      .catch((err) => console.error("Error al cargar zapatillas:", err));
  }, []);

  useEffect(() => {
    if (featuredShoes.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredShoes.length);
      }, 8000); // cambia la imagen cada 8s

      return () => clearInterval(interval);
    }
  }, [featuredShoes]);

  // para cambiar las img con la flecha
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredShoes.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredShoes.length - 1 : prev - 1
    );
  };

  //un mensaje mientras carga
  if (featuredShoes.length === 0) {
    return <div className="hero-loading">Cargando zapatillas...</div>;
  }

  const shoe = featuredShoes[currentIndex];

  return (
    <section className="hero">
      <button className="arrow left" onClick={prevSlide}>
        &#10094;
      </button>

      <div className="hero-content">
        <h1 className="hero-title">{shoe.nombre}</h1>
        <p className="hero-subtitle">Las que te acompañarán siempre</p>
        <button className="hero-btn">¡Aprovecha!</button>
      </div>

      <div className="hero-image">
        <img src={shoe.img_url} alt={shoe.nombre} />
      </div>

      <button className="arrow right" onClick={nextSlide}>
        &#10095;
      </button>
    </section>
  );
}
