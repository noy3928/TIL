### 날짜 : 2022-12-05 13:37
### 주제 : #알고리즘 #동적프로그래밍 

---- 

## 동적프로그래밍에서의 시간복잡도 계산 

```javascript
const foo = (n) => {
	if(n <= 1) return 
	foo(n-1)
}
```
이렇게 foo라는 함수로 호출되면 시간복잡도는 O(n)으로 나오게 된다. 

그런데, 만약 n-2로 바꾸게 되면, 
```javascript
const foo = (n) => {
	if(n <= 1) return 
	foo(n-2)
}
```
시간 복잡도는 O(n/2)가 된다. 

또 만약 이런 함수가 존재한다면, 
```javascript
const dib = (n) => {
	if(n <= 1) return;
	dib(n - 1)
	dib(n - 1)
}
```
이런 함수는 시간 복잡도가 O(2^n)이 된다. 
![[스크린샷 2022-12-05 오후 1.58.41.png]]
dib(50) 은 2^50의 시간복잡도가 된다. 

>동적 프로그래밍은 커다란 문제가 있을 때, 해당 문제를 반복되는 작은 문제로 쪼개어서 해결하고, 이미 해결된 작은 문제는 추후에 다시 가져와서 사용하는 방식으로 이루어지는 알고리즘이다. 

 ```javascript
 const fib = (n) => {
	 if(n <= 2) return 1
	 return fib(n - 1) + fib(n - 2)
 }
```
이렇게 구현되어있던 fib 함수를 동적 프로그래밍 방식으로 메모이제이션 해보자

```javascript
const fib = (n, memo={}) => {
	if(n in memo) return memo[n]
	if(n <= 2) return 1
	memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
	return memo[n]
}
```
이런 방식으로 memo를 활용해서 구할 수 있게 되었다. 






### 내 생각과 정리 : 


### 출처(참고문헌) : 


### Link : 
