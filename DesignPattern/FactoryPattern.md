# Factory pattern

- 팩토리 패턴으로 우리는 팩토리 함수를 사용할 수 있다. 새로운 객체를 만들기 위해서.

- 우리는 많은 유저가 필요하다. 우리는 만들 수 있다. 새로운 유저를. 몇가지 속성을 가지고.

```javascript
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`
  },
})
```

이것을 통해서 우리는 이제 많은 유저를 만들 수 있게 되었다.

## 팩토리 패턴의 장점 :

- 상대적으로 복잡한 객체를 만들 때 유용하다.
- 팩토리 패턴을 이용하면 키 값을 동적으로 할당할 수 있다.

```javascript
const createObjectFromArray = ([key, value]) => ({
  [key]: value,
})

createObjectFromArray(["name", "John"]) // { name: "John" }
```

## 팩토리 패턴 찬성 의견 :

- 이 패턴은 유용하다. 다양하고 작은 객체를 만들어야 할 때. 그리고 그 객체들이 같은 속성들을 공유하고 있을 때.
- 그리고 이것은 쉽게 커스텀할 수 있다. 현재의 환경에 따라서.

## 팩토리 패턴 반대 의견 :

- 이 팩토리 패턴은 new 키워드를 사용해 객체를 반환하는 함수와 다를바가 없어보인다.
