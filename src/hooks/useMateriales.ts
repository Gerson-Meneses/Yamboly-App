import { useLocalStorage } from './useLocalStorage';

const CLAVE_STORAGE = 'yamboly:materiales';

// Opciones de ejemplo iniciales - ajústalas a los productos reales de Yamboly
const MATERIALES_INICIALES = ['Cartilla', 'Polipasacalle', 'Jalavista', 'Llave'];

export function useMateriales() {
  const [materiales, setMateriales] = useLocalStorage<string[]>(CLAVE_STORAGE, MATERIALES_INICIALES);

  const agregarMaterial = (nombre: string) => {
    setMateriales((prev) => (prev.some((m) => m.toLowerCase() === nombre.toLowerCase()) ? prev : [...prev, nombre]));
  };

  return { materiales, agregarMaterial };
}