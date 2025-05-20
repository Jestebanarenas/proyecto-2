import { Photo } from '../types/Photo.type';

const API_URL = '/api/photos';

export async function fetchPhotos(): Promise<Photo[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error fetching photos');
  return res.json();
}

export async function fetchPhotoById(id: number): Promise<Photo> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Error fetching photo');
  return res.json();
}

export async function createPhoto(data: Omit<Photo, 'id'>): Promise<Photo> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error creating photo');
  return res.json();
}

export async function updatePhoto(id: number, data: Partial<Photo>): Promise<Photo> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error updating photo');
  return res.json();
}

export async function deletePhoto(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error deleting photo');
}