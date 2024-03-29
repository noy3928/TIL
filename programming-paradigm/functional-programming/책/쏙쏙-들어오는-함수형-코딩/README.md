
## [1.쏙쏙 들어오는 함수형 코딩에 오신 것을 환영합니다 :](https://github.com/noy3928/TIL/blob/main/books/%EC%8F%99%EC%8F%99-%EB%93%A4%EC%96%B4%EC%98%A4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95-%EC%BD%94%EB%94%A9/1.%EC%8F%99%EC%8F%99-%EB%93%A4%EC%96%B4%EC%98%A4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95%EC%BD%94%EB%94%A9%EC%97%90-%EC%98%A4%EC%8B%A0-%EA%B2%83%EC%9D%84-%ED%99%98%EC%98%81%ED%95%A9%EB%8B%88%EB%8B%A4..md) 

1장에서는 전반적으로 함수형 프로그래밍이 무엇인지 설명하고 있다. 함수형 프로그래밍은 학계에서 출발했기 때문에 실용적이지 못한 측면이 존재한다. 하지만, 이것을 잘 활용하여 실용적으로 잘 적용한 소프트웨어도 존재한다. 이 책에서는 그런 실용적인 측면들을 활용하기 위해서 함수형의 중요한 개념들을 소개한다. 바로 액션과 계산 데이터이다. 함수형 개발자는 이런 3가지 개념을 가지고 코드를 바라봄으로써, 궁극적으로 함수형 프로그래밍이 도달하고자 하는 지점에 다가간다. 함수형 프로그래밍이 도달하고자 하는 지점이란 변경 사항이 격리되어 예측 가능한 프로그램을 만드는 것이다. 이것을 위해서 액션과 계산 데이터를 구분하고, 이로부터 함수를 작고 순수하고 테스트하기 용이하고 재사용 가능하도록 만들어나간다. 이외에도 중요한 한 가지 개념이 더 있는데, 바로 일급객체라는 개념이다. 이렇게 액션-계산-데이터의 개념과 일급객체라는 2가지 큰 개념을 놓고 이 책은 실용적으로 설명해나가고자 한다. 이를 통해 함수형 사고를 갖춘 개발자가 되도록 이 책은 독자를 돕고있다. 


## [2.현실에서의 함수형 사고 : ](https://github.com/noy3928/TIL/blob/main/books/%EC%8F%99%EC%8F%99-%EB%93%A4%EC%96%B4%EC%98%A4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95-%EC%BD%94%EB%94%A9/2.%ED%98%84%EC%8B%A4%EC%97%90%EC%84%9C%EC%9D%98-%ED%95%A8%EC%88%98%ED%98%95-%EC%82%AC%EA%B3%A0.md)

2장에서는 2부로 나누어지는 책 전반적인 내용을 소개한다. 1부에서는 액션과 계산 데이터에 대한 개념을 소개하면서, 변경을 어떻게 관리할 것인지, 계층화 설계란 무엇인지, 계층화 설계를 통해서 어떻게 변경을 효율적으로 관리할 것인지 소개한다. 2부에서는 일급 추상이라는 개념을 배운다. 그리고 타임라인을 그려가면서 시간에 의존하는 액션에 대해서 알아본다. 이런 타임라인들은 시간에 의존하고 직전의 타임라인에 의존하고 있기 때문에 타이밍이 중요하다. 이런 타이밍을 어떻게 잘 관리할 것인지에 대한 방법을 소개하는 데, 바로 커팅이라는 기술이다. 커팅을 이해하기 위해서 일급 추상을 이해할 필요가 있다. 


## [3.액션과 계산, 데이터의 차이를 알기 :](https://github.com/noy3928/TIL/blob/main/books/%EC%8F%99%EC%8F%99-%EB%93%A4%EC%96%B4%EC%98%A4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95-%EC%BD%94%EB%94%A9/3.%EC%95%A1%EC%85%98%EA%B3%BC%EA%B3%84%EC%82%B0%2C%EB%8D%B0%EC%9D%B4%ED%84%B0%EC%9D%98-%EC%B0%A8%EC%9D%B4%EB%A5%BC-%EC%95%8C%EA%B8%B0.md) 

