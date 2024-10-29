import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function numberToCurrency(number: number) {
  const convertedNumber = number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return convertedNumber
}
