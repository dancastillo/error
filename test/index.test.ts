import test from 'node:test'
import assert from 'node:assert'
import { createError } from '../src/create-error.js'
import { transformHttpErrorStatusCodeToErrorTitle } from '../src/helper/http-error.helper.js'

const errorCodes = [400, 401, 403, 404, 405, 408, 429, 500, 501, 503, 504]

// Loop over all Error codes
for (const code of errorCodes) {
  const title = transformHttpErrorStatusCodeToErrorTitle(code)
  const detail = 'Testing error'

  test(`Create Http error with ${code}, ${title}, and details`, (t) => {
    const createdError = createError(code, title, detail)
    assert.strictEqual(createdError.code, code)
    assert.strictEqual(createdError.title, title)
    assert.strictEqual(createdError.detail, detail)
    assert.deepStrictEqual(createdError.meta, {})
  })
}

test('Create error :: Passed in typed meta object', (t) => {
  const createdError = createError(5000, 'Not available', 'Detail', { statusCode: 500 })
  // const err = createdError('testing 123')
  assert.strictEqual(createdError.title, 'Not available')
  assert.strictEqual(createdError.code, 5000)
  assert.deepStrictEqual(createdError.detail, 'Detail')
  assert.deepStrictEqual(createdError.meta, { statusCode: 500 })
})

test('Fail when code is not passed in', (t) => {
  // @ts-expect-error - code is not number
  assert.throws(() => createError(), new Error('Error: code must be passed in'))
})

test('Fail when code is not a number', (t) => {
  // @ts-expect-error - code is empty
  assert.throws(() => createError('test'), new Error('Error code must be of type number'))
})

test('Fail when title is not passed in', (t) => {
  // @ts-expect-error - title is not number
  assert.throws(() => createError(500), new Error('Error: title must be passed in'))
})

test('Fail when title is not a string', (t) => {
  // @ts-expect-error - title is empty
  assert.throws(() => createError(500, 500), new Error('Error: title must be of type string'))
})

test('Fail when title is an empty string', (t) => {
  // @ts-expect-error - title is not number
  assert.throws(() => createError(500, '  '), new Error('Error: title must not be an empty string'))
})

test('Fail when detail is not passed in', (t) => {
  // @ts-expect-error - detail is not number
  assert.throws(() => createError(500, 'title'), new Error('Error: detail must be passed in'))
})

test('Fail when detail is not a string', (t) => {
  // @ts-expect-error - detail is empty
  assert.throws(() => createError(500, 'title', true), new Error('Error: detail must be of type string'))
})

test('Fail when detail is an empty string', (t) => {
  assert.throws(() => createError(500, 'title', '  '), new Error('Error: detail must not be an empty string'))
})

test('Throw when unknown status code is not passed in', (t) => {
  assert.throws(() => transformHttpErrorStatusCodeToErrorTitle(888), new Error('Invalid status code'))
})
