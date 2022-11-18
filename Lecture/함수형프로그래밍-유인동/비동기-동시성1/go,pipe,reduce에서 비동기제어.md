### 날짜 : 2022-11-16 21:14
### 주제 : #함수형프로그래밍 

---- 

### 메모 : 

```javascript
	go(1, 
		a => a + 10,
		a => Promise.resolve(a + 100),
		a => a + 1000,
		log,)
```
현재는 이런 코드를 실행하면, `[object Promise] 1000` 와 같은 값이 반환된다.
여기서 어떻게하면 정상적인 동작을 하는 함수를 만들 수 있을까? 

우선 현재의 go 함수를 보면, reduce를 사용하고 있다.
```javascript
const go = (...args) => reduce((a,f) => f(a), args);

```
이 함수들이 실행되는 모든 제어권을 reduce가 가지고 있다. 
이 안에서는 어떤 값 확인도 하지 않고 있기 때문에 reduce만 잘 고쳐주면 될 것 같다. 

우선 원래의 reduce코드를 한번 보자 
```javascript
const reduce = curry((f, acc, iter) => {
	if(!iter){
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	} else {
		iter = iter[Symbol.iterator]();
	}

	let cur;
	while(!(cur = iter.next()).done){ // 이터레이터를 계속 순회하면서
		const a = cur.value; // , value 값을 함수의 인자로 계속 넘겨주고 있다. 
		acc = f(acc,a); // 결국 어느 시점에는 이 acc가 Promise가 될 것이라는 말이다. 그 다음 루프에서는 프로미스에 함수를 실행하게 되기 때문에, 문제가 발생한다. 
	}
	return acc;
})
```


우선 간단한 방법으로 해결하는 코드를 살펴보자 
```javascript
const reduce = curry((f, acc, iter) => {
	if(!iter){
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	} else {
		iter = iter[Symbol.iterator]();
	}

	let cur;
	while(!(cur = iter.next()).done){ 
		const a = cur.value; 
		acc = acc instanceof Promise ? acc.then(acc  => f(acc, a)) : f(acc,a);
	}
	return acc;
})
```
- 프로미스인지를 확인해서, 프로미스면 then에 다음 함수를 넘겨주는 방식으로 코드가 이루어져있다. 하지만 아주 훌륭한 상태라고 할 수는 없다. 
	- 한번 프로미스를 만들게 되면, 그 이후에는 프로미스가 아니어도 프로미스를 체이닝하기 때문에 좋은 코드가 아니라고 할 수 있다. 때문에 연속적으로 계속 비동기가 일어나게 된다. 
	- 불필요한 로드가 생기게 될 수도 있다. 
- 위 코드를 재귀로 한번 만들어보자. 

```javascript
const reduce = curry((f, acc, iter) => {
	if(!iter){
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	} else {
		iter = iter[Symbol.iterator]();
	}

	return function recur(acc){
		while(!(cur = iter.next()).done){
			const a = cur.value; 
			acc = f(acc,a); 
			if(acc instanceof Promise) return acc.then(recur);
		}
	return acc 
	}(acc)
})
```
이렇게 처리하면 우선은 정상 동작한다. 
그런데 첫번째 인자에도 프로미스를 넣게 되면 문제가 발생한다. 


```javascript
const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a)

const reduce = curry((f, acc, iter) => {
	if(!iter){
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	} else {
		iter = iter[Symbol.iterator]();
	}

	return go1( function recur(acc){
		while(!(cur = iter.next()).done){
			const a = cur.value; 
			acc = f(acc,a); 
			if(acc instanceof Promise) return acc.then(recur);
		}
	return acc 
	}(acc)
})
```







### 내 생각과 정리 : 


### 출처(참고문헌) : 


### Link : 
