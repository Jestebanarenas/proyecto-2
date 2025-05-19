import { Shift } from '../models/Shift';
const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerShifts(): Promise<Shift[]> {
  const res = await fetch(`${API_URL}/shifts`);
  if (!res.ok) throw new Error('Error al obtener turnos');
  return res.json();
}

export async function fetchShiftById(id: number): Promise<Shift> {
  const res = await fetch(`${API_URL}/shifts/${id}`);
  if (!res.ok) throw new Error('Turno no encontrado');
  return res.json();
}

export async function crearShift(data: Shift): Promise<Shift> {
  const res = await fetch(`${API_URL}/shifts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear turno');
  return res.json();
}

export async function actualizarShift(id: number, data: Shift): Promise<Shift> {
  const res = await fetch(`${API_URL}/shifts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar turno');
  return res.json();
}

export async function eliminarShift(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/shifts/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar turno');
}
