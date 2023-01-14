# 메시지와 인터페이스

- 객체지향의 오해는 클래스를 사용해야 한다는 것이다.
- 클래스는 도구일 뿐이다.
- 하지만 클래스에 초점을 맞추면 제대로 된 설계를 할 수 없다.

- 제대로 된 설계를 하려면

  - 객체에 초점을 맞춰야 한다.
  - 더 정확히는, 객체의 책임에 초점을 맞춰야 한다.

- 메시지 :

  - 객체지향 어플리케이션의 가장 중요한 재료
  - 객체들이 주고 받는 메시지

- 훌륭한 퍼블릭 인터페이스를 얻기 위해서는
  - 책임주도설계만으로는 부족하다.
  - 유용한 원칙들이 필요하다. 이 장을 통해 알아보자.

## 01 협력과 메시지

### 클라이언트-서버 모델

- 메시지는 객체 사이의 협력을 가능하게 하는 매개체다.
- 클라이언트-서버 모델

  - 두 객체 사이의 협력 관계를 설명하기 위한 전통적인 메타포
  - 협력은 클라이언트가 서버의 서비스를 요청하는 단방향 상호작용이다.

- Movie는 클라이언트와 서버의 역할을 동시에 수행하고 있다.
- 요점은 객체가 독립적으로 수행할 수 있는 것보다 더 큰 책임을 수행하기 위해서는 다른 객체와 협력해야 한다는 것이다.
  - 그리고 이것을 가능하게 하는 것이 메시지다.

요점 :

- 여기서는 클라이언트 서버 모델을 소개하면서 객체는 협력이 필요하다고 말하고 있다.
- 그리고 그 협력을 가능하게 하는 것이 메시지임을 설명하고 있다.
  <br>

### 메시지와 메시지 전송

- 메시지 :
  - 객체들이 협력하기 위해 사용할 수 있는 유일한 의사소통 수단
- 메시지 수신자 :
  - 서버
- 메시지 전송자 :
  - 클라이언트
- 메시지의 구성요소 :
  - 오퍼레이션명과 인자
  - 메시지 전송은 메시지 수신자, 오퍼레이션명, 인자의 조합이다.
- isSatisfiedBy(screening) 이 '메시지'이고, condition.isSatisfiedBy(screening)이 '메시지 전송'이다.

요점 :

- 메시지의 의미에 대해서 알아보고 있다.

<br>

### 메시지와 메서드

- 메시지를 수신했을 때, 실제로 실행되는 함수를 메서드라고 부른다.
- 동일한 메시지를 수신하더라도, 인스턴스의 타입에 따라서 실행되는 메서드는 다를 수 있다.
- 전송자는 수신자가 어떤 타입인지 몰라도 된다.
  - 어떤 방식으로 수신한 데이터를 처리하는지 몰라도 협력이 가능하다.
- 수신자도 누가 메시지를 전송하는지 알 필요 없다.
- 전송자와 수신자는 메시지라는 얇고 가는 끈을 통해 서로 연결된다.

### 퍼블릭 인터페이스와 오퍼레이션

- 객체는 외부에서 볼 때는 검은 장막으로 가려져 있다.
- 그러나 외부에 공개하는 부분이 있다.
  - 의사소통을 위해 외부에 공개하는 메시지의 집합을 퍼블릭 인터페이스라고 한다.
- 오퍼레이션 :
  - 퍼플릭 인터페이스에 포함된 메시지를 오퍼레이션이라고 한다.
  - 오퍼레이션은 수행 가능한 어떤 행동에 대한 추상화다.
  - 흔히 오퍼레이션이라고 부를 때는 내부의 구현 코드는 제외하고 단순히 메시지와 관련된 시그니처를 가리키는 경우가 대부분이다.
  - DiscountCondition 인터페이스에 정의된 isSatisfiedBy 오퍼레이션이 그렇다.
- 메서드 :
  - 그에 비해 메시지를 수신했을 때 실제로 실행되는 코드는 메서드라고 한다.
  - SequenceCondition과 PeriodCondition에 정의된 각각의 isSatisfiedBy는 실제 구현을 포함하기 때문에 메서드라고 부른다.

