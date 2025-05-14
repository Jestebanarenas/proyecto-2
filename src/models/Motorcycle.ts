export interface IMotorcycle {
  id: number;
  licensePlate: string;
  brand: string;
  year: number;
  status: 'available' | 'inUse' | 'maintenance';
}

export class Motorcycle implements IMotorcycle {
  id: number;
  licensePlate: string;
  brand: string;
  year: number;
  status: 'available' | 'inUse' | 'maintenance';

  constructor(
    id: number,
    licensePlate: string,
    brand: string,
    year: number,
    status: 'available' | 'inUse' | 'maintenance' = 'available'
  ) {
    this.id = id;
    this.licensePlate = licensePlate;
    this.brand = brand;
    this.year = year;
    this.status = status;
  }

  static fromJson(json: any): Motorcycle {
    return new Motorcycle(
      json.id,
      json.license_plate,
      json.brand,
      json.year,
      json.status
    );
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      license_plate: this.licensePlate,
      brand: this.brand,
      year: this.year,
      status: this.status
    };
  }
}