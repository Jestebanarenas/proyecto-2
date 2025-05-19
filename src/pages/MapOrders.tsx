import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { obtenerOrders } from '../services/ordersService'; // Asumimos que tienes un servicio para obtener pedidos
import { Order } from '../models/Order'; // Suponemos que tu tipo Order tiene lat y lng para la ubicación

const MapPedidos = () => {
  const [pedidos, setPedidos] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerOrders()
      .then((data) => setPedidos(data))
      .catch((err) => console.error('Error al obtener pedidos:', err));
  }, []);

  return (
    <div style={{ height: '80vh' }}>
      <MapContainer
        center={[4.5, -75.5]} // Centro inicial del mapa (ajusta según tu ubicación)
        zoom={13}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {pedidos.map((pedido) => (
          // Marcadores para cada pedido
          <Marker
            key={pedido.id}
            position={[pedido.direccionEntrega.lat, pedido.direccionEntrega.lng]}
            icon={L.icon({
              iconUrl: 'https://example.com/icon.png', // Puedes cambiar el icono con URL o archivo local
              iconSize: [25, 25],
            })}
          >
            <Popup>
              <h3>Pedido #{pedido.id}</h3>
              <p>Cliente: {pedido.cliente?.nombre}</p>
              <p>Status: {pedido.status}</p>
              <button onClick={() => navigate(`/orders/edit/${pedido.id}`)}>Ver detalles</button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPedidos;
