import React, { useEffect, useRef, useState } from "react";
import { getOrders } from "../api/order.api";

const SOUND_URL = "public/sounds/notification.mp3"; // Your sound file location

const PedidoNotifier: React.FC = () => {
  const [lastOrderId, setLastOrderId] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Initial fetch to set the last order ID
    getOrders().then(orders => {
      if (orders.length > 0) {
        setLastOrderId(orders[0].id);
      }
    });

    // Poll every 10 seconds for new orders
    const interval = setInterval(async () => {
      const orders = await getOrders();
      if (orders.length > 0 && orders[0].id !== lastOrderId) {
        setLastOrderId(orders[0].id);
        setShowAlert(true);
        if (audioRef.current) {
          audioRef.current.play();
        }
        setTimeout(() => setShowAlert(false), 5000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [lastOrderId]);

  return (
    <>
      <audio ref={audioRef} src={SOUND_URL} preload="auto" />
      {showAlert && (
        <div className="order-alert">
          <strong>¡Nueva orden creada!</strong>
        </div>
      )}
    </>
  );
};

export default PedidoNotifier;