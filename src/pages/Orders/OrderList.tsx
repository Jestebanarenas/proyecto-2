import React, { useEffect, useState } from 'react';
import { Order } from '../../models/Order';
import { obtenerOrders, eliminarOrder } from '../../services/ordersService';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerOrders().then(setOrders);
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Eliminar pedido?')) {
      try {
        await eliminarOrder(id);
        setOrders(orders.filter(o => o.id !== id));
      } catch {
        alert('Error eliminando pedido');
      }
    }
  };

  return (
    <>
      <button onClick={() => navigate('/orders/new')}>Nuevo Pedido</button>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Cliente</th><th>Status</th><th>Cantidad</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customer_id}</td> {/* O mostrar nombre si está expandido */}
              <td>{o.status}</td>
              <td>{o.quantity}</td>
              <td>
                <button onClick={() => navigate(`/orders/edit/${o.id}`)}>Editar</button>
                <button onClick={() => handleDelete(o.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OrderList;
