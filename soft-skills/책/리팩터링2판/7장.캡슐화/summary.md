# 캡슐화

- 모듈화가 잘 되었다는 것의 기준 : 각 모듈이 자신을 제외한 다른 부분에 드러내지 않아야 할 비밀을 얼마나 잘 숨기느냐에 있다.

<br>

## 7.1 레코드 캡슐화하기

- 문제의식 : 레코드의 필드를 직접 참조하면, 그 레코드의 내부 표현 방식에 다른 코드가 너무 종속된다. / 레코드의 필드를 직접 참조하면, 레코드의 내부 표현 방식을 변경하기 어렵다.
- 해결방법 : 레코드를 캡슐화한다. 레코드의 내부 표현 방식을 변경해도, 레코드의 내부 표현 방식에 종속된 코드는 캡슐화된 레코드 안으로 감춰진다.

<br>

## 7.2 컬렉션 캡슐화하기

<br>

## 7.3 기본형을 객체로 바꾸기

- 문제의식 : 기본형 데이터를 묶어서 하나의 데이터구조로 만들고 싶다. / 기본형 데이터를 묶어서 하나의 데이터구조로 만들면, 그 데이터구조를 다루는 동작을 캡슐화할 수 있다.
- 해결방법 : 기본형 데이터를 감싼다. 그리고 그 데이터를 감싼 새 클래스를 만든다.

```js
// Order 클래스
constructor(data){
    this.priority = data.priority;
}
```

```js
highPriorityCount = orders.filter(
  o => "high" === o.priority || "rush" === o.priority
).length;
```

1. 변수부터 캡슐화한다.
   이렇게 바꾸고나면, 필드의 이름이 바뀌어도, 클라이언트쪽 코드는 유지할 수 있다.

```js
// Order 클래스
get priority() {return this._priority;}
set priority(aString) {this._priority = aString;}
```

2. 값 클래스 Priority를 만든다.

```js
class Priority {
  constructor(value) {
    this._value = value;
  }
  toString() {
    return this._value;
  }
}
```

3. Order 클래스의 priority 필드를 Priority 클래스의 인스턴스로 바꾼다.

```js
get priority() {return this._priority.toString();}
set priority(aString) {this._priority = new Priority(aString);}
```
