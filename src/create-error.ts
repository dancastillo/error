import { DCError } from './types/dc-error.js'

/**
 * Create Custom Error
 */
export function createError<T extends object>(code: number, title: string, detail: string, meta = {}): DCError<T> {
  if (!code) throw new Error('Error: code must be passed in')
  if (typeof code !== 'number') throw new Error('Error code must be of type number')

  if (!title) throw new Error('Error: title must be passed in')
  if (typeof title !== 'string') throw new Error('Error: title must be of type string')
  if (!title.trim()) throw new Error('Error: title must not be an empty string')

  if (!detail) throw new Error('Error: detail must be passed in')
  if (typeof detail !== 'string') throw new Error('Error: detail must be of type string')
  if (!detail.trim()) throw new Error('Error: detail must not be an empty string')

  return {
    title: title,
    detail: detail,
    code: code,
    meta: meta as T,
  }
}
