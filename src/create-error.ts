import { DCError } from './types/dc-error.js'

/**
 * Create Custom Error
 */
export function createError<T = unknown>(
  code: number | string,
  message: string,
  details: string[] = [],
  meta?: T
): DCError<T> {
  if (!code) throw new Error('Error code must not be empty')
  if (!message?.trim()) throw new Error('Error message must not be empty')
  if (details && !Array.isArray(details)) throw new Error('Error details must be an array')

  details.forEach((detail) => {
    if (typeof detail !== 'string') throw new Error('Error details must contain string values')
    if (!detail?.trim()) throw new Error('Error details must not contain empty string values')
  })

  return {
    message: message,
    details: details,
    code: code,
    meta: meta,
  }
}
