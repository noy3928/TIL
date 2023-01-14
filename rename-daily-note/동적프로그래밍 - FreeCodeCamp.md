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

메모이제이션 하는 방식으로 구현하게 되면, 시간복잡도가 확 줄어들게 된다.
![[스크린샷 2022-12-05 오후 3.00.30.png]]
이런 방식으로 시간복잡도가 N으로 구성되게 되었다.    


## GridTraveler 

say that you are a traveler on a 2D grid. you begin in the top-left corner and your goal is to travel to the bottom-right corner. you may only move down or right. 

in how many ways can you travel to the goal on a grid with dimensions m * n ? 

write a function 'gridTraveler(m,n)' that calculates this. 

이것을 계산해보면 아래와 같은 그림이 된다.
![[스크린샷 2022-12-05 오후 3.24.27.png]]


작은 입력값에서부터 생각해보자. 
gridTraveler(1,1) -> 1 
gridTraveler(0,1) -> 0 

gridTraveler(3,3) -> ? 

![[스크린샷 2022-12-05 오후 3.27.41.png]]
처음에 3,3의 위치에 있다가 아래로 내려오면, 다시 2,3에서 시작하는 것과 다를바 없는 상황이 된다. 
오른쪽으로 움직이면 gridTraveler(2,2) 가 되고, 거기서 아래로 움직이면 gridTraveler(1,2) 가 된다. 


![[스크린샷 2022-12-05 오후 3.34.47.png]]

```javascript
const gridTraveler = (m,n) => {
	if(m === 1 && n === 1) return 1;
	if(m === 0 || n === 0) return 0
	return gridTraveler(m - 1, n) + gridTraveler(m, n-1) 
}
```
이렇게 문제를 풀 수는 있지만, n이 커지면 시간복잡도가 너무 많이 늘어난다. 




### 내 생각과 정리 : 


### 출처(참고문헌) : 


### Link : 
