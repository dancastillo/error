# @dancastillo/error

A small utility for generating consistent errors

### Install

npm

```bash
npm install @dancastillo/error
```

yarn

```bash
npm add @dancastillo/error
```

pnpm

```bash
pnpm install @dancastillo/error
```

### Usage

```
createError(code, message [, details [, meta]])
```

- `code` (`number | string`, required) - The error code, you can access it via`error.code`. For http error, it is recommended using [ErrorCode](./src/types/http.types.ts)
- `message` (`string`, required) - The error message.
- `details` (`string[]`, optional) - The error details. You can include additional information about the error that has occurred. Default is an empty array.
- `meta` (`T`, optional) - Additional metadata that you can pass in with generic.

```js
import { createError, type DCError} from '@dancastillo/error

type Meta = { userId: string }

const err = createError<Meta>('INTERNAL_ERROR', 'Error happened', ['Details'], { userId: 'some-user-id' })

console.log(err.code)    // 'INTERNAL_ERROR'
console.log(err.message) // 'Error happened'
console.log(err.details) // ['Details']
console.log(err.meta) // { userId: 'some-user-id' }
```

## License

Licensed under [MIT](./LICENSE).
