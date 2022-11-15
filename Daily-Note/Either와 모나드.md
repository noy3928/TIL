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
		return new Right(a);
	}

	static fromNullabe(val){ // 값이 올바르면 Right, 아니면 Left를 취한다.
		return val !== null && val !== undefined ? Either.right(val) : Either.left(val);
	}

	static of(a){ // 주어진 값을 right에 넣고 새 인스턴스를 만든다.
		return Either.right(a) 
	}
}

class Left extends Either {
	map(_) { // 함수를 매핑하여 값을 반환하는 메서드이지만, Left는 반환할 값 자체가 없다.
		return this;
	}

	get value() {
		throw new TypeError ("Left(a) 값을 가져올 수 없습니다")
	}

	getOrElse(other){ // Right 값이 있으면 가져오고, 없으면 주어진 기본값을 반환한다.
		return other 
	}

	orElse(f) { 
		return f(this._value); // Left 값에 주어진 함수를 적용한다. Right는 아무 일도 안일어난다.
	}

	chain(f){ // Right 에는 함수를 적용하고 그 값을 반환한다. Left는 아무 일도 안 한다. 
		return this;
	}

	getOrElseThrow(a){ // Left에서만 주어진 값으로 예외를 던진다. Right는 예외 없이 그냥 정상 값을 반환한다. 
		throw new Error(a);
	}

	filter(f){ // 주어진 술어를 만족하는 값이 존재하면 해당 값이 담긴 Right를 반환하고, 그 외에는 빈 Left를 반환한다. 
		return this;
	}

	toString(){
		return `Either.Left(${this._value}`
	}
}

class Right extends Either {
	map(f){ // Right 값에 함수를 매핑하여 반환한다. Left에는 아무일도 안일어난다.
		return Either.of(f(this._value))
	}

	getOrElse(other){ // Right 값을 얻는다. 없으면 주어진 기본값 other를 반환한다. 
		return this._value
	}

	orElse(){ // Left에 주어진 함수를 적용하는 메서드이다. Right에는 아무 일도 안 한다. 
		return this;
	}

	chain(f){ // Right에 함수를 적용하고 그 값을 반환한다. Left에는 아무 일도 안한다. 
		return f(this._value);
	}

	getOrElseThrow(_){
		return this._value
	}

	filter(f){
		return Either.fromNullabe(f(this.value) ? this._value : null);
	}

	toString(){
		return `Either.Right(${this.value})`
	}
}

```


### 내 생각과 정리 : 


### 출처(참고문헌) : 


### Link : 
