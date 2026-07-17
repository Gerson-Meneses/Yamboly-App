export type EstadoRequerimiento = 'pendiente' | 'completado';

export interface Requerimiento {
  id: string;
  cliente: string;
  material: string;
  cantidad: number;
  estado: EstadoRequerimiento;
  /** ISO string - momento en que se registró el requerimiento */
  fechaCreacion: string;
  /** ISO string - momento en que se marcó como entregado/completado */
  fechaCompletado?: string;
}

/** Datos que vienen del formulario, antes de generarle id/estado/fecha */
export type RequerimientoInput = Pick<Requerimiento, 'cliente' | 'material' | 'cantidad'>;