> UML 용어로 말하자면, 인터페이스의 각 요소는 오퍼레이션이다. 오퍼레이션은 구현이 아닌 추상화다. 반면 UML의 메서드는 오퍼레이션을 구현한 것이다. 인용하면, 메서드는 오퍼레이션에 대한 구현이다. 메서드는 오퍼레이션과 연관된 알고리즘 또는 절차를 명시한다.

### 시그니처

- 시그니처 :
  - 오퍼레이션의 이름과 파라미터 목록을 합쳐 시그니처라고 부른다.
  - 오퍼레이션은 실행없이 시그니처만을 정의한 것이다.
  - 메서드는 이 시그니처에 구현을 더한 것이다.
  - 일반적으로 메시지를 수신하면 오퍼레이션의 시그니처와 동일한 메서드가 실행된다.
- 오퍼레이션 관점에서의 다형성 :
  - 동일한 오퍼레이션 호출에 대해 서로 다른 메서드들이 실행되는 것

---

용어정리 :

- 메시지 :
  - 객체가 다른 객체와 협력하기 위해 사용하는 의사소통 메커니즘.
  - 일반적으로 객체의 오퍼레이션이 실행되도록 요청하는 것을 '메시지 전송'이라고 부른다.
  - 메시지는 협력에 참여하는 전송자와 수신자 양쪽 모두를 포함하는 개념이다.
- 오퍼레이션 :
  - 객체가 다른 객체에게 제공하는 추상적인 서비스다.
  - 메시지는 전송자와 수신자 사이의 협력 관계를 강조하는데 비해, 오퍼레이션은 메시지를 수신하는 객체의 인터페이스를 강조한다.
  - 다시 말해서 메시지 전송자는 고려하지 않은 채 <u>메시지 수신자의 관점만</u>을 다룬다.
  - 메시지 수신이란 메시지에 대응되는 객체의 오퍼레이션을 호출하는 것을 의미한다.
- 메서드 :
  - 메시지에 응답하기 위해 실행되는 코드 블록을 메서드라고 부른다. 메서드는 오퍼레이션의 구현이다. 동일한 오퍼레이션이라고 해도 메서드는 다를 수 있다. 오퍼레이션과 메서드의 구분은 다형성의 개념과 연결된다.
- 퍼블릭 인터페이스 :
  - 객체가 협력에 참여하기 위해 외부에서 수신할 수 있는 메시지의 묶음.
- 시그니처 :
  - 시그니처는 오퍼레이션이나 메서드의 명세를 나타낸 것으로, 이름과 인자의 목록을 포함한다.

<br>

## 02 인터페이스와 설계 품질

- 좋은 인터페이스 :
  - 최소한의 인터페이스 & 추상적인 인터페이스
- 최소한의 인터페이스 :
  - 꼭 필요한 오퍼레이션만을 포함한다.
- 추상적인 인터페이스 :

  - 어떻게 수행하는지가 아니라, 무엇을 하는지 표현한다.

- 퍼블릭 인터페이스의 품질에 영향을 미치는 원칙과 기법 :
  - 디미터 법칙
  - 묻지 말고 시켜라
  - 의도를 드러내는 인터페이스
  - 명령-쿼리 분리

### 디미터 법칙

- 협력하는 객체의 내부 구조에 대한 결합으로 인해 발생하는 설계 문제를 해결하기 위해 제안된 원칙이 바로 디미터 법칙이다.
- 디미터 법칙 요약 :
  - 객체의 내부 구조에 강하게 결합되지 않도록 협력 경로를 제한하라
  - 낯선 자에게 말하지 말라
  - 오직 인접한 이웃하고만 말하라
- 디미터 법칙을 따르는 방법 :
  - 클래스가 특정한 조건을 만족하는 대상에게만 메시지를 전송하도록 프로그래밍해야 한다.
- 특정 클래스 내부의 메서드가 메시지를 전송할 수 있도록 만족하는 조건요소들 :

  - this 객체
  - 메서드의 매개변수
  - this의 속성
  - this의 속성인 컬렉션의 요소
  - 메서드 내에서 생성된 지역 객체

