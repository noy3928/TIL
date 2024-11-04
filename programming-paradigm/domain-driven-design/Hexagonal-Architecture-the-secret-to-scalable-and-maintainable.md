> https://romanglushach.medium.com/hexagonal-architecture-the-secret-to-scalable-and-maintainable-code-for-modern-software-d345fdb47347

- 헥사고날 아키텍처, 포트와 어댑터 아키텍처라고도 알려져있는 이 패턴은, 아키텍처 패턴이다.
  - 어플리케이션간의 결합도를 낮추는 패턴이다.
  - 그리고 쉽게 포트와 어댑터에 의해서 쉽게 그들의 소프트웨어 환경을 연결시킬 수 있다.
  - 이렇게 함으로써 컴포넌트들은 어떠한 레벨에서도 갈아치우기 쉬워지고, 테스트하기에도 용이해진다.
- 이 아키텍터의 컨셉은 인풋과 아웃풋을 설계의 주변부에 위치하게 만드는 것이다. 비지니스 로직을 우리가 외부에 노출하는 api나, 데이터베이스와 같은 것들에 아예 영향을 받지 않도록 만드는 것이 가장 중요하다.
  - 그러니까 비지니스 로직과 다른 인풋과 아웃풋의 영역의 결합도를 최대한 낮추는 것이 주 목표인 패턴인 것이다.

## 포트와 어댑터

- 포트
  - 포트는 인터페이스이다. 어떤 인터페이스이냐면, 어플리케이션과 외부의 특정한 프로토콜과의 소통을 용이하게 돕는 인터페이스다.
    - 여기서 말하는 외부의 특정한 프로토콜이란, incoming(receiving requests or events from external system)이나, outcoming(sending commands or queries to the external system)을 다 뜻하는 것이다.
  - 포트는 여러개의 어댑터를 지원할 수 있는데, 각각의 어댑터들은 소통 프로토콜을 다르게 구현한다.
    - 예를 들어, incoming 포트는 어댑터들을 가질 수 있다. GUI나, CLI 혹은 web service에 대해서.
    - 반면에, outgoing port는 다양한 dbms나 레포지토리에 대한 어댑터를 가질 수 있다.
- 어댑터
  - 어댑터는 컴포넌트다. 어떤 컴포넌트냐면, 포트와 외부 시스템을 연결하는 컴포넌트이다. 그러면서 포트의 프로토콜을 이용해, 어플리케이션과 외부 시스템 사이에서 오가는 데이터와 메시지를 변환한다. 이것은 또한 에러 핸들링이나, 보안, 로깅, 캐싱에 대한 기술적 측면을 관리하기도 한다.
  - 외부 시스템의 역할에 따라서, 어댑터는 primary가 되기도 하고, secondary가 되기도 한다.
    - primary 어댑터는 유저와 다른 어플리케이션을 포함하는 반면, secondary 어댑터는 데이터베이스와 다른 서비스들을 포함한다.

## 헥사고날 아키텍처의 장점

- 외부 시스템과 그들의 기술적 측면과 비지니스 로직 사이의 결합도를 낮추는 것.
- 테스트의 용이성
- 유지보수성
- 도메인 모델링의 쉬움
- 확장성
- 비지니스 로직을 건드리지 않고, 어댑터를 변경시킬 수 있다는점.
- 다른 어댑터들을 사용함으로써, 재사용성의 증가.
- 가독성 증가.

## 전통적인 레이어드 아키텍처

- 전통적인 레이어드 아키텍처는 소프트웨어 아키텍처 패턴이다. 이 패턴은 어플리케이션의 구성요소들을 하나의 연속된 계층으로 구성한다. 그리고 그 각각의 구성요소들은 특정한 책임을 가지고 있다.

  - 프레젠테이션 레이어 : 유저의 input과 output을 처리하는 것에 대한 책임을 가지고 있으며, 유저 인터페이스를 보여주는 것에 대한 책임을 가지고 있다.
  - 어플리케이션 레이어 : 어플리케이션의 비지니스 로직을 포함하고 있다. 시스템의 행위를 이끌어가기 위한 규칙과 처리과정이 포함되어있다.
  - 도메인 레이어 : 데이터와 비지니스의 concepts를 나타낸다. 그리고 이것은 데이터와 비지니스 규칙을 관리하는 것에 대한 책임을 가지고 있다.
  - 데이터 접근 레이어 : 데이터베이스와 같은 외부 시스템과의 소통을 처리하는 것에 대한 책임을 가지고 있다.
  - 인프라스트럭처 레이어 : 시스템의 환경을 설정하는 것에 대한 책임을 가지고 있다. 예를 들어, 네트워크 설정, 보안, 모니터링, 로깅, 트랜잭션 관리 등등.

- 전통적인 레이어드 아키텍처의 단점
  - 강한 결합(Tight coupling) : 레이어들은 특정한 순서에 따라서 각각의 레이어에 의존하고 있다. 이렇게 함으로써, 교체하거나 교환하는 것이 어려워진다. 예를 들어서, 만약 다른 데이터 프로바이더를 이용하려한다고 해보자, 그러면 데이터 엑세스 레이어와 아마도 비지니스 레이어를 같이 변경시켜줘야할 것이다.
  - 오염(Contamination) : 계층들은 기술적인 세부사항이나 구현 선택이 다른 레이어에 노출된다. 이것은 관심사의 분리 원칙을 위반하는 것이다. 예를 들어서, 만약 데이터 접근 계층에서 ORM 프레임워크를 사용하고 있다고 할 때, 이것의 특정한 클래스와 어노테이션을 비지니스 레이어나 프레젠테이션 레이어에까지 사용해야할 것이다.
  - 비대칭성(Asymmetry) : 레이어들은 실제의 외부의 actors나 시스템 사이의 소통 패턴들을 반영하지 않는다. 예를 들어서, 유저의 요청이 비지니스 로직에 도달하기 전에 몇몇 계층을 통과한다고 해보자. 반면에, 알람은 비지니스 계층에서 외부 actor에게 바로 전달될 것이다.

## 헥사고날 아키텍처 VS 전통적인 레이어드 아키텍처

- 의사결정을 위한 팁들
  - 레이어드 아키텍처를 이용할 상황
    - 간단한 구조를 가지고 있다.
    - 작은 수의 컴포넌트를 가지고 있다.
    - 외부 시스템과의 광범위한 통합이 필요하지 않을 때
    - 높은 확장성이 필요하지 않을 때
  - 헥사고날 아키텍처를 사용해야하는 경우
    - 다수의 외부 시스템과의 통합이 필요할 때
    - 큰 양의 데이터를 처리해야할 때
    - 수평적으로 확장해야할 때
    - 광범위하게 테스트를 해야할 때

## 원칙들 (Principles)

- Separation of Concerns (관심사의 분리)
  - of User / Business / Server-side Logic
  - 분리(Compartmentalization) : 이 분리는 한번에 하나의 로직에만 집중할 수 있게 도와준다. 그러면서 여러가지것들이 섞이기 않는 상태로 이해하기 쉽게 만들어준다. 각각의 로직은 다른 로직에게 영향을 덜 미친다.
  - 비지니스 로직 우선화(Prioritization of Business Logic) : 비지니스 로직이 코드에서 강조된다. 이것은 특정한 디렉터리나 모듈에 고립되게 해준다. 이렇게 함으로써 개발자들에게 더욱 명확해진다. 이것은 나머지 프로그램들에 대해서 인지할 필요도 없이 개발되고, 재정의되고, 테스트될 수 있다. 이것은 결국 배포되는 것이 비지니스에 대한 개발자의 이해라는 점에서 중요한 것이다.
  - 효율적인 테스트(Effective Testing) : 관심사의 분리를 이루면, 자동화된 테스트는 효율적으로 테스트할 수 있다.
    - 그 자체의 전체 비지니스 로직을 독립적으로 테스트할 수 있다.
    - 사용자 측과 비지니스 로직 간의 통합을 서버 측과 독립적으로 테스트할 수 있다.
    - 비지니스 로직과 서버 측 간의 통합을 사용자 측과 독립적으로 테스트할 수 있다.
