import { Motorcycle } from '../types/Motorcycle.type';

const API_URL = '/api/motorcycles';

export async function fetchMotorcycles(): Promise<Motorcycle[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error fetching motorcycles');
  return res.json();
}

export async function fetchMotorcycleById(id: number): Promise<Motorcycle> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Error fetching motorcycle');
  return res.json();
}

export async function createMotorcycle(data: Omit<Motorcycle, 'id'>): Promise<Motorcycle> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error creating motorcycle');
  return res.json();
}

export async function updateMotorcycle(id: number, data: Partial<Motorcycle>): Promise<Motorcycle> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error updating motorcycle');
  return res.json();
}

export async function deleteMotorcycle(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error deleting motorcycle');
}