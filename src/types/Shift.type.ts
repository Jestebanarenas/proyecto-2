export interface Shift {
  id: number;
  start_time: string; // ISO date string, e.g. "2024-06-01T08:00:00Z"
  end_time: string;   // ISO date string
  motorcycle_id: number; // 1 a 1 con Motorcycle
  driver_id: number;
  status: string;
}