import React, { useEffect, useState } from "react";
import { getDrivers } from "../../api/driver.api";
import { DriverResponse } from "../../types/driver.type";

const statusColors: Record<string, string> = {
  active: "#43a047",
  inactive: "#bdbdbd",
  in_shift: "#1976d2"
};

const DriverTable: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverResponse[]>([]);

  useEffect(() => {
    getDrivers().then(setDrivers);
  }, []);

  return (
    <div className="customer-table-container">
      <h1>Conductores</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Licencia</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Creado</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverTable;