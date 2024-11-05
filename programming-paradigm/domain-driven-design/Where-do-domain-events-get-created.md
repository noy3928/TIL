> https://khalilstemmler.com/blogs/domain-driven-design/where-do-domain-events-get-dispatched/

- 도메인 이벤트를 사용하면

  - 여러 도메인 로직을 chaing할 수 있다.
  - SRP를 지킬 수 있다.
  - 옵저버 패턴을 이용해서 아키텍처간 결합도를 낮출 수 있다.

- 도메인 이벤트는

  - 도메인 레이어에 속한다.
  - 애그리케이트의 핵심 속성에 접근하거나, 그것이 변경되었을 때 도메인 이벤트를 생성하기에 가장 적합하다.
  - 도메인 이벤트는 도메인의 한 부분이기 때문에, 항상 엔티티나 도메인의 가까이에 위치해있어야한다.

- 애그리게이트에 대한 어떤 mutaion이 있다면, 그것과 관련된 메서드들은 해당 애그리게이트 내에 위치해야 한다.
  - acceptOffer나 declienOffer와 같은 메서드는 Offer라는 애그리게이트 내에 위치해야 한다.
  - 이러한 operation들은 다른 도메인 엔티티를 모르고서도 동작할 수 있다.
