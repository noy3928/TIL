> https://www.baeldung.com/spring-application-context

- 스프링 프레임워크의 핵심 기능은 IoC 컨테이너이다. 
	- IoC컨테이너는 어플리케이션의 객체를 매니징할 책임을 가지고 있다. 
		- 이것은 제어의 역전을 하기 위해서 DI를 사용한다. 
	- BeanFactory와 ApplicationContext의 인터페이스는 스프링 IoC 컨테이너를 나타낸다. 
		- BeanFactory는 Spring 컨테이너에 접근하기 위한 가장 기본적인 인터페이스이다. 그리고 Bean을 관리하기 위한 기본적인 기능을 제공한다. 
	- 반면에 ApplicationContext는 BeanFactory의 하위 인터페이스이다. 따라서 BeanFactory의 모든 기능을 제공한다. 
		- ApplicationContext의 핵심기능은 메시지 확인, 국제화 지원, 이벤트 게시 및 애플리케이션 계층별 컨텍스트 지원
			- (사실 이런 기능들에 대한 소개를 들어도 먼소린지 모르겠다) 
			- 이런 기능들 때문에 스프링 컨테이너를 이용하는 것이다. 
- 스프링 Bean이 뭘까? 
	- 스프링 컨테이너가 인스턴스화, 어셈블 및 관리하는 객체이다. 
	- 그렇다면 애플리케이션의 모든 객체를 Spring 빈으로 구성해야 할까요? 모범 사례로, 그렇게 하지 않는 것이 좋습니다.



--- 

## 질문 

- 스프링 빈이 뭘까? 
	- 