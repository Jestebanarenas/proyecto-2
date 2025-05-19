import React from 'react';
import { useForm } from 'react-hook-form';
import { Motorcycle } from '../../models/Motorcycle';
import { crearMotorcycle, actualizarMotorcycle, fetchMotorcycleById } from '../../services/motorcyclesService';
import { useNavigate, useParams } from 'react-router-dom';

const MotorcycleForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Motorcycle>();

  React.useEffect(() => {
    if (id) {
      fetchMotorcycleById(parseInt(id)).then(moto => {
        setValue('license_plate', moto.license_plate);
        setValue('brand', moto.brand);
        setValue('year', moto.year);
        setValue('status', moto.status);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: Motorcycle) => {
    try {
      if (id) await actualizarMotorcycle(parseInt(id), data);
      else await crearMotorcycle(data);
      navigate('/motorcycles');
    } catch {
      alert('Error guardando motocicleta');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Placa:</label>
      <input {...register('license_plate', { required: true })} />
      {errors.license_plate && <p>Placa es obligatoria</p>}

      <label>Marca:</label>
      <input {...register('brand', { required: true })} />
      {errors.brand && <p>Marca es obligatoria</p>}

      <label>Año:</label>
      <input type="number" {...register('year', { required: true, min: 1900, max: new Date().getFullYear() })} />
      {errors.year && <p>Año inválido</p>}

      <label>Status:</label>
      <select {...register('status')}>
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
      </select>

      <button type="submit">Guardar</button>
    </form>
  );
};

export default MotorcycleForm;
