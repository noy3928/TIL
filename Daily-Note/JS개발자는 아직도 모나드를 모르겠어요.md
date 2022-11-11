### 날짜 : 2022-11-11 11:24
### 주제 : #함수형프로그래밍 #모나드 

---- 

### 메모 : 
- 왜? 언제? 모나드가 필요한지, 어떤 코드에서 모나드를 발견할 수 있는지, 그리고 우리의 이해를 방해하는 요소들이 무엇인지 알아볼 것이다. 

- 함수자의 예시코드 

```javascript
// 클래스 예시 
class Functor {
	constructor(value){
		this.value = value;
	}
	map(fn){
		return new Functor(fn(this.value))
	}
}
```

```javascript
// 함수 예시 
const Functor = (value) => ({
	value, 
	map : (fn) => Functor(fn(v))
})
```

- 여기서 약간 재멋대로의 펑터함수를 보자. 
```javascript
const cat = (is, awesome) => ({...awesome, valu})
```


### 내 생각과 정리 : 


### 출처(참고문헌) : 


### Link : 
