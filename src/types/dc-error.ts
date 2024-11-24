// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type DCError<T extends object = {}> = {
  /**
   * The error code. Businesss or HTTP status code.
   */
  code: number

  /**
   * The error title.
   */
  title: string

  /**
   * The error detail.
   */
  detail: string

  /**
   * Additional metadata object about the error.
   */
  meta: T
}
