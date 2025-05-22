import React, { useEffect, useRef } from "react";

interface OrderNotificationProps {
  show: boolean;
  onClose: () => void;
}

const OrderNotification: React.FC<OrderNotificationProps> = ({ show, onClose }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (show && audioRef.current) {
      audioRef.current.play().catch(console.error);

      // Auto close after 6 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="order-notification-overlay">
      <div className="order-notification-modal">
        <audio ref={audioRef} preload="auto">
          <source src="/sounds/notification.mp3" type="audio/mpeg" />
        </audio>
        <div style={{ textAlign: 'center' }}>
          <div className="order-notification-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h2 className="order-notification-title">
            ¡Orden creada correctamente!
          </h2>
          <p className="order-notification-message">
            La orden ha sido registrada exitosamente en el sistema.
          </p>
          <button
            onClick={onClose}
            className="order-notification-button"
          >
            Entendido
          </button>
        </div>
        <button
          onClick={onClose}
          className="order-notification-close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default OrderNotification;