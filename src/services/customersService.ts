const API_URL = import.meta.env.VITE_API_URL || 'https://miapi.dominio.com';

export async function obtenerClientes(): Promise<Customer[]> {
  const resp = await fetch(`${API_URL}/clientes`);
  if (!resp.ok) throw new Error('Error al obtener clientes');
  return await resp.json();  // asume que el cuerpo es JSON de Cliente[]
}

export async function crearCliente(data: Customer): Promise<Customer> {
  const resp = await fetch(`${API_URL}/clientes`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenActual}`  // incluir token si requerido
    },
    body: JSON.stringify(data)
  });
  if (!resp.ok) throw new Error('Error al crear cliente');
  return await resp.json();
}
