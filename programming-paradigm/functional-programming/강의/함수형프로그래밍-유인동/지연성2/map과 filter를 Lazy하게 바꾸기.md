### 날짜 : 2022-11-14 16:31
### 주제 : 

---- 

### 메모 : 

- 원래 map의 모습
```javascript
const map = curry(f, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	let cur;
	while (!(cur = iter.next()).done){
		const a = cur.value;
		res.push(f(a))
	}
	return res;
}
```
이것을 재구현하면 아래와 같이 된다. 

```javascript
const map = curry((f, iter) => go(
	L.map(f,iter),
	take(Infinity)
))

//한번 더 고쳐보면 아래와 같이 바꿀 수 있다.

const map = curry(pipe(L.map, takeAll))
```


```javascript
L.map = curry(function *(f, iter){
	for(const a of iter){
		yield f(a);
	}
}

const map = curry(pipe(L.map, takeAll))

L.filter = curry(function *(f, iter) {
	for(const a of iter){
		if(f(a)) yield a;
	}
})

const filter = curry(pipe(L.filter, takeAll))
```


### 내 생각과 정리 : 


### 출처(참고문헌) : 


### Link : 
