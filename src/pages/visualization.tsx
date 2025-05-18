import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Importamos el gráfico de barras de react-chartjs-2
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { obtenerOrders } from '../services/ordersService'; // Importamos el servicio de pedidos

// Registramos los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Visualization = () => {
  const [pedidos, setPedidos] = useState([]);
  
  // Obtendremos los datos de pedidos cuando el componente se monte
  useEffect(() => {
    obtenerOrders()
      .then((data) => setPedidos(data))
      .catch((err) => console.error('Error obteniendo los pedidos', err));
  }, []);

  // Aquí preparamos los datos que se van a visualizar en el gráfico
  const chartData = {
    labels: ['Pendientes', 'Asignados', 'Entregados', 'Cancelados'], // Los estados de los pedidos
    datasets: [
      {
        label: 'Pedidos por Estado',
        data: [
          pedidos.filter((p) => p.status === 'pending').length,   // Número de pedidos pendientes
          pedidos.filter((p) => p.status === 'assigned').length,   // Número de pedidos asignados
          pedidos.filter((p) => p.status === 'delivered').length,  // Número de pedidos entregados
          pedidos.filter((p) => p.status === 'cancelled').length,  // Número de pedidos cancelados
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de las barras
        borderColor: 'rgba(75, 192, 192, 1)', // Color del borde
        borderWidth: 1,
      },
    ],
  };

  // Opciones de personalización del gráfico
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Número de Pedidos por Estado', // Título del gráfico
      },
      legend: {
        position: 'top', // Posición de la leyenda
      },
    },
  };

  return (
    <div>
      <h2>Visualización de Pedidos</h2>
      {/* Componente Bar de react-chartjs-2 */}
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default Visualization;
