import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Customer } from '../models/customer';
import { fetchCustomerById, crearCustomer, actualizarCustomer } from '../services/customerService';

const CustomerForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [customer, setCustomer] = useState<Customer>(
    new Customer(0, '', '', '', '')
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (isEditing) {
      loadCustomer(parseInt(id));
    }
  }, [id]);

  const loadCustomer = async (customerId: number) => {
    try {
      setLoading(true);
      const data = await fetchCustomerById(customerId);
      setCustomer(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los datos del cliente');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      if (isEditing) {
        await actualizarCustomer(parseInt(id), customer);
      } else {
        await crearCustomer(customer);
      }

      // Redirigir después de guardar exitosamente
      navigate('/customers');
    } catch (err) {
      setError('Error al guardar el cliente');
      console.error(err);
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Cargando datos del cliente...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>{isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Teléfono
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Dirección
          </label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            value={customer.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/customers')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;