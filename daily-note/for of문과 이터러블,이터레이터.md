### 날짜 : 2022-11-05 19:13
### 주제 : #자바스크립트 #ES6 

---- 

### 메모: 
- [Symbol.iterator]와 for of 사이의 연관성 
- array[Symbol.iterator]를 출력해보면 어떤 함수가 나온다. 
	- 해당 키에 null을 넣고나면, 해당 함수는 for of로 접근했을 때 순회를 할 수 없어진다. 
	- 고로 for of와 Symbol.iterator 사이에는 어떤 연관성이 존재한다는 것을 알 수 있다. 

- 이터러블 : 이터레이터를 리턴하는 ``[Symbol.iterator]() 를 가진 값 
	- 예를 들어 배열이 이터러블이다. 
	- 배열이 이터러블이기 때문에 for...of 문과 함께 잘 동작할 수 있다. 
- 이터레이터 : {value, done} 객체를 리턴하는 next()를 가진 값
	- next()라는 메서드를 가진 값이다. 
	- next()라는 메서드를 실행하면 {value : 1, done : true | false}라는 값을 반환한다.
- 이터러블/이터레이터 프로토콜 : 이터러블을 for...of, 전개 연산자등과 함께 동작하도록한 규약이다. 


```javascript
const arr = [1,2,3]
let iter1 = arr[Symbol.iterator]()
iter1.next()
iter1.next()
iter1.next()
for (const a of iter1) log(a) // 아무것도 출력되지 않는다. 
```



### 메모를 한 이유 : 


### 출처(참고문헌) : 


### Link : 
