### 날짜 : 2022-11-14 16:23
### 주제 : #함수형프로그래밍 

---- 

### 메모 : 
```javascript 
const find = curry((f,iter) => go(
	iter,
	L.filter(f),
	take(1),
	([a]) => a));
```
- find 함수에서는 결과를 내는 함수가 take이다. 
- 쿼리스트링에서는 reduce가 결과는 내는 함수였다. 

- 그냥 filter를 사용하면 불필요한 값들까지 메모리를 차지하게 된다. 
	- 그러나 L.filter를 사용하면, 딱 필요한 값까지만 차지하게 된다. 

### 내 생각과 정리 : 


### 출처(참고문헌) : 


### Link : 
