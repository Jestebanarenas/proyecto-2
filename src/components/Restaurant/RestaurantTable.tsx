import React, { useEffect, useState } from "react";
import { RestaurantResponse } from "../../types/Restaurant.type";
import { getRestaurants } from "../../api/restaurant.api";
import { Link } from "react-router-dom";

const RestaurantTable = () => {
  const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([]);

  useEffect(() => {
    getRestaurants().then(setRestaurants);
  }, []);

  return (
    <div className="customer-table-container">
      <h1>Restaurantes</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Menú</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.address}</td>
              <td>{r.email}</td>
              <td>{r.phone}</td>
              <td>
                <Link to={`/restaurants/${r.id}/menu`} className="main-link">
                  Ver Menú
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantTable;