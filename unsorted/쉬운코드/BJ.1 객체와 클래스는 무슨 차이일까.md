- 객체란 무엇인가? 
	- 상태가 있고 행동을 하는 실체
	- 사람도 객체라고 볼 수 있다.
		- 이름, 성별 나이 등의 상태가 있다. 
		- 먹고, 자기 놀기 등의 행동을 한다.
- 클래스란 무엇인가?
	- 어떠한 속성이 있고 어떻게 행동하는지를 기술한 설계도
	- 객체가 어떻게 행동하는지를 기술한 설계도이다. 
	- 객체는 클래스로부터 설계된다.

```java
class Car {
	private String name; // 속성 
	private double speed;
	private Size size;
	...

	public void start(){...}
	public void stop(){...}
}

Car myCar = new Car("니로") // 실체화된 객체 
```

클래스에 기술된 속성들은 실체화된 객체마다 다르다. 속성은 name이라는 하나이지만, 상태는 객체마다 다르다. 속성과 상태를 다르게 바라볼 것.

```java
class Counter {
	private int count = 0 

	public void increment(){
		count++;
	}

	public int get(){
		return count;
	}
}

Counter appleCounter = new Counter();
```

- instantiate : new 라는 키워들을 통해서 클래스를 통해 객체를 만드는 것. 그렇게 해서 만들어진 것을 instance라고 부른다. 

---


- 클래스 : 내가 원하는 속성과 행동을 구체적으로 기술한 것이 클래스이다.
- 객체 : 그렇게 기술한 대로 실체화 되는 것이 객체이다. 