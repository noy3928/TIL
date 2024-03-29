Elements of Reusable Object-Oriented Software 이 책에 따르면 중재자 패턴도, 옵저버 패턴을 사용함으로써 구현한다고 말한다.  
대신 중재자 패턴은 동료 객체들을 가진다. (옵저버로 치면 publisher라고 말할 수 있다. )  
그리고 그 동료 객체들은 중재자 객체를 참조하고 있다.

옵저버 패턴을 사용하는 많은 경우가 있다.  
그리고 publisher들은 자신을 구독하고 있는 객체가 누구인지를 모른다.

중재자 패턴은 조금 더 특별하다.  
이것은 직접 소통하는 것을 피하고, 중재자 객체를 통해서만 소통한다.  
이것은 소통에 관해서는 오로지 중재자 객체에게만 책임을 떠넘김으로써, 단일 책임 원칙을 지킬 수 있다.

이 둘의 차이는 코드적인 부분 보다는, 의도적인 것에 있다고 말할 수 있다.

---

### Observer

1. Without

Client1: Hey Subject, when do you change?
Client2: When did you change Subject? I have not noticed!
Client3: I know that Subject has changed. 2. With

Clients are silent.
Some time later ...
Subject: Dear clients, I have changed!

### Mediator

1. Without

Client1: Hey Taxi1, take me some where.
Client2: Hey Taxi1, take me some where.
Client1: Hey Taxi2, take me some where.
Client2: Hey Taxi2, take me some where. 2. With

Client1: Hey TaxiCenter, please take me a Taxi.
Client2: Hey TaxiCenter, please take me a Taxi.

---

1. 중재자 패턴은 두 가지 방향으로 소통이 왔다갔다 하지만, 옵저버 패턴은 한 가지 방향으로만 소통이 흘러간다.
2. 중재자 패턴은 두 객체 사이의 소통을 가능하게 해준다. 옵저버 패턴은 관찰대상에 대해서 그저 구독을 등록해 둘 뿐이다.
3. 모든 서브 객체들은 중재자 객체에게 참조를 걸어두고, 중재자 객체 또한 모든 서브 객체들의 참조값을 가지고 있다. 반면에 옵저버 패턴에서는 항상 구독자 객체의 참조를 보관하고 있지 않다. 구독자가 알림을 받기 원하는 경우에만 그 참조값을 가지고 있다.

---

The difference between Mediator and Observer is often elusive. In most cases, you can implement either of these patterns; but sometimes you can apply both simultaneously. Let’s see how we can do that.
\*elusive : 찾기힘든

The primary goal of Mediator is to eliminate mutual dependencies among a set of system components. Instead, these components become dependent on a single mediator object. The goal of Observer is to establish dynamic one-way connections between objects, where some objects act as subordinates of others.
\*subordinates : 종속된, 부차[부수]적인, 부하, 하급자 (=inferior), (~보다 ~을) 경시하다

There’s a popular implementation of the Mediator pattern that relies on Observer. The mediator object plays the role of publisher, and the components act as subscribers which subscribe to and unsubscribe from the mediator’s events. When Mediator is implemented this way, it may look very similar to Observer.

When you’re confused, remember that you can implement the Mediator pattern in other ways. For example, you can permanently link all the components to the same mediator object. This implementation won’t resemble Observer but will still be an instance of the Mediator pattern.

Now imagine a program where all components have become publishers, allowing dynamic connections between each other. There won’t be a centralized mediator object, only a distributed set of observers.

[리팩토링 구루](https://refactoring.guru/design-patterns/observer)