- 부끄럽타는 코드(shy code) :
  - 디미터의 법칙을 사용하면 부끄럼타는 코드를 작성할 수 있다.
  - 불필요한 어떤 것도 다른 객체에게 보여주지 않으며, 다른 객체의 구현에 의존하지 않는 코드를 말한다.
- 디미터의 법칙을 따르는 코드
  - 메시지 수신자의 내부 구조가 전송자에게 노출되지 않는다.(Screening)
  - 메시지 전송자는 수신자의 내부 구현에 결합되지 않는다.(Reservation)
  - 따라서 클라이언트와 서버 사이에 낮은 결합도를 유지할 수 있다.

> 디미터 법칙과 캡슐화
>
> > 디미터 법칙은 캡슐화를 다른 관점에서 표현한 것이다. 이 법칙이 가치있는 것은 구체적인 지침을 제공해준다는 것이다. 캡슐하는 '감춰라'라고 한다면, 디미터는 특정 요소에 '접근하지마라'라고 한다.

```java
screening().getMovie().getDiscountConditions()
```

- 이 코드는 디미터의 법칙을 위반한다.
- 현재 코드는 메시지 전송자가 수신자의 내부 구조에 대해 물어보고 있다.
  - 그리고 반환받은 요소에 대해 연쇄적으로 메시지를 전송한다.
  - 이와 같은 코드를 기차 충돌이라고 한다.
    - 기차충돌은 클래스의 내부 구현이 외부로 노출되었을 때 나타나는 전형적인 형태다.

```java
screening.calculateFee(audienceCount);
```

- 이 코드는 디미터의 법칙을 따른다.
- 메시지 전송자는 더 이상 메시지 수신자의 내부 구조에 관해 묻지 않는다.
  - 단지 자신이 원하는 것이 무엇인지를 명시하고 단순히 수행하도록 요청한다.
- 디미터 법칙은 객체가 자기 자신을 책임지는 자율적인 존재여야 한다는 사실을 강조한다.
- 디미터 법칙의 속삭임 :
  - 더 좋은 메시지가 뭔지 알려줄까?
    - 객체의 내부 구조를 묻는 메시지가 아니라 수신자에게 무언가를 시키는 메시지가 더 좋은 메시지다.

<br>

### 묻지 말고 시켜라

- 메시지 전송자는 메시지 수신자의 상태를 변경시켜서는 안된다.
- 묻지 말고 시켜라 원칙 :
  - 이 원칙을 따르면
    - 밀접하게 연관된 정보와 행동을 함께 가지는 객체를 만들 수 있다.
    - 객체의 정보를 이용하는 행동을 객체의 내부에 위치시킨다.
    - 자연스럽게 정보 전문가 패턴을 따르게 된다.
- 위험징후 :
  - 내부의 상태를 묻는 오퍼레이션을 인터페이스에 포함시키고 있는가?
  - 더 나은 방법은 없는가?
- 해결책 :
  - 상태를 묻는 오퍼레이션을 행동을 요청하는 오퍼레이션으로 대체하라.
  - 묻지 말고 시켜라
- 훌륭한 인터페이스 :
  - 객체가 어떻게 작업을 수행하는지 노출해서는 안 된다.
  - 객체가 어떻게 하는지가 아니라 무엇을 하는지를 서술해야 한다.

<br>

### 의도를 드러내는 인터페이스

- 메서드를 명명하는 2가지 방법 :
  - 메서드가 작업을 어떻게 수행하는지를 나타내도록 이름을 짓는 것
  - 어떻게가 아니라 무엇을 하는지를 드러낼 것

```java
public class PeriodCondition {
    public boolean isSatisfiedByPeriod(Screening screening){...}
}

public class SequenceCondition {
    public boolean isSatisfiedBySequence(Screening screening){...}
}
```

- 이런 스타일은 좋지 않다. 2가지 이유가 있다.

  - 메서드에 대해 제대로 커뮤니케이션 할 수 없다.
    - 메서드의 이름이 다르기 때문에 두 메서드의 내부 구현을 정확하게 이해하지 못하면 두 메서드가 동일한 작업을 수행한다는 사실을 이해하기 어렵다.
  - 메서드 수준에서 캡슐화를 위반한다.
    - 메서드들은 클라이언트로 하여금 협력하는 객체의 종류를 알도록 강요한다.

