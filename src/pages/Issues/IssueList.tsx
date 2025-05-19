import React, { useEffect, useState } from 'react';
import { Issue } from '../../models/Issue';
import { obtenerIssues, eliminarIssue } from '../../services/issuesService';
import { useNavigate } from 'react-router-dom';

const IssueList = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerIssues().then(setIssues);
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Eliminar inconveniente?')) {
      try {
        await eliminarIssue(id);
        setIssues(issues.filter(i => i.id !== id));
      } catch {
        alert('Error eliminando inconveniente');
      }
    }
  };

  return (
    <>
      <button onClick={() => navigate('/issues/new')}>Nuevo Inconveniente</button>
      <table>
        <thead>
          <tr>
            <th>Descripción</th><th>Tipo</th><th>Fecha</th><th>Status</th><th>Motocicleta ID</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(i => (
            <tr key={i.id}>
              <td>{i.description}</td>
              <td>{i.issue_type}</td>
              <td>{i.date_reported.slice(0,10)}</td>
              <td>{i.status}</td>
              <td>{i.motorcycle_id}</td>
              <td>
                <button onClick={() => navigate(`/issues/edit/${i.id}`)}>Editar</button>
                <button onClick={() => handleDelete(i.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default IssueList;
