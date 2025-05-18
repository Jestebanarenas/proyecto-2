import { Customer } from '../models/customer';
const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerCustomers(): Promise<Customer[]> {
  const res = await fetch(`${API_URL}/customers`);
  if (!res.ok) throw new Error('Error al obtener clientes');
  
  const data = await res.json();
  return data.map((item: any) => Customer.fromJson(item));
}

export async function fetchCustomerById(id: number): Promise<Customer> {
  const res = await fetch(`${API_URL}/customers/${id}`);
  if (!res.ok) throw new Error('Cliente no encontrado');
  
  const data = await res.json();
  return Customer.fromJson(data);
}

export async function crearCustomer(data: Customer): Promise<Customer> {
  const res = await fetch(`${API_URL}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data.toJson()),
  });
  if (!res.ok) throw new Error('Error al crear cliente');
  
  const responseData = await res.json();
  return Customer.fromJson(responseData);
}

export async function actualizarCustomer(id: number, data: Customer): Promise<Customer> {
  const res = await fetch(`${API_URL}/customers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data.toJson()),
  });
  if (!res.ok) throw new Error('Error al actualizar cliente');
  
  const responseData = await res.json();
  return Customer.fromJson(responseData);
}

export async function eliminarCustomer(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/customers/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar cliente');
}