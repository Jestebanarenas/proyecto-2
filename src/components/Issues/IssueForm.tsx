import React from 'react';
import { useForm } from 'react-hook-form';
import { IIssue } from '../../types/Issue.type';
import { createIssue, updateIssue, fetchIssueById } from '../../api/issue.api';
import { useNavigate, useParams } from 'react-router-dom';

const IssueForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IIssue>();

  React.useEffect(() => {
    if (id) {
      fetchIssueById(Number(id)).then(issue => {
        setValue('description', issue.description);
        setValue('issue_type', issue.issue_type);
        setValue('date_reported', new Date(issue.date_reported));
        setValue('status', issue.status);
        setValue('motorcycle_id', issue.motorcycle_id);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: IIssue) => {
    try {
      if (id) await updateIssue(Number(id), data);
      else await createIssue(data);
      navigate('/issues');
    } catch (e) {
      alert('Error guardando incidencia');
    }
  };
  const [drivers, setDrivers] = React.useState<{ id: number; name: string }[]>([]);
React.useEffect(() => {
  // Fetch drivers for the select
  fetch('/api/drivers') // Adjust to your actual endpoint
    .then(res => res.json())
    .then(setDrivers);
}, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Descripción:</label>
      <input {...register('description', { required: true })} />
      {errors.description && <p>La descripción es obligatoria</p>}

      <label>Tipo de incidencia:</label>
      <input {...register('issue_type', { required: true })} />
      {errors.issue_type && <p>El tipo es obligatorio</p>}

      <label>Fecha de reporte:</label>
      <input type="date" {...register('date_reported', { required: true })} />
      {errors.date_reported && <p>La fecha es obligatoria</p>}

      <label>Status:</label>
      <input {...register('status', { required: true })} />
      {errors.status && <p>El estado es obligatorio</p>}

      <label>ID de motocicleta:</label>
      <input type="number" {...register('motorcycle_id', { required: true, valueAsNumber: true })} />
      {errors.motorcycle_id && <p>El ID de motocicleta es obligatorio</p>}

      <label>Conductor:</label>
      <select {...register('driver_id', { required: true, valueAsNumber: true })}>
        <option value="">Seleccione un conductor</option>
        {drivers.map(driver => (
          <option key={driver.id} value={driver.id}>{driver.name}</option>
        ))}
      </select>
      {errors.driver_id && <p>El conductor es obligatorio</p>}

      <button type="submit">Guardar</button>
    </form>
  );
};

export default IssueForm;