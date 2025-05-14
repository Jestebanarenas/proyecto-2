export type OrderStatus = 'pending' | 'preparing' | 'picked' | 'delivering' | 'delivered' | 'cancelled';

export interface IOrder {
  id: number;
  customerId: number;
  menuId: number;
  motorcycleId?: number; // Opcional porque puede no estar asignado todavía
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
}

export class Order implements IOrder {
  id: number;
  customerId: number;
  menuId: number;
  motorcycleId?: number;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;

  constructor(
    id: number,
    customerId: number,
    menuId: number,
    quantity: number,
    totalPrice: number,
    status: OrderStatus = 'pending',
    motorcycleId?: number,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.customerId = customerId;
    this.menuId = menuId;
    this.motorcycleId = motorcycleId;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
    this.status = status;
    this.createdAt = createdAt;
  }

  static fromJson(json: any): Order {
    return new Order(
      json.id,
      json.customer_id,
      json.menu_id,
      json.quantity,
      json.total_price,
      json.status,
      json.motorcycle_id,
      json.created_at ? new Date(json.created_at) : new Date()
    );
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      customer_id: this.customerId,
      menu_id: this.menuId,
      motorcycle_id: this.motorcycleId,
      quantity: this.quantity,
      total_price: this.totalPrice,
      status: this.status,
      created_at: this.createdAt.toISOString()
    };
  }
}