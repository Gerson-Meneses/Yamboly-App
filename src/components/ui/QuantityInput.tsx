import { Minus, Plus } from 'lucide-react';

interface QuantityInputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export function QuantityInput({ label, value, onChange, min = 1 }: QuantityInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
          aria-label="Disminuir cantidad"
        >
          <Minus size={16} />
        </button>
        <input
          type="number"
          min={min}
          value={value}
          onChange={(e) => {
            const numero = parseInt(e.target.value, 10);
            onChange(Number.isNaN(numero) ? min : Math.max(min, numero));
          }}
          className="h-9 w-16 rounded-lg border border-slate-300 text-center text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
          aria-label="Aumentar cantidad"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}