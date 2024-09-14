import test from 'node:test'
import assert from 'node:assert'
import { createError, ErrorCode } from '../src/index'
import { transfromErrorCodeToErrorName, transfromErrorCodeToHttpStatusCode } from '../src/helper'

test('Create error', (t) => {
  const createdError = createError('INTERNAL_ERROR', 'Not available')
  const err = new createdError()
  assert.ok(err instanceof Error)
  assert.strictEqual(err.name, 'InternalError')
  assert.strictEqual(err.message, 'Not available')
  assert.strictEqual(err.code, 'INTERNAL_ERROR')
  assert.strictEqual(err.statusCode, 500)
  assert.strictEqual(err.toString(), 'InternalError [INTERNAL_ERROR]: Not available')
})

// Loop over all Error codes
for (const code of Object.keys(ErrorCode)) {
  const name = transfromErrorCodeToErrorName(code as ErrorCode)
  const message = transfromErrorCodeToErrorName(code as ErrorCode)
  const statusCode = transfromErrorCodeToHttpStatusCode(code as ErrorCode)

  test(`Create error with ${code}, ${message}, and details`, (t) => {
    const createdError = createError(code, message, [name, message])
    const err = new createdError()
    assert.ok(err instanceof Error)
    assert.strictEqual(err.name, name)
    assert.strictEqual(err.message, message)
    assert.deepStrictEqual(err.details, [name, message])
    assert.strictEqual(err.code, code)
    assert.strictEqual(err.statusCode, statusCode)
    assert.strictEqual(err.toString(), `${name} [${code}]: ${message}`)
  })
}

test('Create error :: non error code returns as UnknownError', (t) => {
  const createdError = createError('NO_ERROR_CODE', 'Not available %s')
  const err = new createdError('testing 123')
  assert.strictEqual(err.name, 'UnknownError')
  assert.strictEqual(err.message, 'Not available testing 123')
  assert.strictEqual(err.code, 'UNKNOWN')
  assert.strictEqual(err.statusCode, 500)
  assert.strictEqual(err.toString(), 'UnknownError [UNKNOWN]: Not available')
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
  // @ts-expect-error - testing invalid error code
  const errorName = transfromErrorCodeToErrorName('INVALID_ERROR_CODE_HERE_TEST')
  assert.strictEqual('UnknownError', errorName)
})

test('Return 500 when error code is not found', (t) => {
  // @ts-expect-error - testing invalid error code
  const errorHttpCode = transfromErrorCodeToHttpStatusCode('INVALID_ERROR_CODE_HERE_TEST')
  assert.strictEqual(500, errorHttpCode)
})
