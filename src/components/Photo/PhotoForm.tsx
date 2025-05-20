import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Photo } from '../../types/Photo.type';
import { createPhoto, updatePhoto, fetchPhotoById } from '../../api/photo.api';
import { useNavigate, useParams } from 'react-router-dom';

const PhotoForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Photo>();

  useEffect(() => {
    if (id) {
      fetchPhotoById(Number(id)).then(photo => {
        setValue('url', photo.url);
        setValue('description', photo.description || '');
        setValue('issue_id', photo.issue_id);
        setValue('uploaded_at', photo.uploaded_at.slice(0, 16));
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: Photo) => {
    try {
      if (id) await updatePhoto(Number(id), data);
      else await createPhoto(data);
      navigate('/photos');
    } catch (e) {
      alert('Error guardando foto');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>URL:</label>
      <input {...register('url', { required: true })} />
      {errors.url && <p>La URL es obligatoria</p>}

      <label>Descripción:</label>
      <input {...register('description')} />

      <label>ID Incidencia:</label>
      <input type="number" {...register('issue_id', { required: true, valueAsNumber: true })} />
      {errors.issue_id && <p>El ID de incidencia es obligatorio</p>}

      <label>Fecha de subida:</label>
      <input type="datetime-local" {...register('uploaded_at', { required: true })} />
      {errors.uploaded_at && <p>La fecha de subida es obligatoria</p>}

      <button type="submit">Guardar</button>
    </form>
  );
};

export default PhotoForm;