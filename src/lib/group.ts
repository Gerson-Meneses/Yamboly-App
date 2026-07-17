/**
 * Agrupa un arreglo de items según el resultado de getKey.
 * Genérico para poder reutilizarlo en cualquier vista (no solo Requerimientos).
 *
 * Ejemplo: agruparPor(requerimientos, (r) => r.fechaCreacion.slice(0, 10))
 */
export function agruparPor<T, K extends string>(items: T[], getKey: (item: T) => K): Record<K, T[]> {
  return items.reduce((acumulado, item) => {
    const clave = getKey(item);
    if (!acumulado[clave]) {
      acumulado[clave] = [];
    }
    acumulado[clave].push(item);
    return acumulado;
  }, {} as Record<K, T[]>);
}