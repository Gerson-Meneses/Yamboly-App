import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { fechaHoraCorta, nombreDiaSemana } from '../date';
import type { Requerimiento } from '../../types/requerimiento';

export function exportarPdf(requerimientos: Requerimiento[]) {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text('Requerimientos - Yamboly', 14, 15);
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Generado el ${fechaHoraCorta(new Date().toISOString())}`, 14, 21);

  const filas = requerimientos.map((r) => [
    nombreDiaSemana(r.fechaCreacion),
    fechaHoraCorta(r.fechaCreacion),
    r.cliente,
    r.material,
    String(r.cantidad),
    r.estado === 'completado' ? 'Entregado' : 'Pendiente',
  ]);

  autoTable(doc, {
    startY: 26,
    head: [['Día', 'Fecha', 'Cliente', 'Material', 'Cant.', 'Estado']],
    body: filas,
    headStyles: { fillColor: [3, 105, 161] }, // sky-700
    styles: { fontSize: 9 },
  });

  doc.save(`requerimientos-yamboly-${Date.now()}.pdf`);
}