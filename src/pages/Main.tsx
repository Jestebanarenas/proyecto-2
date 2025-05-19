import React from "react";

const foodImages = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1516685018646-5499d0a7d42f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
];

const MainPage = () => {
  return (
    <div className="main-page">
      <h1>Bienvenido al Panel Principal</h1>
      <p>Selecciona una opción en el menú superior para continuar.</p>
      <div className="food-gallery">
        {foodImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Comida ${idx + 1}`}
            className="food-photo"
            loading="lazy"
          />
        ))}
      </div>
      <p style={{marginTop: 24, color: "#1976d2", fontWeight: 500}}>
        ¡Disfruta de la mejor comida a domicilio!
      </p>
    </div>
  );
};

export default MainPage;