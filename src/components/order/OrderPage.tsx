// filepath: src/components/order/OrderPage.tsx
import React, { useState } from "react";
import OrderForm from "./OrderForm";
import { createOrder } from "../../api/order.api";
import { OrderData } from "../../types/Order.type";
import OrderMap from "../map/map";
import { geocodeAddress } from "../../utils/geocode";
import OrderNotification from "../OrderNotification";

const OrderPage = () => {
  const [loading, setLoading] = useState(false);
  const [orderAddress, setOrderAddress] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleCreateOrder = async (data: OrderData) => {
    setLoading(true);
    try {
      await createOrder(data);
      setShowNotification(true);
      // Compose address string
      const addr = data.address
        ? `${data.address.street}, ${data.address.city}, ${data.address.state}, ${data.address.postal_code}`
        : "";
      setOrderAddress(addr);
      if (addr) {
        const geo = await geocodeAddress(addr);
        setCoords(geo);
      }
    } catch {
      alert("Error creando la orden");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-form-container">
      <OrderForm onSubmit={handleCreateOrder} loading={loading} />
      {coords && orderAddress && (
        <OrderMap lat={coords.lat} lng={coords.lng} address={orderAddress} />
      )}
      <OrderNotification show={showNotification} onClose={() => setShowNotification(false)} />
    </div>
  );
};

export default OrderPage;