import { Document, HeadingLevel, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import { agruparPor } from '../group';
import { claveDia, encabezadoGrupo } from '../date';
import { resumenPorMaterial, totalUnidades } from '../resumen';
import type { Requerimiento } from '../../types/requerimiento';

function celda(texto: string, negrita = false): TableCell {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text: texto, bold: negrita })] })],
  });
}

function filaEncabezado(columnas: string[]): TableRow {
  return new TableRow({ children: columnas.map((texto) => celda(texto, true)) });
}

export async function exportarWord(requerimientos: Requerimiento[]) {
  const bloques: (Paragraph | Table)[] = [
    new Paragraph({ text: 'Requerimientos - Yamboly', heading: HeadingLevel.HEADING_1 }),
    new Paragraph({
      text: `Total solicitado: ${totalUnidades(requerimientos)} unidades en ${requerimientos.length} pedidos`,
      spacing: { after: 200 },
    }),
  ];

  // Tabla de resumen por material
  const resumen = resumenPorMaterial(requerimientos);
  bloques.push(new Paragraph({ text: 'Resumen por material', heading: HeadingLevel.HEADING_2 }));
  bloques.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        filaEncabezado(['Material', 'Unidades', 'Pedidos']),
        ...resumen.map(
          (r) => new TableRow({ children: [celda(r.material), celda(String(r.cantidadTotal)), celda(String(r.pedidos))] })
        ),
      ],
    })
  );

  // Detalle agrupado por fecha
  const grupos = agruparPor(requerimientos, (r) => claveDia(r.fechaCreacion));
  const fechasOrdenadas = Object.keys(grupos).sort((a, b) => (a < b ? 1 : -1));

  for (const fecha of fechasOrdenadas) {
    bloques.push(
      new Paragraph({ text: encabezadoGrupo(fecha), heading: HeadingLevel.HEADING_2, spacing: { before: 300 } })
    );

    const filas = grupos[fecha].map(
      (item) =>
        new TableRow({
          children: [
            celda(item.cliente),
            celda(item.material),
            celda(String(item.cantidad)),
            celda(item.estado === 'completado' ? 'Entregado' : 'Pendiente'),
          ],
        })
    );

    bloques.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [filaEncabezado(['Cliente', 'Material', 'Cantidad', 'Estado']), ...filas],
      })
    );
  }

  const doc = new Document({ sections: [{ children: bloques }] });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `requerimientos-yamboly-${Date.now()}.docx`);
}
