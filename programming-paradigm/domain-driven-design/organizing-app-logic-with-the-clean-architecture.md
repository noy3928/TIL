코드를 어느 위치에 놓는 것이 좋을까? 고민하는 경우가 많다. 그러한 문제점을 해결해줄 내용을 알아보자.

클린 아키텍처는 로버트 마틴이 그의 책 클린 아키텍처에서 다룬 내용으로, 코드를 컴포넌트로 구성하고 그 컴포넌트들을 데이터 베이스, api, 웹 서버 등 외부 요소들과 연결하여 애플리케이션을 구성하는 방법을 알려주고 있다. 다소 복잡한 내용일 수 있지만, 유익한 책이다.

### 도메인 계층

도메인 계층에는 엔티티, 비지니스 로직, 규칙, 이벤트 등 중요한 요소들이 모두 포함되어있다. 이 계층에서는 소프트웨서에서 다른 라이브러리나 프레임워크로 대체할 수 없는 핵심적인 요소를 담고 있다. 비지니스가 수행하는 본질적인 내용을 표현하기 때문에 변경이 필요할 가능성도 적다.

예를 들어서, 앱이 책을 판매하는 앱이라면 책을 판매하는 것이 이 계층의 핵심이다. 주차 자리를 찾는 앱이라면, 도메인 계층에는 주차 자리를 찾는 핵심 로직이 들어가야한다.

이와 같이 비지니스의 본질적인 부분은 쉽게 변하지 않기 때문에, 가장 안정적인 계층으로 여겨진다.

## **Clean architecture expanded**

일반적으로 클린 아키텍처는 domain과 infrastruce 로 표현할 수 있다.

비지니스에 특화된 내용은 도메인 계층에 속하고, 웹을 운영하기 위해 필요한 데이터베이스, 웹 서버, 컨트롤러, 캐시 등의 기술과 연결해주는 어댑터 역할은 인프라 계층에 해당한다.

하지만 세부사항에서 차이가 생기기도 한다. 클린 아키텍처는 조금 더 세밀한 구조로 볼 수 있다.

- 인프라스트럭처 디테일
- 어댑터 로직
- 어플리케이션 기능
- 핵심 도메인 로직

이제 대규모 서비스에서 흔히볼 수 있는 어플리케이션 로직의 유형을 소개해보겠다.

## 1. Presentation Logic

> 사용자에게 정보를 표시하는 방식에 관한 로직

dumb ui라는 원칙이 있다. 이 원칙은 ui 로직을 도메인 계층 로직과 분리하는 것을 목표로하는데, 그 이유는 도메인 계층 로직이 아키텍처의 다른 모든 요소에 의존성으로 작용하기 때문이다.

프론트엔드는 변동성이 크다. 때문에 지속적인 변경이 필요하다. 이런 이유로 아키텍처의 다른 구성요소에 중요한 로직을 프론트엔드에 두는 것은 좋지 않다. 이렇게되면 어플리케이션이 자주 깨질 위험이 있다.

## 2. Data Access / Adapter Logic

> 캐시, 데이터베이스, 프론트엔드 등 인프라 계층에 접근할 수 있도록 하는 로직

이 계층의 핵심은 외부 세계와 연결하기 위한 어댑터를 정의하는 것입니다. 데이터베이스에 객체를 영속화할 때 복잡성을 내부 계층에서 숨기기 위해 repository 클래스를 생성하여 crud 작업을 처리하도록 합니다.

- 이 계층에서 일반적으로 수행하는 작업들입니다.
  - restful api 요청 처리 : 컨트롤러 작성
  - 프로덕션 미들웨어 : express.js 컨트롤러 미들웨어를 작성하여 ddos나 로그인 시도 공격으로부터 api를 보호합니다.
  - 데이터베이스 접근 : crud 작업을 수행하는 메서드가 포함된 리포지토리를 생성합니다. orm 또는 직접 쿼리를 사용할 수 잇습니다.
  - 결제 통합 : 결제 처리기 어댑터를 작성합니다.

## 3. Application Logic / Use Cases

> 우리의 앱의 실제 기능을 정의하는 로직

유즈 케이스는 우리 앱의 기능들입니다. 애플리케이션의 모든 유스케이스를 식별하고 개발 완료한 후에는, 우리는 객관적으로 ‘완료’ 상태에 도달했다고 할 수 있습니다.

### CQS / CQRS

