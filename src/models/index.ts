// Exporta Todos los modelos
// src/models/index.ts
// Archivo que exporta todos los modelos para un acceso más fácil

// Importación y exportación de modelos
export * from './Driver';
export * from './Motorcycle';
export * from './Order';
export * from './Issue';
export * from './Photo';
export * from './Shift';
//export * from './Restaurant';

// Exportación de tipos comunes
export type ModelId = number;

// Enums compartidos que podrían ser útiles a través de la aplicación
export enum Status {
  Active = 'active',
  Inactive = 'inactive'
}

// Exportación de interfaces o tipos comunes
export interface BaseModel {
  id: ModelId;
}

// Funciones de utilidad relacionadas con modelos
export const isValidId = (id: any): id is ModelId => {
  return typeof id === 'number' && id > 0;
};