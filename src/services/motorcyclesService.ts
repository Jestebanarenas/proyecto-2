import { Motorcycle } from '../models/Motorcycle';
const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerMotorcycles(): Promise<Motorcycle[]> {
  const res = await fetch(`${API_URL}/motorcycles`);
  if (!res.ok) throw new Error('Error al obtener motocicletas');
  return res.json();
}

export async function fetchMotorcycleById(id: number): Promise<Motorcycle> {
  const res = await fetch(`${API_URL}/motorcycles/${id}`);
  if (!res.ok) throw new Error('Motocicleta no encontrada');
  return res.json();
}

export async function crearMotorcycle(data: Motorcycle): Promise<Motorcycle> {
  const res = await fetch(`${API_URL}/motorcycles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear motocicleta');
  return res.json();
}

export async function actualizarMotorcycle(id: number, data: Motorcycle): Promise<Motorcycle> {
  const res = await fetch(`${API_URL}/motorcycles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar motocicleta');
  return res.json();
}

export async function eliminarMotorcycle(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/motorcycles/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar motocicleta');
}
