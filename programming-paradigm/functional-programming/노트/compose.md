```js
export const compose =
  (...fns) =>
  async arg =>
    fns.reduce(async (prevPromise, fn) => {
      const c = await prevPromise
      return fn(c)
    }, Promise.resolve(arg))
```