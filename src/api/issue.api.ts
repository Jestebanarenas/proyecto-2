import { IIssue } from '../types/Issue.type';

const API_URL = '/api/issues';

export async function fetchIssues(): Promise<IIssue[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error fetching issues');
  return res.json();
}

export async function fetchIssueById(id: number): Promise<IIssue> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Error fetching issue');
  return res.json();
}

export async function createIssue(data: Omit<IIssue, 'id'>): Promise<IIssue> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error creating issue');
  return res.json();
}

export async function updateIssue(id: number, data: Partial<IIssue>): Promise<IIssue> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error updating issue');
  return res.json();
}

export async function deleteIssue(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error deleting issue');
}