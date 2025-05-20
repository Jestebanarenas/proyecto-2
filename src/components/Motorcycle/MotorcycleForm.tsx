import React from 'react';
import { useForm } from 'react-hook-form';
import { Motorcycle } from '../../types/Motorcycle.type';
import { createMotorcycle, updateMotorcycle, fetchMotorcycleById } from '../../api/motorcycle.api';
import { useNavigate, useParams } from 'react-router-dom';

const MotorcycleForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Motorcycle>();

  React.useEffect(() => {
    if (id) {
      fetchMotorcycleById(Number(id)).then(moto => {
        setValue('license_plate', moto.license_plate);
        setValue('brand', moto.brand);
        setValue('year', moto.year);
        setValue('status', moto.status);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: Motorcycle) => {
    try {
      if (id) await updateMotorcycle(Number(id), data);
      else await createMotorcycle(data);
      navigate('/motorcycles');
    } catch (e) {
      alert('Error guardando motocicleta');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Placa:</label>
      <input {...register('license_plate', { required: true })} />
      {errors.license_plate && <p>La placa es obligatoria</p>}

      <label>Marca:</label>
      <input {...register('brand', { required: true })} />
      {errors.brand && <p>La marca es obligatoria</p>}

      <label>Año:</label>
      <input type="number" {...register('year', { required: true, valueAsNumber: true })} />
      {errors.year && <p>El año es obligatorio</p>}

      <label>Status:</label>
      <input {...register('status', { required: true })} />
      {errors.status && <p>El estado es obligatorio</p>}

      <button type="submit">Guardar</button>
    </form>
  );
};

export default MotorcycleForm;