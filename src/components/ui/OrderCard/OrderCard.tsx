import React from 'react';
import { IOrder } from '../../../models/Order';
import styles from './OrderCard.module.css';

interface OrderCardProps {
  order: IOrder;
  onViewDetails: (id: number) => void;
  onUpdateStatus?: (id: number, status: string) => void;
  compact?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({ 
  order, 
  onViewDetails, 
  onUpdateStatus,
  compact = false 
}) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onUpdateStatus) {
      onUpdateStatus(order.id, e.target.value);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending': return styles.statusPending;
      case 'preparing': return styles.statusPreparing;
      case 'picked': return styles.statusPicked;
      case 'delivering': return styles.statusDelivering;
      case 'delivered': return styles.statusDelivered;
      case 'cancelled': return styles.statusCancelled;
      default: return '';
    }
  };

  return (
    <div className={`${styles.orderCard} ${compact ? styles.compact : ''}`}>
      <div className={styles.header}>
        <span className={styles.orderId}>#{order.id}</span>
        <span className={`${styles.status} ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>
      
      <div className={styles.content}>
        <p className={styles.price}>${order.totalPrice.toFixed(2)}</p>
        <p className={styles.quantity}>Items: {order.quantity}</p>
        
        {!compact && (
          <div className={styles.actions}>
            <button 
              className={styles.detailsButton}
              onClick={() => onViewDetails(order.id)}
            >
              View Details
            </button>
            
            {onUpdateStatus && (
              <select 
                value={order.status}
                onChange={handleStatusChange}
                className={styles.statusSelect}
              >
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="picked">Picked</option>
                <option value="delivering">Delivering</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;