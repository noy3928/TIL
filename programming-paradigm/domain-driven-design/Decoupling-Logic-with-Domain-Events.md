> https://khalilstemmler.com/articles/typescript-domain-driven-design/chain-business-logic-domain-events/

- 이 글에서는 어플리케이션의 서브도메인 사이에서 복잡한 도메인 로직을 분리하는 방식을 깔끔하게 개선하는 방법으로써의 도메인 이벤트를 사용하는 과정을 설명하겠습니다.
  - (도메인 이벤트를 사용하는 이유는 복잡한 도메인 로직의 분리를 깔끔하게 하기 위해서)

## Introduction

- 백엔드 작업을 하다보면, 다음과 같은 표현을 사용하는 경우가 있다.
  - **가 발생하면, **를 수행하라.
  - 이 작업 이후, 저 작업을 수행하라.
  - 이 작업과 저 작업을 한 이후, 그 작업을 해라.. 하지만, 이 것이 발생했을때만 저 작업을 해라...
- 이런 논리들을 꽤나 복잡하지 않습니까? 소음처럼 느껴지기도 합니다.
- 예를 들어보겠습니다.
  - 제가 만들고 있는 white label 서비스에서 사용자가 계정을 등록하면 여러가지 작업을 하고 싶습니다.
    - 사용자의 계정을 생성하고,
    - 사용자의 실제 이름을 바탕으로 기본 사용자 이름을 자동으로 생성하고,
    - 누군가가 가입했다는 알림을 제 슬랙 체널에 보내면서,
    - 사용자를 메일링 리스트에 추가하고,
    - 환영 이메일을 보내는 등의 작업을 하기 원하는 것입니다.
- 이 모든 것들은 어떻게 코드로 표현할 수 있을까요?

- 첫번째 접근법 :
  - 이 모든 작업이 일어나는 곳이 사용자의 계정을 생성하는 UsersService이기 때문에, 이 모든 작업을 UsersService에서 처리할 수도 있습니다.

```typescript
import { SlackService } from "../../notification/services/slack";
import { MailchimpService } from "../../marketing/services/mailchimp";
import { SendGridService } from "../../notification/services/email";

class UsersService {
  private sequelizeModels: any;

  constructor(sequelizeModels: any) {
    this.sequelizeModels = sequelizeModels;
  }

  async createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<void> {
    try {
      // 사용자 이름 지정 (이미 존재할 수도 있음)
      const username = `${firstName}${lastName}`;

      // 사용자 생성
      await sequelizeModels.User.create({
        email,
        password,
        firstName,
        lastName,
        username,
      });

      // 슬랙 채널에 알림 보내기
      await SlackService.sendNotification(
        `Hey guys, ${firstName} ${lastName} @ ${email} just signed up.`
      );

      // 사용자 메일링 리스트에 추가
      await MailchimpService.addEmail(email);

      // 환영 이메일 전송
      const welcomeEmailTitle = `Welcome to White Label`;
      const welcomeEmailText = `Hey, welcome to the hottest place to trade vinyl.`;
      await SendGridService.sendEmail(
        email,
        welcomeEmailTitle,
        welcomeEmailText
      );
    } catch (err) {
      console.log(err);
    }
  }
}
```

- 문제점 : 하지만 이 접근법에는 문제가 있습니다.
  - UserSerivce가 User와 관련 없는 너무 많은 것들을 알고 있습니다. 이메일 전송과 슬랙 알림은 대부분 알림 서브 도메인에 속해야합니다. 그리고 마케팅 캠페인과 관련된 mailchimp 같은 도구를 이용하는 작업은 마케팅 서브도메인에 속하는 것이 더 적합합니다. 현재의 createUser 메서드의 여러 비관련 작업들이 UsersService에 결합되어있습니다. 때문에 이 클래스의 독립성과 테스트의 난이도 또한 높아졌습니다.
- 이 문제를 해결해보려하는 것입니다.

> 설계 원칙
>
> - 상호작용하는 객체들에 대해 느슨한 결합을 유지하도록 노력하라

decoupling principle 은 RxJs의 원칙이기도 하다.
그리고 이런 이벤트 기반의 디자인 패턴은 observer pattern이라고 불리기도 한다.

