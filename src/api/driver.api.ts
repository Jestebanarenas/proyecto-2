import axios from "axios";
import { DriverData, DriverResponse } from "../types/driver.type";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getDrivers = async (): Promise<DriverResponse[]> => {
  const res = await axios.get<DriverResponse[]>(`${API_URL}/drivers`);
  return res.data;
};

export const getDriver = async (id: string): Promise<DriverResponse> => {
  const res = await axios.get<DriverResponse>(`${API_URL}/drivers/${id}`);
  return res.data;
};

// Add this function:
export const deleteDriver = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/drivers/${id}`);
};