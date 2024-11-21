export type DCError<T = unknown> = {
  /**
   * The error message.
   */
  message: string

  /**
   * Additional details about the error.
   */
  details: string[]

  /**
   * The error code, typically uppercase and standardized.
   */
  code: number | string

  /**
   * Additional metadata about the error.
   */
  meta?: T
}