3장에서는 액션과 계산, 데이터의 차이에 대해서 자세히 설명하고 있다. 액션은 부수효과가 있는 함수, 외부에 영향을 주는 함수이다. 이것은 사용할 수 밖에 없으나, 최대한 적게 사용하고, 작게 만들어야 하며, 잘 다루어주어야 한다. 계산은 순수함수라고도 부르는데, 외부 세계에 영향을 주지 않으며 입력과 결과가 항상 같은 함수를 말한다. 데이터는 말 그대로 데이터다. 이벤트에 대한 사실을 말하는 것이다. 이런 3가지 개념을 구분하여 이해할 수 있어야 한다는 것을 강조한다. 이런 이해의 영역은 개발의 모든 단계에서 이루어질 수 있다. 설계하는 시점부터, 코드를 작성할 때, 다른 사람의 코드를 읽을 때에도 이 3가지 영역을 구분하여 이해할 수 있다. 또한 3장에서는 이 3가지 개념을 가지고 분리하면서 코드를 작성하는 방법에 대해서 알아보고 있다. 


## [4.액션에서 계산 빼내기 :](https://github.com/noy3928/TIL/blob/main/books/%EC%8F%99%EC%8F%99-%EB%93%A4%EC%96%B4%EC%98%A4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95-%EC%BD%94%EB%94%A9/4.%EC%95%A1%EC%85%98%EC%97%90%EC%84%9C-%EA%B3%84%EC%82%B0-%EB%B9%BC%EB%82%B4%EA%B8%B0.md) 

4장에서는 1-3장에서 설명했던 이론적인 내용들을 가지고 실습을 해보고 있다. 특히 실습을 해보는 포인트는 액션에서 계산을 빼내는 부분이다. 액션에서 계산을 빼내기 위한 3가지 단계가 있다. 1)액션이었던 코드에서 계산으로 분리해 낼 코드영역을 추출해낸다. 2)추출해 낸 코드의 영역에서 암묵적 입력과 암묵적 출력에는 무엇이 존재하는지를 찾는다. 3)암묵적 입력와 출력을 명시적 입력과 출력으로 바꾼다. 이런 3단계를 통해서 액션에서 계산을 추출해낸다. 이렇게 액션에서 계산을 추출해냄으로써, 우리는 함수를 더욱 작은 단위로 분리할 수 있고, 그 결과 명확한 책임을 가진 함수, 테스트하기 용이한 함수, 재사용가능한 함수를 만들어낼 수 있게 된다. 


## [5.더 좋은 액션 만들기:](https://github.com/noy3928/TIL/blob/main/books/%EC%8F%99%EC%8F%99-%EB%93%A4%EC%96%B4%EC%98%A4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95-%EC%BD%94%EB%94%A9/5.%EB%8D%94-%EC%A2%8B%EC%9D%80-%EC%95%A1%EC%85%98-%EB%A7%8C%EB%93%A4%EA%B8%B0.md)  

5장에서는 더 좋은 액션을 만들기 위한 원칙, 더 좋은 계산을 만들기 위한 방법들을 소개하고 있다. 더 좋은 액션을 만들기 위해서는 우선 가능한 모든 암묵적 입력과 출력을 제거할 수 있도록해야한다. 이것이 가장 기본적인 원칙이다. 그 다음 더 좋은 액션과 계산으로 만들어내기 위해서는 어떤 도메인을 위한 계산인지 생각할 수 있어야 한다. 그래서 각각의 도메인에 알맞도록 계산을 분리해낼 수 있어야 한다. 그렇게 작게 쪼개어진 계산을 조합하여 완성도 높은 계산과 액션을 만들어낼 수 있다. 이런 원칙과 코드 예제를 소개하고 있는 것이 5장의 내용이었다. 


## [6. 변경 가능한 데이터 구조를 가진 언어에서 불변성 유지하기 : ](https://github.com/noy3928/TIL/blob/main/books/%EC%8F%99%EC%8F%99-%EB%93%A4%EC%96%B4%EC%98%A4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95-%EC%BD%94%EB%94%A9/6.%EB%B3%80%EA%B2%BD-%EA%B0%80%EB%8A%A5%ED%95%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0%EA%B5%AC%EC%A1%B0%EB%A5%BC-%EA%B0%80%EC%A7%84-%EC%96%B8%EC%96%B4%EC%97%90%EC%84%9C-%EB%B6%88%EB%B3%80%EC%84%B1%EC%9C%A0%EC%A7%80%ED%95%98%EA%B8%B0.md) 

