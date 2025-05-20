import React, { useEffect, useState } from "react";
import { getDrivers, deleteDriver } from "../../api/driver.api";
import { useNavigate } from "react-router-dom";
import { DriverResponse } from "../../types/driver.type";

const statusColors: Record<string, string> = {
  active: "#43a047",
  inactive: "#bdbdbd",
  in_shift: "#1976d2"
};

const DriverTable: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDrivers().then(setDrivers);
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar este conductor?")) {
      await deleteDriver(id);
      setDrivers(drivers.filter(d => Number(d.id) !== id));
    }
  };

  return (
    <div className="customer-table-container">
      <h1>Conductores</h1>
      <button onClick={() => navigate('/drivers/new')} style={{marginBottom: 16}}>Crear Conductor</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Licencia</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Creado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <tr key={driver.id}>
              <td>{driver.name}</td>
              <td>{driver.license_number}</td>
              <td>{driver.phone}</td>
              <td>{driver.email}</td>
              <td>
                <span style={{
                  color: "#fff",
                  background: statusColors[driver.status],
                  borderRadius: 8,
                  padding: "2px 10px"
                }}>
                  {driver.status}
                </span>
              </td>
              <td>{new Date(driver.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => navigate(`/drivers/${driver.id}/edit`)}>Editar</button>
                <button onClick={() => handleDelete(Number(driver.id))} style={{color: "red", marginLeft: 8}}>Eliminar</button>
                <button onClick={() => navigate(`/drivers/${driver.id}/issues`)} style={{marginLeft: 8}}>Ver Incidencias</button>
                <button onClick={() => navigate(`/drivers/${driver.id}/motorcycles`)} style={{marginLeft: 8, background: "#43a047"}}>Ver Motos</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverTable;