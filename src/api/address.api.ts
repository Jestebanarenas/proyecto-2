import axios from "axios";
import { AddressData, AddressResponse } from "../types/Address.type";
import instance from "../utils/axiosInstance";

const token = localStorage.getItem("google_token");
fetch("/api/endpoint", {
  headers: {
    Authorization: `Bearer ${token}`,
    // ...other headers
  },
  // ...other fetch options
});

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getAddresses = async (): Promise<AddressResponse[]> => {
  const res = await instance.get<AddressResponse[]>(`${API_URL}/addresses`);
  return res.data;
};

export const getAddress = async (id: number): Promise<AddressResponse> => {
  const res = await instance.get<AddressResponse>(`${API_URL}/addresses/${id}`);
  return res.data;
};

export const createAddress = async (data: AddressData): Promise<AddressResponse> => {
  const res = await instance.post<AddressResponse>(`${API_URL}/addresses`, data);
  return res.data;
};

export const updateAddress = async (id: number, data: AddressData): Promise<AddressResponse> => {
  const res = await instance.put<AddressResponse>(`${API_URL}/addresses/${id}`, data);
  return res.data;
};

export const deleteAddress = async (id: number): Promise<void> => {
  await instance.delete(`${API_URL}/addresses/${id}`);
};