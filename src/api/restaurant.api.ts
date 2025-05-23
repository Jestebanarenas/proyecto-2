import instance from "../utils/axiosInstance";
import { RestaurantData, RestaurantResponse } from "../types/Restaurant.type";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getRestaurants = async (): Promise<RestaurantResponse[]> => {
  const res = await instance.get<RestaurantResponse[]>(`${API_URL}/restaurants`);
  return res.data;
};

export const getRestaurant = async (id: number): Promise<RestaurantResponse> => {
  const res = await instance.get<RestaurantResponse>(`${API_URL}/restaurants/${id}`);
  return res.data;
};

export const createRestaurant = async (data: RestaurantData): Promise<RestaurantResponse> => {
  const res = await instance.post<RestaurantResponse>(`${API_URL}/restaurants`, data);
  return res.data;
};

export const updateRestaurant = async (id: number, data: RestaurantData): Promise<RestaurantResponse> => {
  const res = await instance.put<RestaurantResponse>(`${API_URL}/restaurants/${id}`, data);
  return res.data;
};

export const deleteRestaurant = async (id: number): Promise<void> => {
  await instance.delete(`${API_URL}/restaurants/${id}`);
};

export {};