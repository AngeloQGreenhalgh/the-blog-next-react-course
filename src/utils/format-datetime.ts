import {
  format,
  formatDistanceToNow as dateFnsformatDistanceToNow,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formateDateTime(rawDate: string): string {
  const date = new Date(rawDate);
  return format(date, "dd/MM/yyyy 'às' HH'h'mm", { locale: ptBR });
}

export function formatDistanceToNow(rawDate: string): string {
  const date = new Date(rawDate);
  return dateFnsformatDistanceToNow(date, { locale: ptBR, addSuffix: true });
}

const rawDate = new Date().toISOString();

console.log(rawDate);
console.log(formateDateTime(rawDate));
console.log(formatDistanceToNow(rawDate));
//console.log(new Date().toISOString()); // Example usage
