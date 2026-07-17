import * as XLSX from 'xlsx';
import { fechaHoraCorta, nombreDiaSemana } from '../date';
import type { Requerimiento } from '../../types/requerimiento';

export function exportarExcel(requerimientos: Requerimiento[]) {
  const filas = requerimientos.map((r) => ({
    Día: nombreDiaSemana(r.fechaCreacion),
    'Fecha de registro': fechaHoraCorta(r.fechaCreacion),
    Cliente: r.cliente,
    Material: r.material,
    Cantidad: r.cantidad,
    Estado: r.estado === 'completado' ? 'Entregado' : 'Pendiente',
  }));

  const hoja = XLSX.utils.json_to_sheet(filas);
  hoja['!cols'] = [{ wch: 12 }, { wch: 20 }, { wch: 24 }, { wch: 20 }, { wch: 10 }, { wch: 12 }];

  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, 'Requerimientos');
  XLSX.writeFile(libro, `requerimientos-yamboly-${Date.now()}.xlsx`);
}