import test from 'node:test'
import assert from 'node:assert'
import { ErrorCode } from '../src/index.js'
import {
  CODE_STRING_TO_ERROR_CODE_MAP,
  transformCodeToErrorCode,
  transfromErrorCodeToErrorName,
  transfromErrorCodeToHttpStatusCode,
} from '../src/helper/http.helper.js'
import { createError } from '../src/create-error.js'

// Loop over all Error codes
for (const code of Object.keys(ErrorCode)) {
  const name = transfromErrorCodeToErrorName(code as ErrorCode)
  const message = transfromErrorCodeToErrorName(code as ErrorCode)

  test(`Create Http error with ${code}, ${message}, and details`, (t) => {
    const createdError = createError(code, message, [name, message])
    // assert.ok(createdError instanceof DCError)
    assert.strictEqual(createdError.message, message)
    assert.deepStrictEqual(createdError.details, [name, message])
    assert.strictEqual(createdError.code, code)
  })
}

test('Create error :: non error code returns as UnknownError', (t) => {
  const createdError = createError(5000, 'Not available', [], { statusCode: 500 })
  // const err = createdError('testing 123')
  assert.strictEqual(createdError.message, 'Not available')
  assert.strictEqual(createdError.code, 5000)
  assert.deepStrictEqual(createdError.details, [])
  assert.deepStrictEqual(createdError.meta, { statusCode: 500 })
})

test('Fail when details is not an array', (t) => {
  // @ts-expect-error - details is not a string array
  assert.throws(() => createError(4000, 'fail', true), new Error('Error details must be an array'))
})

test('When details is not a string array', (t) => {
  // @ts-expect-error - details is not a string array
  assert.throws(() => createError(4000, 'fail', [true, false]), new Error('Error details must contain string values'))
})

test('When empty string is passed as details', (t) => {
  assert.throws(() => createError(4000, 'fail', ['']), new Error('Error details must not contain empty string values'))
})

test('Missing error required arguements', (t) => {
  // @ts-expect-error - testing missing error code
  assert.throws(() => createError(), new Error('Error code must not be empty'))
})

test('Missing error code', (t) => {
  // @ts-expect-error - testing missing error code
  assert.throws(() => createError(undefined, 'Test'), new Error('Error code must not be empty'))
})

test('Missing error message', (t) => {
  // @ts-expect-error - testing missing error code
  assert.throws(() => createError('Test'), new Error('Error message must not be empty'))
})

test('Return UnknownError when error code is not found', (t) => {
  const errorName = transfromErrorCodeToErrorName('INVALID_ERROR_CODE_HERE_TEST')
  assert.strictEqual('UnknownError', errorName)
})

test('Return 500 when error code is not found', (t) => {
  const errorHttpCode = transfromErrorCodeToHttpStatusCode('INVALID_ERROR_CODE_HERE_TEST')
  assert.strictEqual(500, errorHttpCode)
})

test('transformCodeToErrorCode: valid code string', () => {
  const result = transformCodeToErrorCode('INTERNAL_ERROR')
  assert.strictEqual(result, ErrorCode.INTERNAL_ERROR)
})

test('transformCodeToErrorCode: invalid code string defaults to UNKNOWN', () => {
  const result = transformCodeToErrorCode('INVALID_CODE')
  assert.strictEqual(result, ErrorCode.UNKNOWN)
})

test('transformCodeToErrorCode: valid ErrorCode', () => {
  const result = transformCodeToErrorCode(ErrorCode.NOT_FOUND)
  assert.strictEqual(result, ErrorCode.NOT_FOUND)
})

test('transfromErrorCodeToErrorName: valid ErrorCode', () => {
  const result = transfromErrorCodeToErrorName(ErrorCode.NOT_FOUND)
  assert.strictEqual(result, 'NotFoundError')
})

test('transfromErrorCodeToErrorName: invalid ErrorCode defaults to UnknownError', () => {
  const result = transfromErrorCodeToErrorName('INVALID_CODE')
  assert.strictEqual(result, 'UnknownError')
})

test('transfromErrorCodeToHttpStatusCode: valid ErrorCode', () => {
  const result = transfromErrorCodeToHttpStatusCode(ErrorCode.NOT_FOUND)
  assert.strictEqual(result, 404)
})

test('transfromErrorCodeToHttpStatusCode: invalid ErrorCode defaults to 500', () => {
  const result = transfromErrorCodeToHttpStatusCode('INVALID_CODE')
  assert.strictEqual(result, 500)
})

test('CODE_STRING_TO_ERROR_CODE_MAP: all keys map correctly', () => {
  for (const [key, value] of Object.entries(CODE_STRING_TO_ERROR_CODE_MAP)) {
    const transformed = transformCodeToErrorCode(key)
    assert.strictEqual(transformed, value)
  }
})
