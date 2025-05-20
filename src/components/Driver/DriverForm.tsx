import React from 'react';
import { useForm } from 'react-hook-form';
import { Driver } from '../../models/Driver';
import { crearDriver, actualizarDriver, fetchDriverById } from '../../services/driversService';
import { useNavigate, useParams } from 'react-router-dom';

const DriverForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Driver>();

  React.useEffect(() => {
    if (id) {
      fetchDriverById(parseInt(id)).then(driver => {
        setValue('name', driver.name);
        setValue('license_number', driver.license_number);
        setValue('phone', driver.phone);
        setValue('email', driver.email);
        setValue('status', driver.status);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: Driver) => {
    try {
      if (id) await actualizarDriver(parseInt(id), data);
      else await crearDriver(data);
      navigate('/drivers');
    } catch (e) {
      alert('Error guardando conductor');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Nombre:</label>
      <input {...register('name', { required: true })} />
      {errors.name && <p>Nombre es obligatorio</p>}

      <label>Licencia:</label>
      <input {...register('license_number', { required: true })} />
      {errors.license_number && <p>Licencia es obligatoria</p>}

      <label>Teléfono:</label>
      <input {...register('phone')} />

      <label>Email:</label>
      <input type="email" {...register('email')} />

      <label>Status:</label>
      <select {...register('status')}>
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
      </select>

      <button type="submit">Guardar</button>
    </form>
  );
};

export default DriverForm;
