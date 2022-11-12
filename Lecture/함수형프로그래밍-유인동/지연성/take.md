### 날짜 : 2022-11-13 00:49
### 주제 : #함수형프로그래밍  #유인동 

---- 

### 메모 : 

```javascript
const take = (l, iter) => {
	let res = [];
	for(const a of iter){
		res.push(a);
		if(res.length == l) return res;
	}
	return res;
}

take(5, range(100))
```
- take는 값을 잘라서 볼 수 있게 해주는 함수이다.


- 위 코드를 리팩토링해볼 수 있다.
```javascript
const take = curry((l, iter) => {
	let res = [];
	for(const a of iter){
		res.push(a);
		if(res.length == l) return res;
	}
	return res;
})

go(
	L.range(10000),
	take(5),
	log)
```
- L.range 처럼 제네레이터를 사용하는 함수의 경우에는 그 값들에 대한 연산을 최대한 미룬다. take나, reduce처럼 그 안에서 값을 꺼내서 더해주는 그런 연산이 이루어지기 전까지 최대한 미루는 것이다. 


### 내 생각과 정리 : 


### 출처(참고문헌) : 


### Link : 