- 메서드를 명명하는 2가지 방법 :

  - 메서드가 작업을 어떻게 수행하는지를 나타내도록 이름을 짓는 것
  - 어떻게가 아니라 무엇을 하는지를 드러낼 것

- 이름 짓는 방법 :

  - 무엇을 하는지를 드러내도록 메서드의 이름을 짓기 위해서는 객체가 협력 안에서 수행해야 하는 책임에 관해 고민해야 한다.
  - 이 물음에 답하기 위해서는 클라이언트 관점에서 협력을 바라봐야 한다.
  - 따라서 두 메서드 모두 클라이언트의 의도를 담을 수 있도록 isSatisfiedBy로 변경하는 것이 적절할 것이다.

- 무엇을 하는지 드러내는 메서드 이름 :
  - 설계를 유연하게 만든다.
  - 이런 이름을 짓기 위해서는 객체가 협력 안에서 수행해야 하는 책임에 관해 고민해야 한다.
- 어떻게 수행하는지를 드러내는 이름 :
  - 내부 구현을 드러낸다.

```java
public class PeriodCondition {
    public boolean isSatisfiedBy(Screening screening){...}
}

public class SequenceCondition {
    public boolean isSatisfiedBy(Screening screening){...}
}
```

두 메서드를 가진 객체를 동일한 타입으로 간주하도록 타입 계층으로 묶어줘야 한다.

```java
public interface DiscountCondition{
  boolean isSatisfiedBy (Screening screening);
}
```

```java
public class PeriodCondition implements DiscountCondition{
  public boolean isSatisfiedBy(Screening screening){...}
}

public class SequenceCondition implements DiscountCondition{
  public boolean isSatisfiedBy(Screening screening){...}
}
```

- 메서드의 이름을 무엇을 하느냐에 초점을 맞추면 클라이언트의 관점에서 동일한 작업을 하는 메서드들을 하나의 타입 계층으로 묶을 수 있다.
- 의도를 드러내는 선택자
  - 어떻게 하느냐가 아닌 무엇을 하느냐를 드러내는 이름.

> 하나의 구현을 가진 메시지의 이름을 일반화하도록 도와주는 간단한 훈련방법을 소개하겠다. 매우 다른 두 번째 구현을 상상하라. 그러고는 해당 메서드에 동일한 이름을 붙인다고 상상해보라. 그렇게 하면 아마도 그 순간에 여러분이 할 수 있는 한 가장 추상적인 이름을 메서드에 붙일 것이다.

- 의도를 드러내는 선택자 -> 의도를 드러내는 인터페이스
  - 구현과 관련된 모든 정보를 캡슐화하고 객체의 퍼블릭 인터페이스에는 협력과 관련된 의도만을 표현해야 한다는 것.
  - 수행방법에 관해서는 언급하지 말고 결과와 목적만을 포함하도록 클래스와 오퍼레이션의 이름을 부여하라.
  - 나의 생각 : 의도를 드러내는 인터페이스 원칙은 선언적 프로그래밍과 비슷하다는 생각이 든다.

<br>

### 함께 모으기

- 앞서 이야기한 원칙을 어기는 코드를 살펴보는 것이 이해에 도움이 된다.

```java
public class Theater {
  private TicketSeller ticketSeller;

  public Theater(TicketSeller ticketSeller) {
    this.ticketSeller = ticketSeller;
  }

  public void enter(Audience audience) {
    if(audience.getBag().hasInvitation()){
      Ticket ticket = ticketSeller.getTicketOffice().getTicket(); // -> 디미터의 법칙을 위반
      audience.getBag().setTicket(ticket); // audience가 bag을 가지고 있다는 것은 내부 구현에 속한다.
    }else{
      Ticket ticket = ticketSeller.getTicketOffice().getTicket();
      audience.getBag().minusAmount(ticket.getFee()); // -> 디미터의 법칙을 위반
      ticketSeller.getTicketOffice().plusAmount(ticket.getFee());
      audience.getBag().setTicket(ticket);
    }
  }
}
```

