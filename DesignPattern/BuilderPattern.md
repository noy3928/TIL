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

let task = new TaskBuilder().setName("Task A").setDescription('finish book').setDueDate(new Date(2019, 5, 12))'
```

위 예제를 보면 task 객체를 만드는 TaskBuilder 함수가 있다.  
task 객체는 4개의 속성을 가지고 있다.
taskBuilder를 통해서 만들어 지는 객체 내부의 this는 자기 자신을 가리키고 있다.  
그리고 이 안에서 우리는 함수 chain을 사용한다.

이렇게 순차적으로 객체를 생성하는 것을 생성자 패턴이라고 한다.
