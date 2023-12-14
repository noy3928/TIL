## 10.1 조건문 분해하기

- 복잡한 조건부 로직은 프로그램을 복잡하게 만든다.
- 코드를 부위별로 해체한 다음, 해체된 코드 덩어리들을 의도를 살린 함수 호출로 바꿔주자.

```js
if(!aData.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd))
```

이런 조건문을 의도를 담아서

```js
if(summer)
```

이렇게 수정하는 것이다.

## 10.2 조건식 통합하기

- 비교하는 조건이 다르지만, 그 결과로 수행하는 동작이 같은 코드들에 적용하는 방법이다.
- 조건부 코드를 통합하는 이유는 2가지다.
  - 1. 여러 조건들을 하나로 통합함으로써 하려는 일이 더 명확해진다.
  - 2. 이런 작업은 함수 추출하기까지 이어질 가능성이 높다. 조건식을 함수로 추출하면 의도가 더 분명하게 드러난다.

## 10.3 중첩 조건문을 보호 구문으로 바꾸기

- 조건문에는 참인 경로과 거짓인 경로가 있다. 두 경우 다 정상 동작이라면 if/else를 사용하는 것을 선호한다.
- 한쪽만 정상이라면 비정상 조건을 if에서 검사한 다음, 조건이 참이면 함수에서 빠져나온다. -> Guard clause
- 이 방법의 핵심은 의도를 부각하는 것이다.

```js
function getPayAmount() {
  if (isDead) return deadAmount();
  if (isSeperated) return separatedAmount();
  if (isRetired) return retiredAmount();
  return normalPayment();
}
```

## 10.4 조건부 로직을 다형성으로 바꾸기

- 다양한 타입에 따라서 동작이 달라진다면, 그 타입을 클래스로 만든다. 이렇게 다형성을 구현한다.
- Q. 다형성이 과해지는 순간은 언제일까?

## 10.5 특이 케이스 추가하기

- 특정 조건에서 동작이 달라지는 코드가 여러 곳에 있을 땐, 그 조건을 캡슐화하자. 이 패턴을 활용하면 특이 케이스를 확인하는 코드 대부분을 단순한 함수 호출로 바꿀 수 있다.
- 방식은 리터럴 객체, 메서드를 담은 객체, 클래스 등등 다양하게 구현할 수 있다.

```js
// site 클래스
class Site {
  get customer() {
    return this._customer;
  }
}
```

```js
class Customer {
  get name() {}
  get billingPlan() {}
  set billingPlan(arg) {}
  ...
}
```

미확인 고객을 처리해야함.

```js
const aCustomer = site.customer;
// ... 수많은 코드...
let customerName;
if (aCustomer === "미확인 고객") customerName = "거주자";
else customerName = aCustomer.name;
```

사이트에 방문한 사람이 미확인 고객인지 확인해서, 미확인 고객이면 거주자로 처리한다. 이런 방식으로 미확인 고객을 처리해야하는 로직이 많다. 이런 경우에 특이 케이스를 추가하는 것이다.

```js
class Customer {
  get isUnknown() {
    return false;
  }
}
// 미확인 고객 클래스
class UnknownCustomer {
  get isUnknown() {
    return true;
  }
}
```

여러 곳에서 수정해야만하는 코드를 별도 함수로 추출하여 한데로 모은다.

```js
function isUnknown(arg) {
  if (!(arg instanceof Customer || arg instanceof UnknownCustomer)) {
    throw new Error(`잘못된 값과 비교: <${arg}>`);
  }
  return arg === "미확인 고객";
}
```

그리고 이 함수를 이용해 미확인 고객인지를 확인할 수 있다.

```js
let customerName;
if (isUnknown(aCustomer)) customerName = "거주자";
else customerName = aCustomer.name;
```

이 상태에서 특이 케이스일 때 Site클래스가 UnknownCustomer를 반환하도록 수정한다.

```js
class Site {
  get customer() {
    return this._customer === "미확인 고객"
      ? new UnknownCustomer()
      : this._customer;
  }
}
```

그리고 기존의 isUnknown 함수를 수정하여 고객 객체의 속성을 사용하도록 한다.

```js
function isUnknown(arg) {
  if (!(arg instanceof Customer || arg instanceof UnknownCustomer)) {
    throw new Error(`잘못된 값과 비교: <${arg}>`);
  }
  return arg.isUnknown;
}
```

그리고 UnKnownCustomer 클래스에는 name 속성을 추가한다.

```js
class UnknownCustomer {
  get name() {
    return "거주자";
  }
  get isUnknown() {
    return true;
  }
}
```

이렇게 된다면, 조건부 코드는 아예 지워도 된다.

```js
let customerName = aCustomer.name;
```

## 10.6 어서션 추가하기

- 어서션은 항상 참이라고 가정하는 조건부 문장이다. 만약 이게 실패하면 개발자가 뭔가 잘못했다는 뜻이다.
- 어서션은 프로그램이 어떤 상태라고 가정한 채 실행하는 것이다. 이것을 다른 개발자에게 알려주는 훌륭한 소통 도구이다.

## 10.7 제어 플래그를 탈출문으로 바꾸기

- 제어 플래그란, 변수를 사용해 프로그램의 제어 흐름을 바꾸는 것이다.
- 제어 플래그는 프로그램의 복잡도를 높이고, 버그를 발생시키기 쉽게 만든다.
- 함수에서 할 일을 다 마쳤으면 바로 return문으로 명확히 알리는 편이 낫다.
