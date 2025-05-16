export type MotorcycleStatus = 'available' | 'inUse' | 'maintenance';

export interface IMotorcycle {
  id: number;
  license_plate: string;
  brand: string;
  year: number;
  status: MotorcycleStatus;
}

export class Motorcycle implements IMotorcycle {
  id: number;
  license_plate: string;
  brand: string;
  year: number;
  status: MotorcycleStatus;

  constructor(
    id: number,
    license_plate: string,
    brand: string,
    year: number,
    status: MotorcycleStatus = 'available'
  ) {
    this.id = id;
    this.license_plate = license_plate;
    this.brand = brand;
    this.year = year;
    this.status = status;
  }

  // Static method to create a Motorcycle instance from JSON data
  static fromJson(json: any): Motorcycle {
    return new Motorcycle(
      json.id,
      json.license_plate,
      json.brand,
      json.year,
      json.status
    );
  }

  // Method to convert Motorcycle instance to JSON
  toJson(): Record<string, any> {
    return {
      id: this.id,
      license_plate: this.license_plate,
      brand: this.brand,
      year: this.year,
      status: this.status
    };
  }

  // Method to register a new motorcycle
  registerMotorcycle(license_plate: string, brand: string, year: number): void {
    // Implementation would typically involve API calls
    console.log(`Registering motorcycle: ${license_plate}`);
  }

  // Method to update motorcycle status
  updateMotorcycleStatus(id: number, status: MotorcycleStatus): void {
    // Implementation would typically involve API calls
    console.log(`Updating motorcycle ${id} status to: ${status}`);
  }

  // Method to get available motorcycles
  getAvailableMotorcycles(): void {
    // Implementation would typically involve API calls
    console.log('Fetching available motorcycles');
  }

  // Method to report an issue with a motorcycle
  reportIssue(motorcycle_id: number, description: string, issue_type: string): void {
    // Implementation would typically involve API calls
    console.log(`Reporting issue for motorcycle ${motorcycle_id}: ${description}`);
  }

  // Method to assign a driver to a motorcycle
  assignToDriver(driver_id: number): void {
    // Implementation would typically involve API calls
    console.log(`Assigning motorcycle to driver: ${driver_id}`);
  }

  // Method to get motorcycle history
  getMotorcycleHistory(id: number): void {
    // Implementation would typically involve API calls
    console.log(`Fetching history for motorcycle with ID: ${id}`);
  }
}