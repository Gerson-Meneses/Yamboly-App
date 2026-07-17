import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { fechaHoraCorta, nombreDiaSemana } from '../date';
import { resumenPorMaterial, totalUnidades } from '../resumen';
import type { Requerimiento } from '../../types/requerimiento';

const AZUL_MARCA: [number, number, number] = [23, 37, 84]; // blue-950

export function exportarPdf(requerimientos: Requerimiento[]) {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text('Requerimientos - Yamboly', 14, 15);
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Generado el ${fechaHoraCorta(new Date().toISOString())}`, 14, 21);

  const resumen = resumenPorMaterial(requerimientos);
  doc.setFontSize(11);
  doc.setTextColor(30);
  doc.text(
    `Total solicitado: ${totalUnidades(requerimientos)} unidades en ${requerimientos.length} pedidos`,
    14,
    29
  );

  autoTable(doc, {
    startY: 33,
    head: [['Material', 'Unidades', 'Pedidos']],
    body: resumen.map((r) => [r.material, String(r.cantidadTotal), String(r.pedidos)]),
    headStyles: { fillColor: AZUL_MARCA },
    styles: { fontSize: 9 },
    theme: 'grid',
  });

  const filas = requerimientos.map((r) => [
    nombreDiaSemana(r.fechaCreacion),
    fechaHoraCorta(r.fechaCreacion),
    r.cliente,
    r.material,
    String(r.cantidad),
    r.estado === 'completado' ? 'Entregado' : 'Pendiente',
  ]);

  // @ts-expect-error - lastAutoTable lo agrega el plugin en runtime
  const finResumenY = doc.lastAutoTable.finalY + 8;

  doc.setFontSize(11);
  doc.text('Detalle de requerimientos', 14, finResumenY);

  autoTable(doc, {
    startY: finResumenY + 4,
    head: [['Día', 'Fecha', 'Cliente', 'Material', 'Cant.', 'Estado']],
    body: filas,
    headStyles: { fillColor: AZUL_MARCA },
    styles: { fontSize: 9 },
  });

  doc.save(`requerimientos-yamboly-${Date.now()}.pdf`);
}
