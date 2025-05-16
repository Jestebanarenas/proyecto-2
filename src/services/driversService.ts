import { Driver } from '../models/Driver';
const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerDrivers(): Promise<Driver[]> {
  const res = await fetch(`${API_URL}/drivers`);
  if (!res.ok) throw new Error('Error al obtener conductores');
  return res.json();
}

export async function fetchDriverById(id: number): Promise<Driver> {
  const res = await fetch(`${API_URL}/drivers/${id}`);
  if (!res.ok) throw new Error('Conductor no encontrado');
  return res.json();
}

export async function crearDriver(data: Driver): Promise<Driver> {
  const res = await fetch(`${API_URL}/drivers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear conductor');
  return res.json();
}

export async function actualizarDriver(id: number, data: Driver): Promise<Driver> {
  const res = await fetch(`${API_URL}/drivers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar conductor');
  return res.json();
}

export async function eliminarDriver(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/drivers/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar conductor');
}
