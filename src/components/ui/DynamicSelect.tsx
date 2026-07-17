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
      {label && <span className="text-sm font-medium text-blue-200">{label}</span>}

      {!mostrarInput ? (
        <div className="flex gap-2">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full flex-1 rounded-lg border border-blue-700 bg-blue-950/50 px-3 py-2 text-sm text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled className="bg-blue-950">
              {placeholder ?? 'Selecciona una opción'}
            </option>
            {options.map((opcion) => (
              <option key={opcion} value={opcion} className="bg-blue-950">
                {opcion}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setMostrarInput(true)}
            title="Agregar nueva opción"
            className="flex shrink-0 items-center justify-center rounded-lg border border-blue-400 px-3 text-blue-300 hover:bg-blue-900/50"
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
            className="w-full flex-1 rounded-lg border border-blue-400 bg-blue-950/50 px-3 py-2 text-sm text-blue-50 placeholder:text-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={confirmarNuevaOpcion}
            className="shrink-0 rounded-lg bg-blue-500 px-3 text-sm font-medium text-white hover:bg-blue-400"
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
            className="flex shrink-0 items-center justify-center rounded-lg border border-blue-700 px-3 text-blue-300 hover:bg-blue-900/50"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