- 근본적으로 디미터의 법칙을 위반하는 설계는 인터페이스와 구현의 분리 원칙을 위반한다.
  - 디미터의 법칙을 위반했다는 것은 내부 구현에 대해서 묻고 있다는 것이다.
- audience :
  - audience가 bag을 가지고 있다는 것은 내부 구현에 속한다.
  - 퍼블릭 인터페이스가 bag을 노출시켜버린 audience
  - 디미터의 법칙을 위반하고 있다. 클라이언트가 내부 구조를 물을 수 있도록 만들어버렸다.
- 디미터의 법칙을 위반하면 사용하기도 어렵다.

  - 클라이언트가 사용하기 위해서 audience의 내부구조까지 속속들이 알고 있어야 하기 때문이다.

- 이런 코드를 수정하는 방법 :
  - Audience가 자신의 책임을 직접 수행하도록 시키는 것
  - Theater는 TicketSeller 와 Audience에게 원하는 작업을 시켜야한다.
    - 내부 구조에 관해서 묻지 말고.
    - 따라서 TicketSeller와 Audience는 이것을 위한 퍼블릭 인터페이스를 갖춰야한다.

```java
public class TicketSeller {
  public void setTicket(Audience audience){
    if(audience.getBag().hasInvitaion()){
      Ticket ticket = ticketOffice.getTicket();
      audience.getBag().setTicket(ticket);
    }else{
      Ticket ticket = ticketOffice.getTicket();
      audience.getBag().minusAmount(ticket.getFee());
      ticketOffice.plusAmount(ticket.getFee());
      audience.getBag().setTicket(ticket);
    }
  }
}
```

TicketSeller가 setTicket 메서드를 가지게 되었고,
기존의 enter 메서드의 로직을 setTicket 안으로 넣어주었다.

```java
public class Theater{
  public void enter(Audience audience){
    ticketSeller.setTicket(audience);
  }
}
```

이제 Theater는 TicketSeller에게 메시지만 전송하게 되었다.  
Audience도 스스로 일하게 만들어보자.

```java
public class Audience {
  public Long setTicket(Ticket ticket){
    if(bag.hasInvitaion()){
      bag.setTicket(ticket);
      return OL;
    }else{
      bag.setTicket(ticket);
      bag.minusAmount(ticket.getFee());
      return ticket.getFee();
    }
  }
}
```

수정된 Audience에 따라 TicketSeller를 수정해보자

```java
public class TicketSeller{
  public void setTicket(Audience audience){
    ticketOffice.plusAmount(audience.setTicket(ticketOffice.getTicket()));
  }
}
```

이제 TicketSeller는 디미터의 법칙을 위반하지 않게 되었다.  
그런데 Audience를 보면 Bag이 스스로 일하지 않고 있다.  
Audience를 수정하기 위해 setTicket의 구현을 Bag으로 이동시키자.

```java
public class Bag{
  public Long setTicket(Ticket ticket){
    if(hasInvitaion()){
      this.ticket = ticket;
      return OL
    }else{
      this.ticket = ticket;
      minusAmount(ticket.getFee());
      return ticket.getFee();
    }
  }

  private boolean hasInvitation(){
    return invitation != null;
  }

  private void minusAmount(Long amount){
    this.amount -= amount;
  }
}
```

이제 Audience는 Bag에게 묻지 않고 시킬 수 있게 되었다.  
디미터의 법칙을 준수할 수 있게 된 것이다.

```java
public class Audience{
  public Long setTicket(Ticket ticket){
    return bag.setTicket(ticket);
  }
}
```

Audience는 스스로 자신의 상태를 제어하게 되었다.

- 디미터의 법칙과 묻지말고 시켜라 스타일을 따르면
  - 자연스럽게 자율적인 객체로 구성된 유연한 협력을 얻게 된다.
  - 책임이 잘못된 곳에 할당될 확률이 낮아진다.
  - 객체의 응집도가 높아진다.

하지만 !

- 인터페이스가 클라이언트의 의도를 명확히 드러냈는지는 별개의 이야기다.

  - 이것을 확인해야 한다.

- Theater가 TicketSeller에게 setTicket 메시지를 전송해서 얻고 싶었던 결과는 무엇인가?
  - Audience에게 티켓을 판매하는 것이었다. -> sellTo로 바꾸는 것이 더 명확하다.
