> https://www.phind.com/agent?q=what%20is%20Bean%20in%20spring%20boot%3F&source=searchbox

스프링에서 Bean은 가장 근본적인 개념이다. 이것은 객체이다. 이것은 제어 역전 컨테이너에 의해 인스턴스화되고, 조립되고, 관리되는 객체이다. 이런 객체들을 Bean이라고 부른다. 

컨테이너에 제공하는 구성 메타데이터는 이런 Bean을 생성하는데에 사용된다. 
예를 들어 XML <bean/> 정의의 행태이다. 이 메타데이터는 각 Bean 정의를 구성하는 일련의 속성으로 변환된다. Bean은 컨테이너에 제공하는 구성 메타데이터로 생성된다. 

또한 이 Bean은 다른 Bean과 함께 연결되어 어플리케이션의 기능을 생성하는 재사용 가능한 컴포넌트를 나타낸다. 

스프링에서 Bean은 XML 구성 또는 자바 클래스의 애너테이션을 사용해서 생성할 수 있다. Bean 주석은 빈을 명시적으로 선언하는데에 사용된다. 이것은 메서드 수준의 애너테이션으로, 메서드가 스프링 컨테이너에 의해서 관리되는 Bean을 생성한다는 것을 스프링 프레임워크에 알려주는 것이다. 

```java
@Component 
public class Company { 
// this body is the same as before 
} 

@Configuration 
@ComponentScan(basePackageClasses = Company.class) 
public class Config { 
	@Bean 
	public Address getAddress() {
	 return new Address("High Street", 1000); 
	 } 
 };
```

여기서 Confing 클래스는 Address 타입의 Bean을 생성한다. 
빈을 생성하는데에 도움을 주는 또 다른 애너테이션은 @Component 주석이다. 
@Component이런 주석이 달린 클래스가 스프링 Bean임을 나타낸다. 

예를 들어
```java
import org.springframework.stereotype.Component;

@Component
public class MyBean {
 // 빈 구현부
}

```

@Component 주석은 MyBean을 빈으로 취급하도록 스프링의 컴포넌트 스캐닝에 알려준다. 

