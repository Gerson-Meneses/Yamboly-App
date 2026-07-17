import { CheckCircle2, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { Requerimiento } from '../../types/requerimiento';

interface RequerimientoItemProps {
  item: Requerimiento;
  onEditar: (item: Requerimiento) => void;
  onCompletar: (id: string) => void;
  onEliminar: (id: string) => void;
}

export function RequerimientoItem({ item, onEditar, onCompletar, onEliminar }: RequerimientoItemProps) {
  const completado = item.estado === 'completado';

  return (
    <div
      className={`flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between ${
        completado ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-blue-800 bg-blue-900/30'
      }`}
    >
      <div className="flex flex-col">
        <span className="font-medium text-blue-50">{item.cliente}</span>
        <span className="text-sm text-blue-400">Cantidad: {item.cantidad}</span>
      </div>

      <div className="flex items-center gap-2">
        <Badge tone={completado ? 'emerald' : 'amber'}>{completado ? 'Entregado' : 'Pendiente'}</Badge>

        {!completado && (
          <>
            <Button variant="success" onClick={() => onCompletar(item.id)} title="Marcar como entregado">
              <CheckCircle2 size={16} />
            </Button>
            <Button variant="secondary" onClick={() => onEditar(item)} title="Editar">
              <Pencil size={16} />
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                if (confirm(`¿Eliminar el requerimiento de "${item.cliente}"? Esta acción no se puede deshacer.`)) {
                  onEliminar(item.id);
                }
              }}
              title="Eliminar (requerimiento cancelado)"
            >
              <Trash2 size={16} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
