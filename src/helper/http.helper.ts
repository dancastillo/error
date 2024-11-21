import { ErrorCode } from '../types/http.types.js'

/**
 * Map error code string to ErrorCode
 */
export const CODE_STRING_TO_ERROR_CODE_MAP: Record<string, ErrorCode> = {
  INTERNAL_ERROR: ErrorCode.INTERNAL_ERROR,
  INVALID_ARGUMENT: ErrorCode.INVALID_ARGUMENT,
  INVALID_OPERATION: ErrorCode.INVALID_OPERATION,
  NOT_FOUND: ErrorCode.NOT_FOUND,
  PERMISSION_DENIED: ErrorCode.PERMISSION_DENIED,
  UNAUTHENTICATED: ErrorCode.UNAUTHENTICATED,
  UNAVAILABLE: ErrorCode.UNAVAILABLE,
  ALREADY_EXISTS: ErrorCode.ALREADY_EXISTS,
  RESOURCE_EXHAUSTED: ErrorCode.RESOURCE_EXHAUSTED,
  DATA_LOSS: ErrorCode.DATA_LOSS,
  FAILED_PRECONDITION: ErrorCode.FAILED_PRECONDITION,
  OUT_OF_RANGE: ErrorCode.OUT_OF_RANGE,
  UNIMPLEMENTED: ErrorCode.UNIMPLEMENTED,
  UNKNOWN: ErrorCode.UNKNOWN,
}

/**
 * Transform code to ErrorCode
 *
 * @param {string | ErrorCode} code - The error code of commonly thrown errors
 * @returns {ErrorCode} - The error code of commonly thrown errors
 */
export function transformCodeToErrorCode(code: string | ErrorCode): ErrorCode {
  return CODE_STRING_TO_ERROR_CODE_MAP[code] ?? ErrorCode.UNKNOWN
}

/**
 * Map ErrorCode to error name
 */
export const ERROR_CODE_TO_ERROR_NAME_MAP: Record<ErrorCode, string> = {
  [ErrorCode.INTERNAL_ERROR]: 'InternalError',
  [ErrorCode.INVALID_ARGUMENT]: 'InvalidArgumentError',
  [ErrorCode.INVALID_OPERATION]: 'InvalidOperationError',
  [ErrorCode.NOT_FOUND]: 'NotFoundError',
  [ErrorCode.PERMISSION_DENIED]: 'PermissionDeniedError',
  [ErrorCode.UNAUTHENTICATED]: 'UnauthenticatedError',
  [ErrorCode.UNAVAILABLE]: 'UnavailableError',
  [ErrorCode.ALREADY_EXISTS]: 'AlreadyExistsError',
  [ErrorCode.RESOURCE_EXHAUSTED]: 'ResourceExhaustedError',
  [ErrorCode.DATA_LOSS]: 'DataLossError',
  [ErrorCode.FAILED_PRECONDITION]: 'FailedPreconditionError',
  [ErrorCode.OUT_OF_RANGE]: 'OutOfRangeError',
  [ErrorCode.UNIMPLEMENTED]: 'UnimplementedError',
  [ErrorCode.UNKNOWN]: 'UnknownError',
}

/**
 * Transform ErrorCode to error name
 *
 * @param {ErrorCode} code - The error code of commonly thrown errors
 * @returns {string} - The error name of commonly thrown errors
 */
export function transfromErrorCodeToErrorName(code: ErrorCode | string): string {
  return ERROR_CODE_TO_ERROR_NAME_MAP[code as keyof typeof ErrorCode] ?? ERROR_CODE_TO_ERROR_NAME_MAP[ErrorCode.UNKNOWN]
}

/**
 * Map ErrorCode to HTTP status code
 */
export const ERROR_CODE_TO_HTTP_STATUS_CODE_MAP: Record<ErrorCode, number> = {
  [ErrorCode.INTERNAL_ERROR]: 500,
  [ErrorCode.INVALID_ARGUMENT]: 400,
  [ErrorCode.INVALID_OPERATION]: 400,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.PERMISSION_DENIED]: 403,
  [ErrorCode.UNAUTHENTICATED]: 401,
  [ErrorCode.UNAVAILABLE]: 503,
  [ErrorCode.ALREADY_EXISTS]: 409,
  [ErrorCode.RESOURCE_EXHAUSTED]: 429,
  [ErrorCode.DATA_LOSS]: 500,
  [ErrorCode.FAILED_PRECONDITION]: 400,
  [ErrorCode.OUT_OF_RANGE]: 400,
  [ErrorCode.UNIMPLEMENTED]: 501,
  [ErrorCode.UNKNOWN]: 500,
}

/**
 * Transform ErrorCode to HTTP status code
 *
 * @param {ErrorCode} code - The error code of commonly thrown errors
 * @returns {number} - The HTTP status code of commonly thrown errors
 */
export function transfromErrorCodeToHttpStatusCode(code: ErrorCode | string): number {
  return (
    ERROR_CODE_TO_HTTP_STATUS_CODE_MAP[code as keyof typeof ErrorCode] ??
    ERROR_CODE_TO_HTTP_STATUS_CODE_MAP[ErrorCode.UNKNOWN]
  )
}
