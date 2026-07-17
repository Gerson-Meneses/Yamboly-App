import { agruparPor } from '../group';
import { claveDia, encabezadoGrupo } from '../date';
import { resumenPorMaterial, totalUnidades } from '../resumen';
import type { Requerimiento } from '../../types/requerimiento';

/**
 * Genera el texto de la lista optimizado para pegar directo en WhatsApp:
 * usa *negritas* y _cursivas_ (sintaxis nativa de WhatsApp) y emojis como
 * referencias visuales rápidas en vez de indentado plano.
 */
export function generarTextoPlano(requerimientos: Requerimiento[]): string {
  if (requerimientos.length === 0) {
    return 'No hay requerimientos registrados.';
  }

  const total = totalUnidades(requerimientos);
  const resumenGeneral = resumenPorMaterial(requerimientos);

  let texto = '🍦 *REQUERIMIENTOS YAMBOLY*\n';
  texto += `📦 Total: *${total}* unidades en *${requerimientos.length}* pedidos\n`;
  texto += resumenGeneral.map((r) => `   • ${r.material}: *${r.cantidadTotal}*`).join('\n');
  texto += '\n';

  const grupos = agruparPor(requerimientos, (r) => claveDia(r.fechaCreacion));
  const fechasOrdenadas = Object.keys(grupos).sort((a, b) => (a < b ? 1 : -1));

  for (const fecha of fechasOrdenadas) {
    const itemsFecha = grupos[fecha];
    texto += `\n📅 *${encabezadoGrupo(fecha)}*\n`;

    const porMaterial = agruparPor(itemsFecha, (r) => r.material);
    for (const material of Object.keys(porMaterial).sort()) {
      const itemsMaterial = porMaterial[material];
      const subtotal = itemsMaterial.reduce((suma, i) => suma + i.cantidad, 0);
      texto += `  🔹 _${material}_ (${subtotal})\n`;
      for (const item of itemsMaterial) {
        const marca = item.estado === 'completado' ? '✅' : '🕓';
        texto += `     ${marca} ${item.cliente} x${item.cantidad}\n`;
      }
    }
  }

  return texto.trim();
}
