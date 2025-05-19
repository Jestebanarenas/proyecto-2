import { Restaurant } from '../models/Restaurant';
const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerRestaurants(): Promise<Restaurant[]> {
  const res = await fetch(`${API_URL}/restaurants`);
  if (!res.ok) throw new Error('Error al obtener restaurantes');
  return res.json();
}

export async function fetchRestaurantById(id: number): Promise<Restaurant> {
  const res = await fetch(`${API_URL}/restaurants/${id}`);
  if (!res.ok) throw new Error('Restaurante no encontrado');
  return res.json();
}

export async function crearRestaurant(data: Restaurant): Promise<Restaurant> {
  const res = await fetch(`${API_URL}/restaurants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear restaurante');
  return res.json();
}

export async function actualizarRestaurant(id: number, data: Restaurant): Promise<Restaurant> {
  const res = await fetch(`${API_URL}/restaurants/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar restaurante');
  return res.json();
}

export async function eliminarRestaurant(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/restaurants/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar restaurante');
}
