import dayjs from 'dayjs';
import { useLocalStorage } from './useLocalStorage';
import type { Requerimiento, RequerimientoInput } from '../types/requerimiento';

const CLAVE_STORAGE = 'yamboly:requerimientos';

export function useRequerimientos() {
  const [requerimientos, setRequerimientos] = useLocalStorage<Requerimiento[]>(CLAVE_STORAGE, []);

  const agregar = (datos: RequerimientoInput) => {
    const nuevo: Requerimiento = {
      ...datos,
      id: crypto.randomUUID(),
      estado: 'pendiente',
      fechaCreacion: dayjs().toISOString(),
    };
    setRequerimientos((prev) => [nuevo, ...prev]);
  };

  const actualizar = (id: string, datos: RequerimientoInput) => {
    setRequerimientos((prev) => prev.map((r) => (r.id === id ? { ...r, ...datos } : r)));
  };

  const marcarCompletado = (id: string) => {
    setRequerimientos((prev) =>
      prev.map((r) => (r.id === id ? { ...r, estado: 'completado', fechaCompletado: dayjs().toISOString() } : r))
    );
  };

  const eliminar = (id: string) => {
    setRequerimientos((prev) => prev.filter((r) => r.id !== id));
  };

  return { requerimientos, agregar, actualizar, marcarCompletado, eliminar };
}