import { agruparPor } from './group';
import type { Requerimiento } from '../types/requerimiento';

export interface ResumenMaterial {
  material: string;
  cantidadTotal: number;
  pedidos: number;
}

/** Total de unidades y pedidos por cada material, de mayor a menor cantidad. */
export function resumenPorMaterial(requerimientos: Requerimiento[]): ResumenMaterial[] {
  const grupos = agruparPor(requerimientos, (r) => r.material);
  return Object.entries(grupos)
    .map(([material, items]) => ({
      material,
      cantidadTotal: items.reduce((suma, i) => suma + i.cantidad, 0),
      pedidos: items.length,
    }))
    .sort((a, b) => b.cantidadTotal - a.cantidadTotal);
}

export function totalUnidades(requerimientos: Requerimiento[]): number {
  return requerimientos.reduce((suma, r) => suma + r.cantidad, 0);
}
