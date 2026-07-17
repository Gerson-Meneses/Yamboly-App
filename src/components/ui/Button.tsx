import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variante = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variante;
  children: ReactNode;
}

const estilosPorVariante: Record<Variante, string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-400 focus-visible:ring-blue-300',
  secondary: 'bg-blue-900/50 text-blue-100 border border-blue-700 hover:bg-blue-800/60 focus-visible:ring-blue-400',
  danger: 'bg-rose-500/10 text-rose-300 border border-rose-500/40 hover:bg-rose-500/20 focus-visible:ring-rose-400',
  success: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/20 focus-visible:ring-emerald-400',
  ghost: 'text-blue-300 hover:bg-blue-900/40 focus-visible:ring-blue-400',
};

export function Button({ variant = 'primary', className = '', children, ...resto }: BotonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-blue-950 disabled:cursor-not-allowed disabled:opacity-50 ${estilosPorVariante[variant]} ${className}`}
      {...resto}
    >
      {children}
    </button>
  );
}
