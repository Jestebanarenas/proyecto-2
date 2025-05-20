import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Shift } from '../../types/Shift.type';
import { createShift, updateShift, fetchShiftById } from '../../api/shift.api';
import { useNavigate, useParams } from 'react-router-dom';

const ShiftForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Shift>();

  useEffect(() => {
    if (id) {
      fetchShiftById(Number(id)).then(shift => {
        setValue('start_time', shift.start_time.slice(0, 16));
        setValue('end_time', shift.end_time.slice(0, 16));
        setValue('motorcycle_id', shift.motorcycle_id);
        setValue('driver_id', shift.driver_id);
        setValue('status', shift.status);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: Shift) => {
    try {
      if (id) await updateShift(Number(id), data);
      else await createShift(data);
      navigate('/shifts');
    } catch (e) {
      alert('Error guardando turno');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Inicio:</label>
      <input
        type="datetime-local"
        {...register('start_time', { required: true })}
      />
      {errors.start_time && <p>La fecha y hora de inicio es obligatoria</p>}

      <label>Fin:</label>
      <input
        type="datetime-local"
        {...register('end_time', { required: true })}
      />
      {errors.end_time && <p>La fecha y hora de fin es obligatoria</p>}

      <label>ID Motocicleta:</label>
      <input
        type="number"
        {...register('motorcycle_id', { required: true, valueAsNumber: true })}
      />
      {errors.motorcycle_id && <p>El ID de motocicleta es obligatorio</p>}

      <label>ID Conductor:</label>
      <input
        type="number"
        {...register('driver_id', { required: true, valueAsNumber: true })}
      />
      {errors.driver_id && <p>El ID de conductor es obligatorio</p>}

      <label>Estado:</label>
      <input
        {...register('status', { required: true })}
      />
      {errors.status && <p>El estado es obligatorio</p>}

      <button type="submit">Guardar</button>
    </form>
  );
};

export default ShiftForm;