import React, { useEffect, useState } from 'react';
import { Restaurant } from '../../models/Restaurant';
import { obtenerRestaurants, eliminarRestaurant } from '../../services/restaurantsService';
import { useNavigate } from 'react-router-dom';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerRestaurants().then(setRestaurants);
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Eliminar restaurante?')) {
      try {
        await eliminarRestaurant(id);
        setRestaurants(restaurants.filter(r => r.id !== id));
      } catch {
        alert('Error eliminando restaurante');
      }
    }
  };

  return (
    <>
      <button onClick={() => navigate('/restaurants/new')}>Nuevo Restaurante</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th><th>Dirección</th><th>Teléfono</th><th>Email</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.address}</td>
              <td>{r.phone}</td>
              <td>{r.email}</td>
              <td>
                <button onClick={() => navigate(`/restaurants/edit/${r.id}`)}>Editar</button>
                <button onClick={() => handleDelete(r.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RestaurantList;
