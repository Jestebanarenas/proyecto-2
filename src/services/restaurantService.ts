import { ApiService } from './api';
import { Restaurant, IRestaurant } from '../models/Restaurant';

class RestaurantService extends ApiService {
  private readonly RESOURCE = '/restaurants';

  async getAll(): Promise<Restaurant[]> {
    const data = await this.get<any[]>(this.RESOURCE);
    return data.map(item => Restaurant.fromJson(item));
  }

  async getById(id: number): Promise<Restaurant> {
    const data = await this.get<any>(`${this.RESOURCE}/${id}`);
    return Restaurant.fromJson(data);
  }

  async create(restaurant: IRestaurant): Promise<Restaurant> {
    const data = await this.post<any>(this.RESOURCE, restaurant);
    return Restaurant.fromJson(data);
  }

  async update(id: number, restaurant: Partial<IRestaurant>): Promise<Restaurant> {
    const data = await this.put<any>(`${this.RESOURCE}/${id}`, restaurant);
    return Restaurant.fromJson(data);
  }

  async delete(id: number): Promise<boolean> {
    await this.delete(`${this.RESOURCE}/${id}`);
    return true;
  }

  async getActiveOrders(id: number): Promise<any[]> {
    return this.get<any[]>(`${this.RESOURCE}/${id}/orders?status=active`);
  }
}

export default new RestaurantService();