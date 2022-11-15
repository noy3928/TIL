### 날짜 : 2022-11-15 20:07
### 주제 : #모나드 #함수형프로그래밍 

---- 

### 메모 : 
- left : 에러 메시지 또는 예외 객체를 담습니다. 
- Right : 성공한 값을 담습니다.

- 보통 Either를 사용하는 목적 : 
	- 어떤 계산 도중 실패할 경우 그 원인에 대한 추가 정보를 결과와 함께 제공할 목적으로 사용 

```javascript
class Either {
	constructor(value){
		this._value = value;
	}
	
	get value() {
		return this._value;
	}

	static left(a) {
		return new Left(e)
	}

	static right(a){
		return new Right()
	}
}

```


### 내 생각과 정리 : 


### 출처(참고문헌) : 


### Link : 
