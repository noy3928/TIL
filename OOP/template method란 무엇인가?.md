
알고리즘의 기본 단계를 정의하고 하위 클래스가 한 개 이상의 단계의 구현을 제공할 수 있도록 하는 디자인 패턴이다. 이는 알고리즘의 기본 구조를 제공하고 하위 클래스가 전체 구조를 변경하지 않고 알고리즘의 일부분을 사용자 정의하고 싶을 때 유용하다. 
```javascript
class Algorithm {
  stepOne() {
    throw new Error("Must implement stepOne method");
  }

  stepTwo() {
    throw new Error("Must implement stepTwo method");
  }

  run() {
    this.stepOne();
    this.stepTwo();
  }
}

class ConcreteAlgorithm extends Algorithm {
  stepOne() {
    console.log("Performing step 1");
  }

  stepTwo() {
    console.log("Performing step 2");
  }
}

const algorithm = new ConcreteAlgorithm();
algorithm.run();
```



> 알고리즘의 구조를 메소드에 정의하고, 하위 클래스에서 알고리즘 구조의 변경없이 알고리즘을 재정의 하는 패턴이다. 알고리즘이 단계별로 나누어 지거나, 같은 역할을 하는 메소드이지만 여러곳에서 다른형태로 사용이 필요한 경우 유용한 패턴이다. - GoF Design Patterns 


> 상속을 통해 슈퍼클래스의 기능을 확장할 때 사용하는 가장 대표적인 방법. 변하지 않는 기능은 슈퍼클래스에 만들어두고 자주 변경되며 확장할 기능은 서브클래스에서 만들도록 한다. – 토비의 스프링 3.1





## 추상 클래스와 template method는 어떤 차이가 있는가? 

