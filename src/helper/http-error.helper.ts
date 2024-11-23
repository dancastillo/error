import { HTTP_ERROR_TITLE } from './http-error-title.js'

/**
 * Map ErrorCode to HTTP status code
 */
export const ERROR_CODE_TO_HTTP_STATUS_CODE_MAP: Record<number, string> = {
  400: HTTP_ERROR_TITLE.BAD_REQUEST,
  401: HTTP_ERROR_TITLE.UNAUTHORIZED,
  403: HTTP_ERROR_TITLE.FORBIDDEN,
  404: HTTP_ERROR_TITLE.NOT_FOUND,
  405: HTTP_ERROR_TITLE.METHOD_NOT_ALLOWED,
  408: HTTP_ERROR_TITLE.REQUEST_TIMEOUT,
  429: HTTP_ERROR_TITLE.TOO_MANY_REQUESTS,
  500: HTTP_ERROR_TITLE.INTERNAL_SERVER_ERROR,
  501: HTTP_ERROR_TITLE.NOT_IMPLEMENTED,
  503: HTTP_ERROR_TITLE.SERVICE_UNAVAILABLE,
  504: HTTP_ERROR_TITLE.GATEWAY_TIMEOUT,
}

/**
 * Map ErrorCode to Error title
 */
export function transformHttpErrorStatusCodeToErrorTitle(statusCode: number): string {
  const errorTitle = ERROR_CODE_TO_HTTP_STATUS_CODE_MAP[statusCode]
  if (!errorTitle) {
    throw new Error('Invalid status code')
  }

  return errorTitle
}
