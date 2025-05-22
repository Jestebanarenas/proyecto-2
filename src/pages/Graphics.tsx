import React, { JSX, useEffect, useState } from "react";
import { getOrders } from "../api/order.api";
import { OrderResponse } from "../types/Order.type";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  PointElement,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const StatsDashboard: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState<"pie" | "bar" | "line">("pie");

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const productCount: Record<string, { name: string; count: number }> = {};
  orders.forEach((order) => {
    const productName = order.menu?.product?.name || "Desconocido";
    if (!productCount[productName]) {
      productCount[productName] = { name: productName, count: 0 };
    }
    productCount[productName].count += order.quantity;
  });
  const productData = Object.values(productCount).sort((a, b) => b.count - a.count);

  const customerCount: Record<string, { name: string; count: number }> = {};
  orders.forEach((order) => {
    const customerName = order.customer?.name || "Desconocido";
    if (!customerCount[customerName]) {
      customerCount[customerName] = { name: customerName, count: 0 };
    }
    customerCount[customerName].count += 1;
  });
  const customerData = Object.values(customerCount).sort((a, b) => b.count - a.count);

  const addressCount: Record<string, { label: string; count: number }> = {};
  orders.forEach((order) => {
    const addressLabel = order.address
      ? `${order.address.street}, ${order.address.city}`
      : "Desconocida";
    if (!addressCount[addressLabel]) {
      addressCount[addressLabel] = { label: addressLabel, count: 0 };
    }
    addressCount[addressLabel].count += 1;
  });
  const addressData = Object.values(addressCount).sort((a, b) => b.count - a.count);

  const renderChart = (
    title: string,
    labels: string[],
    data: number[]
  ): JSX.Element => {
    const dataset = {
      labels,
      datasets: [
        {
          label: title,
          data,
          backgroundColor: [
            "#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40", "#d35400", "#1976d2"
          ],
          borderColor: "#ccc",
        },
      ],
    };

    const commonOptions = {
      plugins: {
        legend: { display: true, position: 'bottom' as const },
        title: { display: false },
      },
      responsive: true,
      maintainAspectRatio: false,
    };

    switch (chartType) {
      case "bar":
        return <Bar data={dataset} options={commonOptions} />;
      case "line":
        return <Line data={dataset} options={commonOptions} />;
      case "pie":
      default:
        return <Pie data={dataset} options={commonOptions} />;
    }
  };

  return (
    <div className="customer-table-container">
      <h1>Estadísticas de Pedidos</h1>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <button onClick={() => setChartType("pie")}>Pie</button>{" "}
        <button onClick={() => setChartType("bar")}>Barras</button>{" "}
        <button onClick={() => setChartType("line")}>Líneas</button>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "center" }}>
          <div style={{ width: 340, height: 340 }}>
            <h2 style={{ textAlign: "center" }}>Productos más vendidos</h2>
            {renderChart("Productos", productData.map(p => p.name), productData.map(p => p.count))}
          </div>
          <div style={{ width: 340, height: 340 }}>
            <h2 style={{ textAlign: "center" }}>Clientes con más compras</h2>
            {renderChart("Clientes", customerData.map(c => c.name), customerData.map(c => c.count))}
          </div>
          <div style={{ width: 340, height: 340 }}>
            <h2 style={{ textAlign: "center" }}>Direcciones más usadas</h2>
            {renderChart("Direcciones", addressData.map(a => a.label), addressData.map(a => a.count))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsDashboard;
