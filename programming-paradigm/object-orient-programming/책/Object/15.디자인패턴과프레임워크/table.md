# 15.디자인패턴과 프레임워크 

#디자인패턴 

- 디자인 패턴 : 
	- 소프트웨어 설계에서 반복적으로 발생하는 문제에 대해 반복적으로 적용할 수 있는 해결 방법 
	- 이것의 목적은 설계를 "재사용"하는 것이다. 
	- 다양한 변경을 다루기 위해 반복적으로 재사용할 수 있는 설계의 묶음이다. 
- 디자인 패턴을 익히게 된다면 : 
	- 변경의 방향과 주기를 이해하는 것만으로도 필요한 역할과 책임, 역할들의 협력 방식을 순간적으로 떠올릴 수 있게 된다. 


- 프레임 워크 : 
	- 설계와 코드를 함께 재사용하기 위한 것이다. 

- 일관성 있는 협력 : 
	- 디자인 패턴과 프레임워크 모두 일관성 있는 협력과 관련이 있다. 


## 01 디자인 패턴과 설계 재사용 

### 소프트웨어 패턴 

- 패턴이라는 용어의 뉘앙스를 이해하는 것이 중요하다. 
	- 패턴은 반복적으로 발생하는 문제와 해법의 쌍으로 정의된다. 
	- 패턴을 사용함으로써 이미 알려진 문제와 이에 대한 해법을 문서로 정리할 수 있으며, 이 지식을 다른 사람과 의사소통할 수 있다. 
	- 패턴은 추상적인 원칙과 실제 코드 작성 사이의 간극을 메워주며 실질적인 코드 작성을 돕는다. 
	- 패턴의 요점은 패턴이 실무에서 탄생했다는 점이다. 


> 패턴의 정의는 하나의 실무 컨텍스트에서 유용하게 사용해 왔고 다른 실무 컨텍스트에서도 유용할 것이라고 예상되는 아이디어이다. 


- 패턴이 지닌 가장 큰 가치 : 
	- 경험을 통해 축적된 실무 지식을 효과적으로 요약하고 전달할 수 있다는 점이다. 
- 이름의 중요성 : 
	- 패턴의 이름은 커뮤니티가 공유할 수 있는 중요한 어휘집을 제공한다. 
	- 장황한 대화를 단순한 대화로 바꿔준다. 



### 패턴 분류 

- 분류 : 
	- 아키텍처 패턴 
	- 분석 패턴 
	- 디자인 패턴 
	- 이디엄 


- 디자인 패턴 : 
	- 특정 정황 내에서 일반적인 설계 문제를 해결하며, 협력하는 컴포넌트들 사이에서 반복적으로 발생하는 구조를 서술한다. 
- 아키텍처 패턴 : 
	- 디자인 패턴의 상위에 존재한다. 
	- 소프트웨어의 전체적인 구조를 결정하기 위해 사용할 수 있는 아키텍처 패턴이 위치한다. 
	- 구체적인 소프트웨어 아키텍처를 위한 템플릿을 제공하며, 디자인 패턴과 마찬가지로 프로그래밍 언어나 프로그래밍 패러다임에 독립적이다. 
- 이디엄 : 
	- 디자인 패턴의 하위에 존재한다. 
	- 특정 프로그래밍 언어에만 국한된 하위 레벨 패턴으로, 주어진 언어의 기능을 사용해 컴포넌트, 혹은 컴포넌트간의 특정 측면을 구현하는 방법을 서술한다. 
- 분석패턴 : 
	- 도메인 내의 개념적인 문제를 해결하는 데 초점을 맞춘다. 


### 패턴과 책임-주도 설계 

- 객체지향에서 가장 중요한 일 : 
	- 올바른 책임을 올바른 객체에게 할당하고 객체 간의 유연한 협력 관계를 구축하는 일이다. 
	- 이런 일들에 대한 의사결정을 내리기 위해서는 많은 시간이 들어간다. 

- 패턴을 이용할 때의 장점 : 
	- 패턴을 따르면 특정 상황에 적용할 수 있는 설계를 쉽고 빠르게 떠올릴 수 있다는 사실. 
	- 패턴은 공통으로 사용할 수 있는 역할, 책임, 협력의 템플릿이다. 
	- 패턴은 반복적으로 발생하는 문제를 해결하기 위해 사용할 수 있는 공통적인 역할과 책임, 협력의 훌륭한 예제를 제공한다. 

- 패턴의 구성요소 : 
	- 클래스가 아니라 역할이다. 
	- 역할이 패턴의 구성요소가 된다. 
	- 패턴을 구성하는 요소가 클래스가 아니라 역할이라는 사실은 패턴 템플릿을 구현할 수 있는 다양한 방법이 존재한다는 사실을 암시한다. 
	- 역할은 동일한 오퍼레이션에 대해 응답할 수 있는 책임의 집합을 암시한다. 
		- 다수의 클래스가 동일한 역할을 구현할 수도 있다. 
