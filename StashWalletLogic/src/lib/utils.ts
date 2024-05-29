import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shrinkString(
  str: string,
  beginMaxLength: number,
  endMaxLength: number
) {
  if (str.length <= beginMaxLength + endMaxLength) return str;
  return str.slice(0, beginMaxLength) + '...' + str.slice(-endMaxLength);
}
