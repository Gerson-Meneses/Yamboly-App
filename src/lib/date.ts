import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

/** Clave estable para agrupar por día (YYYY-MM-DD) */
export function claveDia(fechaISO: string): string {
  return dayjs(fechaISO).format('YYYY-MM-DD');
}

/** "Lunes", "Martes", etc. */
export function nombreDiaSemana(fechaISO: string): string {
  const dia = dayjs(fechaISO).format('dddd');
  return capitalizar(dia);
}

/** "10 de julio de 2026" */
export function fechaLarga(fechaISO: string): string {
  return dayjs(fechaISO).format('D [de] MMMM [de] YYYY');
}

/** "Lunes, 10 de julio de 2026" - usado como encabezado de cada grupo en la lista */
export function encabezadoGrupo(fechaISO: string): string {
  return `${nombreDiaSemana(fechaISO)}, ${fechaLarga(fechaISO)}`;
}

/** "10/07/2026 03:45 p.m." - usado en exportaciones (excel/pdf/word) */
export function fechaHoraCorta(fechaISO: string): string {
  return dayjs(fechaISO).format('DD/MM/YYYY hh:mm A');
}

function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}