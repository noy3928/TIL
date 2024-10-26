## Create a Resource Representation Class

```java
package com.example.restservice; 

public record Greeting(long id, String content) { }
```

이 맥락에서의 `record`는 웹 서비스에서 특정 요청에 대한 응답을 표현하는 데 사용됩니다. 해당 웹 서비스는 GET 요청을 받아 처리하며, `/greeting` 경로에 대한 요청을 받으면 `id`와 `content`를 포함한 JSON 응답을 반환합니다.

`Greeting` record 클래스는 이러한 응답을 표현하는 데 사용되며, 다음과 같은 의미와 역할을 갖습니다:

1. **데이터의 불변성**: `record`는 불변의 객체로서, `id`와 `content` 필드의 값은 한 번 설정되면 변경할 수 없습니다. 이는 데이터의 일관성과 안정성을 보장합니다.
    
2. **간결성**: 필요한 필드와 그 타입만을 선언하면, 생성자, getter, equals, hashCode, toString 등의 메소드가 자동으로 생성되므로 코드가 간결해집니다.
    
3. **리소스 표현**: 웹 서비스의 응답으로 반환되는 리소스를 표현하는 클래스로서, 해당 리소스의 구조와 데이터를 정의합니다. `Greeting` 클래스의 경우 `id`와 `content`라는 두 개의 데이터를 담고 있으며, 이를 통해 클라이언트에게 응답을 제공합니다.
    
4. **JSON 직렬화**: 대부분의 현대 웹 프레임워크에서는 record 클래스를 자동으로 JSON으로 직렬화할 수 있으므로, 클라이언트에게 적절한 형식으로 응답을 제공할 수 있습니다.
    

요약하면, 이 맥락에서의 `record`는 웹 서비스의 특정 응답을 표현하는 리소스 클래스로 사용되며, 데이터의 불변성, 간결한 코드 작성, 자동 직렬화 등의 이점을 제공합니다.

<br>

## Create a Resource Controller

- 스프링의 관점에서 restful한 웹 서비스를 만들기 위해서는 HTTP 요청은 컨트롤러에 의해서 다루어져야한다. 
- 이런 컴포넌트들은 `@RestController` 라는 어노테이션에 의해서 정의된다. 

```java
package com.example.restservice;  
  
import java.util.concurrent.atomic.AtomicLong;  
  
import org.springframework.web.bind.annotation.GetMapping;  
import org.springframework.web.bind.annotation.RequestParam;  
import org.springframework.web.bind.annotation.RestController;  
  
@RestController  
public class GreetingController {  
  
private static final String template = "Hello, %s!";  
private final AtomicLong counter = new AtomicLong();  
  
@GetMapping("/greeting")  
public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name){  
return new Greeting(counter.incrementAndGet(), String.format(template, name));  
}  
}
```

- 위 코드는 간단해 보이지만, 그 아래에 정말 많은 일들이 일어나고 있다. 그 스텝 스텝을 알아가보자. 
- @GetMapping 이라는 어노테이션은 `/greeting` 으로 들어온 요청에 대해서, `greeting()` 이라는 메서드가 매핑이 될 수 있도록 만들어 준다. 
	- @PostMapping, @RequestMapping 등등의 다른 HTTP 요청에 대한 매핑 어노테이션도 존재한다. 
- @RequestParam은 쿼리 스트링 파라미터로 들어온 name의 값을 greeting이라는 메서드의 name 파라미터에 바인딩한다. 만약에 name 파라미터가 요청에서 들어오지 않았다면, defaultValue 값이 사용될 것이다.(World)
- Greeting 객체를 반환한다. 그리고 이 객체는 id와 cotent 속성을 가지고 있다. 이 속성들은 counter와 template에 의해서 만들어진 name이라는 값으로 부터 채워진다. 
- 전통적인 MVC 와 restful 서비스는 HTTP 응답 바디가 만들어지는 방식에서 차이점이 존재한다. 
	- 서버사이드에서 greeting 데이터를 HTML에 렌더링하는 것에 집중하기 보다는, RESTful 서비스의 컨트롤러는 오직 Greeting 객체를 채우고 반환하는 것에만 집중한다. 
	- 그리고 이 객체는 HTTP 응답에 의해서 직접적으로 작성된다. 
- @RestController 어노테이션은 뷰 보다는 도메인 객체를 반환하는 모든 컨트롤러 클래스를 마킹한다. 
- Jackson2 덕분에 자동으로 JSON으로 변경해준다. Greeting에서 JSON으로 변경하기 위해서 별 다른 작업을 해주지 않아도 된다. 


- 실행방법 : 
```
./gradlew bootRun
```
이 명령어를 통해서 실행가능하다. 
