import { useState } from 'react';
import { Copy, FileSpreadsheet, FileText, Share2, FileType2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { exportarExcel } from '../../lib/export/toExcel';
import { exportarPdf } from '../../lib/export/toPdf';
import { exportarWord } from '../../lib/export/toWord';
import { generarTextoPlano } from '../../lib/export/toText';
import type { Requerimiento } from '../../types/requerimiento';

interface ExportMenuProps {
  requerimientos: Requerimiento[];
}

export function ExportMenu({ requerimientos }: ExportMenuProps) {
  const [abierto, setAbierto] = useState(false);
  const sinDatos = requerimientos.length === 0;

  const copiarTextoPlano = async () => {
    const texto = generarTextoPlano(requerimientos);
    try {
      await navigator.clipboard.writeText(texto);
      alert('Lista copiada al portapapeles como texto plano.');
    } catch {
      // Fallback por si el navegador bloquea el portapapeles
      window.prompt('Copia el texto manualmente:', texto);
    }
  };

  const opciones = [
    { label: 'Excel (.xlsx)', icon: FileSpreadsheet, accion: () => exportarExcel(requerimientos) },
    { label: 'PDF', icon: FileType2, accion: () => exportarPdf(requerimientos) },
    { label: 'Word (.docx)', icon: FileText, accion: () => exportarWord(requerimientos) },
    { label: 'Copiar texto plano', icon: Copy, accion: copiarTextoPlano },
  ];

  return (
    <div className="relative">
      <Button variant="secondary" onClick={() => setAbierto((v) => !v)} disabled={sinDatos}>
        <Share2 size={16} />
        Compartir
      </Button>

      {abierto && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setAbierto(false)} />
          <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
            {opciones.map(({ label, icon: Icon, accion }) => (
              <button
                key={label}
                onClick={() => {
                  accion();
                  setAbierto(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}