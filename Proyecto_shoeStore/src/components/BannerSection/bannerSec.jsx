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
    return <div className="hero-loading">Cargando banner...</div>;
  }

  const shoe = featuredShoes[currentIndex];

  return (
    <section className="banner-principal">
      <button className="arrow left" onClick={prevSlide}>
        &#10094;
      </button>

      <div className="banner-contenido">
        <h1 className="nombre-zapas">{shoe.nombre}</h1>
        <p className="subtitulo">¡Ve nuestros nuevos ingresos!</p>
        <a href = "/"><button className="aprovecha">¡Aprovecha!</button></a>
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
