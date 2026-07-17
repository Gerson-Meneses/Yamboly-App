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
  return (
    <div className="flex flex-col gap-2">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-500">
        <span className="h-px flex-1 bg-slate-200" />
        {encabezadoGrupo(fechaClave)}
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">{items.length}</span>
      </h3>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
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
}