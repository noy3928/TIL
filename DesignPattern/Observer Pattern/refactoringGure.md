https://refactoring.guru/design-patterns/observer

옵저버는 행동 패턴이다.
이것은 특정 객체를 관찰중인 다수의 객체에게 그것에 이벤트가 생기면 알림을 주는 구독 메커니즘을 정의한다.

## Problem

### 첫번째 상황 :

두가지 종류의 객체를 상상해보자. 고객과 마트.

고객은 브랜드의 특정 제품에 굉장히 관심이 많다. (예를 들어 새로 나온 아이폰 모델이라고 해보자. )
그리고 이 제품은 곧 출시될 예정이다.

때문에 고객은 매일 마트에 방문해서 제품이 도착했는지를 체크할 것이다.  
하지만 아직 제품은 도착하지 않은 것이다.

### 두번째 상황 :

다른 상황을 생각해보자.
매번 새로운 제품이 도착할 때마다, 마트는 수 없이 많은 이메일을 모든 고객에게 보낼 것이다.
이런 방식은 몇몇 제품들 기다리던 고객들의 시간을 아껴줄 것이다.
하지만, 동시에 관심 없는 고객들에게는 화를 불러일으킬 것이다.

여기서 우리는 충돌점을 발견할 수 있다. 고객이 제품이 도착한 것을 확인하느라 낭비하는 시간과 필요없는 고객에게도 알람을 보내는 낭비 둘 사이의 충돌점.

## Solution

관찰할 만한 상태를 가진 객체를 subject라고 부르기도 하지만,  
이것이 상태의 변경을 다른 객체에게 알리기도 하므로, publisher라고도 부른다.  
그리고 publisher의 상태 변경을 추적하고자 하는 모든 객체를 subscriber라고 부른다.

Observer 패턴은 구독 메커니즘을 publisher 클래스에 추가하는 것을 제안한다.  
그렇게 함으로써 각각의 객체들은 publisher로부터 오는 이벤트를 구독하거나, 구독을 취소할 수 있다.  
지금까지 논의한 것에 대해서 두려워하진 말자.  
듣기에는 복잡해보이지만 사실 그렇게 복잡한 것은 아니다.

실제로, 이 메커니즘은 2가지로 이루어져있다.

1. 구독하고 있는 객체들의 참조를 모아주는 리스트르 배열
2. subscriber를 그 배열에 추가하고 삭제하는 메서드.

이제, publisher에게 중대한 변화가 생길 때면,  
이것의 구독자들을 검토하고, 알림을 보내는 메서드를 호출한다.

실제 앱들에서는 같은 publisher class를 관찰하는 다양하고 많은 종류의 subscriber 클래스들을 가질 것이다.  
그리고 당신은 그 publisher가 그 모든 subscriber에 결합되는 것을 원하지는 않을 것이다.

이런 이유로 모든 subscriber들이 같은 인터페이스를 구현하는 것, 그리고 publisher가 오직 그 인터페이스로만 소통하는 것이 중요한 것이다. 이런 인터페이스는 파라미터의 세트를 가진 알림 메서드를 만들어야 한다. 그 파리미터를 통해서 publisher는 알림과 관련된 몇몇 문맥적 데이터를 보낼 수 있는 것이다.

만약 당신의 앱이 몇몇 다른 종류의 publisher를 가지고 있고, 당신의 subscriber가 그 publsher들과 호환가능하게 만들기 원한다면, 당신은 더 나아가 모든 publisher로 하여금 같은 인터페이스를 가지도록 만들 수 있다.  
인터페이스는 몇몇 구독 메서드를 묘사하는 것이 필요하다.  
그리고 이런 인터페이스는 그들의 구체적인 클래스들과 결합되는 일 없이,  
subscriber가 publisher의 state를 관찰하는 것을 허락할 것이다.

## Real World

만약 잡지나, 뉴스를 구독했다면 당신은 더 이상 상점에 가서 체크할 필요가 없어진 것이다.  
대신에 출판사쪽에서 새로운 발행물을 즉시 보내줄 것이다.

출판사쪽에서는 구독자 목록을 보유하고 있고, 그 구독자들이 어떤 잡지에 관심이 있는지를 알고 있다.

The publisher maintains a list of subscribers and knows which magazines they’re interested in. Subscribers can leave the list at any time when they wish to stop the publisher sending new magazine issues to them.

## Structure

1. publisher는 다른 객체들에게 이벤트를 알려준다. 이런 이벤트들은 publisher가 특정 상태를 변경시키거나, 특정 행위를 실행할 때 발생한다. publisher들은 새로운 subscriber가 구독하고 구독을 끊을 수 있는 구독 구조를 가지고 있다.

2. 새로운 이벤트가 발생하면, publisher는 구독리스트를 검토하고 각각의 subscriber 객체의 인터페이스에 정의된 알림 메서드를 호출한다.

3. Subsriber 인터페이스는 알림 인터페이스를 선언한다. 대부분의 경우에, 단일한 업데이트 메서드로 이루어져있다. 그 메서드는 몇개의 파라미터를 가질 것이다. 이 파라미터는 publisher가 업데이트와 함께 이벤트의 세부정보를 전달할 수 있게 해준다.

4. Concrete Subscriber는 publisher가 보낸 알람에 맞춰서 특정 액션을 수행한다. 이 concrete subscriber들은 반드시 같은 인터페이스로 구현되어야 한다. 그렇게 함으로써 publisher가 구체적인 클래스에 결합되지 않도록 만들어야 한다.

5. 일반적으로, subscriber는 업데이트를 정확하게 하기 위해서 몇몇 문맥적 정보를 필요로한다. 이런 이유로, publisher는 자주 문맥적 데이터를 알림 메서드의 인자로 보내준다. publisher는 자기 스스로를 인자로 보낼 수 있기 때문에, subscriber가 어떤 데이터라도 직접 가져오게 할 수 있다.

6. Client는 publisher과 subscriber 객체들을 분리시켜서 만들 수 있다. 그러고나면 publisher의 업데이트를 위해서 subscribers를 등록한다.

## Applicability

- 하나의 객체에서의 변화가 다른 객체의 변화를 일으켜야할 때, 그리고 실제 객체들의 모음이 사전에 알려져 있지 않거나, 변화가 동적으로 이루어질 때 사용하기 좋다.

그래픽적인 유저 인터페이스의 클래스를 이용해서 작업할 때 이런 문제를 자주 겪을 수 있다.  
예를 들어서, 당신이 커스텀 버튼 클래스를 만들었다고 치자. 그리고 당신은 그 버튼에 어떤 코드를 걸었다고 전제해보겠다.  
그렇게 해서 유저가 버튼을 클릭할 때마다 그 코드가 실행되게 하려고 한다.

옵저버 패턴은 어떤

The Observer pattern lets any object that implements the subscriber interface subscribe for event notifications in publisher objects. You can add the subscription mechanism to your buttons, letting the clients hook up their custom code via custom subscriber classes.

- Use the pattern when some objects in your app must observe others, but only for a limited time or in specific cases.

The subscription list is dynamic, so subscribers can join or leave the list whenever they need to.
