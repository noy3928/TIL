## 8.1 함수 옮기기

- 모듈성 : 프로그램의 어딘가를 수정하려 할 때 해당 기능과 깊이 관련된 작은 일부만 이해해도 가능하게 해주는 능력
- 모듈성을 높이는 방법 :
  - 서로 연관된 요소들을 함께 묶고, 요소 사이의 연결 관계를 쉽게 찾고 이해할 수 있도록 해야한다.
  - 어떤 함수가 모듈 a의 요소보다 다른 모듈 b의 요소들을 더 많이 참조한다면 모듈b로 옮겨줘야한다.
- 함수를 옮길지 결정하는 기준 :
  - 현재 컨텍스트와 후보 컨텍스트를 둘러본다.
  - 대상 함수를 호출하는 함수들은 무엇인지
  - 대상 함수가 호출하는 함수들은 또 무엇이 있는지
  - 대상 함수가 사용하는 데이터는 무엇인지 살펴봐야 한다.
- 중첩함수는 되도록 만들지 말자 : 중첩 함수를 사용하다보면 숨겨진 데이터끼리 상호의존하기가 아주 쉬워진다.

<br>

## 8.2 필드 옮기기

- 데이터 구조의 중요성 : 프로그램의 진짜 힘은 데이터 구조에서 나온다
  - 주어진 문제에 적합한 데이터 구조를 사용한다면, 동작 코드는 자연스럽게 단순하고 직관적으로 나올 것이다.
  - 하지만, 데이터 구조를 잘못 선택하면 아귀가 맞지 않는 데이터를 다루기 위한 코드로 범벅된다.
  - 우리 회사의 경우도, 이전에 데이터구조가 잘못 설계되어 있었던 탓에 고통 받고 있는 중이다.
  - Q : 어떻게 초반에 잘못 설계된 데이터구조를 점진적으로 바꿔나갈 수 있는 것일까?
- 데이터를 옮겨야한다는 기준 :
  - 어떤 레코드를 넘길 때마다 또 다른 레코드의 필드도 넘겨야 한다면.
  - 한 레코드를 변경하려 할 때 다른 레코드의 필드까지 변경해야만 한다면 필드의 위치가 잘못되었다는 신호
  - 구조체 여러 개에 정의된 똑같은 필드들을 갱신해야한다면, 한 번만 갱신해도 되도록 다른 위치로 옮기라는 신호.
- T : 이 파트에서 예시로 드는 코드는 리액트에서는 어떻게 이해를 해보면 좋은 것일까?

<br>

## 8.3 문장을 함수로 옮기기

- 문제의식 : 함수호출부 주변으로 반복된 코드가 나타났다.
- 문장을 함수로 옮기기 기법은 중복 제거를 위해서 사용한다. 만약 특정 함수를 호출하고 있는데, 그 앞뒤로 비슷한 코드가 반복되어 호출되고 있다면 그 호출문을 함수로 옮기는 것이다. 이것을 통해서 반복을 제거할 수 있다.
- \*피호출함수 : 다른 함수에 의해 호출되어 실행되는 함수를 의미
  - 콜백함수 정도로 이해해볼 수 있을 것 같다.

<br>

## 8.4 문장을 호출한 곳으로 옮기기

- 문제의식 : 추상화의 경계가 흐트러지기 시작했다. 그러니까, 특정한 상황에서 다르게 동작하도록 함수가 바뀌어야 하게 생겼다. / 함수가 여러 가지 일을 하기 시작했다.
- 해결방법 : 달라진 동작을 꺼내서, 해당 호출부 주변으로 옮긴다. 그리고 기존의 함수는 그대로 그 자리에서 호출한다.

<br>

## 8.5 인라인 코드를 함수 호출로 바꾸기

- 문제의식 : 인라인 코드의 단점은 무엇일까?
  - 인라인 코드는 중복을 초래한다.
  - 인라인 코드는 추상화를 방해한다.
  - 인라인 코드는 코드를 이해하기 어렵게 만든다.
- 해결방법 : 인라인 코드를 함수 호출로 바꾸기
  - 인라인 코드를 함수 호출로 바꾸면, 중복을 제거할 수 있다.
  - 인라인 코드를 함수 호출로 바꾸면, 추상화를 할 수 있다.
  - 인라인 코드를 함수 호출로 바꾸면, 코드를 이해하기 쉬워진다.

<br>

## 8.6 문장 슬라이드하기

- 문제의식 : 연관되어있는 코드가 멀리 떨어져 있으면 가독성이 떨어진다. / 코드를 보면, 어떤 문장들은 서로 밀접하게 연관되어 있다. 그런데 그 문장들이 코드상에서 멀리 떨어져 있다.
- 해결방법 : 연관된 코드들을 가까운 곳으로 옮긴다. 이렇게 문장을 옮기는 작업은 리팩터링의 준비단계가 된다.
  - 이점 : 관련있는 문장들이 한데모여있으면, 함수추출이 쉬워진다.
- 주의점 :
  - 선언부의 코드가 있으면, 호출부 주변으로 옮기는 것이 좋다. 이렇게 하면 함수로 추출해내기 쉬워진다. (T. 리액트에서는 하나의 컴포넌트 안에서 선언부와 호출부를 따로 분리하는 것이 일반적이긴 하다.)

<br>

## 8.7 반복문 쪼개기

- 문제의식 : 반복문 안에서 2가지 일을 수행하면, 반복문을 수정할 때 주의해야할 포인트가 늘어난다.
- 해결방법 : 반복문을 분리한다.
  - 이점 : 수정할 동작 하나만 이해하면 되게 된다. / 사용하기도 쉬워진다.
- 주의점 : 리팩터링과 최적화는 분리해서 생각하자. 리팩터링을 한 다음, 최적화를 하자.
- T : 이런 내용은 useEffect에서도 적용해서 생각해볼 수 있을 것 같다. useEffect에서 한 가지 내용만 수행하도록 하는것이, useEffect의 내용물을 수정하고자 할 때, 주의포인트를 줄여준다. 그리고 이 useEffect에서 무슨 일을 하는지 더욱잘 이해할 수 있을 것 같다.

<br>

## 8.8 반복문을 파이프라인으로 바꾸기

- 이점 : 파이프라인으로 바꾸면 이해하기 쉬워진다.

<br>

## 8.9 죽은 코드 제거하기

- 문제의식 : 사용되지 않는 코드가 있으면, 동작을 이해하는 데에 커다란 걸림돌이 된다. 무시해도 된다 라는 신호를 주지 않는 코드이다.
- 해결방법 : 사용하지 않는 코드는 무조건 지운다. 우리에게는 git이 있다.
