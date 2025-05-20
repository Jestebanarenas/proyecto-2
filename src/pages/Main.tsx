import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const foodImages = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEJBcgKK2ZJ4nppCsLHa981UknQ3PlzDsspA&s",
  "https://www.recetasnestle.com.ec/sites/default/files/srh_recipes/4e4293857c03d819e4ae51de1e86d66a.jpg",
  "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
  "https://familiakitchen.com/wp-content/uploads/2021/01/iStock-960337396-3beef-barbacoa-tacos-e1695391119564.jpg",
  "https://www.vvsupremo.com/wp-content/uploads/2016/02/900X570_Mexican-Style-Hot-Dogs.jpg"
];

const MainPage = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? foodImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrent((prev) => (prev === foodImages.length - 1 ? 0 : prev + 1));
  };

  const handleImageClick = () => {
    navigate("/restaurants");
  };

  return (
    <div className="main-page" style={{ textAlign: "center" }}>
      <h1>Bienvenido al Panel Principal</h1>
      <p>Selecciona una opción en el menú superior para continuar.</p>
      <div
        style={{
          position: "relative",
          width: 400,
          margin: "32px auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <button
          onClick={prevImage}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "50%",
            width: 36,
            height: 36,
            cursor: "pointer",
            fontSize: 22,
            zIndex: 2
          }}
          aria-label="Anterior"
        >
          &#8592;
        </button>
        <img
          src={foodImages[current]}
          alt={`Comida ${current + 1}`}
          style={{
            width: 360,
            height: 220,
            objectFit: "cover",
            borderRadius: 16,
            boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            cursor: "pointer"
          }}
          onClick={handleImageClick}
        />
        <button
          onClick={nextImage}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "50%",
            width: 36,
            height: 36,
            cursor: "pointer",
            fontSize: 22,
            zIndex: 2
          }}
          aria-label="Siguiente"
        >
          &#8594;
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 16 }}>
        {foodImages.map((_, idx) => (
          <span
            key={idx}
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: idx === current ? "#1976d2" : "#ccc"
            }}
          />
        ))}
      </div>
      <p style={{ marginTop: 24, color: "#1976d2", fontWeight: 500 }}>
        ¡Disfruta de la mejor comida a domicilio!
      </p>
    </div>
  );
};

export default MainPage;