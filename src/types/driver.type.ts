export type DriverStatus = "active" | "inactive" | "in_shift";

export interface DriverData {
  name: string;
  license_number: string;
  phone: string;
  email: string;
  status: DriverStatus;
}

export interface DriverResponse extends DriverData {
  id: string;
  created_at: Date;
}