커맨드-쿼리 분리 원칙(Command-Query Segregation principle)을 따르면 유스케이스는 명령(Command) 또는 조회(Query)로 구분됩니다.
(https://khalilstemmler.com/articles/oop-design-principles/command-query-separation/)

### Use Cases are application specific

각 애플리케이션에는 다음과 같은 자체 유스케이스가 있습니다:

Google Drive

- shareFolder(folderId: FolderId, users: UserCollection): Google의 엔터프라이즈에서 다른 사용자와 폴더를 공유합니다.
- createFolder(parentFolderId: FolderId, name: string): 폴더를 생성합니다.
- createDocument(parentFolderId: FolderId): Google Docs 문서를 생성합니다.
  Google Docs

- shareDocument(users: UserCollection, visibility: VisibilityType): 여러 사용자와 문서를 공유합니다.
- deleteDocument(documentId: DocumentId): 문서를 삭제합니다.
  Google Maps

- getTripRoutes(start: Location, end: Location, time?: Date): 여행 경로를 모두 조회합니다.
- startTrip(start: Location, end: Location): 현재 시점에서 여행을 시작합니다.

https://khalilstemmler.com/resources/names-construct-structure/

## 4. Domain Service logic

> 하나의 엔티티로는 한정할 수 없는 핵심 비즈니스 로직

이곳에서는 도메인 로직을 다룬다. DDD에서는 항상 도메인 로직을 해당 엔티티와 가장 가까운 위치에 배치하려고 노력한다.
그러나 로직이 두 개 이상의 엔티티에 걸쳐 확장되면서 어느 한쪽에 두는 것이 적절하지 않은 상황이 발생할 수 있다.

이럴때는 도메인 서비스를 사용한다. 이를 통해 특정 어플리케이션의 유스케이스에서만 해당 비지니스 규칙이 제한되지 않고, 도메인 계층에 유지되기 때문에 해당 규칙을 사용하는 모든 애플리케이션에서 활용될 . 수있다.

- 참고자료(도메인서비스) :
  - https://gorodinski.com/blog/2012/04/14/services-in-domain-driven-design-ddd/
  - https://dev.to/ruben_alapont/domain-services-and-factories-in-domain-driven-design-55lo

## 5. Validation logic

> 도메인 객체가 유효한지 검증하는 로직

유효성 검사는 또 다른 도메인 레이어의 관심사이다. 인프라 영역이 아니다.

User 엔티티를 만들고 싶다고하자. 그리고 유저는 email이라는 프로퍼티를 가지고 있다.

```ts
interface UserProps {
  userEmail: string;
}
class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityId): Result<User> {
    const propsResult = Guard.againstNullOrUndefined(props.userEmail);
    if (!propsResult.succeeded) {
      return Result.fail<User>(propsResult.error);
    }

    return Result.ok<User>(new User(props, id));
  }
}
```

그렇다면 유효하지 않은 userEmail: string 값을 가진 User를 생성하지 못하도록 할 방법이 있을까요?

```ts
const userOrError: Result<User> = User.create({ userEmail: "diddle" });
userOrError.isSuccess; // true
```

이런 상황에서 우리는 값 객체(Value Object)를 사용합니다. 값 객체를 통해 userEmail의 유효성 검사 규칙을 캡슐화할 수 있습니다.

userEmail의 타입을 단순 문자열 타입이 아닌, 엄격하게 타입화된 객체로 변경해 보겠습니다.

```ts
interface UserProps {
  userEmail: UserEmail;
}
```

그리고 UserEmail 값 객체를 생성합니다...

```ts
import { TextUtil } from "../utils";
import { Result, Guard } from "../../core";

interface UserEmailProps {
  email: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  // 비공개 생성자. "new UserEmail('diddle')"과 같은 사용 불가
  private constructor(props: UserEmailProps) {
    super(props);
  }

  // 팩토리 메서드, UserEmail.create()를 통해 생성 가능
  public static create(props: UserEmailProps): Result<UserEmail> {
    if (
      Guard.againstNullOrUndefined(props.email) ||
      !TextUtil.isValidEmail(props.email)
    ) {
      return Result.fail<UserEmail>("Email not provided or not valid.");
    } else {
      return Result.ok<UserEmail>(new UserEmail(props));
    }
  }
}
```

## 6. Core business logic / entity logic

> 단일 엔티티에 속하는 로직

애플리케이션의 핵심 가치를 지닌 가장 중요한 요소는 엔티티입니다. 또한 엔티티가 관련된 다른 엔티티를 참조하는 경우, 이는 애그리게이트 루트가 됩니다.

이 계층에 존재하는 핵심 비즈니스 로직은 다음과 같습니다:

- 초기값 / 기본값 설정
- 클래스 불변성을 보호 (어떤 변경이 허용되는지와 그 시점) - https://khalilstemmler.com/wiki/invariant/
- 변경, 생성, 삭제 등 비즈니스와 관련된 모든 것에 대해 도메인 이벤트 생성. 도메인 이벤트를 통해 복잡한 비즈니스 로직을 연쇄적으로 수행할 수 있습니다.
