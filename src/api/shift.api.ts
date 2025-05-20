import { Shift } from '../types/Shift.type';

const API_URL = '/api/shifts';

export async function fetchShifts(): Promise<Shift[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error fetching shifts');
  return res.json();
}

export async function fetchShiftById(id: number): Promise<Shift> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Error fetching shift');
  return res.json();
}

export async function createShift(data: Omit<Shift, 'id'>): Promise<Shift> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error creating shift');
  return res.json();
}

export async function updateShift(id: number, data: Partial<Shift>): Promise<Shift> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error updating shift');
  return res.json();
}

export async function deleteShift(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error deleting shift');
}