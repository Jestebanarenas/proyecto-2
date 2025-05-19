import React, { useEffect, useState } from 'react';
import { Driver } from '../../models/Driver';
import { obtenerDrivers, eliminarDriver } from '../../services/driversService';
import { useNavigate } from 'react-router-dom';

const DriverList = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerDrivers().then(setDrivers);
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Eliminar conductor?')) {
      try {
        await eliminarDriver(id);
        setDrivers(drivers.filter(d => d.id !== id));
      } catch {
        alert('Error eliminando conductor');
      }
    }
  };

  return (
    <>
      <button onClick={() => navigate('/drivers/new')}>Nuevo Conductor</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th><th>Licencia</th><th>Teléfono</th><th>Email</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(d => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.license_number}</td>
              <td>{d.phone}</td>
              <td>{d.email}</td>
              <td>{d.status}</td>
              <td>
                <button onClick={() => navigate(`/drivers/edit/${d.id}`)}>Editar</button>
                <button onClick={() => handleDelete(d.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DriverList;
