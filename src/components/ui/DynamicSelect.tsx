import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface DynamicSelectProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onAddOption: (nuevaOpcion: string) => void;
  placeholder?: string;
}

/**
 * Select reutilizable en cualquier vista que necesite un combo con opciones
 * que el usuario puede ir ampliando (no solo materiales de Requerimientos).
 */
export function DynamicSelect({ label, options, value, onChange, onAddOption, placeholder }: DynamicSelectProps) {
  const [mostrarInput, setMostrarInput] = useState(false);
  const [nuevaOpcion, setNuevaOpcion] = useState('');

  const confirmarNuevaOpcion = () => {
    const texto = nuevaOpcion.trim();
    if (!texto) {
      setMostrarInput(false);
      return;
    }
    const yaExiste = options.some((op) => op.toLowerCase() === texto.toLowerCase());
    if (!yaExiste) {
      onAddOption(texto);
    }
    onChange(texto);
    setNuevaOpcion('');
    setMostrarInput(false);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}

      {!mostrarInput ? (
        <div className="flex gap-2">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="" disabled>
              {placeholder ?? 'Selecciona una opción'}
            </option>
            {options.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setMostrarInput(true)}
            title="Agregar nueva opción"
            className="flex shrink-0 items-center justify-center rounded-lg border border-sky-300 px-3 text-sky-600 hover:bg-sky-50"
          >
            <Plus size={18} />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            autoFocus
            value={nuevaOpcion}
            onChange={(e) => setNuevaOpcion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                confirmarNuevaOpcion();
              }
              if (e.key === 'Escape') {
                setMostrarInput(false);
                setNuevaOpcion('');
              }
            }}
            placeholder="Escribe la nueva opción..."
            className="w-full flex-1 rounded-lg border border-sky-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="button"
            onClick={confirmarNuevaOpcion}
            className="shrink-0 rounded-lg bg-sky-600 px-3 text-sm font-medium text-white hover:bg-sky-700"
          >
            Agregar
          </button>
          <button
            type="button"
            onClick={() => {
              setMostrarInput(false);
              setNuevaOpcion('');
            }}
            title="Cancelar"
            className="flex shrink-0 items-center justify-center rounded-lg border border-slate-300 px-3 text-slate-500 hover:bg-slate-50"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}