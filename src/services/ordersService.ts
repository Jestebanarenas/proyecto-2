import { Order } from '../models/Order';
const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerOrders(): Promise<Order[]> {
  const res = await fetch(`${API_URL}/orders`);
  if (!res.ok) throw new Error('Error al obtener pedidos');
  return res.json();
}

export async function fetchOrderById(id: number): Promise<Order> {
  const res = await fetch(`${API_URL}/orders/${id}`);
  if (!res.ok) throw new Error('Pedido no encontrado');
  return res.json();
}

export async function crearOrder(data: Order): Promise<Order> {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear pedido');
  return res.json();
}

export async function actualizarOrder(id: number, data: Order): Promise<Order> {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar pedido');
  return res.json();
}

export async function eliminarOrder(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/orders/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar pedido');
}
