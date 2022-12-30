
`new` 키워드를 사용해서 객체를 생성할 때, 뒷 단에서 몇 가지 일들이 발생한다. 

1. 새로운 객체가 만들어지고, 이것이 this 키워드에 할당된다. 
2. 객체의 `__proto__` 속성은 생성자 함수의 프로토타입 속성에 배정된다. 이것은 객체가 prototype으로부터 속성들과 메서드들을 상속받을 수 있게 해준다. 
3. 생성자 함수는 `this` 키워드가 새로운 객체로 설정된 상태에서  호출된다. 이렇게 함으로써 새 객체에 생성자 함수의 속성들이 설정될 수 있게 된다. 
4. 만약 생성자 함수가 값을 반환하지 않는다면, `new` 연산자는 step1에서 만들어진 객체를 반환할 것이다. 만약 생성자 함수가 값을 반환한다면, `new` 연산자는 생성자 함수에 의해서 반환된 값을 반환할 것이다. 


```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log('Hello, my name is ' + this.name);
}

let person = new Person('John');

console.log(person); // Output: Person { name: 'John' }
console.log(person.__proto__ === Person.prototype); // Output: true
person.sayHello(); // Output: 'Hello, my name is John'

```



핵심 키워드는 2가지다. this와 dunder proto이다. new 연산자와함께 생성되면 새로운 객체가 생성되고, 이 객체에는 두 가지 속성이 무조건 부여된다. 먼저는 this이고 다음은 proto이다. this에는 새롭게 생성된 객체 자체가 부여되고, proto에는 생성자 함수의 프로토타입이 부여된다. this에 새롭게 생성된 객체가 설정된 상태에서 생성자 함수는 해당 객체에 생성자 함수의 속성들을 부여한다. 