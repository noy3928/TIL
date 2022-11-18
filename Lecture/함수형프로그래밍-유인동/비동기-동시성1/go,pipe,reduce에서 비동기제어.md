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
const reduce = curry

```



### 내 생각과 정리 : 


### 출처(참고문헌) : 


### Link : 
