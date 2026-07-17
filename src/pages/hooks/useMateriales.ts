import { useLocalStorage } from './useLocalStorage';

const CLAVE_STORAGE = 'yamboly:materiales';

// Opciones de ejemplo iniciales - ajústalas a los productos reales de Yamboly
const MATERIALES_INICIALES = ['Helado 1L', 'Helado 2L', 'Paletas', 'Conos', 'Vasos', 'Cucharas'];

export function useMateriales() {
  const [materiales, setMateriales] = useLocalStorage<string[]>(CLAVE_STORAGE, MATERIALES_INICIALES);

  const agregarMaterial = (nombre: string) => {
    setMateriales((prev) => (prev.some((m) => m.toLowerCase() === nombre.toLowerCase()) ? prev : [...prev, nombre]));
  };

  return { materiales, agregarMaterial };
}
