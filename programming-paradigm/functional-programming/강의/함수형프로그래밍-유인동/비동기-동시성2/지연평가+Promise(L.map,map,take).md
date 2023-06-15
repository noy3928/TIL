### 날짜 : 2022-11-18 17:43
### 주제 : #함수형프로그래밍 #비동기 

---- 

### 메모 : 
- 현재까지 우리가 만들었던 함수형 코드들은 아직은 동기적인 상황에서만 정상적으로 동작한다. 그런데 우리가 만들었던 go 함수처럼 비동기에서도 잘 동작할 수 있도록 다른 함수들도 다시 만들어보자. 

```javascript
go([1,2,3],
  map(a => a + 10),
  log)

go([1,2,3],
  L.map(a => a + 10),
  take(2),
  log)
```
만약에 go첫번째 인자로 들어간 값이 프로미스라면? 
```javascript
go([Promise.resolve(1),Promise.resolve(2),Promise.resolve(3)],
  L.map(a => a + 10),
  take(2),
  log)
```
제대로 동작하지 않을 것이다. 


```javascript
L.map = curry(function *(f, iter){
	for(const a of iter){
		yield f(a)
	}
}
```
이렇게 만들어져있던 L.map 함수를 이전에 만들었던 go1 함수를 이용해서 만들어보자

```javascript
L.map = curry(function *(f, iter){
	for(const a of iter){
		yield go1(a, f)
	}
}
```



### 내 생각과 정리 : 


### 출처(참고문헌) : 


### Link : 
