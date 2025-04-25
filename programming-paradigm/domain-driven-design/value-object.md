> https://khalilstemmler.com/articles/typescript-value-object/

Domain-Driven Design(DDD)에서 **값 객체(Value Objects)**는 풍부하고 캡슐화된 도메인 모델을 만드는 데 도움을 주는 두 가지 기본 개념 중 하나입니다.
이 두 가지 개념은 **엔티티(Entities)**와 **값 객체(Value Objects)**입니다.

값 객체(Value Objects)를 이해하려면, 이를 엔티티와 어떻게 구분하는지가 핵심입니다.
값 객체와 엔티티의 주요 차이점은 두 값 객체의 동일성을 결정하는 방법과 두 엔티티의 동일성을 결정하는 방법에 있습니다.

### 엔티티의 동일성(Entity Identity)

도메인 개념을 모델링할 때, 우리는 해당 모델의 **동일성(identity)**에 관심을 가지며, 그 동일성을 다른 인스턴스와 구별할 수 있어야 합니다.

동일성을 결정하는 방식이 그것이 **엔티티(Entity)**인지 **값 객체(Value Object)**인지 구분하는 데 도움을 줍니다.

### 사용자(User)를 모델링하는 일반적인 예를 들어 보겠습니다.

이 예시에서 우리는 사용자가 엔티티(Entity)라고 판단합니다. 왜냐하면 두 사용자 인스턴스의 차이를 식별하는 방식이 **고유 식별자(Unique Identifier)**를 기준으로 하기 때문입니다.

여기서 사용하는 고유 식별자는 일반적으로 랜덤하게 생성된 UUID(범용 고유 식별자) 또는 SQL의 자동 증가(auto-increment) ID입니다.
이 고유 식별자는 데이터베이스 등 영속성 기술에서 조회할 수 있는 기본 키(Primary Key) 역할을 합니다.

## 값 객체(Value Objects)

값 객체에서는 두 인스턴스의 **구조적 동일성(Structural Equality)**을 통해 동일성을 확인합니다.

구조적 동일성(Structural Equality)
구조적 동일성이란 두 객체의 내용(content)이 동일한 것을 의미합니다. 이는 두 객체가 같은 객체인지 여부를 판단하는 참조 동일성(Referential Equality) 또는 **참조(identity)**와는 다릅니다.

값 객체 간의 동일성을 확인할 때는 객체의 실제 내용을 확인하여 비교합니다.

예: 이름 비교
사용자 엔티티(User Entity)에 Name 속성이 있다고 가정합니다.
두 이름이 동일한지 어떻게 판단할 수 있을까요?

이것은 두 문자열을 비교하는 것과 유사합니다.

```ts
"Nick Cave" === "Nick Cave"; // true
"Kim Gordon" === "Nick Cave"; // false
```

이처럼 간단합니다.

다음과 같은 사용자 엔티티를 가질 수 있습니다.

```ts
// domain/user.ts
interface UserProps {
  name: string;
}

class User extends Entity<UserProps> {
  get name(): string {
    return this.props.name;
  }

  constructor(props: UserProps) {
    super(props);
  }
}
```

### 문제 제기: 이름 길이 제한 추가

만약 사용자 이름의 길이를 제한하고 싶다면 어떻게 해야 할까요?
예를 들어, 이름은 2자 이상, 100자 이하로 제한한다고 가정해 보겠습니다.

간단한 방법은 이름을 생성하기 전에 유효성 검사를 수행하는 것입니다.

```ts
// services/createUserService.ts
class CreateUserService {
  public static createUser(name: string): User {
    if (
      name === undefined ||
      name === null ||
      name.length <= 2 ||
      name.length > 100
    ) {
      throw new Error("User name must be between 2 and 100 characters.");
    } else {
      return new User({ name });
    }
  }
}
```

수정시 문제
사용자 이름을 수정하는 경우에도 동일한 검증 로직이 필요합니다.

```ts
// services/editUserService.ts
class EditUserService {
  public static editUserName(user: User, name: string): void {
    if (
      name === undefined ||
      name === null ||
      name.length <= 2 ||
      name.length > 100
    ) {
      throw new Error("User name must be between 2 and 100 characters.");
    } else {
      user.name = name;
      // save
    }
  }
}
```

위의 방식은 이상적이지 않습니다.
같은 유효성 검사가 반복되면서 서비스에 도메인 로직과 검증이 지나치게 집중됩니다.
이는 도메인 로직이 모델 자체에 제대로 캡슐화되지 않았다는 신호이며, 이를 [**빈약한 도메인 모델(Anemic Domain Model)**](https://khalilstemmler.com/wiki/anemic-domain-model/)이라고 부릅니다.

<br/>

---

- 동일성이 중요한 포인트이구나. 동일성이란 무엇일까? 동일성은 왜 중요한 것일까?
- 구조적 동일성. 그 내용물이 같은지를 두고 판단하는 경우에는 value object를 사용하는구나.
