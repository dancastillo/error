# @dancastillo/error

A small utility for generating consistent errors

### Install

```bash
npm install @dancastillo/error
```

### Usage

```
createError(code, message [, details [, statusCode [, error]]])
```

- `code` (`string`, required) - The error code, you can access it via`error.code`. For consistency, it is recommended using [ErrorCode](./src/types/index.ts)
- `message` (`string`, required) - The error message. This can be customized to use interpolated strings for formatting the message.
- `details` (`string[]`, optional) - The error details. You can include additional information about the error that has occurred. Default is an empty array.
- `statusCode` (`number`, optional) - The status code that will be used if you want to sent via HTTP. Note this will be automatically populated based on the `code` you pass in

```js
import createError from '@dancastillo/error

const CreatedError = createError('INTERNAL_ERROR', 'Error happened')

const err = CreatedError()

console.log(err.code)    // 'INTERNAL_ERROR'
console.log(err.message) // 'Error happened'
```

## License

Licensed under [MIT](./LICENSE).
