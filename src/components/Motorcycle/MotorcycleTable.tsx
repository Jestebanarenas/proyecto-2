import React, { useState, useEffect, useCallback } from 'react';
import { Motorcycle } from '../../types/Motorcycle.type';
import { fetchMotorcycles, deleteMotorcycle } from '../../api/motorcycle.api';
import { Link, useNavigate } from 'react-router-dom';

const MotorcycleTable = () => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Mejorar: useCallback para evitar recrear la función en cada render
  const loadMotorcycles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMotorcycles();
      setMotorcycles(data);
    } catch (error) {
      setError('Error cargando las motocicletas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMotorcycles();
  }, [loadMotorcycles]);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta motocicleta?')) {
      try {
        await deleteMotorcycle(id);
        setMotorcycles((prev) => prev.filter((moto) => moto.id !== id));
      } catch (error) {
        setError('Error eliminando la motocicleta');
      }
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/motorcycles/edit/${id}`);
  };

  return (
    <div className="motorcycle-table-container">
      <h2>Lista de Motocicletas</h2>

      <Link to="/motorcycles/new" className="create-button">
        Crear Nueva Motocicleta
      </Link>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="spinner" style={{
            width: 18, height: 18, border: '3px solid #ccc', borderTop: '3px solid #333', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite'
          }} />
          <span>Cargando...</span>
          <style>
            {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
          </style>
        </div>
      ) : (
        <>
          {motorcycles.length === 0 ? (
            <p>No hay motocicletas registradas</p>
          ) : (
            <table className="motorcycle-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Placa</th>
                  <th>Marca</th>
                  <th>Año</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {motorcycles.map((moto) => (
                  <tr key={moto.id}>
                    <td>{moto.id}</td>
                    <td>{moto.license_plate}</td>
                    <td>{moto.brand}</td>
                    <td>{moto.year}</td>
                    <td>{moto.status}</td>
                    <td>
                      <button onClick={() => handleEdit(moto.id)}>
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(moto.id)}
                        style={{ marginLeft: 8, color: 'red' }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default MotorcycleTable;