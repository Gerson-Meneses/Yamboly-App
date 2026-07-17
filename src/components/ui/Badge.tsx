import type { ReactNode } from 'react';

type Tono = 'slate' | 'amber' | 'emerald';

const estilosPorTono: Record<Tono, string> = {
  slate: 'bg-slate-100 text-slate-600',
  amber: 'bg-amber-100 text-amber-700',
  emerald: 'bg-emerald-100 text-emerald-700',
};

export function Badge({ children, tone = 'slate' }: { children: ReactNode; tone?: Tono }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${estilosPorTono[tone]}`}>
      {children}
    </span>
  );
}