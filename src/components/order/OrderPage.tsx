import React, { useState } from "react";
import OrderForm from "./OrderForm";
import { createOrder } from "../../api/order.api";
import { OrderData } from "../../types/Order.type";

const OrderPage = () => {
  const [loading, setLoading] = useState(false);

  const handleCreateOrder = async (data: OrderData) => {
    setLoading(true);
    try {
      await createOrder(data);
      alert("Orden creada correctamente");
    } catch {
      alert("Error creando la orden");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-form-container">
      <OrderForm onSubmit={handleCreateOrder} loading={loading} />
    </div>
  );
};

export default OrderPage;