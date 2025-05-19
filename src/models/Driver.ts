import axios from 'axios';

// Definición de tipos necesarios
export type DriverStatus = 'active' | 'inactive' | 'onShift';

export interface IDriver {
  id: number;
  name: string;
  license_number: string;
  phone: string;
  email: string;
  status: DriverStatus;
}

// Interfaces para las relaciones con otras entidades
interface IShift {
  id: number;
  start_time: Date;
  end_time: Date;
  status: string;
  driver_id: number;
  motorcycle_id: number;
}

interface IMotorcycle {
  id: number;
  license_plate: string;
  brand: string;
  year: number;
  status: string;
}

// URL base para la API (se debe configurar en un archivo de entorno)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.deliveryplatform.com';

/**
 * Clase Driver que implementa todas las funcionalidades necesarias para la gestión de conductores
 * según los requisitos del proyecto y el diagrama de clases proporcionado.
 */
export class Driver implements IDriver {
  id: number;
  name: string;
  license_number: string;
  phone: string;
  email: string;
  status: DriverStatus;

  constructor(
    id: number,
    name: string,
    license_number: string,
    phone: string,
    email: string,
    status: DriverStatus = 'active'
  ) {
    this.id = id;
    this.name = name;
    this.license_number = license_number;
    this.phone = phone;
    this.email = email;
    this.status = status;
  }

  /**
   * Crea una instancia de Driver a partir de datos JSON
   * @param json Datos en formato JSON que contienen la información del conductor
   * @returns Nueva instancia de Driver
   */
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

