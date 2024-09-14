import { format } from 'node:util'
import { transformCodeToErrorCode, transfromErrorCodeToErrorName, transfromErrorCodeToHttpStatusCode } from './helper'
import { ErrorCode } from './types'

/**
 * Create error
 *
 * @param {ErrorCode | string} code - The error code of commonly thrown errors
 * @param {string} message - The error message
 * @param {string[]} details - Additional details
 * @param {number} statusCode - HTTP Status Code
 * @returns {Error} - The error object
 */
export function createError(code: ErrorCode | string, message: string, details: string[] = [], statusCode?: number) {
  if (!code) throw new Error('Error code must not be empty')
  if (!message?.trim()) throw new Error('Error message must not be empty')

  const errCode = transformCodeToErrorCode(code.toUpperCase())
  const errName = transfromErrorCodeToErrorName(errCode)
  const errStatusCode = statusCode ?? transfromErrorCodeToHttpStatusCode(errCode)
  const errMessage = message.trim()

  /**
   * Return error as string
   *
   * @returns {string}
   */
  function toString(): string {
    return `${errName} [${errCode}]: ${errMessage}`
  }

  /**
   * Base Error Class
   */
  class BaseError extends Error {
    name: string
    message: string
    details: string[]
    code: string
    statusCode: number

    /**
     * Constructor
     *
     * @param {string} args.name - error name
     * @param {string} args.message - error message
     * @param {string[]} args.details - additional details
     * @param {number} args.statusCode - optional parameter HTTP Status Code
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args)
      this.name = errName
      this.message = format(errMessage, ...args)
      this.details = details
      this.code = errCode
      this.statusCode = errStatusCode

      // Ensuring stack trace is captured
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, BaseError)
      }
    }

    /**
     * Return error as string
     * @returns {string}
     */
    toString(): string {
      return toString()
    }
  }

  return BaseError
}
