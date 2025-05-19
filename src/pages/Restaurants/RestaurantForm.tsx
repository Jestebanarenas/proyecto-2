import React from 'react';
import { useForm } from 'react-hook-form';
import { Restaurant } from '../../models/Restaurant';
import { crearRestaurant, actualizarRestaurant, fetchRestaurantById } from '../../services/restaurantsService';
import { useNavigate, useParams } from 'react-router-dom';

const RestaurantForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Restaurant>();

  React.useEffect(() => {
    if (id) {
      fetchRestaurantById(parseInt(id)).then(rest => {
        setValue('name', rest.name);
        setValue('address', rest.address);
        setValue('phone', rest.phone);
        setValue('email', rest.email);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: Restaurant) => {
    try {
      if (id) await actualizarRestaurant(parseInt(id), data);
      else await crearRestaurant(data);
      navigate('/restaurants');
    } catch {
      alert('Error guardando restaurante');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Nombre:</label>
      <input {...register('name', { required: true })} />
      {errors.name && <p>Nombre es obligatorio</p>}

      <label>Dirección:</label>
      <input {...register('address', { required: true })} />
      {errors.address && <p>Dirección es obligatoria</p>}

      <label>Teléfono:</label>
      <input {...register('phone')} />

      <label>Email:</label>
      <input type="email" {...register('email')} />

      <button type="submit">Guardar</button>
    </form>
  );
};

export default RestaurantForm;