  /**
   * Convierte la instancia de Driver a formato JSON
   * @returns Objeto con los datos del conductor en formato JSON
   */
  toJson(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      license_number: this.license_number,
      phone: this.phone,
      email: this.email,
      status: this.status
    };
  }

  /**
   * Valida el formato de un correo electrónico
   * @param email Correo electrónico a validar
   * @returns true si el formato es válido, false en caso contrario
   */
  private static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Valida el formato de un número telefónico
   * @param phone Número telefónico a validar
   * @returns true si el formato es válido, false en caso contrario
   */
  private static validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s-]{10,15}$/;
    return phoneRegex.test(phone);
  }

  /**
   * Valida el formato de un número de licencia
   * @param license_number Número de licencia a validar
   * @returns true si el formato es válido, false en caso contrario
   */
  private static validateLicense(license_number: string): boolean {
    // Este patrón debe ajustarse según las reglas específicas para licencias de conducir
    return license_number.length >= 5 && /^[A-Z0-9-]+$/.test(license_number);
  }

  /**
   * Registra un nuevo conductor en el sistema
   * @param name Nombre del conductor
   * @param license_number Número de licencia del conductor
   * @param phone Número telefónico del conductor
   * @param email Correo electrónico del conductor
   * @returns Promesa que resuelve con los datos del conductor registrado
   * @throws Error si alguno de los datos no es válido o si ocurre un error en la API
   */
  static async registerDriver(name: string, license_number: string, phone: string, email: string): Promise<Driver> {
    try {
      // Validación de datos
      if (!name || name.trim() === '') {
        throw new Error('El nombre del conductor es obligatorio');
      }

      if (!this.validateLicense(license_number)) {
        throw new Error('El formato del número de licencia no es válido');
      }

      if (!this.validatePhone(phone)) {
        throw new Error('El formato del número telefónico no es válido');
      }

      if (!this.validateEmail(email)) {
        throw new Error('El formato del correo electrónico no es válido');
      }

      // Verificar si ya existe un conductor con la misma licencia o email
      try {
        const checkLicense = await axios.get(`${API_BASE_URL}/drivers/check-license/${license_number}`);
        if (checkLicense.data.exists) {
          throw new Error(`Ya existe un conductor con el número de licencia ${license_number}`);
        }

        const checkEmail = await axios.get(`${API_BASE_URL}/drivers/check-email/${email}`);
        if (checkEmail.data.exists) {
          throw new Error(`Ya existe un conductor con el correo electrónico ${email}`);
        }
      } catch (error: any) {
        // Si el error no es de validación, lo propagamos
        if (!error.message.includes('Ya existe')) {
          throw error;
        } else {
          throw error; // Propagamos el error de duplicación
        }
      }

      // Realizar la petición a la API para registrar el conductor
      console.log(`Registrando driver: ${name}`);
      const response = await axios.post(`${API_BASE_URL}/drivers`, {
        name,
        license_number,
        phone,
        email,
        status: 'active' // Por defecto, los conductores se registran como activos
      });

      // Retornar una nueva instancia de Driver con los datos obtenidos
      return Driver.fromJson(response.data);
    } catch (error: any) {
      // Capturar y manejar errores
      console.error('Error al registrar conductor:', error);
      throw new Error(`Error al registrar conductor: ${error.message}`);
    }
  }

  /**
   * Actualiza la información de un conductor existente
   * @param id ID del conductor a actualizar
   * @param name Nuevo nombre del conductor
   * @param license_number Nuevo número de licencia
   * @param phone Nuevo número telefónico
   * @param email Nuevo correo electrónico
   * @returns Promesa que resuelve con los datos actualizados del conductor
   * @throws Error si alguno de los datos no es válido o si ocurre un error en la API
   */
  static async updateDriverInfo(id: number, name: string, license_number: string, phone: string, email: string): Promise<Driver> {
    try {
      // Validación de datos
      if (!id || id <= 0) {
        throw new Error('ID de conductor no válido');
      }

      if (!name || name.trim() === '') {
        throw new Error('El nombre del conductor es obligatorio');
      }

      if (!this.validateLicense(license_number)) {
        throw new Error('El formato del número de licencia no es válido');
      }

      if (!this.validatePhone(phone)) {
        throw new Error('El formato del número telefónico no es válido');
      }

      if (!this.validateEmail(email)) {
        throw new Error('El formato del correo electrónico no es válido');
      }

      // Verificar si existe el conductor
      const checkDriver = await axios.get(`${API_BASE_URL}/drivers/${id}`);
      if (!checkDriver.data) {
        throw new Error(`No se encontró un conductor con el ID ${id}`);
      }

      // Realizar la petición a la API para actualizar el conductor
      console.log(`Actualizando driver con ID: ${id}`);
      const response = await axios.put(`${API_BASE_URL}/drivers/${id}`, {
        name,
        license_number,
        phone,
        email
      });

      // Retornar una nueva instancia de Driver con los datos actualizados
      return Driver.fromJson(response.data);
    } catch (error: any) {
      console.error(`Error al actualizar conductor con ID ${id}:`, error);
      throw new Error(`Error al actualizar conductor: ${error.message}`);
    }
  }

  /**
   * Obtiene la lista de conductores disponibles
   * @returns Promesa que resuelve con un array de conductores disponibles
   * @throws Error si ocurre un error en la API
   */
  static async getAvailableDrivers(): Promise<Driver[]> {
    try {
      console.log('Obteniendo conductores disponibles');
      const response = await axios.get(`${API_BASE_URL}/drivers/available`);
      
      // Convertir cada objeto JSON a una instancia de Driver
      return response.data.map((driverData: any) => Driver.fromJson(driverData));
    } catch (error: any) {
      console.error('Error al obtener conductores disponibles:', error);
      throw new Error(`Error al obtener conductores disponibles: ${error.message}`);
    }
  }

  /**
   * Obtiene el historial de un conductor específico
   * @param id ID del conductor
   * @returns Promesa que resuelve con el historial del conductor
   * @throws Error si ocurre un error en la API
   */
  static async getDriverHistory(id: number): Promise<any> {
    try {
      if (!id || id <= 0) {
        throw new Error('ID de conductor no válido');
      }

      console.log(`Obteniendo historial para conductor con ID: ${id}`);
      const response = await axios.get(`${API_BASE_URL}/drivers/${id}/history`);
      
      return response.data;
    } catch (error: any) {
      console.error(`Error al obtener historial del conductor con ID ${id}:`, error);
      throw new Error(`Error al obtener historial del conductor: ${error.message}`);
    }
  }

  /**
   * Asigna un conductor a un turno con una motocicleta específica
   * @param driver_id ID del conductor
   * @param motorcycle_id ID de la motocicleta
   * @param start_time Fecha y hora de inicio del turno
   * @param end_time Fecha y hora de fin del turno
   * @returns Promesa que resuelve con los datos del turno asignado
   * @throws Error si ocurre un error en la API
   */
  static async assignDriverToShift(driver_id: number, motorcycle_id: number, start_time: Date, end_time: Date): Promise<IShift> {
    try {
      // Validación de datos
      if (!driver_id || driver_id <= 0) {
        throw new Error('ID de conductor no válido');
      }

      if (!motorcycle_id || motorcycle_id <= 0) {
        throw new Error('ID de motocicleta no válido');
      }

      if (!start_time || !end_time) {
        throw new Error('Las fechas de inicio y fin son obligatorias');
      }

      if (start_time >= end_time) {
        throw new Error('La fecha de inicio debe ser anterior a la fecha de fin');
      }

      // Verificar si el conductor está disponible
      const driverResponse = await axios.get(`${API_BASE_URL}/drivers/${driver_id}`);
      if (!driverResponse.data || driverResponse.data.status !== 'active') {
        throw new Error(`El conductor con ID ${driver_id} no está disponible`);
      }

      // Verificar si la motocicleta está disponible
      const motorcycleResponse = await axios.get(`${API_BASE_URL}/motorcycles/${motorcycle_id}`);
      if (!motorcycleResponse.data || motorcycleResponse.data.status !== 'available') {
        throw new Error(`La motocicleta con ID ${motorcycle_id} no está disponible`);
      }

      // Crear el turno
      console.log(`Asignando conductor ${driver_id} al turno con motocicleta ${motorcycle_id}`);
      const response = await axios.post(`${API_BASE_URL}/shifts`, {
        driver_id,
        motorcycle_id,
        start_time: start_time.toISOString(),
        end_time: end_time.toISOString(),
        status: 'scheduled'
      });

      return response.data;
    } catch (error: any) {
      console.error('Error al asignar conductor al turno:', error);
      throw new Error(`Error al asignar conductor al turno: ${error.message}`);
    }
  }

  /**
   * Obtiene la lista de conductores asignados a turnos
   * @returns Promesa que resuelve con la lista de conductores asignados
   * @throws Error si ocurre un error en la API
   */
  static async getAssignedDrivers(): Promise<any[]> {
    try {
      console.log('Obteniendo conductores asignados');
      const response = await axios.get(`${API_BASE_URL}/drivers/assigned`);
      
      return response.data;
    } catch (error: any) {
      console.error('Error al obtener conductores asignados:', error);
      throw new Error(`Error al obtener conductores asignados: ${error.message}`);
    }
  }

  /**
   * Cambia el estado de un conductor
   * @param driver_id ID del conductor
   * @param status Nuevo estado del conductor
   * @returns Promesa que resuelve con los datos actualizados del conductor
   * @throws Error si ocurre un error en la API
   */
  static async updateDriverStatus(driver_id: number, status: DriverStatus): Promise<Driver> {
    try {
      if (!driver_id || driver_id <= 0) {
        throw new Error('ID de conductor no válido');
      }

      if (!['active', 'inactive', 'onShift'].includes(status)) {
        throw new Error('Estado no válido');
      }

      console.log(`Actualizando estado del conductor ${driver_id} a ${status}`);
      const response = await axios.patch(`${API_BASE_URL}/drivers/${driver_id}/status`, {
        status
      });

      return Driver.fromJson(response.data);
    } catch (error: any) {
      console.error(`Error al actualizar estado del conductor ${driver_id}:`, error);
      throw new Error(`Error al actualizar estado del conductor: ${error.message}`);
    }
  }

  /**
   * Elimina un conductor del sistema
   * @param driver_id ID del conductor a eliminar
   * @returns Promesa que resuelve cuando se completa la eliminación
   * @throws Error si ocurre un error en la API
   */
  static async deleteDriver(driver_id: number): Promise<void> {
    try {
      if (!driver_id || driver_id <= 0) {
        throw new Error('ID de conductor no válido');
      }

      // Verificar si el conductor tiene turnos activos
      const shiftsResponse = await axios.get(`${API_BASE_URL}/drivers/${driver_id}/active-shifts`);
      if (shiftsResponse.data && shiftsResponse.data.length > 0) {
        throw new Error(`No se puede eliminar el conductor porque tiene ${shiftsResponse.data.length} turnos activos`);
      }

      console.log(`Eliminando conductor con ID: ${driver_id}`);
      await axios.delete(`${API_BASE_URL}/drivers/${driver_id}`);
    } catch (error: any) {
      console.error(`Error al eliminar conductor ${driver_id}:`, error);
      throw new Error(`Error al eliminar conductor: ${error.message}`);
    }
  }

  /**
   * Obtiene todos los turnos de un conductor específico
   * @param driver_id ID del conductor
   * @returns Promesa que resuelve con la lista de turnos del conductor
   * @throws Error si ocurre un error en la API
   */
  static async getDriverShifts(driver_id: number): Promise<IShift[]> {
    try {
      if (!driver_id || driver_id <= 0) {
        throw new Error('ID de conductor no válido');
      }

      console.log(`Obteniendo turnos del conductor ${driver_id}`);
      const response = await axios.get(`${API_BASE_URL}/drivers/${driver_id}/shifts`);
      
      return response.data;
    } catch (error: any) {
      console.error(`Error al obtener turnos del conductor ${driver_id}:`, error);
      throw new Error(`Error al obtener turnos del conductor: ${error.message}`);
    }
  }

  /**
   * Finaliza un turno de un conductor
   * @param shift_id ID del turno a finalizar
   * @returns Promesa que resuelve con los datos del turno finalizado
   * @throws Error si ocurre un error en la API
   */
  static async endShift(shift_id: number): Promise<IShift> {
    try {
      if (!shift_id || shift_id <= 0) {
        throw new Error('ID de turno no válido');
      }

      console.log(`Finalizando turno ${shift_id}`);
      const response = await axios.patch(`${API_BASE_URL}/shifts/${shift_id}/end`, {
        end_time: new Date().toISOString(),
        status: 'completed'
      });

      return response.data;
    } catch (error: any) {
      console.error(`Error al finalizar turno ${shift_id}:`, error);
      throw new Error(`Error al finalizar turno: ${error.message}`);
    }
  }

  /**
   * Obtiene las estadísticas de un conductor
   * @param driver_id ID del conductor
   * @returns Promesa que resuelve con las estadísticas del conductor
   * @throws Error si ocurre un error en la API
   */
  static async getDriverStats(driver_id: number): Promise<any> {
    try {
      if (!driver_id || driver_id <= 0) {
        throw new Error('ID de conductor no válido');
      }

      console.log(`Obteniendo estadísticas del conductor ${driver_id}`);
      const response = await axios.get(`${API_BASE_URL}/drivers/${driver_id}/stats`);
      
      return response.data;
    } catch (error: any) {
      console.error(`Error al obtener estadísticas del conductor ${driver_id}:`, error);
      throw new Error(`Error al obtener estadísticas del conductor: ${error.message}`);
    }
  }
  
  /**
   * Busca conductores por nombre, licencia o email
   * @param searchTerm Término de búsqueda
   * @returns Promesa que resuelve con la lista de conductores que coinciden con la búsqueda
   * @throws Error si ocurre un error en la API
   */
  static async searchDrivers(searchTerm: string): Promise<Driver[]> {
    try {
      if (!searchTerm || searchTerm.trim() === '') {
        throw new Error('El término de búsqueda es obligatorio');
      }

      console.log(`Buscando conductores con término: ${searchTerm}`);
      const response = await axios.get(`${API_BASE_URL}/drivers/search?term=${encodeURIComponent(searchTerm)}`);
      
      return response.data.map((driverData: any) => Driver.fromJson(driverData));
    } catch (error: any) {
      console.error(`Error al buscar conductores con término ${searchTerm}:`, error);
      throw new Error(`Error al buscar conductores: ${error.message}`);
    }
  }
}

export default Driver;