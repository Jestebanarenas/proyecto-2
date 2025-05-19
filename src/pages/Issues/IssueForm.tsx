import React from 'react';
import { useForm } from 'react-hook-form';
import { Issue } from '../../models/Issue';
import { crearIssue, actualizarIssue, fetchIssueById } from '../../services/issuesService';
import { useNavigate, useParams } from 'react-router-dom';

const IssueForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Issue>();

  React.useEffect(() => {
    if (id) {
      fetchIssueById(parseInt(id)).then(issue => {
        setValue('description', issue.description);
        setValue('issue_type', issue.issue_type);
        setValue('date_reported', issue.date_reported.slice(0,10)); // ISO date string
        setValue('status', issue.status);
        setValue('motorcycle_id', issue.motorcycle_id);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: Issue) => {
    try {
      if (id) await actualizarIssue(parseInt(id), data);
      else await crearIssue(data);
      navigate('/issues');
    } catch {
      alert('Error guardando inconveniente');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Descripción:</label>
      <textarea {...register('description', { required: true })} />
      {errors.description && <p>Descripción es obligatoria</p>}

      <label>Tipo:</label>
      <input {...register('issue_type', { required: true })} />
      {errors.issue_type && <p>Tipo es obligatorio</p>}

      <label>Fecha reportada:</label>
      <input type="date" {...register('date_reported', { required: true })} />
      {errors.date_reported && <p>Fecha es obligatoria</p>}

      <label>Status:</label>
      <select {...register('status')}>
        <option value="open">Abierto</option>
        <option value="closed">Cerrado</option>
      </select>

      <label>Motocicleta ID:</label>
      <input type="number" {...register('motorcycle_id', { required: true })} />
      {errors.motorcycle_id && <p>Motocicleta es obligatoria</p>}

      <button type="submit">Guardar</button>
    </form>
  );
};

export default IssueForm;
