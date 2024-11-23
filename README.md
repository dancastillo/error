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
createError(code, message [, detail [, meta]])
```

- `code` (`number`, required) - The error code, you can access it via`error.code`.
- `message` (`string`, required) - The error message.
- `detail` (`string[]`, optional) - The error detail. You can include additional information about the error that has occurred.
- `meta` (`T extends object`, optional) - Additional metadata object that you can pass in with generic.

#### TypeScript Example

```ts
import { createError, type DCError } from '@dancastillo/error'

type Meta = { userId: string }

const err = createError<Meta>(500, 'Title', 'Detail', { userId: 'some-user-id' })

console.log(err.code) // 500
console.log(err.title) // 'Title'
console.log(err.detail) // 'Detail'
console.log(err.meta) // { userId: 'some-user-id' }
```

#### JavaScript Example

```js
import { createError } from '@dancastillo/error'

const err = createError(500, 'Title', 'Detail', { userId: 'some-user-id' })

console.log(err.code) // 500
console.log(err.title) // 'Title'
console.log(err.detail) // 'Detail'
console.log(err.meta) // { userId: 'some-user-id' }
```

## License

Licensed under [MIT](./LICENSE).