- TicketSeller가 Audience에게 setTicket 메시지를 전송하는 이유는 무엇인가?
  - Audience가 티켓을 사도록 만드는 것이 목적이었다. -> buy로 바꾸자.
- Audience가 Bag에게 setTicket 메시지를 전송하면서 의도한 것은 무엇인가?
  - 티켓을 보관하는 것이었다. -> hold로 바꾸자.

```java
public class TicketSeller{
  public void sellTo(Audience audience){...}
}

public class Audience {
  public Long buy(Ticket ticket){...}
}

public class Bag {
  public Long hold(Ticket ticket){...}
}
```

- sellTo, buy, hold는 클라이언트가 객체에게 무엇을 원하는지 명확하게 표현한다.
- 디미터의 법칙을 준수함으로써 캡슐화를 시킬 수 있다.
- 캡슐화를 하고 나면 인터페이스의 의미가 분명하지 않을 것을 발견할 수 있다.
- 그러면 의도를 명확하게 드러내도록 퍼블릭 인터페이스의 네이밍을 변경해줘야 한다.

> 정보 은닉 말고도 "묻지 말고 시켜라"스타일에는 좀 더 미묘한 이점이 있다. 이 스타일은 객체 간의 상호작용을 getter의 체인 속에 암시적으로 두지 않고 좀 더 명시적으로 만들고 이름을 가지도록 강요한다.

## 03 원칙의 함정

- 원칙에는 예외가 넘쳐난다.
- 설계는 트레이드 오프의 산물이라는 것을 잊지 말자.
- 원칙이 현재 상황에 부적합하다고 생각된다면, 과감하게 원칙을 무시하면 된다.
  - 원칙을 아는 것보다 중요한 것은 언제 원칙이 유용하고 언제 유용하지 않은지를 판단하 수 있는 능력을 기르는 것이다.
- 이 장에서는 이런 트레이드오프의 능력을 기르기 위한 방법을 배워볼 것이다.
  - 고려해볼 만한 몇 가지 이슈를 살펴봐야 한다.

### 디미터 법칙은 하나의 도트(.)를 강제하는 규칙이 아니다

- 디미터 법칙은 "오직 하나의 도트만을 사용하라" 라는 말로 요약되기도 한다.
  - 이는 오해다.
  - 디미터의 법칙은 결합도와 관련된 것이다.
    - 결합도가 문제가 되는 것은 객체의 내부 구조가 외부로 노출되는 경우로 한정된다.
- 하나의 도트(.)를 사용하는 모든 케이스가 디미터 법칙 위반인 것은 아니다.
  - 내부 구현에 대한 어떤 정보도 외부로 노출하지 않는다면 그것은 디미터 법칙을 준수한 것이다.
- 따라서 우리가 해야할 질문은 다음과 같다.
  - "과연 여러개의 도트를 사용한 코드가 객체의 내부 구조를 노출하고 있는가?"

<br>

- 기억해야 할 것은 법칙은 존재하지 않는다는 것.
  - 원칙이 적절한 상황과 부적절한 상황을 판단할 수 있는 안목을 기르는 것이 중요하다.
  - 설계는 트레이드오프의 산물이다.

<br>

## 04 명령-쿼리 분리 원칙

- 가끔씩은 묻는 것이 필요할 때가 있다.
- 명령-쿼리 분리의 원칙이라는 것이 있다.
  - 퍼블릭 인터페이스에 오퍼레이션을 정의할 때 참고할 수 있는 지침을 제공한다.
- 루틴 :
  - 어떤 절차를 묶어 호출 가능하도록 이름을 부여한 기능 모듈.
  - 루틴은 다시 프로시저와 함수로 구분할 수 있다.
    - 프로시저 : 정해진 절차에 따라 내부의 상태를 변경하는 루틴의 한 종류
      - 부수효과를 발생시킬 수 있지만 값을 반환할 수는 없다.
    - 함수 : 어떤 절차에 따라 필요한 값을 계산해서 반환하는 루틴의 한 종류
      - 값을 반환할 수는 있지만 부수효과를 발생시킬 수 없다.
