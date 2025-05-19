import React, { useEffect, useState } from 'react';
import { Motorcycle } from '../../models/Motorcycle';
import { obtenerMotorcycles, eliminarMotorcycle } from '../../services/motorcyclesService';
import { useNavigate } from 'react-router-dom';

const MotorcycleList = () => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerMotorcycles().then(setMotorcycles);
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Eliminar motocicleta?')) {
      try {
        await eliminarMotorcycle(id);
        setMotorcycles(motorcycles.filter(m => m.id !== id));
      } catch {
        alert('Error eliminando motocicleta');
      }
    }
  };

  return (
    <>
      <button onClick={() => navigate('/motorcycles/new')}>Nueva Motocicleta</button>
      <table>
        <thead>
          <tr>
            <th>Placa</th><th>Marca</th><th>Año</th><th>Status</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {motorcycles.map(m => (
            <tr key={m.id}>
              <td>{m.license_plate}</td>
              <td>{m.brand}</td>
              <td>{m.year}</td>
              <td>{m.status}</td>
              <td>
                <button onClick={() => navigate(`/motorcycles/edit/${m.id}`)}>Editar</button>
                <button onClick={() => handleDelete(m.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MotorcycleList;
