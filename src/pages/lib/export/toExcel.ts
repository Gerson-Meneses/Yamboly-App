import * as XLSX from 'xlsx';
import { fechaHoraCorta, nombreDiaSemana } from '../date';
import { resumenPorMaterial, totalUnidades } from '../resumen';
import type { Requerimiento } from '../../types/requerimiento';

export function exportarExcel(requerimientos: Requerimiento[]) {
  const libro = XLSX.utils.book_new();

  // Hoja 1: resumen / conteo total por material
  const resumen = resumenPorMaterial(requerimientos);
  const filasResumen = [
    { Material: 'TOTAL GENERAL', 'Unidades solicitadas': totalUnidades(requerimientos), Pedidos: requerimientos.length },
    ...resumen.map((r) => ({ Material: r.material, 'Unidades solicitadas': r.cantidadTotal, Pedidos: r.pedidos })),
  ];
  const hojaResumen = XLSX.utils.json_to_sheet(filasResumen);
  hojaResumen['!cols'] = [{ wch: 22 }, { wch: 20 }, { wch: 10 }];
  XLSX.utils.book_append_sheet(libro, hojaResumen, 'Resumen');

  // Hoja 2: detalle de cada requerimiento
  const filasDetalle = requerimientos.map((r) => ({
    Día: nombreDiaSemana(r.fechaCreacion),
    'Fecha de registro': fechaHoraCorta(r.fechaCreacion),
    Cliente: r.cliente,
    Material: r.material,
    Cantidad: r.cantidad,
    Estado: r.estado === 'completado' ? 'Entregado' : 'Pendiente',
  }));
  const hojaDetalle = XLSX.utils.json_to_sheet(filasDetalle);
  hojaDetalle['!cols'] = [{ wch: 12 }, { wch: 20 }, { wch: 24 }, { wch: 20 }, { wch: 10 }, { wch: 12 }];
  XLSX.utils.book_append_sheet(libro, hojaDetalle, 'Requerimientos');

  XLSX.writeFile(libro, `requerimientos-yamboly-${Date.now()}.xlsx`);
}