- 명령과 쿼리 :
  - 객체의 인터페이스 측면에서 프로시저와 함수를 부르는 또 다른 이름.
  - 명령 :
    - 객체의 상태를 수정하는 오퍼레이션
    - 프로시저와 동일
  - 쿼리 :
    - 객체와 관련된 정보를 반환하는 오퍼레이션
    - 함수와 동일
- 명령-쿼리 분리 원칙의 요지 :
  - 오퍼레이션은 부수효과를 발생시키는 명령이거나
  - 부수효과를 발생시키지 않는 쿼리이거나
  - 둘 중 하나여야 한다.
  - 둘 다 일수는 없다.
- 고로 다음과 같은 규칙을 따라야 한다.
  - 객체의 상태를 변경하는 명령은 반환값을 가질 수 없다.
  - 객체의 정보를 반환하는 쿼리는 상태를 변경할 수 없다.

> 부수효과를 발생시키지 않는 것만을 함수로 제한함으로써 소프트웨어에서 말하는 '함수'의 개념이 일반 수학에서의 개념과 상충되지 않게 한다. 객체를 변경하지만 직접적으로 값을 반환하지 않는 명령과 객체에 대한 정보를 반환하지만 변경하지 않는 쿼리 간의 명확한 구분을 유지할 것이다.

- 기계 메타포 :
  - 객체는 블랙박스
  - 객체의 인터페이스는 디스플레이와 버튼
    - 디스플레이는 객체의 상태를 보여줌
    - 버튼은 객체의 상태를 변경시킴
- 마틴 파울러 :
  - 명령 - 쿼리 인터페이스라고 부름.
- 명령과 쿼리를 분리해서 얻게 되는 장점은 무엇일까?
  - 코드로 알아보자

<br>

### 반복 일정의 명령과 쿼리 분리하기

- 자연은 반복되는 다양한 현상으로 이루어져있다.

  - 반복되는 일정을 관리할 방법을 찾는 인간들.

- isSatisfied가 원하는대로 동작하지 않는 상황.
  - isSatisfied를 분석해보자.

```java
public class Event{
  public boolean isSatisfied(RecurringSchedule schedule){
    if(from.getDayOfWeek() != schedule.getDayOfWeek() ||
    !from.toLocalTime().equals(schedule.getFrom() ||
    !duration.equals(schedule.getDuration()))
    reschedule(schedule);
    return false;
  }
  return true;
}
```

- reschedule 메서드를 호출하고 있다. 안타깝게도 이 메서드는 Event 객체의 상태를 수정한다.

```java
public class Event{
  private void reschedule(RecurringSchedule schedule){
    from = LocalDateTime.of(from.toLocalDate().plusDays(daysDistance(schedule)),
    schedule.getFrom());
    duration = schedule.getDuration();
  }
  private long daysDistance(RecurringSchedule schedule){
    return schedule.getDayOfWeek().getValue() - from.getDayOfWeek().getValue();
  }
}
```

- 버그를 찾기 어려웠던 이유는 isSatisfied가 명령과 쿼리의 두 가지 역할을 동시에 수행하고 있었기 때문이었다.

  - isSatisfied메서드는 Event가 RecurringSchedule의 조건에 부합하느지를 판단한 후 부합할 경우 true를, 부합하지 않을 경우 false를 반환한다. 따라서 isSatisfied 메서드는 개념적으로 쿼리다.
  - isSatisfied메서드는 Event가 RecurringSchedule의 조건에 부합하지 않을 경우 Event의 상태를 조건에 부합하도록 변경한다. 따라서 isSatisfied는 실제로는 부수효과를 가지는 명령이다.

- 명령과 쿼리르 뒤섞으면 실행 결과를 예측하기가 어려워질 수 있다.
- 깔끔한 해결책은 명령과 쿼리를 명확하게 분리하는 것이다.

```java
public class Event{
  public boolean isSatisfied(RecurringSchedule schedule){
    if(from.getDayOfWeek() != schedule.getDayOfWeek() ||
    !from.toLocalTime().equals(schedule.getFrom() ||
    !duration.equals(schedule.getDuration()))){
      return false;
    }
    return true
  }

    private void reschedule(RecurringSchedule schedule){
    from = LocalDateTime.of(from.toLocalDate().plusDays(daysDistance(schedule)),
    schedule.getFrom());
    duration = schedule.getDuration();
  }

}
```

