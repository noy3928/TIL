jest를 실행시키면 발생하는 에러 

> You appear to be using a native ECMAScript module configuration file, which is only supported when running Babel asynchronously.

이 문제는 package.json에서  type : module을 지우고, 
rollup.config.js을 rollup.config.mjs로 바꾼 다음, 

jest.config.js 파일의 내용물을 
```js
module.exports = {
...
}
```

로 바꾸면서 해결. 