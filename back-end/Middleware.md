```js
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
```

마지막에 사용한 next 함수가 yield 컨트롤을 한다. 이렇게 만들어진 미들웨어는 다음과 같이 사용할 수 있다. 

```js
app.use(requestLogger)
```

이런 미들웨어 함수들은 express 서버 객체의 use 메서드를 사용해서 사용 순서대로 호출한다. 

