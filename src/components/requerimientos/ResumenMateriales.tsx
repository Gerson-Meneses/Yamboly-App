import { Package } from 'lucide-react';
import { resumenPorMaterial, totalUnidades } from '../../lib/resumen';
import type { Requerimiento } from '../../types/requerimiento';

interface ResumenMaterialesProps {
  requerimientos: Requerimiento[];
}

/** Tarjeta con el conteo total de artículos solicitados, desglosado por material. */
export function ResumenMateriales({ requerimientos }: ResumenMaterialesProps) {
  if (requerimientos.length === 0) return null;

  const resumen = resumenPorMaterial(requerimientos);
  const total = totalUnidades(requerimientos);

  return (
    <div className="rounded-xl border border-blue-800 bg-blue-900/40 p-4">
      <div className="flex flex-wrap items-center gap-2 text-blue-100">
        <Package size={18} className="text-blue-400" />
        <span className="font-semibold">Total solicitado: {total} unidades</span>
        <span className="text-sm text-blue-400">({requerimientos.length} pedidos)</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {resumen.map((r) => (
          <span
            key={r.material}
            className="rounded-full border border-blue-700 bg-blue-950/60 px-3 py-1 text-xs text-blue-200"
          >
            {r.material}: <span className="font-semibold text-blue-100">{r.cantidadTotal}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
