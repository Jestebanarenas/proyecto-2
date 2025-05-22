import instance from "../utils/axiosInstance";
import { IssueData, IssueResponse } from "../types/Issue.type";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getIssues = async (): Promise<IssueResponse[]> => {
  const res = await instance.get<IssueResponse[]>(`${API_URL}/issues`);
  return res.data;
};

export const getIssuesByMotorcycle = async (motorcycleId: number): Promise<IssueResponse[]> => {
  const res = await instance.get<IssueResponse[]>(`${API_URL}/motorcycles/${motorcycleId}/issues`);
  return res.data;
};

export const getIssue = async (id: number): Promise<IssueResponse> => {
  const res = await instance.get<IssueResponse>(`${API_URL}/issues/${id}`);
  return res.data;
};

export const createIssue = async (data: IssueData): Promise<IssueResponse> => {
  const res = await instance.post<IssueResponse>(`${API_URL}/issues`, data);
  return res.data;
};

export const updateIssue = async (id: number, data: IssueData): Promise<IssueResponse> => {
  const res = await instance.put<IssueResponse>(`${API_URL}/issues/${id}`, data);
  return res.data;
};

export const deleteIssue = async (id: number): Promise<void> => {
  await instance.delete(`${API_URL}/issues/${id}`);
};