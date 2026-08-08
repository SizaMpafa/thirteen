export const MONTHS = [
  { number: 1, name: 'August' },
  { number: 2, name: 'September' },
  { number: 3, name: 'October' },
  { number: 4, name: 'November' },
  { number: 5, name: 'December' },
  { number: 6, name: 'January' },
  { number: 7, name: 'February' },
  { number: 8, name: 'March' },
  { number: 9, name: 'April' },
  { number: 10, name: 'May' },
  { number: 11, name: 'June' },
  { number: 12, name: 'July' },
];

export function getMonthName(month: number): string {
  const found = MONTHS.find(m => m.number === month);
  return found ? found.name : 'Unknown';
}