- 수정 후의 isSatisfied 메서드는 부수효과를 가지지 않게 되었다.

  - 순수한 쿼리가 되었다.

- reschedule은 순수한 명령이 되었다.

```java
public class Event{
  public boolean isSatisfied(){...}
  public void reschedule(){...}
}
```

- 부수효과를 가지는 대신 값을 반환하지 않는 명령
- 부수효과를 가지지 않는 대신 값을 반환하는 쿼리
- 이렇게 두가지로 분리하여 사용하기

### 명령-쿼리 분리와 참조 투명성

- 명령과 쿼리를 분류하는 것의 이점
  - 객체의 부수효과를 제어하기가 수월해진다.
- 참조 투명성
- 부수효과
  - 컴퓨터의 세계와 수학의 세계를 나누는 가장 큰 특징
  - 수학의 경우 x 값을 초기화한 후 값을 변경하는 것이 불가능하지만,
  - 프로그램에서는 대입문을 이용해 다른 값으로 변경하는 것이 가능하다.
  - 함수는 내부에 부수효과를 포함할 경우 동일한 인자를 전달하더라도 부수효과에 의해 그 결괏값이 매번 달라질 수 있다.
- 참조투명성
  - 어떤 표현식 e가 있을 때 e의 값으로 e가 나타나는 모든 위치를 교체하더라도 결과가 달라지지 않는 특성을 의미한다.
  - 수학은 참조 투명성을 엄격하게 준수하는 가장 유명한 체계.
- 불변성
  - 어떤 값이 변하지 않는 성질
  - 수학에서 f(1)의 값은 항상 변하지 않는다.
- 수학에서의 함수

  - 어떤 값도 변경하지 않기 때문에 부수효과가 존재하지 않는다.

- 객체지향 패러다임의 균열
  - 객체의 상태 변경이라는 부수효과를 기반으로 하기 때문에
  - 하지만
    - 명령-쿼리 분리 원칙을 사용하면 이 균열을 줄일 수 있다.

<br>

### 책임에 초점을 맞춰라

- 디미터 법칙, 묻지말고 시켜라 스타일을 모두 만족하는 쉬운 방법 :

  - 메시지를 선택하고 메시지를 처리할 객체를 선택하라.

- 메시지를 먼저 선택할 때

  - 디미터의 법칙 : 협력이라는 컨텍스트 안에서 객체보다 메시지를 먼저 결정하면 두 객체 사이의 구조적인 결합도를 낮출 수 있다. 수신할 객체를 알지 못한 상태에서 메시지를 먼저 선택하기 때문에 객체의 내부 구조에 대해 고민할 필요가 없어진다. 따라서 메시지가 객체를 선택하게 함으로써 의도적으로 디미터 법칙을 위반할 위험을 최소화할 수 있다.
  - 묻지 말고 시켜라 : 메시지를 먼저 선택하면 묻지 말고 시켜라 스타일에 따라 협력을 구조화하게 된다. 클라이언트의 관점에서 메시지를 선택하기 때문에 필요한 정보를 물을 필요 없이 원하는 것을 표현한 메시지를 전송하면 된다.
  - 의도를 드러내는 인터페이스 : 메시지를 먼저 선택한다는 것은 메시지를 전송하는 클라이언트의 관점에서 메시지의 이름을 정한다는 것이다. 당연히 그 이름에는 클라이언트가 무엇을 원하는지, 그 의도가 분명하게 드러날 수 밖에 없다.
  - 명령-쿼리 분리 원칙 : 협력 속에서 예측하고 이해하기 쉽게 만들기 위한 방법을 고민할 것이다. 따라서 예측 가능한 협력을 만들기 위해 명령과 쿼리를 분리하게 될 것이다.

- 계약에 의한 설계 :
  - 협력을 위해 클라이언트와 서버가 준수해야 하는 제약을 코드 상에 명시적으로 표현하고 강제할 수 있는 방법
