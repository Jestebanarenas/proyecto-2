import React, { useEffect, useState } from 'react';
import { Shift } from '../../models/Shift';
import { obtenerShifts, eliminarShift } from '../../services/shiftsService';
import { useNavigate } from 'react-router-dom';

const ShiftList = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerShifts().then(setShifts);
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Eliminar turno?')) {
      try {
        await eliminarShift(id);
        setShifts(shifts.filter(s => s.id !== id));
      } catch {
        alert('Error eliminando turno');
      }
    }
  };

  return (
    <>
      <button onClick={() => navigate('/shifts/new')}>Nuevo Turno</button>
      <table>
        <thead>
          <tr>
            <th>ID Conductor</th><th>ID Motocicleta</th><th>Inicio</th><th>Fin</th><th>Status</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map(s => (
            <tr key={s.id}>
              <td>{s.driver_id}</td>
              <td>{s.motorcycle_id}</td>
              <td>{s.start_time}</td>
              <td>{s.end_time}</td>
              <td>{s.status}</td>
              <td>
                <button onClick={() => navigate(`/shifts/edit/${s.id}`)}>Editar</button>
                <button onClick={() => handleDelete(s.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ShiftList;
