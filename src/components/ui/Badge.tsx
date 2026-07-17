import type { ReactNode } from 'react';

type Tono = 'slate' | 'amber' | 'emerald';

const estilosPorTono: Record<Tono, string> = {
  slate: 'bg-blue-800/60 text-blue-200',
  amber: 'bg-amber-400/15 text-amber-300',
  emerald: 'bg-emerald-400/15 text-emerald-300',
};

export function Badge({ children, tone = 'slate' }: { children: ReactNode; tone?: Tono }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${estilosPorTono[tone]}`}>
      {children}
    </span>
  );
}
