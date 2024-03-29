# 4. 테스트 구축하기

- 테스트를 하면 개발 생산성이 높아진다.

- 실제로 코딩을 할 때, 가장 많은 시간을 쏟는 부분은 기존의 코드를 읽고, 디버깅을 하는데에 사용된다.
- 진짜 끔직한 부분은 버그를 찾는 여정이다. 또한 버그를 잡는 과정에서 다른 버그를 심기도 하는데, 그 사실을 한참이 지나서야 알아채기도 한다.
- 테스트 코드를 작성하면, 버그를 찾는 시간을 줄일 수 있다. 디버깅 시간을 눈에 띄게 줄여준다.
- 반복 주기가 끝나기를 기다리지 않고, 함수 몇 개만 작성해도 곧바로 테스트를 추가하도록 했다. 매일 두어 개의 새로운 기능과 그에 딸린 테스트 코드가 쌓여갔다.
- 테스트를 작성하기 가장 좋은 시점 : 기능을 추가해야 할 때 테스트부터 작성한다. 얼핏 순서가 뒤바뀐 듯 들리지만, 전혀 그렇지 않다. 테스트를 작성하다보면 원하는 기능을 추가하기 위해 무엇이 필요한지 고민하게 된다. 구현보다 인터페이스에 집중하게 된다는 장점도 있다. 게다가 코딩이 완료되는 시점을 정확하게 판단할 수 있다.
- 테스트의 대상 : 테스트는 위험 요인을 중심으로 작성해야 한다. 테스트의 목적은 어디까지나 현재 혹은 향후에 발생하는 버그를 찾는 데 있다. 따라서 단순히 필드를 읽고 쓰기만 하는 접근자는 테스트할 필요가 없다. 이런 코드는 너무 단순해서 버그가 숨어들 가능성도 별로 없다.
- 경계조건 검사하기 : 경계 조건은 버그가 숨어들기 좋은 곳이다. 경계 조건을 테스트하는 코드를 작성하면 버그를 찾을 수 있다.
  - 문제가 생길 가능성이 있는 경계 조건을 생각해보고 그 부분을 집중적으로 테스트하자.
- 아키텍처의 평가 기준 : 테스트 용이성.
