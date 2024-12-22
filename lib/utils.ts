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
  key: (item: T) => K,
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
