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

- 문제의식 : 기본형 데이터를 묶어서 하나의 데이터구조로 만들고 싶다. / 기본형 데이터를 묶어서 하나의 데이터구조로 만들면, 그 데이터구조를 다루는 동작을 캡슐화할 수 있다. / 필드가 변경되어도, 그 데이터를 사용하는 코드를 변경할 필요가 없다.
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

<br>

## 7.4 임시 변수를 질의 함수로 바꾸기

- 문제의식 : 임시 변수를 만들어, 다시 참조하는 경우가 있다. 그런데 함수로 만들어버리면 더 나을 경우가 있다. / 임시 변수에 값을 여러변 대입하는 경우.
- 해결방법 : 임시 변수를 질의 함수로 바꾼다.
  - 이점 :
    - 비슷한 계산을 하는 코드가 여러 곳에 있을 때, 질의 함수로 바꾸면 한 군데만 바꾸면 된다. (중복제거)

<br>

## 7.5 클래스 추출하기

- 문제의식 : 클래스의 기능이 너무 많다. / 클래스의 책임이 너무 많다.
- 해결방법 : 클래스를 쪼개라. 클래스를 쪼개면, 각 클래스는 자신만의 책임을 갖게 된다.
- 포인트 : 1. 일부 데이터와 메서드를 따로 묶을 수 있다면 어서 분리하라는 신호. 2. 함께 변경되는 일이 많거나 서로 의존하는 데이터들도 분리.

```js
class Person {
  get name() {
    return this._name;
  }
  set name(arg) {
    this._name = arg;
  }
  get telephoneNumber() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }
  get officeAreaCode() {
    return this._officeAreaCode;
  }
  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }
  get officeNumber() {
    return this._officeNumber;
  }
  set officeNumber(arg) {
    this._officeNumber = arg;
  }
}
```

1. 위 코드에서 전화번호 관련 동작을 별로 클래스로 뽑아본다. (클래스 추출하기)
2. 먼저 빈 전화번호를 표현하는 TelephoneNumber 클래스를 만든다.

```js
class TelephoneNumber {}
```

3. Person 클래스의 telephoneNumber 필드를 TelephoneNumber 클래스의 인스턴스로 바꾼다.

```js
constructor() {
  this._telephoneNumber = new TelephoneNumber();
}

// telephoneNumber 필드의 게터와 세터를 수정한다.
class TelephoneNumber {
    get officeAreaCode() {
        return this._officeAreaCode;
    }

    set officeAreaCode(arg) {
        this._officeAreaCode = arg;
    }
}
```

4. 그런 다음 필드들을 하나씩 새 클래스로 옮긴다.

```js
// Person 클래스

get officeAreaCode() { return this._telephoneNumber.officeAreaCode;}
set officeAreaCode(arg) { this._telephoneNumber.officeAreaCode = arg;}
```

테스트 후 문제가 없으면 다른 필드도 옮긴다.

```js
class TelephoneNumber {
  //... 생략
  get officeNumber() {
    return this._officeNumber;
  }

  set officeNumber(arg) {
    this._officeNumber = arg;
  }
}

class Person {
  //... 생략
  get officeNumber() {
    return this._telephoneNumber.officeNumber;
  }
  set officeNumber(arg) {
    this._telephoneNumber.officeNumber = arg;
  }
}
```

5. 이어서 telephoneNumber 메서드를 옮긴다.

```js
// TelephoneNumber 클래스
get telephoneNumber() {return `(${this.officeAreaCode}) ${this.officeNumber}`;}
```

```js
// Person 클래스
get telephoneNumber() {return this._telephoneNumber.telephoneNumber;}
```

이런 수정을 통해서, 거대해진 클래스를 작고 명확한 책임을 가진 클래스로 분리할 수 있다.

<br>

## 7.6 클래스 인라인하기

- 문제의식 : 클래스에 기능이 너무 적다. / 클래스의 책임이 너무 적다. / 제 역할을 못해서 그대로 두면 안 되는 클래스는 합쳐버린다.

<br>

## 7.7 위임 숨기기

- 캡슐화는 필드만 감추는 것이 아니다. 캡슐화는 그보다 더 많은 역할을 한다. 본 파트에서는 위임 숨기기 기법을 통해서, 캡슐화가 하는 역할을 알아본다.

```js
// Person
constructor(name) {
    this._name = name;
}
get name() {return this._name;}
get department() {return this._department;}
set department(arg) {this._department = arg;}
```

```js
// Department
get chargeCode() {return this._chargeCode;}
set chargeCode(arg) {this._chargeCode = arg;}
get manager() {return this._manager;}
set manager(arg) {this._manager = arg;}
```

어떤 부서의 관리자를 알고 싶다.
부서를 찾는다 -> 부서의 관리자를 찾는다.

```js
manager = aPerson.department.manager;
```

현재 상황에서는 클라이언트 코드가 부서가 관리자 정보를 제공한다는 것을 알고 있어야만 하는 상황이다. 클라이언트에 불필요한 의존성이 생겼다. 이것을 제거하려면 사람 클래스에 간단한 위임 메서드를 만들면 된다.

```js
// Person
get manager() {return this._department.manager;}
```

그리고 모든 클라이언트가 이 메서드를 사용하도록 고친다.

```js
manager = aPerson.manager;
```

- 클라이언트쪽에서 어떤 코드의 의존성이 발생했는지 확인하는 것이 필요하다. 그리고 그 의존성을 적절하게 제거하기 위해서 캡슐화할 부분을 캡슐화한다. 이번 파트에서는 위임할 수 있는 대상을 찾아서 위임 메서드를 만들었다. 이렇게 위임 메서드를 만들면, 클라이언트는 위임 대상의 존재를 모르더라도 된다. 이것이 캡슐화가 하는 역할이다.

<br>

## 7.8 중개자 제거하기

- 문제의식 : 클라이언트 입장에서 위임 객체의 또 다른 기능을 사용하고 싶어졌다. 그때마다 위임 메서드를 추가해야한다. 점점 위임 메서드가 성가지게 된다.
- 해결방법 : 위임 메서드를 제거한다. 클라이언트 쪽에서 직접 사용한다.

<br>

## 7.9 알고리즘 교체하기
