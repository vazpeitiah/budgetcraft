import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const parseDateToInput = (rawDate: Date | null): string => {
  if (!rawDate) return ''
  const date = new Date(rawDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`
}

export const formatDate = (
  rawDate: Date | string | null | undefined
): string => {
  if (!rawDate) return ''
  const date = new Date(rawDate)
  date.setHours(date.getHours() + 6)

  return date.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

export const formatLocalCurrency = (amount: number): string => {
  return amount.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN'
  })
}

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args))
}
