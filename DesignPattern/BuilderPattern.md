# 생성자 패턴

- 객체 생성에 있어서 유연한 솔루션을 주기 위한 디자인 패턴이다.
- 생성자 패턴은 복잡한 객체의 생성을 분리시킨다.

- 생성자 패턴은 생성한다 복잡한 객체를 아주 단순한 객체를 이용함으로써, 그 단순한 객체는 스텝 바이 스텝으로 접근힌다. 이것은 creational pattern에 속해있다.

```javascript
let Task = function (name, description, finished, dueDate) {
  this.name = name
  this.description = description
  this.finished = finished
  this.dueDate = dueDate
}

let TaskBuilder = function () {
  let name
  let description
  let isFinished
  let dueDate

  return {
    setName: function (name) {
      this.name = name
      return this
    },
    setDescription: function (description) {
      this.description = description
      return this
    },
    setFinished: function (finished) {
      this.finished = finished
      return this
    },
    setDueDate: function (dueDate) {
      this.dueDate = dueDate
      return this
    },
    build: function () {
      return new Task(name, description, isFinished, dueDate)
    },
  }
}

let task = new TaskBuilder()
  .setName("Task A")
  .setDescription('finish book')
  .setDueDate(new Date(2019, 5, 12))'
```

위 예제를 보면 task 객체를 만드는 TaskBuilder 함수가 있다.  
task 객체는 4개의 속성을 가지고 있다.
taskBuilder를 통해서 만들어 지는 객체 내부의 this는 자기 자신을 가리키고 있다.  
그리고 이 안에서 우리는 함수 chain을 사용한다.

이렇게 순차적으로 객체를 생성하는 것을 생성자 패턴이라고 한다.

## [참고자료 : https://zetcode.com/javascript/builderpattern/]

## Car example

Car class with some properties :

- the color of the car
- whether it has a spoiler or not
- its fuelType - this should either be 'petrol' or 'diesel'
- its productionDate, which should be a js Date type

