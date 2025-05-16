import React, { useEffect, useState } from 'react';
import { Photo } from '../../models/Photo';
import { obtenerPhotos, eliminarPhoto } from '../../services/photosService';
import { useNavigate } from 'react-router-dom';

const PhotoList = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerPhotos().then(setPhotos);
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Eliminar foto?')) {
      try {
        await eliminarPhoto(id);
        setPhotos(photos.filter(p => p.id !== id));
      } catch {
        alert('Error eliminando foto');
      }
    }
  };

  return (
    <>
      <button onClick={() => navigate('/photos/new')}>Nueva Foto</button>
      <table>
        <thead>
          <tr>
            <th>URL</th><th>Caption</th><th>Fecha</th><th>ID Inconveniente</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {photos.map(p => (
            <tr key={p.id}>
              <td><a href={p.image_url} target="_blank" rel="noreferrer">Ver imagen</a></td>
              <td>{p.caption}</td>
              <td>{p.taken_at.slice(0,10)}</td>
              <td>{p.issue_id}</td>
              <td>
                <button onClick={() => navigate(`/photos/edit/${p.id}`)}>Editar</button>
                <button onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PhotoList;
