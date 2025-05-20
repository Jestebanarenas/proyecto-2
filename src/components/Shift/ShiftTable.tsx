import React, { useEffect, useState } from 'react';
import { Shift } from '../../types/Shift.type';
import { fetchShifts, deleteShift } from '../../api/shift.api';
import { useNavigate } from 'react-router-dom';

const ShiftTable: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchShifts()
      .then(data => setShifts(data))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/shifts/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Seguro que deseas eliminar este turno?')) {
      await deleteShift(id);
      setShifts(shifts.filter(s => s.id !== id));
    }
  };

  if (loading) return <p>Cargando turnos...</p>;

  return (
    <div>
      <h2>Turnos</h2>
      <button onClick={() => navigate('/shifts/new')}>Nuevo Turno</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Motocicleta</th>
            <th>Conductor</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map(shift => (
            <tr key={shift.id}>
              <td>{shift.id}</td>
              <td>{shift.start_time}</td>
              <td>{shift.end_time}</td>
              <td>{shift.motorcycle_id}</td>
              <td>{shift.driver_id}</td>
              <td>{shift.status}</td>
              <td>
                <button onClick={() => handleEdit(shift.id)}>Editar</button>
                <button onClick={() => handleDelete(shift.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShiftTable;