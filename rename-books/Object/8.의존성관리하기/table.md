- 객체들 사이의 협력은 필수적이다.
- 하지만 과도한 협력은 설계를 곤경에 빠뜨린다.
- 때문에 객체지향의 핵심은 딱 필요한 만큼의 협력을 유지하되, 변경을 방해하는 의존성은 제거하는 것이다.
- 다르게 말하면, 객체지향은 객체가 변화를 받아들일 수 있게 의존성을 정리하는 기술이라고 할 수 있다.

<br>

## 01 의존성 이해하기

### 변경과 의존성

- 필요
  - 한 객체가 다른 객체를 필요로 할 때, 두 객체 사이에는 의존성이 존재한다.

```javascript
public class PeriodCondition implements DiscountCondition {
    private DayOfWeek dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;

    ...
}

public boolean isSatisfiedBy(Screening screening){
    return screening.getStartTime().getDayOfWeek().equals(dayOfWeek) &&
    startTime.compareTo(screening.getStartTime().toLocalTime()) <= 0 &&
    endTime.compareTo(screening.getStartTime().toLocalTime()) >= 0 ;
}
```

- 위 코드는 실행시점에 PeriodCondition의 인스턴스가 Screening 인스턴스에 의존하고 있다.
- 의존성은 늘 방향성을 가진다.

  - 그리고 항상 단방향이다.
  - Screening이 변경되면 PeriodCondition이 영향을 받게 되지만, 그 역은 성립하지 않는다.

- 의존성은 늘 변경에 의한 영향의 전파 가능성을 암시한다.
- PeriodCondition은

  - DayOfWeek, LocalTime, Screening에 대해 의존성을 가지고 있다.

- 의존성은 늘 변경의 영향이 전파되는 것과 연관이 있다.

<br>

### 의존성 전이

- 의존성 전이란 숨은 의존성을 말하는 것이다.
  - PeriodCondition이 Screening에 의존하고 있는데, 만약 Screening이 다른 대상에 의존하고 있다면,
  - Screening이 의존하고 있는 대상에 PeriodCondition은 의존성을 가지고 있다고 할 수 있다.
- 하지만 모든 경우에 의존성이 전이되는 것은 아니다. 엄밀한 의미에서 아직은 가능성에 불가하다.
  - 변경의 방향과 캡슐화의 정도에 따라서 달라질 것이다.
- 의존성의 종류를 2가지로 나눌 수 있다.
  - 직접 의존성 : 말 그대로 한 요소가 다른 요소에 직접 의존하는 경우
  - 간접 의존성 : 직접적인 관계는 존재하지 않지만 의존성 전이에 의해 영향이 전파되는 경우를 가리킨다.

<br>

### 런타임 의존성과 컴파일타임 의존성

- Movie의 인스턴스가 AmountDiscountPolicy와 PercentDiscountPolicy 둘 다에 의존해야하는 상황인데,
- 둘 다 의존하게 하는 것은 비효율적이며, 각각에 의존하게 만드는 것 또한 협력의 확장성에 있어서 좋지 않다.
- 이때 할 수 있는 방법은 DiscountPolicy라는 추상 클래스를 하나 만들고, 그것에 의존하게 만드는 것이다.
- 그렇게하여 컴파일 타임의 의존성과, 실행 시점에서의 의존성을 다르게 만드는 것이다.

<br>

### 컨텍스트 독립성

- 구체적인 클래스를 알도록 만들지 않는다.
- 구체적일수록 특정 문맥에 강하게 결합된다.
- 클래스가 사용될 특정한 문맥에 대해 최소한의 가정만으로 이루어져있다면 다른 문맥에서 재사용하기가 더 수월해진다.
- 이것을 컨텍스트 독립성이라고 부른다.
- 설계가 유연해지기 위해서는 가능한 한 자신이 실행될 컨텍스트에 대한 구체적인 정보를 최대한 적게 알아야 한다.

<br>

### 의존성 해결하기

- 3가지 방법이 있다.
  - 객체를 생성하는 시점에 생성자를 통해 의존성 해결
  - 객체 생성 후 setter 메서드를 통해 의존성 해결
  - 메서드 실행 시 인자를 이용해 의존성 해결

1. 생성할 때 생성자를 통해 의존성 해결 :

```java
Movie avatar = new Movie('아바타', Duration.ofMinutes(120), Money.wons(10000), new AmountDiscountPolicy(...))
```

2. setter 메서드를 통해 의존성 해결 :

```java
Movie avatar = new Movie(...);
avatar.setDiscountPolicy(new AmountDiscountPolicy(...));
```

3. 메서드 인자를 통해 의존성 해결 :

```java
public class Movie {
    public Money calculateMovieFee(Screening screening, DiscountPolicy discountPolicy){
        return fee.minus(discountPolicy.calculateDiscountAmount(screening));
    }
}
```

<br>

## 02 유연한 설계

### 의존성과 결합도 :

- 의존성은 객체 사이의 협력을 가능하게 한다는 점에서 그 자체로 나쁜 것이 아니다.
- 문제는 의존성의 존재가 아니라 의존성의 정도이다.
- 바람직한 의존성은 재사용성과 관련이 있다.
  - 어떤 의존성이 다양한 환경에서 클래스를 재사용할 수 없게 한다면 그 의존성은 바람직하지 못하다.
  - 어떤 의존성이 다양한 환경에서 재사용할 수 있다면 그 의존성을 바람직하다.
- 바람직한 의존성을 만들기 위해서는 컨텍스트에 독립적인 의존성을 가지도록 만들어야 한다.
- 바람직한 의존성이란 설계를 재사용하기 쉽게 만드는 의존성이다.

<br>

### 지식이 결합을 낳는다

- 결합도의 정도는 한 요소가 자신이 의존하고 있는 다른 요소에 대해 알고 있는 정보의 양으로 결정된다.
- 서로 많이 알고 있을 수록 서로는 결합도가 높다고 할 수 있다.
- 결합도를 느슨하게 만들기 위해서는 협력하는 대상에 대해 더 적게알아야 한다.
  - 협력하는 대상에 대해 필요한 정보 외에는 최대한 감추는 것이 중요하다.
  - 추상화가 그것을 도와준다.

<br>

### 추상화에 의존하라

- 추상화란 어떤 양상, 세부사항, 구조를 좀 더 명확하게 이해하기 위해 특정 절차나 물체를 의도적으로 생략하거나 감춤으로써 복잡도를 극복하는 방법이다.
- 의존하는 대상이 더 추상적일수록 결합도는 더 낮아진다. 이것이 핵심이다.

<br>

### 명시적인 의존성

- Movie가 DiscountPolicy에 의존한다는 사실을 Movie의 퍼블릭 인터페이스에 드러내는 것
- 이것을 명시적인 의존성이라고 한다.
- 의존성이 퍼플릭 인터페이스에 표현되지 않는 것을 숨겨진 의존성이라고 부른다.
- 의존성은 명시적으로 드러내야 한다.
  - 명시적인 의존성을 사용해야만 퍼블릭 인터페이스를 통해 컴파일타임 의존성을 적절한 런타임 의존성으로 교체할 수 있다.

<br>

### new는 해롭다

- new를 사용하면 클래스 사이의 결합도가 극단적으로 높아진다.
- new가 해로운 이유 :
  - new 연산자를 사용하기 위해서 구체 클래스의 이름을 직접 기술해야한다. 따라서 new를 사용하는 클라이언트는 추상화가 아닌 구체 클래스에 의존할 수 밖에 없다.
  - new 연산자는 생성하려는 구체 클래스 뿐만 아니라 어떤 인자를 이용해 클래스의 생성자를 호출해야 하는지도 알아야 한다. 따라서 new를 사용하려면 클라이언트가 알아야 하는 지식의 양이 늘어나기 때문에 결합도가 높아진다.
- new는 불필요한 결합도를 급격하게 높인다.
- 해결방법 :
  - 인스턴스를 생성하는 로직과 생성된 인스턴스를 사용하는 로직을 분리해야 한다.
- 사용과 생성의 책임을 분리하고, 의존성을 생성자에 명시적으로 드러내고, 구체 클래스가 아닌 추상 클래스에 의존하게 함으로써 설계를 유연하게 만들 수 있다.

<br>

### 가끔은 생성해도 무방하다

- 만약 Amout와 거의 대부분 협력하고, 매우 가끔 Percent와 협력하는데, 생성의 책임을 클라이언트에게 넘기게 되면 좋지 못한 설계가 될 것이다.
- 이 문제를 해결하는 방법 :
  - 기본 객체를 생성하는 생성자를 추가하고 이 생성자에서 DiscountPolicy의 인스턴스를 인자로 받는 생성자를 체이닝하는 것이다.

```java
public class Movie {
    private DiscountPolicy discountPolicy;

    public Movie(String title, Duration runningTime, Money fee){
        this(title, runningTime, fee, new AmountDiscountPolicy(...));
    }

    public Movie(String title, Duration runningTime, Money fee, DiscountPolicy discountPolicy){
        ...
        this.discountPolicy = discountPolicy;
    }
}
```

<br>

### 조합 가능한 행동

- 어떤 객체와 협력하느냐에 따라 객체의 행동이 달라지는 것은 유연하고 재사용 가능한 설계가 가진 특징이다.
- 유연하고 재사용 가능한 설계는 객체가 어떻게 하는지를 장황하게 나열하지 않고도 객체들의 조합을 통해 무엇을 하는지를 표현하는 클래스들로 구성된다.
- 따라서 클래스의 인스턴스를 생성하는 코드를 보는 것만으로 객체가 어떤 일을 하는지를 쉽게 파악할 수 있다.
- 유연하고 재사용 가능한 설계는 작은 객체들의 행동을 조합함으로써 새로운 행동을 이끌어낼 수 있는 설계다.
- 훌륭한 객체지향 설계
  - 객체들의 조합을 선언적으로 표현함으로써 객체들이 무엇을 하는지를 표현하는 설계.
  - 핵심은 의존성을 관리하는 것
