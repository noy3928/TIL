
- 합성은 전체를 표현하는 객체가 부분을 표현하는 객체를 포함해서 부분 객체의 코드를 재사용한다. 
- 의존성의 관계 
	- 상속은 is-a관계라고 부른다. 
	- 합성은 has-a 관계라고 부른다. 
- 상속과 합성은 
	- 코드 재사용이라는 측면에서만 공통점을 가진다. 
	- 이외에는 도드라진 차이를 가진다. 

- 상속은 코드 재사용적인 측면에선 우아한 방법이라 할 수 없다. 
	- 부모의 내부 구현을 상세히 알아야하기 때문이다. 
		- 결합도가 높아진다는 말이다. 

- 합성은 구현에 의존하지 않는다. 
	- 퍼블릭 인터페이스에 의존한다. 

- 합성관계 
	- 객체사이의 동적인 관계
	- 실행 시점에 동적으로 변경할 수 있다는 말이다. 
	- 합성을 이용하면 변경하기 쉽고, 유연한 설계를 얻을 수 있다. 

- 재사용의 대상 : 
	- 상속은 부모 클래스의 구현된 코드 자체를 재사용한다. 
	- 합성은 객체의 퍼블릭 인터페이스를 재사용한다. 
		- 인터페이스에 의존하면 낮은 결합도를 유지할 수 있다. 

## 01. 상속을 합성으로 변경하기

- 상속의 문제점 
	- 불필요한 인터페이스 상속의 문제 
	- 메서드 오버라이딩의 오작용 문제 
	- 부모 클래스와 자식 클래스의 동시 수정 문제 


### 불필요한 인터페이스 상속문제 : 

상속관계를 합성 관계로 한번 바꿔보자. 

```java
public class Properties {
	private Hashtable<String, String> properties = new Hashtable <>();

	private String setProperty(String key, String value){
		return properties.put(key, value);
	}

	public String getProperty(String key){
		return properties.get(key)
	}
}
```

- 더 이상 properties는 hashtable의 내부 구현에 관해 알지 못한다. 


- 상속을 합성으로 변경하면, 
	- 코드를 안정적으로 유지할 수 있게 된다. 


## 02. 상속으로 인한 조합의 폭발적인 증가 

- 상속을 사용하면, 높은 결합도 때문에 작업량이 과도하게 늘어나는 경향이 있다. 
	- 하나의 기능을 추가하거나 수정하기 위해 불필요하게 많은 수의 클래스를 추가하거나 수정해야한다. 
	- 단일 상속만 지원하는 언어에서는 상속으로 인해 오히려 중복 코드의 양이 늘어날 수 있다. 

- 설계는 다양한 조합을 수용할 수 있도록 유연해야한다. 

### 상속으로 기본 정책 구현해보기 


```java
public abstract class Phone {
	private List<Call> calls = new ArrayList<>();

	public Money calculateFee(){
		Money result = Money.ZERO;


		for(Call call : calls){
			result = result.plus(calculateCallFee(call));
		}
	
		return result;
	}

	
}



```



---
- 퍼블릭 인터페이스를 재사용한다는 것은 어떤 의미인가? 
- 인터페이스에 의존하면 뭐가 좋은가? 
- 리액트에서 코드 재사용을 위해 합성을 한다는 것은 어떤 의미일까?