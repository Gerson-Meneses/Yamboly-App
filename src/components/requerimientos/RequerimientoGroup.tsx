import { agruparPor } from '../../lib/group';
import { encabezadoGrupo } from '../../lib/date';
import { RequerimientoItem } from './RequerimientoItem';
import type { Requerimiento } from '../../types/requerimiento';

interface RequerimientoGroupProps {
  fechaClave: string;
  items: Requerimiento[];
  onEditar: (item: Requerimiento) => void;
  onCompletar: (id: string) => void;
  onEliminar: (id: string) => void;
}

export function RequerimientoGroup({ fechaClave, items, onEditar, onCompletar, onEliminar }: RequerimientoGroupProps) {
  // Sub-agrupa los requerimientos del día por material, con su subtotal de unidades
  const porMaterial = agruparPor(items, (r) => r.material);
  const materiales = Object.keys(porMaterial).sort();
  const totalDia = items.reduce((suma, i) => suma + i.cantidad, 0);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-300">
        <span className="h-px flex-1 bg-blue-800" />
        {encabezadoGrupo(fechaClave)}
        <span className="rounded-full bg-blue-800/60 px-2 py-0.5 text-xs text-blue-200">
          {totalDia} unid. · {items.length} pedidos
        </span>
      </h3>

      <div className="flex flex-col gap-4">
        {materiales.map((material) => {
          const itemsMaterial = porMaterial[material];
          const subtotal = itemsMaterial.reduce((suma, i) => suma + i.cantidad, 0);
          return (
            <div key={material} className="flex flex-col gap-2">
              <div className="flex items-center gap-2 pl-1 text-xs font-medium text-blue-400">
                <span>{material}</span>
                <span className="rounded-full bg-blue-900/60 px-2 py-0.5 text-blue-300">{subtotal} unid.</span>
              </div>
              <div className="flex flex-col gap-2">
                {itemsMaterial.map((item) => (
                  <RequerimientoItem
                    key={item.id}
                    item={item}
                    onEditar={onEditar}
                    onCompletar={onCompletar}
                    onEliminar={onEliminar}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
