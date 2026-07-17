import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', id, ...resto }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-blue-200">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`rounded-lg border border-blue-700 bg-blue-950/50 px-3 py-2 text-sm text-blue-50 placeholder:text-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        {...resto}
      />
    </div>
  );
}
