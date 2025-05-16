export interface IShift {
  id: number;
  start_time: Date;
  end_time: Date;
  status: string;
  driver_id: number;
  motorcycle_id: number;
}

export class Shift implements IShift {
  id: number;
  start_time: Date;
  end_time: Date;
  status: string;
  driver_id: number;
  motorcycle_id: number;

  constructor(
    id: number,
    driver_id: number,
    motorcycle_id: number,
    start_time: Date,
    end_time: Date,
    status: string = 'active'
  ) {
    this.id = id;
    this.driver_id = driver_id;
    this.motorcycle_id = motorcycle_id;
    this.start_time = start_time;
    this.end_time = end_time;
    this.status = status;
  }

  // Static method to create a Shift instance from JSON data
  static fromJson(json: any): Shift {
    return new Shift(
      json.id,
      json.driver_id,
      json.motorcycle_id,
      new Date(json.start_time),
      new Date(json.end_time),
      json.status
    );
  }

  // Method to convert Shift instance to JSON
  toJson(): Record<string, any> {
    return {
      id: this.id,
      driver_id: this.driver_id,
      motorcycle_id: this.motorcycle_id,
      start_time: this.start_time.toISOString(),
      end_time: this.end_time.toISOString(),
      status: this.status
    };
  }

  // Method to create a shift
  createShift(driver_id: number, motorcycle_id: number, start_time: Date, end_time: Date): void {
    // Implementation would typically involve API calls
    console.log(`Creating shift for driver ${driver_id} with motorcycle ${motorcycle_id}`);
  }

  // Method to update shift status
  updateShiftStatus(id: number, status: string): void {
    // Implementation would typically involve API calls
    console.log(`Updating shift ${id} status to: ${status}`);
  }

  // Method to end a shift
  endShift(end_time: Date): void {
    // Implementation would typically involve API calls
    console.log(`Ending shift at: ${end_time}`);
  }

  // Method to get active shifts
  getActiveShifts(): void {
    // Implementation would typically involve API calls
    console.log('Fetching active shifts');
  }

  // Method to get shifts by driver
  getShiftsByDriver(driver_id: number): void {
    // Implementation would typically involve API calls
    console.log(`Fetching shifts for driver: ${driver_id}`);
  }

  // Method to get shifts by motorcycle
  getShiftsByMotorcycle(motorcycle_id: number): void {
    // Implementation would typically involve API calls
    console.log(`Fetching shifts for motorcycle: ${motorcycle_id}`);
  }
}