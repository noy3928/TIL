### 날짜 : 2022-11-12 20:49
### 주제 : 

---- 

### 메모 : 
- 커리라는 함수 
	- 커리는 역시 코드를 값으로 다루면서 받아둔 함수를 원하는 시점에 평가시키는 함수이다. 
	- 함수를 받아서 함수를 리턴하고, 인자가 원하는 인자만큼 들어왔을 때, 나중에 평가시키는 방식으로 이루어진다. 

```javascript=
const curry = f => 
	(a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const mult = curry((a, b) => a * b);
```


- map과 filter와 reduce모두에 curry를 감싸주면, 모두 평가를 기다리게 된다. 원래 go의 코드는 아래와 같았다. 
```javascript
go(
	products,
	products => filter(p => p.price < 20000, products),
	products => map(p => p.price, products),
	prices => reduce(add, prices),
	log
)
```

이것을 curry로 감싼 메서드들을 활용하면  
```javascript
go(
	products,
	products => filter(p => p.price < 20000)(products),
	products => map(p => p.price)(products),
	prices => reduce(add)(prices),
	log
)

```

이렇게 바꿀 수 있다. 그리고 이 함수는 아래의 코드와 똑같은 표현을 가지게 된다. 

```javascript
go(
	products,
	filter(p => p.price < 20000),
	map(p => p.price),
	reduce(add),
	log
)
```
- 이렇게 커링을 통해서, 함수를 더욱 표현력이 높고 깔끔한 코드를 얻을 수 있게 된다. 



### 내 생각과 정리 : 


### 출처(참고문헌) : 


### Link : 
[[go + curry로 읽기 좋게 작성해보기]]
[[함수형 프로그래밍의 백미 - 커링과 합성 (리액트)]]