#프로토타입 #자바스크립트-면접질문 

`Object.create()` 메서드는 명시된 프로토타입과 함께 새로운 객체를 만드는 것을 허용한다. 이것은 객체를 만들 때 생성자 함수 대신에 사용할 수 있는 유용한 대안이다. 특히, 다른 추가적인 속성들이나 객체의 메서드들을 정의할 필요 없이 명시된 프로토타입과 함께 객체를 만들고자 할 때 유용하다. 

명시된 프로토타입과 함께 `Object.create()` 메서드를 이용해서 새로운 객체를 만드는 것의 예시이다. 
```javascript
const animal = {
  makeNoise() {
    console.log("Some generic animal noise");
  }
};

const dog = Object.create(animal);

// The dog object has the makeNoise method inherited from the animal object
dog.makeNoise(); // Output: "Some generic animal noise"

```

위 예시에서, `dog` 객체는 `Object.create()` 메서드를 이용해서 만들어졌으며, 이 객체는 `animal` 객체의 프로토타입을 물려받았다. 결과적으로, `dog` 객체는 `makeNoise` 메서드를 `animal` 객체로부터 상속 받은것이다. 

`Object.create()` 메서드를 사용해서 객체를 만드는 것은 몇가지 측면에서 생성자 함수를 사용하는 것과 다른 측면이 있다. 

1. `Object.create()` 메서드는 프로토타입 객체를 위해서 생성자 함수를 호출하지 않는다.  그래서 생성자 함수 안에 있는 어떤 초기화 코드도 실행되지 않는다. 
2. `Object.create()` 메서드는 `this`를 새로운 객체에게 부여하지 않는다. 그래서 내부의 `this` 값은 undefined 상태가 된다. 
3. `Object.create()` 메서드는 인자들을 프로토타입의 생성자 함수에 넘겨주는 것을 허용하지 않는다. 