```javascript
class Car {
  #color = null
  #spoiler = null
  #fuelType = null
  #productionDate = null

  constructor(color, spoiler, fuelType, productionDate) {
    this.#color = color
    this.#spoiler = spoiler
    this.#fuelType = fuelType
    this.#productionDate = productionDate
  }

  toString() {
    return `color : ${this.$color}
      spoiler: ${this.#spoiler}
      fuel type : ${this.#fuelType}
      production date : ${this.#productionDate}
      `
  }
}

const car = new Car("red", true, "petrol", new Date("2020-09-21"))

console.log(car.toString())
/*
color : red 
spoiler : false
fuel type : petrol 
production date : Tue Sep 21 2021 05:30:00 GMT+0530
*/
```

이 코드의 문제점을 살펴보자.

1. 인자의 순서를 기억해야만한다. 그러기엔 인자의 갯수가 너무 많다.
2. 몇몇 속성들은, 예를 들어서 fuelType 같이, 몇가지 가능한 요소들로 제한된다. - 그리고 이런 제한 사항은 에러를 일으킬 수 있다.

빌더 클래스는 원하는 객체를 만들기 전에 메서드를 통해서 각각의 속성을 지정할 때 도움이 되는 그런 특수한 클래스이다.

```javascript
class Car {

  #color = null
  #spoiler = null
  #fuelType = null
  #productionDate = null

  static Builder = class{
    #color = null
    #spoiler = null
    #fuelType = null
    #productionDate = null

    setColor(color){
      this.#color = color;
      return this
    }

    setSpoiler(spoiler){
      this.#spoiler = spoiler
      return this
    }

    setFuelType(fuelType){
      this.#fuelType = fuelType
      return this
    }

    setProductionDate(date){
      this.#productionDate = date
      return this
    }

    build(){
      const car = new Car(
        this.#color,
        this.#spoiler,
        this.#fuelType,
        this.#productionDate
      )
      return car
    }
  }

  constructor(color, spoiler, fuelType, productionDate) {
    this.#color = color
    this.#spoiler = spoiler
    this.#fuelType = fuelType
    this.#productionDate = productionDate
    }

    toString() {
        return `color: ${this.#color}
spoiler: ${this.#spoiler}
fuel type: ${this.#fuelType}
production date: ${this.#productionDate}`
    }
```

자 이렇게 만든 builder를 토대로 car를 만들어보자.

```javascript
const car = new Car.Builder()
      .setColor('red')
      .setFuelType('petrol')
      .setProductionDate(new Date('2021-09-21'))
      .setSpoiler(false)
      .build()

console.log(car.toString())w
```

이제 각각 다른 속성들을 세팅하는 것을 알아보기가 쉬워졌다.

이 빌더 클래스를 조금 더 수정해보자.

```javascript
static Builder = class {
  //...

  withPetrolFuelType(){
    this.#fuelType = 'petrol'
    return this
  }

  withDieselFuelType(){
    this.#fuelType = 'diesel'
    return this
  }

  withSpoiler(){
    this.#spoiler = true
    return this
  }

  withOutSpoiler(){
    this.#spoiler = false
    return this
  }
}
```

이렇게 코드를 작성한다면, 에러를 일으킬 확률도 매우 작아진다.

```javascript
const car = new Car.Builder()
  .setColor("red")
  // using the constant attribute method
  .withPetrolFuelType()
  .setProductionDate(new Date("2021-09-21"))
  // In this case, the method is semantically more readable
  .withOutSpoiler()
  .build()
```

## Multiple Builder Types

- 때때로, 같은 종류의 객체를 만들기 위한 다양한 케이스가 있을 수 있다. 이런 경우에 우리는 사용하려는 경우에 알맞게 다른 builder를 만들 수 있다.

- 레이싱카를 생각해보자. 이것은 일반적인 차이긴 하지만, 항상 petrol을 사용하고, spoiler를 가지고 있다.

- 그렇다면 레이싱카를 만들기 위한 builder를 만들 수 있다.

```javascript
class Car {
  //...

  static RaceCarBuilder = class {
    #color = null
    #productionDate = null

    setColor(color) {
      this.#color = color
      return this
    }

    setProductionDate(date) {
      this.#productionDate = date
      return this
    }

    build() {
      return new Car.Builder()
        .setColor(this.#color)
        .setProductionDate(this.#productionDate)
        .withPetrolFuelType()
        .withSpoiler().build
    }
  }
}
```

이제 이걸 가지고 레이싱카를 만들어보자.

```javascript
const raceCar = new Car.RaceCarBuilder()
  .setColor("green")
  .setProductionDate(new Date("2021-09-21"))
  .build()
```

## When to use Builder Pattern

- 생성자 패턴은 객체의 생성을 더 쉽게 만들어주고, 훨씬 더 읽기 쉽게 만들어준다.

- 단순 클래스에서는 5개가 넘어가는 속성이 있을 수 있는데, 이렇게 많아지면 순서도 잊기 쉽고, 읽기도 어렵다.

- 그리고 객체 내부에 private속성이 있거나, 단순하게 특정 값으로 설정해줘야 하는 경우에도 유용하게 사용할 수 있다.

- 일반적으로, original class가 어플에서 여러번 사용된다면 builder class를 추가할만하다. 그리고 그 안에 다양한 속성이 있다면, 그것 또한 사용할 만한 상황이라고 할 수 있다.

[참고자료 : https://www.sohamkamani.com/javascript/builder-pattern/]

---

## Using builder

- builder 패턴을 사용하는 일반적인 동기는 복잡한 객체를 간단하게 생성하기 위함이다.
- builder를 이용하면 사용자는 그 내부적으로 어떻게 이루어지는지 모르고도, 한스텝 한스텝씩 만들어갈 수 있다.

## Participants

- director : in example code (Shop)

  - constructors products by using the builder's multistep interface

- builder : not used in js

  - declares a multistep interface for creating a complex product

- concreteBuilder : in example code(CarBuilder, TruckBuilder)

  - implements the multiple Builder interface
  - maintains the product through the assembly process
  - offers the ability to retrieve the newly created product

- products : in example code (Car, Truck)
  - represents the complex objects being assembled

```javascript
function Shop() {
  this.constructor = function (builder) {
    builder.step1()
    builder.step2()
    return builder.get()
  }
}

function CarBuilder() {
  this.car = null

  this.step1 = function () {
    this.car = new Car()
  }

  this.step2 = function () {
    this.car.addParts()
  }

  this.get = function () {
    return this.car
  }
}

function TruckBuilder() {
  this.truck = null

  this.step1 = function () {
    this.truck = new Truck()
  }

  this.step2 = function () {
    this.truck.addParts()
  }

  this.get = function () {
    return this.truck
  }
}

function Car() {
  this.doors = 0
  this.addParts = function () {
    this.doors = 4
  }
  this.say = function () {
    console.log("I am a" + this.doors + "-door car")
  }
}

function Truck() {
  this.doors = 0
  this.addParts = function () {
    this.doors = 2
  }
  this.say = function () {
    console.log("I am a" + this.doors + "-door truck")
  }
}

function run() {
  var shop = new Shop()
  var carBuilder = new CarBuilder()
  var truckBuilder = new TruckBuilder()
  var car = shop.constructor(carBuilder)
  var truck = shop.constructor(truckBuilder)

  car.say()
  truck.say()
}
```
