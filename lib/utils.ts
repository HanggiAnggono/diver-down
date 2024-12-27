import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';
import dayjs from 'dayjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  date: Date | string | number,
  format = 'DD MMM YYYY',
) {
  return dayjs(date).format(format);
}

export function groupBy<T, K extends keyof T>(
  array: T[],
  key: (_item: T) => T[K],
): Record<string, T[]> {
  return array.reduce(
    (map, item) => {
      const group = key(item);
      map[group] = map[group] || [];
      map[group].push(item);
      return map;
    },
    {} as Record<string, T[]>,
  );
}

export function camelCaseToHumanCase(str: string) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .toUpperCase();
}

export function uniqueArray<T>(array: T[]): T[] {
  return Array.from(
    new Set(
      array.map(item =>
        typeof item === 'object' ? JSON.stringify(item) : item,
      ),
    ),
  ).map(item => (typeof item === 'string' ? JSON.parse(item) : item));
}

export function getRandomDatesInNextTwoWeeks(): string[] {
  const dates = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    const min = 1;
    const max = 14;
    date.setDate(date.getDate() + Math.random() * (max - min + 1) + min);
    dates.push(date);
  }

  return dates
    .sort((a, b) => {
      return a.getTime() - b.getTime();
    })
    .map(date => dayjs(date).format('YYYY-MM-DD'));
}