- 디자인 패턴의 구성요소가 역할과 책임이라는 것이 지닌 의의 : 
	- 어떤 구현 코드가 어떤 디자인 패턴을 따른다고 이야기할 때는 역할, 책임, 협력의 관점에서 유사성을 공유한다는 것이다. 
	- 특정한 구현 방식을 강제하는 것은 아니라는 점을 이해하는 것은 정말 중요하다. 


### 캡슐화와 디자인 패턴 

- 각 디자인 패턴은 특정한 변경을 캡슐화하기 위한 독자적인 방법을 정의하고 있다. 
- 대부분의 디자인 패턴의 목적은 특정한 변경을 캡슐화함으로써 유연하고 일관성 있는 협력을 설계할 수 있는 경험을 공유하는 것이다. 
- 디자인 패턴에서 중요한 것은 디자인 패턴이 어떤 변경을 캡슐화하는지를 이해하는 것이다. 
	- 디자인 패턴의 구현 방법이나 구조가 아니다. 


### 패턴은 출발점이다 

- 패턴은 목표가 아니다. 
- 패턴은 단지 목표로 하는 설계에 이를 수 있는 방향을 제시하는 나침반에 불과하다. 

- 패턴을 사용할 때 발생할 수 있는 문제점 : 
	- 대부분의 입문자는 컨텍스트의 적절성은 무시한 채 패턴의 구조에만 초점을 맞춘다. 
	- 정당한 이유 없이 사용된 모든 패턴은 설계를 복잡하게 만드는 장애물이다. 
	- 패턴은 복잡성의 가치가 단순성을 넘어설 때만 정당화되어야 한다. 


## 02 프레임워크와 코드 재사용 


### 코드 재사용 대 설계 재사용 

- 가장 이상적인 형태의 재사용 방법은 설계 재사용과 코드 재사용을 적절한 수준으로 조합하는 것이다. 
	- 코드 재사용만을 강종하는 컴포넌트는 실패했다. 
	- 설계를 재사용하면서도 유사한 코드를 반복적으로 구현하는 문제를 피할 수 있는 방법은 없을까? 
	- 그것에 대한 대답이 바로 프레임워크다 

- 프레임 워크 :
	- 추상 클래스나 인터페이스를 정의하고 인스턴스 사이의 상호작용을 통해 시스템 전체 혹은 일부를 구현해 놓은 재사용 가능한 설계
		- 구조적인 측면
	- 애플리케이션 개발자가 현재의 요구사항에 맞게 커스터마이징할 수 있는 애플리케이션의 골격을 의미한다. 
		- 코드와 설계의 재사용 




### 제어 역전 원리 

- 의존성 역전 원리에 따라 구축되지 않은 시스템은 협력 흐름을 재사용할 수도 없으며 변경에 유연하게 대처할 수도 없다. 
- 의존성 역전은 의존성이 방향뿐만 아니라 제어 흐름의 주체 역시 역전시킨다. 
	- 의존성을 역전시키면 상위 레벨의 모듈은 인터페이스에 의존하게 된다. 기존에 전통적으로 상위 레벨의 모듈이 하위 레벨의 모듈을 컨트롤하는 상황에서 벗어나게 된다. 더 이상 상위 레벨의 모듈은 제어에 대한 흐름을 가지지 않게 된다. 
	- 그리고 제어흐름의 주체가 프레임워크에게로 넘어가게 된다. 
	- 택시기사에게 나의 제어흐름을 넘기는 것이다. 운전대를 택시기사에게 맡긴다. 





---

## 나의 질문 : 

- 의존성이 역전되면 제어 흐름의 주체가 역전되는 이유 : 
	- 상위 레벨의 모듈이 인터페이스에 의존하게 되면, 프로그램의 제어흐름에서 벗어나게 된다. 
		- 왜 상위레벨의 모듈이 인터페이스에 의존하게되면, 프로그램의 제어흐름에서 벗어나게 되는가? 
		- 이렇게 되면 프로그램의 제어 흐름이 역전된다. 왜냐하면 상위 레벨의 모듈이 더 이상 직접적으로 프로그램의 흐름을 컨트롤하지 않기 때문이다. 
	- 상위 정책이 구체적인 세부사항에 의존하는 전통적인 구조에서는 상위 정책의 코드가 하부의 구체적인 코드를 호출한다. 
		- 의존성이 역전되고나면, 더 이상 상위 모듈이 직접적으로 하부코드를 호출하지 않게 된다. 상위모듈은 하위 모듈에 관여하는 일이 없어진다. 상위 모듈은 그저 인터페이스에 의존하고 있을 뿐이다. 