<br/>

## Prerequisites

이제 도메인 이벤트를 이용해서 복잡한 비지니스 로직을 분리하는 방법에 대해서 배워보겠습니다.
(도메인 이벤트는 복잡한 비지니스 로직을 분리하기 위한 것이구나. 그런데 왜 굳이 ddd에서 이벤트를 강조하는걸까? 도메인의 복잡한 로직을 더욱 단순하고 깔끔하게 분리하기 위한 것일까?)

- 이 가이드를 이해하기 위해서 다음을 알고 있어야 합니다.
  - ddd에 대한 기본 개념
  - 엔티티, 값 객체, 어그리게이트, 리포지토리의 역할 이해.
  - 애플리케이션을 서브 도메인과 유스 케이스로 논리적으로 분리함으로써 코드의 위치를 빠르게 파악하고 아키텍처의 경계를 지키는 방법
  - 이전의 도메인 이벤트 관련 글을 읽은 경험.

## 도메인 이벤트란?

- 모든 비지니스에는 중요한 핵심 이벤트들이 있다.
- 바이닐이라는 서비스에는 created, updated, addedToWishList와 같은 이벤트가 존재한다.
- 구인 어플리케이션에서는 JobPosted, AppliedToJob, JobExpired와 같은 이벤트를 볼 수 있을 것이다.
- 이벤트가 속한 도메인에 상관없이, 도메인 이벤트가 생성되고 전파될 때, 어플리케이션의 다른 부분들이 해당 이벤트 이후에 특정 코드를 실행할 수 있는 기회를 제공하게 된다.
  - (특정한 도메인에 상관없이, 도메인 이벤트가 발생하고나면, 그 도메인 이벤트 이후에 특정한 코드를 실행할 기회를 이 도메인 이벤트로부터 얻을 수 있다.)

## Actors, Commands, Events and Subscribtions

- 어플리케이션의 모든 기능을 파악하기 위한 접근법 중의 하나는 actor, command, event, subscription 을 식별하는 것이다.
  - actor : 이 도메인에서 관련된 사람 또는 객체는 누구인가? (작성자, 편집자, 손님, 서버 등등이 될 수 있다.)
  - command : 그들이 할 수 있는 작업은 무엇인가? - CreateUser, DeleteAccount, PostArticle과 같은 작업이 될 수 있다.
  - event : 명령을 과거 시제로 표현한 것 - UserCreated, AccountDeleted, ArticlePosted 등등
  - subscription : 도메인 이벤트가 발생할 때 알림을 받고자 하는 클래스 - AfterUserCreated, AfterAccountDeleted, AfterArticlePosted 등등
- DDD 세계에서는 팀과 함께 이러한 요소들을 발견해나가는 재미있는 활동이 있다. 이것을 이벤트 스토밍이라고 한다. 이것은 비지니스 규칙을 발견하기 위해서 포스트잇을 사용하는 압식이다.

이제 CreateUser를 예시로 들어서 설명해보겠습니다.

## 비지니스 규칙 발견하기

- 익명의 사용자는 누구나 계정을 만들 수 있어야합니다. 따라서, 익명의 사용자가 CreateUser 명령을 실행할 수 있어야 한다는 것입니다.
- 이 명령이 속하는 서브 도메인은 Users 서브도메인이 될 것입니다.
- 그렇다면 UserCreated 이벤트가 생성되고 전파된 이후에 실행하고 싶은 다른 작업들은 무엇일까요?

```ts
import { SlackService } from "../../notification/services/slack";
import { MailchimpService } from "../../marketing/services/mailchimp";
import { SendGridService } from "../../notification/services/email";

class UsersService {
  private sequelizeModels: any;

  constructor(sequelizeModels: any) {
    this.sequelizeModels = sequelizeModels;
  }

  async createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<void> {
    try {
      // 사용자 생성 (여기에는 이것만 있어야 합니다)
      await sequelizeModels.User.create({
        email,
        password,
        firstName,
        lastName,
      });

      // 구독 side effect (Users 서브도메인): 사용자 이름 할당
      // 구독 side effect (Notifications 서브도메인): 슬랙 채널에 알림 전송
      // 구독 side effect (Marketing 서브도메인): 사용자를 메일링 리스트에 추가
      // 구독 side effect (Notifications 서브도메인): 환영 이메일 전송
    } catch (err) {
      console.log(err);
    }
  }
}
```

- 우리가 해야할 일들은 다음과 같습니다.

  - #1 Users 서브도메인 - 사용자 이름 할당
  - #2 Notifications 서브도메인 - 슬랙 채널에 알림 전송
  - #3 Marketing 서브도메인 - 사용자를 메일링 리스트에 추가
  - #4 Notifications 서브도메인 - 환영 이메일 전송

- 서브 도메인을 모놀리식 코드베이스의 모듈로 시각화해보면 대략 다음과 같은 모습이 될 것입니다.

![monolithic-codebase-modules](../../assets/monolithic-codebase-modules.png)

- 결국 여기서 우리가 빠뜨린 것이 있습니다.
- UserCreated 이벤트 후에 사용자에게 사용자 이름을 할당해야 하므로, 시각화는 다음과 같은 모습이 되어야 옳습니다.

![ddd-example-2](../../assets/ddd-example-2.png)
위 그림은 UserCreatedEvent 다음에 다시 Users에 nofify를 하는 그림을 보여주고 있다. 왜냐하면 User의 이름을 다시 할당해주어야하기 때문이다.

## An explicit Domain Event interface(명시적인 도메인 이벤트 인터페이스)

도메인 이벤트가 어떻게 생겼는지 나타내기 위해서는 인터페이스가 필요합니다. 생성된 시간과 애그리게이트 ID를 가져오는 방법을 제외하고는 많이 필요하지 않습니다.

```ts
import { UniqueEntityID } from "../../core/types";

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityID;
}
```

이 인터페이스는 실제로 무언가를 수행하기보다는 의도를 드러내기 위한 인터페이스에 가깝습니다. 혼란스럽고 복잡한 코드를 극복하는 데 절반은 좋은 이름을 사용하는 것이 중요한 부분입니다.

## How to define Domain Events (도메인 이벤트 정의하기)

도메인 이벤트는 일반적인 typescript 객체에 불과합니다. 인터페이스를 구현하는 것이 필요하며, 즉 dateTimeOccurred, getAggregateId 메서드를 구현하는 것이 필요합니다. 그리고 도메인 이벤트를 구독하는 사람들이 알아야 할 유용한 맥락 정보를 제공해야합니다.

- 도메인 이벤트가 가지고 있어야할 것
  - 이벤트가 발생한 시간
  - 이벤트가 발생한 애그리게이트의 ID
  - 이벤트에 대한 맥락 정보

이 예시에서는 User Aggregate를 전달하고 있습니다. 일부는 이를 권장하지 않을 수 있지만, 이 간단한 예시에서는 괜찮습니다.

```ts
import { IDomainEvent } from "../../../../core/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";
import { User } from "../user";

export class UserCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
```

## How to create domain events(도메인 이벤트 발생시키기)

이제부터가 흥미로운 부분입니다. 다음의 클래스는 User Aggregate에 속하는 것입니다.

```ts
import { AggregateRoot } from "../../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { Result } from "../../../core/logic/Result";
import { UserId } from "./userId";
import { UserEmail } from "./userEmail";
import { Guard } from "../../../core/logic/Guard";
import { UserCreatedEvent } from "./events/userCreatedEvent";
import { UserPassword } from "./userPassword";

// User를 생성하려면 이 모든 속성을 전달해야 합니다.
// 비원시 타입은 자체 검증 규칙을 캡슐화하는 값 객체(Value Object)입니다.

interface UserProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  password: UserPassword;
  isEmailVerified: boolean;
  profilePicture?: string;
  googleId?: number;
  facebookId?: number;
  username?: string;
}

// User는 AggregateRoot의 서브클래스입니다.
// AggregateRoot 클래스를 곧 다시 살펴보겠습니다.

export class User extends AggregateRoot<UserProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get userId(): UserId {
    return UserId.caller(this.id);
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get isEmailVerified(): boolean {
    return this.props.isEmailVerified;
  }

  get profilePicture(): string {
    return this.props.profilePicture;
  }

  get googleId(): number {
    return this.props.googleId;
  }

  get facebookId(): number {
    return this.props.facebookId;
  }

  get username(): string {
    return this.props.username;
  }

  set username(value: string) {
    this.props.username = value;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  private static isRegisteringWithGoogle(props: UserProps): boolean {
    return !!props.googleId === true;
  }

  private static isRegisteringWithFacebook(props: UserProps): boolean {
    return !!props.facebookId === true;
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardedProps = [
      { argument: props.firstName, argumentName: "firstName" },
      { argument: props.lastName, argumentName: "lastName" },
      { argument: props.email, argumentName: "email" },
      { argument: props.isEmailVerified, argumentName: "isEmailVerified" },
    ];

    if (
      !this.isRegisteringWithGoogle(props) &&
      !this.isRegisteringWithFacebook(props)
    ) {
      guardedProps.push({ argument: props.password, argumentName: "password" });
    }

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message);
    } else {
      const user = new User(
        {
          ...props,
          username: props.username ? props.username : "",
        },
        id
      );

      const idWasProvided = !!id;

      if (!idWasProvided) {
        user.addDomainEvent(new UserCreated(user));
      }

      return Result.ok<User>(user);
    }
  }
}
```

User를 생성하는 팩토리 메서드를 사용할 때, User가 새로운지(아직 식별자가 없는 경우) 아니면 기존의 데이터에서 다시 불러온 것인지에 따라 UserCreated 도메인 이벤트를 생성합니다.

`user.addDomainEvent(new UserCreated(user));`를 사용할 때 실제로 도메인 이벤트가 생성됩니다.

이 작업을 어떻게 처리하는지를 확인하려면 AggregateRoot 클래스를 살펴보면 됩니다.

## Handling created/raised domain events

이전의 Aggregate와 AggregateRoot 에 대한 대환에서, DDD에서 애그리게이트 루트는 트랜잭션을 수행하기 위해 사용하는 도메인 객체라고 했던 것을 기억할 것입니다.

애그리게이트 루트는 외부에서 참조하여 해당 불변 경계 내에서 무언가를 변경할 수 있는 객체입니다.

즉, 애그리게이트를 변경하려는 트랜잭션(명령, 실행 등) 이 발생할 때마다 해당 객체에서 모든 비지니스 규칙이 충족되었고, 유효한 상태인지 애그리게이트가 확인하는 역할을 합니다.

애그리게이트는 다음과 같이 말할 것입니다.

> 좋아 모든 불변성이 만족되었으니 저장을 진행해도 됩니다. ("Yes, all good! All my invariants are satisfied, you can go ahead and save now.")

혹은

> “아니, 이 애그리게이트에 3개 이상의 장르를 추가할 수는 없습니다. 허용되지 않습니다.”

이제 우리가 살펴봐야할 것은 도메인 이벤트를 어떻게 처리할 것인지에 대한 것입니다.
여기 어그리게이트 루트 클래스가 있습니다.

여기서 주목할 것은 `addDomainEvent (domainEvent: IDomainEvent): void` 메서드입니다.

```ts

import { Entity } from "./Entity";
import { IDomainEvent } from "./events/IDomainEvent";
import { DomainEvents } from "./events/DomainEvents";
import { UniqueEntityID } from "./UniqueEntityID";

// AggregateRoot는 추상 클래스입니다.
// 단독으로 애그리게이트라는 개념은 없고, User, Vinyl 등과 같은 구체적인 것이어야 합니다.

export abstract class AggregateRoot<T> extends Entity<T> {

  // 이 애그리게이트에서 발생한 도메인 이벤트 목록
  private _domainEvents: IDomainEvent[] = [];

  get id(): UniqueEntityID {
    return this._id;
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    // 이 애그리게이트의 도메인 이벤트 목록에 추가
    this._domainEvents.push(domainEvent);

    // DomainEventHandler의 '수정된' 애그리게이트 목록에 이 애그리게이트 인스턴스를 추가
    DomainEvents.markAggregateForDispatch(this);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainEventAdded(domainEvent: IDomainEvent): void {
    ...
  }
}

```

`addDomainEvent` 를 호출할 때 우리는 다음을 수행합니다.

- 이 애그리게이트가 지금까지 발생시킨 이벤트 목록에 해당 도메인 이벤트를 추가하고,
- DomainEvents라는 클래스를 통해 이를 전파 대상으로 표시합니다.

거의 다 왔습니다. 이제 DomainEvents 클래스가 도메인 이벤트를 어떻게 처리하는지 살펴보겠습니다.

## 도메인 이벤트의 핸들러 (DomainEvents 클래스)

이 구현은 조금은 까다롭습니다.

```ts
import { IDomainEvent } from "./IDomainEvent";
import { AggregateRoot } from "../AggregateRoot";
import { UniqueEntityID } from "../UniqueEntityID";

export class DomainEvents {
  private static handlersMap = {};
  private static markedAggregates: AggregateRoot<any>[] = [];

  /**
   * @method markAggregateForDispatch
   * @static
   * @desc 도메인 이벤트를 생성한 애그리게이트 루트 객체들이 호출하는 메서드로,
   * 인프라가 작업 단위를 커밋할 때 전파될 이벤트를 위해 호출됩니다.
   */
  public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  /**
   * @method dispatchAggregateEvents
   * @static
   * @private
   * @desc 이 애그리게이트에서 발생한 모든 도메인 이벤트의 핸들러를 호출합니다.
   */
  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) =>
      this.dispatch(event)
    );
  }

  /**
   * @method removeAggregateFromMarkedDispatchList
   * @static
   * @desc 마크된 리스트에서 애그리게이트를 제거합니다.
   */
  private static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<any>
  ): void {
    const index = this.markedAggregates.findIndex(a => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }

  /**
   * @method findMarkedAggregateByID
   * @static
   * @desc 마크된 애그리게이트 목록에서 특정 ID를 가진 애그리게이트를 찾습니다.
   */
  private static findMarkedAggregateByID(
    id: UniqueEntityID
  ): AggregateRoot<any> {
    let found: AggregateRoot<any> = null;
    for (let aggregate of this.markedAggregates) {
      if (aggregate.id.equals(id)) {
        found = aggregate;
      }
    }
    return found;
  }

  /**
   * @method dispatchEventsForAggregate
   * @static
   * @desc 애그리게이트의 ID만 알고 있을 때, 이 메서드를 호출하여
   * 애그리게이트의 이벤트에 구독된 모든 핸들러를 호출합니다.
   */
  public static dispatchEventsForAggregate(id: UniqueEntityID): void {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  /**
   * @method register
   * @static
   * @desc 도메인 이벤트에 핸들러를 등록합니다.
   */
  public static register(
    callback: (event: IDomainEvent) => void,
    eventClassName: string
  ): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }

  /**
   * @method clearHandlers
   * @static
   * @desc 테스트에 유용합니다.
   */
  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  /**
   * @method clearMarkedAggregates
   * @static
   * @desc 테스트에 유용합니다.
   */
  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  /**
   * @method dispatch
   * @static
   * @desc 특정 도메인 이벤트에 대한 모든 구독자(핸들러)를 호출합니다.
   */
  private static dispatch(event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName];
      for (let handler of handlers) {
        handler(event);
      }
    }
  }
}
```

설명 :

- markAggregateForDispatch : 애그리게이트에서 생성된 도메인 이벤트가 커밋 시점에 전파되도록 애그리게이트를 마크합니다.
- dispatchAggregateEvents : 지정된 애그리게이트에서 발생한 모든 도메인 이벤트의 핸들러를 호출합니다.
- removeAggregateFromMarkedDispatchList : 마크된 리스트에서 애그리게이트를 제거합니다.
- findMarkedAggregateByID : 마크된 애그리게이트 목록에서 특정 ID를 가진 애그리게이트를 찾습니다.
- dispatchEventsForAggregate : 애그리게이트의 ID만 알고 있을 때, 이 메서드를 호출하여 애그리게이트의 이벤트에 구독된 모든 핸들러를 호출합니다.
- register : 도메인 이벤트에 핸들러를 등록합니다.
- clearHandlers : 테스트에 유용합니다.
- clearMarkedAggregates : 테스트에 유용합니다.
- dispatch : 특정 도메인 이벤트에 대한 모든 구독자(핸들러)를 호출합니다.

## 도메인 이벤트 핸들러 등록하는 방법

도메인 이벤트에 핸들러를 등록하기 위해서는 register라는 정적 메서드를 사용합니다.

```ts
export class DomainEvents {
  private static handlersMap = {};
  private static markedAggregates: AggregateRoot<any>[] = [];

  ...

  public static register(
    callback: (event: IDomainEvent) => void,
    eventClassName: string
  ): void {

    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);

  }
  ...

}
```

이 메서드는 콜백함수와 eventClassName을 받습니다.
도메인 이벤트에 대해 핸들러를 등록하면, 이 핸들러는 handlersMap에 추가됩니다.
3개의 다른 도메인 이벤트와 7개의 다른 핸들러가 있는 경우 핸들러 맵의 구조는 다음과 같이 구성될 수 있습니다.

```ts
{
  "UserCreated": [Function, Function, Function],
  "UserEdited": [Function, Function],
  "VinylCreated": [Function, Function]
}
```

## 핸들러 예시

### AfterUserCreated 구독자

Notifications 서브 도메인에서 누군가 가입할 때 Slack 메시지를 보내는 구독자를 설정하고 싶다고 했던 것을 기억하시나요?

다음은 AfterUserCreated 구독자가 Users 서브 도메인의 UserCreated이벤트에 핸들러를 설정하는 예입니다.

```ts
import { IHandle } from "../../../core/domain/events/IHandle";
import { DomainEvents } from "../../../core/domain/events/DomainEvents";
import { UserCreatedEvent } from "../../users/domain/events/userCreatedEvent";
import { NotifySlackChannel } from "../useCases/notifySlackChannel/NotifySlackChannel";
import { User } from "../../users/domain/user";

export class AfterUserCreated implements IHandle<UserCreated> {
  private notifySlackChannel: NotifySlackChannel;

  constructor(notifySlackChannel: NotifySlackChannel) {
    this.setupSubscriptions();
    this.notifySlackChannel = notifySlackChannel;
  }

  setupSubscriptions(): void {
    // 도메인 이벤트에 등록
    DomainEvents.register(this.onUserCreated.bind(this), UserCreated.name);
  }

  private craftSlackMessage(user: User): string {
    return `Hey! Guess who just joined us? => ${user.firstName} ${user.lastName}\n
      Need to reach 'em? Their email is ${user.email}.`;
  }

  // 도메인 이벤트가 전파될 때 호출됩니다.
  private async onUserCreatedEvent(event: UserCreated): Promise<void> {
    const { user } = event;

    try {
      await this.notifySlackChannel.execute({
        channel: "growth",
        message: this.craftSlackMessage(user),
      });
    } catch (err) {}
  }
}
```

이 구조에서 느슨한 결합은 굉장합니다. 도메인 이벤트가 전파될 때 알림이 필요한 객체를 추적하는 책임을 DomainEvents 클래스가 가지며, Users와 Notifications 간의 코드 결합을 제거해줍니다.

## 마이크로서비스

어플리케이션을 논리적으로뿐만 아니라 물리적으로도 분리했을 때는, 서로 다른 서브도메인을 직접 연결하는 것이 불가능해집니다. 나중에 마이크로서비스로 전환하고자 하는 모놀리식 코드베이스를 작업할 때는 이 점을 유념해야합니다. 서브도메인 간의 아키텍처적 경계를 신중히 다루며, 서로에 대해 매우 적게 알고 있어야 합니다.

## 실제 트랜젝션에서의 도메인 이벤트 처리

앞서 도메인 이벤트에 대해 구독자에서 핸들러를 등록하는 방법과 애그리게이트 루트가 도메인 이벤트를 생성하고, DomainEvents 클래스 내의 배열에 보관하는 과정을 설명했습니다.

## 현재 `markedAggregates = [User, Vinyl]`와 같은 구조로 되어 있습니다.

이 시점에서 몇 가지 추가 질문이 생겼습니다.

- 트랜잭션 실패는 어떻게 처리해야 할까요? CreateUser 유스케이스를 실행했지만, 트랜잭션이 성공하기 전에 실패했다면 어떻게 될까요? 도메인 이벤트는 여전히 생성된 것처럼 보입니다. 트랜잭션이 실패 시 구독자에게 이벤트가 전송되지 않도록 하려면 어떻게 해야 할까요? Unit of Work 패턴이 필요할까요?
- 도메인 이벤트가 구독자에게 전송되어야 하는 시점을 결정하는 책임은 누구에게 있을까요? dispatchEventsForAggregate 메서드는 누가 호출할까요?

## 도메인 이벤트의 생성과 전파 분리하기

도메인 이벤트가 생성될 때, 즉시 전파되지는 않습니다. 도메인 이벤트는 애그리게이트에 추가되고, 그 애그리게이트는 DomainEvents 배열에서 마크됩니다.

`DomainEvents` 클래스는 특정 애그리게이트 ID와 일치하는 `markedAggregates` 배열 내의 모든 핸들러가 전파되도록 지시할 때까지 기다립니다. 트랜잭션이 성공했음을 누가 판단하는지가 중요한데, 그 답은 ORM이 역할을 수행한다는 것입니다.

## 성공적인 트랜잭션에 대한 진실의 원천은 ORM에 있다.

많은 ORM에는 데이터베이스에 저장된 이후에 코드를 실행하는 메커니즘이 내장되어있습니다. 예를 들어, Sequilize 문서에는 각 라이프 사이클 이벤트에 대한 훅이 있습니다.

```
(1)
  beforeBulkCreate(instances, options)
  beforeBulkDestroy(options)
  beforeBulkUpdate(options)
(2)
  beforeValidate(instance, options)
(-)
  validate
(3)
  afterValidate(instance, options)
  - or -
  validationFailed(instance, options, error)
(4)
  beforeCreate(instance, options)
  beforeDestroy(instance, options)
  beforeUpdate(instance, options)
  beforeSave(instance, options)
  beforeUpsert(values, options)
(-)
  create
  destroy
  update
(5)
  afterCreate(instance, options)
  afterDestroy(instance, options)
  afterUpdate(instance, options)
  afterSave(instance, options)
  afterUpsert(created, options)
(6)
  afterBulkCreate(instances, options)
  afterBulkDestroy(options)
  afterBulkUpdate(options)
```

이 중에서 우리는 5번에 관심이 있습니다. 타입 orm에서도 비슷하게 엔티티 리스너가 제공됩니다.

```ts
@AfterLoad
@BeforeInsert
@AfterInsert
@BeforeUpdate
@AfterUpdate
@BeforeRemove
@AfterRemove
```

여기서 우리가 관심있는 부분은 주로 후 처리 부분입니다.

예를 들어서, 아래의 CreateUserUseCase에서 트랜잭션이 성공하면, 리포지토리가 User를 생성 또는 업데이트할 수 있는 후에 훅이 호출됩니다.

```ts
import { UseCase } from "../../../../core/domain/UseCase";
import { CreateUserDTO } from "./CreateUserDTO";
import { Either, Result, left, right } from "../../../../core/logic/Result";
import { UserEmail } from "../../domain/userEmail";
import { UserPassword } from "../../domain/userPassword";
import { User } from "../../domain/user";
import { IUserRepo } from "../../repos/userRepo";
import { CreateUserErrors } from "./CreateUserErrors";
import { GenericAppError } from "../../../../core/logic/AppError";

type Response = Either<
  | GenericAppError.UnexpectedError
  | CreateUserErrors.AccountAlreadyExists
  | Result<any>,
  Result<void>
>;

export class CreateUserUseCase
  implements UseCase<CreateUserDTO, Promise<Response>>
{
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(req: CreateUserDTO): Promise<Response> {
    const { firstName, lastName } = req;

    const emailOrError = UserEmail.create(req.email);
    const passwordOrError = UserPassword.create({ value: req.password });

    const combinedPropsResult = Result.combine([emailOrError, passwordOrError]);

    if (combinedPropsResult.isFailure) {
      return left(Result.fail<void>(combinedPropsResult.error)) as Response;
    }

    // 도메인 이벤트가 내부적으로 여기에서 생성됩니다!
    const userOrError = User.create({
      email: emailOrError.getValue(),
      password: passwordOrError.getValue(),
      firstName,
      lastName,
      isEmailVerified: false,
    });

    if (userOrError.isFailure) {
      return left(Result.fail<void>(combinedPropsResult.error)) as Response;
    }

    const user: User = userOrError.getValue();

    const userAlreadyExists = await this.userRepo.exists(user.email);

    if (userAlreadyExists) {
      return left(
        new CreateUserErrors.AccountAlreadyExists(user.email.value)
      ) as Response;
    }

    try {
      // 트랜잭션이 성공하면 afterCreate 또는 afterUpdate 훅이 호출됩니다.

      await this.userRepo.save(user);
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response;
    }

    return right(Result.ok<void>()) as Response;
  }
}
```

## sequlize에서 성공적인 트랜잭션 후킹

Sequelize에서 성공적인 트랜잭션 후킹
Sequelize를 사용하면 모델 이름과 기본 키 필드를 받아 애그리게이트에 대한 이벤트를 전파하는 콜백 함수를 각 훅에 정의할 수 있습니다.

```ts
infra/sequelize/hooks/index.ts
typescript
코드 복사
import models from '../models';
import { DomainEvents } from '../../../core/domain/events/DomainEvents';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';

const dispatchEventsCallback = (model: any, primaryKeyField: string) => {
const aggregateId = new UniqueEntityID(model[primaryKeyField]);
DomainEvents.dispatchEventsForAggregate(aggregateId);
}

(async function createHooksForAggregateRoots () {

const { BaseUser } = models;

BaseUser.addHook('afterCreate', (m: any) => dispatchEventsCallback(m, 'base_user_id'));
BaseUser.addHook('afterDestroy', (m: any) => dispatchEventsCallback(m, 'base_user_id'));
BaseUser.addHook('afterUpdate', (m: any) => dispatchEventsCallback(m, 'base_user_id'));
BaseUser.addHook('afterSave', (m: any) => dispatchEventsCallback(m, 'base_user_id'));
BaseUser.addHook('afterUpsert', (m: any) => dispatchEventsCallback(m, 'base_user_id'));

})();

```

## TypeORM에서 성공적인 트랜잭션 후킹

TypeORM을 사용할 때는 엔티티 리스너 데코레이터를 이용해 같은 기능을 구현할 수 있습니다.

```ts
@Entity()
export class User {
  @AfterUpdate()
  dispatchAggregateEvents() {
    const aggregateId = new UniqueEntityID(this.userId);
    DomainEvents.dispatchEventsForAggregate(aggregateId);
  }
}
```

## 결론

이 글에서 다룬 내용:

서로 다른 서브도메인에 속하는 도메인 로직이 어떻게 결합될 수 있는지
기본 도메인 이벤트 클래스를 생성하는 방법
구독자에게 도메인 이벤트를 알리는 과정을 생성과 전파의 두 단계로 분리하는 방법과 그 이유
인프라 계층에서 ORM을 활용하여 도메인 이벤트의 핸들러 전파를 마무리하는 방법

<br/>

---

## 정리정돈

- 애그리게이트 루트
  - 트랜잭션을 수행하기 위해 사용하는 도메인 객체이다.
  - 애그리게이트를 변경하려는 트랜잭션이 발생할 때마다, 이 변경이 여러 조건들을 충족하는지 확인하는 역할도 한다.

<br/>

---

## 나의 질문

- 만약 특정 이벤트 이후에 연달아서 하고 싶은 일이 없다면 이벤트를 정의하지 않는 것이 좋을까?
  - 예를 들어, 사용자가 생성되었을 때, 사용자 이름을 할당하는 것이 유일한 일이라면, 이벤트를 정의하지 않는 것이 좋을까?
