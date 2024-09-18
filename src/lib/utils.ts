import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(filePath: string, width: number = 500) {
  return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/t/p/w${width}/${filePath}`;
}

export function getYear(date: string) {
  return date.split('-')[0];
}
