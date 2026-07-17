import { agruparPor } from '../group';
import { claveDia, encabezadoGrupo } from '../date';
import type { Requerimiento } from '../../types/requerimiento';

export function generarTextoPlano(requerimientos: Requerimiento[]): string {
  if (requerimientos.length === 0) {
    return 'No hay requerimientos registrados.';
  }

  const grupos = agruparPor(requerimientos, (r) => claveDia(r.fechaCreacion));
  const fechasOrdenadas = Object.keys(grupos).sort((a, b) => (a < b ? 1 : -1));

  let texto = 'REQUERIMIENTOS - YAMBOLY\n';

  for (const fecha of fechasOrdenadas) {
    texto += `\n${encabezadoGrupo(fecha)}\n`;
    for (const item of grupos[fecha]) {
      const estado = item.estado === 'completado' ? 'Entregado' : 'Pendiente';
      texto += `  - ${item.cliente}: ${item.material} x${item.cantidad} (${estado})\n`;
    }
  }

  return texto;
}