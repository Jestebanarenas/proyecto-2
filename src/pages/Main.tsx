import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="main-page">
      <h1>Bienvenido al Panel Principal</h1>
      <p>Selecciona una opción para continuar:</p>
      <nav className="main-nav">
        <Link to="/customers" className="main-link">
          Ver Clientes
        </Link>
        <Link to="/adresses" className="main-link">
          Ver Direcciones
        </Link>
        <Link to="/products" className="main-link">
          Ver Productos
        </Link>
        <Link to="/restaurants" className="main-link">
          Ver Restaurantes
        </Link>
        <Link to="/orders/new" className="main-link main-link-order">
          Crear Pedido
        </Link>
        <Link to= "/Drivers" className="main-link">
          Ver Repartidores
        </Link>
        <Link to="/motorcycles" className="main-link">
          Ver Motocicletas
        </Link>
      </nav>
    </div>
  );
};

export default MainPage;