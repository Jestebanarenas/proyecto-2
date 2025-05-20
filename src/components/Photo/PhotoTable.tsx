import React, { useEffect, useState } from 'react';
import { Photo } from '../../types/Photo.type';
import { fetchPhotos, deletePhoto } from '../../api/photo.api';
import { useNavigate } from 'react-router-dom';

const PhotoTable: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPhotos()
      .then(data => setPhotos(data))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/photos/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Seguro que deseas eliminar esta foto?')) {
      await deletePhoto(id);
      setPhotos(photos.filter(p => p.id !== id));
    }
  };

  if (loading) return <p>Cargando fotos...</p>;

  return (
    <div>
      <h2>Fotos</h2>
      <button onClick={() => navigate('/photos/new')}>Nueva Foto</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>Descripción</th>
            <th>ID Incidencia</th>
            <th>Fecha de subida</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {photos.map(photo => (
            <tr key={photo.id}>
              <td>{photo.id}</td>
              <td>
                <a href={photo.url} target="_blank" rel="noopener noreferrer">
                  Ver foto
                </a>
              </td>
              <td>{photo.description}</td>
              <td>{photo.issue_id}</td>
              <td>{photo.uploaded_at}</td>
              <td>
                <button onClick={() => handleEdit(photo.id)}>Editar</button>
                <button onClick={() => handleDelete(photo.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PhotoTable;