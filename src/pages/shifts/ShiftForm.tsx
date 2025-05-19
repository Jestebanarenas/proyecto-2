import React from 'react';
import { useForm } from 'react-hook-form';
import { Shift } from '../../models/Shift';
import { crearShift, actualizarShift, fetchShiftById } from '../../services/shiftsService';
import { useNavigate, useParams } from 'react-router-dom';

const ShiftForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Shift>();

  React.useEffect(() => {
    if (id) {
      fetchShiftById(parseInt(id)).then(shift => {
        setValue('driver_id', shift.driver_id);
        setValue('motorcycle_id', shift.motorcycle_id);
        setValue('start_time', shift.start_time.slice(0,16)); // datetime-local espera yyyy-MM-ddTHH:mm
        setValue('end_time', shift.end_time.slice(0,16));
        setValue('status', shift.status);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: Shift) => {
    try {
      if (id) await actualizarShift(parseInt(id), data);
      else await crearShift(data);
      navigate('/shifts');
    } catch {
      alert('Error guardando turno');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>ID Conductor:</label>
      <input type="number" {...register('driver_id', { required: true })} />
      {errors.driver_id && <p>ID conductor obligatorio</p>}

      <label>ID Motocicleta:</label>
      <input type="number" {...register('motorcycle_id', { required: true })} />
      {errors.motorcycle_id && <p>ID motocicleta obligatorio</p>}

      <label>Hora Inicio:</label>
      <input type="datetime-local" {...register('start_time', { required: true })} />
      {errors.start_time && <p>Hora de inicio obligatoria</p>}

      <label>Hora Fin:</label>
      <input type="datetime-local" {...register('end_time', { required: true })} />
      {errors.end_time && <p>Hora fin obligatoria</p>}

      <label>Status:</label>
      <select {...register('status')}>
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
      </select>

      <button type="submit">Guardar</button>
    </form>
  );
};

export default ShiftForm;