6장에서는 변경 가능한 데이터 구조를 가진 상황에서 어떻게 불변성을 유지할 수 있는지에 대해서 다루고 있다. 본래 읽기와 쓰기 중, 쓰기는 데이터를 변경시킨다. 외부세계에 영향을 미치는 것이므로 액션이라고 부를 수 있다. 그런데, 이런 쓰기의 행위도 "계산"의 영역으로 바꿀 수 있다. 불변성을 지키는 원칙을 따르면 가능하다. 이 원칙을 바로 카피-온-라이트라고 부른다. 카피-온-라이트는 변형시키고자하는 값을 복사하고, 복사한 값을 변형하고, 변형한 복사본을 반환하는 순서로 이루어진다. 이런 카피-온-라이트는 단순한 객체구조를 가진 데이터를 넘어서, 중첩된 구조를 가진 데이터에도 적용이 가능하다. 



## [7.신뢰할 수 없는 코드를 쓰면서 불변성 지키기 :](https://github.com/noy3928/TIL/blob/main/books/%EC%8F%99%EC%8F%99-%EB%93%A4%EC%96%B4%EC%98%A4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95-%EC%BD%94%EB%94%A9/7.%EC%8B%A0%EB%A2%B0%ED%95%A0-%EC%88%98-%EC%97%86%EB%8A%94-%EC%BD%94%EB%93%9C%EB%A5%BC-%EC%93%B0%EB%A9%B4%EC%84%9C-%EB%B6%88%EB%B3%80%EC%84%B1-%EC%A7%80%ED%82%A4%EA%B8%B0.md)

7장에서는 방어적 복사에 대해서 알아보고 있다. 카피-온-라이트를 통해서 우리는 데이터 변형에 대한 안전지대를 만들 수 있었다. 그럼에도 불구하고 우리가 건드리기 어려운 레거시 코드를 사용해야 하는 상황이 발생할 수 있다. 심지어 그 레거시 코드는 어떤 데이터를 변형시키는 레거시코드다. 이 코드를 사용해야 할 때 우리는 어떻게 불변성을 지킬 수 있을까? 그떄 사용할 수 있는 것이 바로 방어적 복사이다. 이 방어적 복사를 사용하면 안전지대에서 불안전지대로 넘어가는 경계에서도 데이터를 안전하게 다룰 수 있게 만들어준다. 나아가 이 데이터를 사용할 때에도 안전하게 사용할 수 있게 된다. 



## [8.계층형 설계(1) :](https://github.com/noy3928/TIL/blob/main/books/%EC%8F%99%EC%8F%99-%EB%93%A4%EC%96%B4%EC%98%A4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95-%EC%BD%94%EB%94%A9/8.%EA%B3%84%EC%B8%B5%ED%98%95%EC%84%A4%EA%B3%84(1).md)

8장에서는 계층형 설계가 무엇인지를 설명하고 있다.  계층형 설계는 간단하게 말해, 함수의 계층을 나누어 설계를 하는 것을 말한다. 그리고 이 계층형 설계를 구현하기 위한 4가지 단계를 설명한다. 1단계는 직접 구현패턴을 적용하는 것이다. 2단계에서는 추상화 벽을 만들고 3단계에서는 작은 인터페이스를 만든다음 4 단계에서는 편리한 계층이 되었는지 확인해야한다는 내용을 소개하고 있다. 이 중 가장 첫번째이자, 중요한 단계인 1단계 직접 구현 패턴을 8장 전체에 걸쳐서 설명하고 있다. 직접 구현이란 쉽게 말하면, 함수 내부의 추상화 단계를 동일하게 맞추어 주어야 한다는 것이다. 이렇게 함수 내부의 추상화 수준을 동일하게 맞추어주면 각각의 함수들을 쉽게 계층화 할 수 있다. 만약 함수 내부의 추상화 단계가 다르고, 구체화수준이 다르다면 함수을 읽고 이해하는데에 어려움을 겪을 수도 있다. 


## [9.계층형 설계(2) :](https://github.com/noy3928/TIL/blob/main/books/%EC%8F%99%EC%8F%99-%EB%93%A4%EC%96%B4%EC%98%A4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95-%EC%BD%94%EB%94%A9/9.%EA%B3%84%EC%B8%B5%ED%98%95%EC%84%A4%EA%B3%84(2).md)   

