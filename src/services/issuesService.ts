import { Issue } from '../models/Issue';
const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerIssues(): Promise<Issue[]> {
  const res = await fetch(`${API_URL}/issues`);
  if (!res.ok) throw new Error('Error al obtener inconvenientes');
  return res.json();
}

export async function fetchIssueById(id: number): Promise<Issue> {
  const res = await fetch(`${API_URL}/issues/${id}`);
  if (!res.ok) throw new Error('Inconveniente no encontrado');
  return res.json();
}

export async function crearIssue(data: Issue): Promise<Issue> {
  const res = await fetch(`${API_URL}/issues`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear inconveniente');
  return res.json();
}

export async function actualizarIssue(id: number, data: Issue): Promise<Issue> {
  const res = await fetch(`${API_URL}/issues/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar inconveniente');
  return res.json();
}

export async function eliminarIssue(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/issues/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar inconveniente');
}
