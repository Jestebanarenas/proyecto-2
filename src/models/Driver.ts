export interface IDriver {
  id: number;
  name: string;
  licenseNumber: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'onShift';
}

export class Driver implements IDriver {
  id: number;
  name: string;
  licenseNumber: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'onShift';

  constructor(
    id: number,
    name: string,
    licenseNumber: string,
    phone: string,
    email: string,
    status: 'active' | 'inactive' | 'onShift' = 'active'
  ) {
    this.id = id;
    this.name = name;
    this.licenseNumber = licenseNumber;
    this.phone = phone;
    this.email = email;
    this.status = status;
  }

  static fromJson(json: any): Driver {
    return new Driver(
      json.id,
      json.name,
      json.license_number,
      json.phone,
      json.email,
      json.status
    );
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      license_number: this.licenseNumber,
      phone: this.phone,
      email: this.email,
      status: this.status
    };
  }
}