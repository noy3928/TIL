
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

	abstract protected Money calculateCallFee(Call call);
}

public class RegularPhone extends Phone {
	private Money amount;
	private Duration seconds;

	public RegularPhone(Money amount, Duration seconds){
		this.amount = amount;
		this.seconds = seconds;
	}

	@Override
	protected Money calculateCallFee(Call call){
		return amount.times(call.getDuration().getSeconds() / seconds.getSeconds())
	}
}

...


```


### 기본 정책에 세금 정책 조합하기 

- 일반 요금제에 세금 정책을 조합해야한다면? 
	- RegularPhone 클래스를 상속받은 TaxableRegularPhone 클래스를 추가하는 것. 

```java
public class TaxableRegularPhone extends RegularPhone {
	private double taxRate;

	public TaxableRegularPhone(Money amount, Duration seconds, double taxRate){
		super(amount, seconds);
		this.taxRate = taxRate;
	}

	...
}
```

- super를 호출하면 부모의 메서드를 재사용할 수 있지만, 결합도가 높아진다. 
	- 결합도를 낮추는 방법은 추상 메서드를 제공하는 것 

- 그런데 그 방법을 위해서 부모 클래스에 추상 메서드를 추가하면, 
	- 상속을 받고 있던 모든 자식 클래스에 변경사항이 전파된다. 
		- 자식들이 추상 메서드를 오버라이딩해야하는 문제가 발생하는 것이다. 


- 클래스 폭발 
	- 클래스 폭발 문제는 자식 클래스가 부모 클래스의 구현에 강하게 결합되도록 강요하는 상속의 근본적인 한계 때문에 발생하는 문제다. 


## 03. 합성 관계로 변경하기 

- 합성은 컴파일타임 관계를 런타임 관계로 변경한다. 
	- 합성을 사용하면 구현이 아닌 퍼블릭 인터페이스에 의존하게 할 수 있다. 

- 상속을 이용하는 것은 컴파일타임 의존성과 런타임 의존성을 동일하게 만들겠다고 선언하는 것이다. 

- 합성의 본질 : 
	- 구현 시점에 정책들의 관계를 고정시킬 필요가 없어진다. 
	- 실행 시점에 정책들의 관계를 유연하게 변경할 수 있게 된다. 

```java
public class Phone {
	...
	public Phone(RatePolicy ratePolicy){
		this.ratePolicy = ratePolicy;
	}
}

```
- Phone이 다양한 요금 정책과 협력할 수 있어야 하므로 요금 정책의 타입이 RatePolicy 라는 인터페이스로 정의돼 있다는 것에 주목하라. 
	- Phone은 이 컴파일타임 의존성을 구체적인 런타임 의존성으로 대체하기 위해 생성자를 통해 RatePolicy의 인스턴스에 대한 의존성을 주입받는다. 



## 04 믹스인 

- 우리가 지향하는 것 
	- 코드를 재사용하면서도 납득할 만한 결합도를 유지하는 것이다. 
	- 합성이 상속보다 나은 이유는 구현이 아닌 추상적인 인터페이스에 의존하기 때문이다. 

- 믹스인 : 객체를 생성할 때 코드 일부를 클래스 안에 섞어 넣어 재사용하는 기법을 가리키는 용어다. 
- 합성과 믹스인 
	- 합성 : 실행 시점에 객체를 조합하는 재사용 방법
	- 믹스인 : 컴파일 시점에 필요한 코드 조각을 조합하는 재사용 방법이다. 

- 믹스인과 상속은 다르다. 
	- 상속은 자식과 부모를 동일한 개념적 범주로 묶어 is-a 관계를 만들기 위한 것이다. 
		- 상속은 클래스 사이의 관계를 고정시킨다.
	- 믹스인은 말 그대로 코드를 다른 코드 안에 섞어 넣기 위한 방법이다. 
		- 믹스인은 유연하게 관계를 재구성할 수 있다. 

- 믹스인은 문맥을 확장가능하도록 열어놓는다. 
	- 믹스인은 상속보다는 합성과 유사하다. 
	- 합성은 독립적으로 작성된 객체들을 실행 시점에 조합해서 더 큰 기능을 만들어낸다. 
	- 믹스인은 독립적으로 작성된 트레이트와 클래스를 코드 작성 시점에 조합해서 더 큰 기능을 만들어낸다. 







---
## 내 생각과 정리 : 

- 이번 장은 지난장과 더불어 생각보다 그렇게 와닿지는 않았던 것 같다. 
	- 코드 구현사항들이 현재 내 프로젝트나, 직군에서 사용하기에 한계가 있다고 느껴져서인 것 같다. 
	- 그럼에도 불구하고, 합성이 상속보다 더 나은점이 있다는 사실을 배웠다. 


- 그러면 이 시점에서 내가 던져야하는 질문은 이 합성은 리액트에서는 어떻게 사용하는가 하는 것이다. 
- 검색해보니, 생각보다 양질의 자료가 많았다. 그리고 많은 사람들이 해당 주제에 관심을 가지고 있다는 것을 알 수 있었다. 이에 대한 자료가 여기 있다.
	- [Composition vs Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html) 👍
		- 우리는 리액트에서 합성을 사용하기 위해 children와 props를 이용할 수 있다. 
			- 미래의 시점에 무엇이 들어올 지 모른다는 점에서 런타임 의존적인 방법이다.
			- 유연한 방법이라고 할 수 있다. 
		- 리액트팀에 있어선 상속을 추천할 만한 사례를 찾지 못했다고 이야기하고 있다. 
	- [React Component Composition Explained](https://felixgerschau.com/react-component-composition/) 👍👍👍
		- 컴포넌트 합성이란 무엇인가? 
			- props로써 다른 컴포넌트에 컴포넌트를 넘겨주는 것을 컴포넌트 합성이라고 부를 수 있다. 
				- children을 사용하는 것도 마찬가지로 합성이다. 
				- 유연성이 높다. 
		- 이 아티클에서는 합성이 props drilling을 개선하는데 도움을 준다고도 설명하고 있다. 
			- prop drilling이란 다양한 계층의 컴포넌트에 props를 내려주는 현상을 이야기한다. 
		- 합성은 리렌더링 방지에도 도움이된다. 
			- 리액트는 오직 props가 변경되었을 때만 렌더링한다. 
			- 고로 합성을 통해서 컴포넌트를 분리하고, 특정 컴포넌트로 합성시켜주면 불필요한 리렌더링을 방지할 수 있다. 
	
```javascript
// 합성이 prop drilling을 개선해주는 사례

const App = () => {
  const userName = 'Joe';

  return (
    <WelcomePage title={<WelcomeMessage userName={userName} />} />
  );
}

const WelcomePage = ({ title }) => {
  return (
    <>
      {title}
      {/** Some other welcome page code */}
    </>
  );
}

const WelcomeMessage = ({ userName }) => {
  return (
    <h1>Hey, {userName}!</h1>
  );
}
```
- 합성을 이용하면 prop drilling 문제를 해결할 수 있다. 


