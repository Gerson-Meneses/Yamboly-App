import { useState, type FormEvent } from 'react';
import { Save, X } from 'lucide-react';
import { Input } from '../ui/Input';
import { DynamicSelect } from '../ui/DynamicSelect';
import { QuantityInput } from '../ui/QuantityInput';
import { Button } from '../ui/Button';
import type { RequerimientoInput } from '../../types/requerimiento';

interface RequerimientoFormProps {
  materiales: string[];
  onAddMaterial: (nombre: string) => void;
  onSubmit: (datos: RequerimientoInput) => void;
  valoresIniciales?: RequerimientoInput;
  modoEdicion?: boolean;
  onCancelar?: () => void;
}

export function RequerimientoForm({
  materiales,
  onAddMaterial,
  onSubmit,
  valoresIniciales,
  modoEdicion = false,
  onCancelar,
}: RequerimientoFormProps) {
  const [cliente, setCliente] = useState(valoresIniciales?.cliente ?? '');
  const [material, setMaterial] = useState(valoresIniciales?.material ?? '');
  const [cantidad, setCantidad] = useState(valoresIniciales?.cantidad ?? 1);

  const puedeGuardar = cliente.trim().length > 0 && material.trim().length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!puedeGuardar) return;

    onSubmit({ cliente: cliente.trim(), material, cantidad });

    if (!modoEdicion) {
      setCliente('');
      setMaterial('');
      setCantidad(1);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <Input
          label="Cliente"
          placeholder="Nombre del cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>

      <div className="flex-1">
        <DynamicSelect
          label="Material"
          options={materiales}
          value={material}
          onChange={setMaterial}
          onAddOption={onAddMaterial}
          placeholder="Selecciona un material"
        />
      </div>

      <div>
        <QuantityInput label="Cantidad" value={cantidad} onChange={setCantidad} />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={!puedeGuardar}>
          <Save size={16} />
          {modoEdicion ? 'Guardar cambios' : 'Guardar'}
        </Button>
        {modoEdicion && onCancelar && (
          <Button type="button" variant="secondary" onClick={onCancelar}>
            <X size={16} />
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}