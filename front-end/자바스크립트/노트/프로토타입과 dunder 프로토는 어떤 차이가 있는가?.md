#프로토타입 #자바스크립트-면접질문 


자바스크립트에서 `prototype` 속성은 생성자함수의 `prototype`을 정의하기 위해서 사용한다. 반면에 `__proto__`속성은 객체의 prototype에 접근하기 위해서 사용된다. 

`prototype` 속성은 생성자함수의 속성이다. 그리고 이 생성자 함수는 생성자를 이용해서 만들어진 객체에 대한 프로토타입 객체를 정의 내리기 위해서 사용된다. 프로토타입 객체는 새로운 객체를 만들기 위해 템플릿으로써 동작하는 객체이다. 그리고 프로토타입에 정의된 모든 속성들이나 메서드들은 그 생성자에 의해서 만들어진 어떤 객체에서도 사용가능해진다. 

아래는 프로토타입을 사용한 예시이다. 
```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.makeNoise = function() {
  console.log("Some generic animal noise");
};

const animal1 = new Animal("Fluffy");
animal1.makeNoise(); // Output: "Some generic animal noise"
```

이 예시에서 `Animal` 생성자 함수는 `makeNoise` 메서드를 정의하는 `prototype` 속성을 가지고 있다. 그래서 `Animal` 객체가 new 연산자를 이용해서 만들어졌을 때, 이것은 prototype으로부터 `makeNoise` 메서드를 상속한다.

반대로, `__proto__` 속성은 단지 객체의 prototype에 접근하기 위해서 사용되는 객체의 속성이다.  `__proto__` 속성은 대부분의 모던 브라우저에서 직접적으로 접근되지 않고, Object.getPrototypeOf() 메서드를 이용해서 접근될 수 있다. 

여기 `__proto__`를 이용해서 객체의 prototype에 접근하는 예시가 있다. 

```javascript
const animal = {
  makeNoise() {
    console.log("Some generic animal noise");
  }
};

const dog = Object.create(animal);

console.log(dog.__proto__ === animal); // Output: true
```


이 예시에서, `dog` 객체는 `Object.create()` 메서드를 이용해서 만들어졌고, 이것은 `animal` 객체의 프로토타입을 받았다. dog 객체의 `__proto__`속성은 `dog` 객체의 프로토타입에 접근하기 위해서 사용될 수 있다. 그리고 `dog`객체의 프로토타입은 `animal` 객체이다. 

일반적으로, `__proto__` 속성을 사용하기를 피해야하고, `Object.getPrototypeOf()`를 이용해야한다. `__proto__`는 모든 브라우저에서 지원하지 않고, 미래에는 지워질 것이기 때문에 그렇다. 반대로 `prototype` 속성은 자바스크립트의 표준이고, 생성자함수의 프로토타입을 정의하기 위해서 사용된다. 

