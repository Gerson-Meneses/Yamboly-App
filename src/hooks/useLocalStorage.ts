import { useEffect, useState } from 'react';

/**
 * Hook genérico para sincronizar un estado de React con localStorage.
 * Reutilizable para cualquier vista futura (no solo Requerimientos).
 */
export function useLocalStorage<T>(key: string, valorInicial: T) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : valorInicial;
    } catch (error) {
      console.error(`No se pudo leer "${key}" de localStorage`, error);
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(valor));
    } catch (error) {
      console.error(`No se pudo guardar "${key}" en localStorage`, error);
    }
  }, [key, valor]);

  return [valor, setValor] as const;
}