- 의존성은 안쪽으로 들어가야한다 (Dependencies Go Inside)
  - 비지니스 로직을 핵심 의존성으로 삼기(Business Logic as Core Dependency) :
    - 소프트웨어는 조작될 수 있다. 하지만, 비지니스 로직은 콘솔의 개념을 인지하지 않는다.
    - 유저 사이드는 비지니스 로직을 의존하지만, 반대는 그렇지 않다.
    - 유저 사이드는 보편적인 사용자-초기회 "포스트 요청" 메커니즘에 의존한다.
  - 내부와 외부 : 중심의 비지니스 로직은 "inside"이고 그 외의 모든 것들을 "outside"라고 부른다. 의존성은 안쪽을 향한다. 모든 것들은 비지니스 로직에 의존한다. 반면에 비지니스 로직은 독립적이다. 이러한 내부와 외부에 대한 구분은 유저 사이드와 서버 사이드를 구분하는 것보다 훨씬 더 중요하다고 강조된다.
- 경계는 인터페이스와 함께 격리되어야 한다.(Boun)
  - 클라이언트 사이드의 코드는 인터페이스를 통해서 비지니스 로직과 소통한다. 이 인터페이스는 비지니스 로직 그 자체 안에서 정의된다. 유사하게, 비지니스 로직은 서버사이드와 소통을 하는데, 다른 인터페이스를 통해서, 마찬가지로 비지니스 로직 안에서 정의된 인터페이스를 통해서도 그렇게한다. 이러한 인터페이스들은 내부와 외부 컴포넌트들 사이를 분리하는 경계를 더욱 명확하게 해준다.
  - 포트와 어댑터.
    - 헥사고날 아키텍처는(포트와 어댑터 패턴이라고 잘 알려져있는) 외부와 내부 요소들의 소통을 용이하게 하기 위하여 포트와 어댑터를 사용한다. 비지니스 로직은 포트를 만들고, 이 포트는 다양한 어댑터와 상호 교체적으로 연결될 수 있다.
    - 비지니스 코드에 의해서 생성된 인터페이스는 포트라고 불린다. 이런 인터페이스(포트)는 내부의 것이라고 여겨지는데, 이것이 비지니스에 의해서 정의되었기 때문에 그렇다. 어댑터는 외부의 코드를 나타내는데, 그 코드는 포트와 나머지 유저 사이드나 서버사이드 코드 사이의 갭을 연결해준다.
- 의존성 규칙 & 의존성 역전
  - 소프트웨어 아키텍처에서 주요한 문제점은 기술적 세부사항과 라이브러리들이 어플리케이션에 침투되는 것을 방지하는 것이다. "의존성 규칙"은 모든 소스코드의 의존성이 내부의 핵심 비지니스 로직을 향하게 만듦으로써 해결책을 제공한다.
  - 어려움은 secondary port와 adapter를 구현하려고 할 때 발생하는데, 여기서 소스코드의 의존성은 반드시 호출의 방향의 반대를 향해야 한다. 예를 들어서, 만약 데이터베이스가 core의 밖에 있다면 그리고 소스코드의 의존성이 내부를 향해있다면 어떻게 어플리케이션의 핵심이 데이터베이스에 접근할 수 있을까?
  - 이곳에 우리느 "의존성 역전 원칙"을 적용해야하는 지점이다. 포트는 여전히 인터페이스에 의해 정의되었지만, 클래스들간의 관계는 역전된다. 이것은 코드 의존성의 흐름을 컨트롤할 수 있게 만들어준다.
- 헥사고날 아키텍처의 흐름(Hexagonal Architecture Workflow)
  - 헥사고날 아키텍처의 핵심 아이디어는 인풋과 아웃풋을 설계의 주변부에 두는 것이다. 그리고 core 레이어를 외부의 여러 관심사들로부터 격리시키는 것이다. 이러한 방법은 비지니스 로직을 건드리지 않고, 어댑터를 변경시킬 수 있다는 점에서 중요하다.
  - 예를 들어서, 간단한 계산을 하는 core 레이어가 있다고 해보자. 이것은 2가지 포트를 드러낸다.
    - 한 가지는 arithmetic 표현을 인풋으로 받아오고, 다른 한 가지는 결과를 output으로써 내보낸다.
    - 포트 레이어에서 정의된 제약사항을 잘 따르기만 한다면, core 레이어는 이 포트들이 어떻게 구현되었는지는 신경쓰지 않는다.
  -

---

- infiltrate : 침투하다.

  - (특히 적군의 진지 등에) 침투하다
    - To enter or gain access to an organization, place, etc., gradually or secretly, especially in order to acquire secret information or cause damage.
  - 스며들다, 침투되다
    - To permeate or spread gradually into a place or system.

- invocation : 호출하다.