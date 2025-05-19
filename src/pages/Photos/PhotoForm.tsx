import React from 'react';
import { useForm } from 'react-hook-form';
import { Photo } from '../../models/Photo';
import { crearPhoto, actualizarPhoto, fetchPhotoById } from '../../services/photosService';
import { useNavigate, useParams } from 'react-router-dom';

const PhotoForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Photo>();

  React.useEffect(() => {
    if (id) {
      fetchPhotoById(parseInt(id)).then(photo => {
        setValue('image_url', photo.image_url);
        setValue('caption', photo.caption);
        //setValue('taken_at', photo.taken_at.slice(0,10));
        setValue('issue_id', photo.issue_id);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: Photo) => {
    try {
      if (id) await actualizarPhoto(parseInt(id), data);
      else await crearPhoto(data);
      navigate('/photos');
    } catch {
      alert('Error guardando foto');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>URL de Imagen:</label>
      <input {...register('image_url', { required: true })} />
      {errors.image_url && <p>URL es obligatoria</p>}

      <label>Caption:</label>
      <input {...register('caption')} />

      <label>Fecha de toma:</label>
      <input type="date" {...register('taken_at', { required: true })} />
      {errors.taken_at && <p>Fecha es obligatoria</p>}

      <label>ID de Inconveniente:</label>
      <input type="number" {...register('issue_id', { required: true })} />
      {errors.issue_id && <p>ID de inconveniente es obligatorio</p>}

      <button type="submit">Guardar</button>
    </form>
  );
};

export default PhotoForm;