9장에서는 계층형 설계의 나머지 2-4단계를 설명하고 있다. 2단계는 추상화의 벽 만들기, 3단계는 작은 인터페이스 만들기, 4번째는 편리한 계층이다. 2단계에서 추상화의 벽을 만듦으로써 코드의 관심사를 명확하게 분리할 수 있다. 때문에 작업을 더욱 분명하게 분리하고, 효율적으로 처리할 수 있다. 3단계에서 작은 인터페이스만들기를 통해 어느 계층에 함수를 만들 수 있을지를 고민할 수 있다. 4단계 편리한 계층 단계를 통해서 계층설계를 계속해서 유지보수해나가도록 할 수 있다. 나아가 결국 이런 계층형 설계를 통해서 얻을 수 있는 장점이 무엇인지에 대해 소개한다. 유지보수성, 테스트 효율성, 재사용성 이렇게 3가지다. 가장 높은 계층에 속한 함수일 수록 변할 가능성이 높기 때문에 해당 함수를 더욱 효율적으로 관리할 수 있으며, 계층의 가장 아래에 있는 함수일수록 많은 곳에서 사용되기 때문에 테스트를 하면 높은 효율을 가져갈 수 있고, 가장 아래의 계층에 속한 함수일 수록 많이 사용된다는 것을 한눈에 알아볼 수 있다는 장점이 있다. 



## [10.일급함수(1) : ](https://github.com/noy3928/TIL/blob/main/books/%EC%8F%99%EC%8F%99-%EB%93%A4%EC%96%B4%EC%98%A4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95-%EC%BD%94%EB%94%A9/10.%EC%9D%BC%EA%B8%89%ED%95%A8%EC%88%98(1).md)

10장에서는 코드를 리팩토링하는 방법에 대해서 다루고 있다. 특히 주목하고 있는 방법은 일급에 대한 것이다. 일급이란 값으로 다룰 수 있다는 것을 의미한다. 값으로 다룰 수 있게 되면, 함수의 인자로 넘겨줄 수 있고, 함수의 반환 값으로 내보낼 수 있게 된다. 또한 값으로 다룰 수 있게 되면 다양한 맥락에서 다양한 값을 넣어줄 수 있게 됨으로써 유연성 및 확장성을 보장할 수 있게 된다. 이 일급이라는 개념이 중요해지는 시점은 일급으로 다룰 수 없는 것들을 다룰 때이다. 일급으로 다룰 수 없는 것을 일급으로 다룰 수 있도록 만드는 것이 결국 중요한 포인트가 된다. 이 책의 파트2에서는 이런 내용들을 다루고자 한다. 3가지 방법을 설명하고 있는데, 3가지 방법은 다음과 같다. 암묵적 인자를 가지고 있는 코드의 냄새를 찾기. 그 암묵적 인자를 명시적 인자로 드러내기. 반복되는 코드의 본문 부분을 콜백으로 옮기기. 이런 방법들을 사용하면 더 나은 함수를 만들 수 있게 된다. 


## [11.일급함수(2) :](https://github.com/noy3928/TIL/blob/main/books/%EC%8F%99%EC%8F%99-%EB%93%A4%EC%96%B4%EC%98%A4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95-%EC%BD%94%EB%94%A9/11.%EC%9D%BC%EA%B8%89%ED%95%A8%EC%88%98(2).md)   

11장에서는 10장에서 배웠던 콜백 함수로 만들기 리팩토링 방식에 대해서 반복 연습을 하고 있다. 여기에 조금 더 나아가 커링이라는 기법에 대해서 소개한다. 단순하게 많은 코드를 보여주며 연습을 하는 장이었다. 


## [12.함수형 도구 :](https://github.com/noy3928/TIL/blob/main/books/%EC%8F%99%EC%8F%99-%EB%93%A4%EC%96%B4%EC%98%A4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95-%EC%BD%94%EB%94%A9/12.%ED%95%A8%EC%88%98%ED%98%95%EB%B0%98%EB%B3%B5.md)

12장에서는 함수형의 도구들을 소개한다. 반복문에서 사용하는 map, filter, reduce 함수이다. 각 함수들을 함수형의 관점에서 설명하는 장이다. 


## [13.함수형 도구 체이닝 :](https://github.com/noy3928/TIL/blob/main/books/%EC%8F%99%EC%8F%99-%EB%93%A4%EC%96%B4%EC%98%A4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95-%EC%BD%94%EB%94%A9/13.%ED%95%A8%EC%88%98%ED%98%95%EB%8F%84%EA%B5%AC%EC%B2%B4%EC%9D%B4%EB%8B%9D.md)  

13장에서는 여러 함수형 도구들을 체이닝 하는 방법에 대해서 살펴보고 있다. 체이닝은 함수를 여러 단계로 나누고 그것을 조합하는 방식이다. 체인의 각 단계는 원하는 결과에 가까워지도록 데이터를 한 단계씩 변환하는 단순한 동작이다. 