import { Photo } from '../models/Photo';
const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerPhotos(): Promise<Photo[]> {
  const res = await fetch(`${API_URL}/photos`);
  if (!res.ok) throw new Error('Error al obtener fotos');
  return res.json();
}

export async function fetchPhotoById(id: number): Promise<Photo> {
  const res = await fetch(`${API_URL}/photos/${id}`);
  if (!res.ok) throw new Error('Foto no encontrada');
  return res.json();
}

export async function crearPhoto(data: Photo): Promise<Photo> {
  const res = await fetch(`${API_URL}/photos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear foto');
  return res.json();
}

export async function actualizarPhoto(id: number, data: Photo): Promise<Photo> {
  const res = await fetch(`${API_URL}/photos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar foto');
  return res.json();
}

export async function eliminarPhoto(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/photos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar foto');
}
