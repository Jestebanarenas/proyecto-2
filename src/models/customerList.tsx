import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Customer } from '../models/customer';
import { obtenerCustomers, eliminarCustomer } from '../services/customerService';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await obtenerCustomers();
      setCustomers(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar la lista de clientes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      return;
    }

    try {
      await eliminarCustomer(id);
      // Actualizar la lista después de eliminar
      setCustomers(customers.filter(customer => customer.id !== id));
    } catch (err) {
      setError('Error al eliminar el cliente');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Cargando clientes...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        {error}
        <button className="btn btn-outline-danger ml-2" onClick={loadCustomers}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Clientes</h2>
        <Link to="/customers/new" className="btn btn-primary">
          Nuevo Cliente
        </Link>
      </div>

      {customers.length === 0 ? (
        <div className="alert alert-info">No hay clientes registrados.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Fecha de registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="btn-group">
                      <Link
                        to={`/customers/edit/${customer.id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        Editar
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(customer.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerList;