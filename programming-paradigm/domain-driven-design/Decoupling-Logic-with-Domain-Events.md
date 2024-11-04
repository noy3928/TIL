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

### 도메인 이벤트란?

- 모든 비지니스에는 중요한 핵심 이벤트들이 있다.
- 바이닐이라는 서비스에는 created, updated, addedToWishList와 같은 이벤트가 존재한다.
- 구인 어플리케이션에서는 JobPosted, AppliedToJob, JobExpired와 같은 이벤트를 볼 수 있을 것이다.
- 이벤트가 속한 도메인에 상관없이, 도메인 이벤트가 생성되고 전파될 때, 어플리케이션의 다른 부분들이 해당 이벤트 이후에 특정 코드를 실행할 수 있는 기회를 제공하게 된다.
  - (특정한 도메인에 상관없이, 도메인 이벤트가 발생하고나면, 그 도메인 이벤트 이후에 특정한 코드를 실행할 기회를 이 도메인 이벤트로부터 얻을 수 있다.)

### Actors, Commands, Events and Subscribtions

- 어플리케이션의 모든 기능을 파악하기 위한 접근법 중의 하나는 actor, command, event, subscription 을 식별하는 것이다.
  - actor : 이 도메인에서 관련된 사람 또는 객체는 누구인가? (작성자, 편집자, 손님, 서버 등등이 될 수 있다.)
  - command : 그들이 할 수 있는 작업은 무엇인가? - CreateUser, DeleteAccount, PostArticle과 같은 작업이 될 수 있다.
  - event : 명령을 과거 시제로 표현한 것 - UserCreated, AccountDeleted, ArticlePosted 등등
  - subscription : 도메인 이벤트가 발생할 때 알림을 받고자 하는 클래스 - AfterUserCreated, AfterAccountDeleted, AfterArticlePosted 등등
- DDD 세계에서는 팀과 함께 이러한 요소들을 발견해나가는 재미있는 활동이 있다. 이것을 이벤트 스토밍이라고 한다. 이것은 비지니스 규칙을 발견하기 위해서 포스트잇을 사용하는 압식이다.
