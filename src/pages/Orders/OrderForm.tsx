import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Order, Cliente, Producto, Direccion, Motorcycle } from '../../models/Order';
import { crearOrder, actualizarOrder, fetchOrderById } from '../../services/ordersService';
import { obtenerClientes } from '../../services/customersService';
import { obtenerProductos } from '../../services/productosService';
import { obtenerDirecciones } from '../../services/direccionesService';
import { obtenerMotorcycles } from '../../services/motorcyclesService';
import { useNavigate, useParams } from 'react-router-dom';

const OrderForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<Order>();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);

  useEffect(() => {
    obtenerClientes().then(setClientes);
    obtenerProductos().then(setProductos);
    obtenerDirecciones().then(setDirecciones);
    obtenerMotorcycles().then(setMotorcycles);
  }, []);

  useEffect(() => {
    if (id) {
      fetchOrderById(parseInt(id)).then(order => {
        setValue('customer_id', order.customer_id);
        setValue('status', order.status);
        setValue('motorcycle_id', order.motorcycle_id);
        setValue('address_id', order.address_id);
        setValue('quantity', order.quantity);
        // Asumimos que los items y demás campos se manejan con control personalizado
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: Order) => {
    try {
      if (id) await actualizarOrder(parseInt(id), data);
      else await crearOrder(data);
      navigate('/orders');
    } catch {
      alert('Error guardando pedido');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Cliente:</label>
      <select {...register('customer_id', { required: true })}>
        <option value="">Seleccione...</option>
        {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
      </select>
      {errors.customer_id && <p>Cliente obligatorio</p>}

      <label>Dirección:</label>
      <select {...register('address_id', { required: true })}>
        <option value="">Seleccione...</option>
        {direcciones.map(d => <option key={d.id} value={d.id}>{d.direccion}</option>)}
      </select>
      {errors.address_id && <p>Dirección obligatoria</p>}

      <label>Motocicleta:</label>
      <select {...register('motorcycle_id', { required: true })}>
        <option value="">Seleccione...</option>
        {motorcycles.map(m => <option key={m.id} value={m.id}>{m.license_plate}</option>)}
      </select>
      {errors.motorcycle_id && <p>Motocicleta obligatoria</p>}

      <label>Status:</label>
      <select {...register('status')}>
        <option value="pending">Pendiente</option>
        <option value="assigned">Asignado</option>
        <option value="delivered">Entregado</option>
        <option value="cancelled">Cancelado</option>
      </select>

      <label>Cantidad:</label>
      <input type="number" {...register('quantity', { required: true, min: 1 })} />
      {errors.quantity && <p>Cantidad inválida</p>}

      {/* Para items (productos seleccionados), se podría usar un array de campos con Controller y react-hook-form */}
      {/* Simplificado aquí por brevedad */}

      <button type="submit">Guardar</button>
    </form>
  );
};

export default OrderForm;
