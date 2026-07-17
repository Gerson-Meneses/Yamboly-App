import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variante = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variante;
  children: ReactNode;
}

const estilosPorVariante: Record<Variante, string> = {
  primary: 'bg-sky-600 text-white hover:bg-sky-700 focus-visible:ring-sky-500',
  secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-400',
  danger: 'bg-white text-red-600 border border-red-200 hover:bg-red-50 focus-visible:ring-red-400',
  success: 'bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-50 focus-visible:ring-emerald-400',
  ghost: 'text-slate-500 hover:bg-slate-100 focus-visible:ring-slate-400',
};

export function Button({ variant = 'primary', className = '', children, ...resto }: BotonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${estilosPorVariante[variant]} ${className}`}
      {...resto}
    >
      {children}
    </button>
  );
}