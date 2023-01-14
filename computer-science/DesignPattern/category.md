디자인 패턴도 크게 3가지 패턴으로 분류될 수 있다.

# creational pattern

Creational design patterns provide various object creation mechanisms, which increase flexibility and reuse of existing code.

- 이 패턴의 주된 목적은 객체를 생성하는 것이다. 이것은 특정한 케이스에 사용될 객체를 만드는 것을 다루고있으며, 그것을 만드는 로직은 감춰버린다는 특성을 가지고 있다.
- 이것들은 단지 인터페이스만 우리에게 드러낸다.
- 요약하자면 우리는 특정 상황을 위한 객체를 만들고, 인터페이스를 제공해줌으로써 그것을 이용할 수 있다.
- 아래에 소개된 5가지 패턴은 이 패턴에 대해서 잘 알려진 것들이다.
  참고 : [How JavaScript works: Creational, Structural, and Behavioural design patterns + 4 best practices](https://blog.sessionstack.com/how-javascript-works-creational-structural-and-behavioural-design-patterns-4-best-practices-2e8beeba744c)

  ***

- 소프트웨어 엔지니어링에서, creational pattern은 객체를 만드는 패턴과 연관되어있다.
- 특정 상황에 적합하게 객체를 만드는 방법을 시도한다.
- 객체를 만드는 기본적인 형식은 설계상의 문제나, 설계의 복잡성을 증가시킬 수 있다.
- creational 패턴은 이런 문제들을 해결한다. 객체 생성을 어떻게든 컨트롤 함으로써.
- 이 패턴들은 두가지 아이디어에 의해서 구성된다.

1. 시스템이 사용하는 특정한 클래스에 대한 지식을 캡슐화하는 것이다.
2. 특정 객체가 어떻게 만들어지고 결합되는지를 감추는 것.

참고 : [Design Pattern Course](https://www.gofpatterns.com/creational/index.php)

---

- 특정 상황에서 사용되는 객체 생성 메커니즘을 다루는 패턴.
- 객체를 생성하는 기본적인 방법으로는 설계상의 문제나 코드 베이스의 복잡성을 야기할 수 있기 때문에 만들어진 패턴.

### 종류

- factory pattern : 클래스가 인스턴스화 하는 것을 하위 클래스에게 미룰 수 있는 패턴.
- abstract pattern : 구체적인 세부사항은 드러내지 않고, 인터페이스만 공개하는 방식으로 객체를 생성하는 패턴.
- builder pattern : 복잡한 객체의 생성을 여러 단계로 나누는 것이다. 그래서 객체를 생성하는 각각의 과정이 분명하게 드러날 수 있도록 하는 패턴.
- prototype pattern : 프로토타입 인스턴스를 사용하여 만들 객체의 종류를 지정하고 이 프로토타입을 복제하여 새 객체를 만든다.
- singleton pattern : 하나의 클래스는 하나의 인스턴스를 가지도록 보장하고, 전역에서 접근할 수 있도록 하는 패턴.

# structural pattern

Structural design patterns explain how to assemble objects and classes into larger structures, while keeping these structures flexible and efficient.

- 이 카테고리의 패턴들은 entity들의 관계에 신경을 쓰는 패턴들이다. 이 패턴들은 클래스와 객체의 합성을 다루고 있는데, 그것이 의미하는바는 특정 객체가 새로운 기능을 추가하기 위해서 다른 클래스 안에서 사용될 수도 있다는 말이기도 하다. 이런 합성 관계가 상속을 위한 뭔가를 한다는 말인데, 그 상속에서 클래스는 현존하는 클래스의 멤버들을 상속해온다. 두가지 메인 단어가 있다면 합성과 상속이다.

- 요약하자면, 이 패턴에서는 클래스를 만들고, 그것들 사이의 관계를 찾아내고, 그리고 합성을 통해서 그 관계를 만들어낸다.
- 조금 더 상세한 설명을 위해서, 어뎁터 패턴을 설명해보겠다.

\*더 찾아봐야 할 내용 : 합성과 상속이란 무엇인가? entity란 무엇인가? 이 두 단어를 이해하는 것이 중요할 것 같다. 객체 지향에 대한 개념을 조금 더 찾아볼 것.

참고 : [How JavaScript works: Creational, Structural, and Behavioural design patterns + 4 best practices](https://blog.sessionstack.com/how-javascript-works-creational-structural-and-behavioural-design-patterns-4-best-practices-2e8beeba744c)

- 엔티티 간의 관계를 실현하는 간단한 방법을 식별함으로써 설계를 용이하게 하는 설계 패턴
- 이 패턴은 기존에 존재하는 기능을 결합하기 위한 패턴이다.

---

- 구조적 설계 패턴은 실체 간의 관계를 실현하는 간단한 방법을 식별함으로써 설계를 용이하게 하거나 객체 간의 관계를 만드는 방법을 정의하는 설계 패턴이다.

### 종류

- adapter pattern : 클라이언트가 기대하는 하나의 인터페이스로 조정한다.
- bridge pattern : 추상화를 구현에서 분리하여 두 가지가 독립적으로 변할 수 있도록 합니다.
- composite pattern : 모든 객체가 동일한 인터페이스를 갖는 객체의 트리 구조
- decorator pattern : 하위 분류로 인해 새 클래스가 기하급수적으로 증가하는 런타임에 클래스에 기능을 추가하는 패턴
- facade pattern : 기존 인터페이스의 단순화된 인터페이스를 생성하여 일반적인 작업에 쉽게 사용 가능하게 하는 패턴
- flyweight pattern : 공간을 절약하기 위해 많은 수의 개체가 공통 속성 개체를 공유하는 패턴
- proxy pattern : 다른 것에 대한 인터페이스로 기능하는 클래스

# behavioral pattern

Behavioral design patterns are concerned with algorithms and the assignment of responsibilities between objects.

- 이 패턴은 객체들 사이의 커뮤니케이션에 신경을 쓰는 패턴이다.
- 이것들은 해결책을 제공한다. 개발자들이 객체들 사이의 소통을 고려할 때, 결합도를 낮춰주고 유연한 코드를 작성할 수 있게 도와준다.
- 요약하자면, 객체들 사이에서 소통을 해야하는 경우가 있다면, 이 카테고리를 들여다보는 것이 좋다.

참고 : [How JavaScript works: Creational, Structural, and Behavioural design patterns + 4 best practices](https://blog.sessionstack.com/how-javascript-works-creational-structural-and-behavioural-design-patterns-4-best-practices-2e8beeba744c)

- 행동 디자인 패턴(behavior design pattern)은 객체 간의 공통적인 커뮤니케이션 패턴을 식별하고 이러한 패턴을 실현하는 디자인 패턴이다. 이렇게 함으로써, 이러한 패턴들은 이 통신을 수행하는 데 있어 유연성을 증가시킨다.

- 행동 패턴은 상태와 행동이 시스템을 통과하는 방식에 영향을 미칩니다. 상태 및 동작이 전송 및 수정되는 방법을 최적화함으로써 응용프로그램의 유지보수를 단순화하고 최적화하며 향상시킬 수 있습니다.

- 행동패턴은 객체가 어떻게 상호소통하는지를 설명한다. 이것은 어떻게 객체와 클래스가 다른지를 묘사하고, 각각에게 메시지를 보낸다.그리고 작업의 단계가 각각의 객체 사이에서 구분된다는 것을 보여준다.

Chain of Responsibility
Command
Interpreter
Observer
Null object

### 종류

- chain of responsibilities pattern : 명령 객체는 논리가 포함된 처리 객체에 의해서 조작되거나, 다른 객체로 넘겨진다는 패턴
- Command: Command objects encapsulate an action and its parameters
- Interpreter: Implement a specialized computer language to rapidly solve a specific set of problems
- Iterator: Iterators are used to access the elements of an aggregate object sequentially without exposing its underlying representation
- Mediator: Provides a unified interface to a set of interfaces in a subsystem
- Memento: Provides the ability to restore an object to its previous state (rollback)
- Observer: also known as Publish/Subscribe or Event Listener. Objects register to observe an event that may be raised by another object
- State: A clean way for an object to partially change its type at runtime
- Strategy: Algorithms can be selected on the fly
- Template Method: Describes the program skeleton of a program
- Visitor: A way to separate an algorithm from an object
