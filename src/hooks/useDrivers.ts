import { useState, useEffect } from 'react';
import { Driver, DriverStatus } from '../models/Driver';

const useDrivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      // Simulate an API call to fetch drivers
      const response = await fetch('/api/drivers');
      const data = await response.json();
      const driversList = data.map((driver: any) => Driver.fromJson(driver));
      setDrivers(driversList);
    } catch (err) {
      setError('Failed to fetch drivers');
    } finally {
      setLoading(false);
    }
  };

  const registerDriver = async (name: string, license_number: string, phone: string, email: string) => {
    try {
      const newDriver = new Driver(Date.now(), name, license_number, phone, email);
      // Simulate an API call to register a new driver
      await fetch('/api/drivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDriver.toJson()),
      });
      fetchDrivers(); // Refresh the driver list after registration
    } catch (err) {
      setError('Failed to register driver');
    }
  };

  const updateDriverInfo = async (id: number, name: string, license_number: string, phone: string, email: string) => {
    try {
      const updatedDriver = new Driver(id, name, license_number, phone, email);
      // Simulate an API call to update driver information
      await fetch(`/api/drivers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDriver.toJson()),
      });
      fetchDrivers(); // Refresh the driver list after update
    } catch (err) {
      setError('Failed to update driver information');
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return {
    drivers,
    loading,
    error,
    registerDriver,
    updateDriverInfo,
  };
};

export default useDrivers;