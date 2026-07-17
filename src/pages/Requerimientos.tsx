import { useMemo, useState } from 'react';
import { Save } from 'lucide-react';
import { useRequerimientos } from '../hooks/useRequerimientos';
import { useMateriales } from '../hooks/useMateriales';
import { RequerimientoForm } from '../components/requerimientos/RequerimientoForm.tsx';
import { RequerimientoGroup } from '../components/requerimientos/RequerimientoGroup.tsx';
import { ResumenMateriales } from '../components/requerimientos/ResumenMateriales.tsx';
import { ExportMenu } from '../components/requerimientos/ExportMenu.tsx';
import { Button } from '../components/ui/Button';
import { agruparPor } from '../lib/group';
import { claveDia } from '../lib/date';
import type { Requerimiento, RequerimientoInput } from '../types/requerimiento';

export default function RequerimientosPage() {
  const { requerimientos, agregar, actualizar, marcarCompletado, eliminar } = useRequerimientos();
  const { materiales, agregarMaterial } = useMateriales();
  const [itemEnEdicion, setItemEnEdicion] = useState<Requerimiento | null>(null);

  // Agrupa por día y ordena del más reciente al más antiguo
  const grupos = useMemo(() => {
    const agrupado = agruparPor(requerimientos, (r) => claveDia(r.fechaCreacion));
    return Object.entries(agrupado).sort(([fechaA], [fechaB]) => (fechaA < fechaB ? 1 : -1));
  }, [requerimientos]);

  const handleSubmit = (datos: RequerimientoInput) => {
    if (itemEnEdicion) {
      actualizar(itemEnEdicion.id, datos);
      setItemEnEdicion(null);
    } else {
      agregar(datos);
    }
  };

  const handleGuardarLista = () => {
    // TODO: conectar con la API cuando esté lista. Por ahora solo confirma en consola.
    console.log('Guardar lista de requerimientos:', requerimientos);
  };

  return (
    <div className="min-h-screen bg-blue-950">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 p-4 sm:p-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-blue-50">Requerimientos</h1>
            <p className="text-sm text-blue-400">Distribuidora Yamboly</p>
          </div>
          <div className="flex gap-2">
            <ExportMenu requerimientos={requerimientos} />
            <Button onClick={handleGuardarLista}>
              <Save size={16} />
              Guardar lista
            </Button>
          </div>
        </header>

        <RequerimientoForm
          materiales={materiales}
          onAddMaterial={agregarMaterial}
          onSubmit={handleSubmit}
          valoresIniciales={itemEnEdicion ?? undefined}
          modoEdicion={!!itemEnEdicion}
          onCancelar={() => setItemEnEdicion(null)}
        />

        <ResumenMateriales requerimientos={requerimientos} />

        <div className="flex flex-col gap-6">
          {grupos.length === 0 && (
            <p className="rounded-lg border border-dashed border-blue-800 py-10 text-center text-sm text-blue-400">
              Aún no hay requerimientos registrados. Usa el formulario de arriba para crear el primero.
            </p>
          )}

          {grupos.map(([fechaClave, items]) => (
            <RequerimientoGroup
              key={fechaClave}
              fechaClave={fechaClave}
              items={items}
              onEditar={setItemEnEdicion}
              onCompletar={marcarCompletado}
              onEliminar={eliminar}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
