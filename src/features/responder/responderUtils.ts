/** Gabungkan class CSS dan abaikan nilai kosong agar className tetap mudah dibaca. */
export type ClassValue = string | false | null | undefined;

export const cx = (...classes: ClassValue[]): string =>
  classes.filter((className): className is string => Boolean(className)).join(' ');
