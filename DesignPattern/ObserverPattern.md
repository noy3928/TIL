# Observer pattern

- 옵저버 패턴은 객체의 상태 변화를 관찰하는 관찰자들, 즉 옵저버들의 목록을 객체에 등록하여 상태 변화가 있을 때마다 메서드 등을 통해 객체가 직접 목록의 각 옵저버에게 통지하도록 하는 디자인 패턴이다. 주로 분산 이벤트 핸들링 시스템을 구현하는 데 사용된다.(위키피디아)
- 감시자 패턴이라도고 부르며, 크게 관찰자인 옵저버와 관찰 대상 객체로 구성되어있다.
- 관찰 대상 객체에 옵저버 목록을 등록해두고, 객체의 상태가 변화할 때마다 옵저버에게 변경 알림을 준다.
- 만약 A객체의 상태가 변할 때 B함수를 실행시키고 싶다면, 이 옵저버 패턴을 이용하면 된다.
- addEventListener도 옵저버 패턴의 한 예이다.

### 옵저버 :

- 객체의 변화를 감지할 감시자
- 객체의 상태 변화가 있을 때 동작할 메소드를 가진다.
- 여러 옵저버가 필요할 시, 옵저버 클래스를 만들고 이 클래스를 상속 받아 옵저버 1,2를 만들 수 있다.

### 객체 :

- 객체는 해당 객체의 변화를 감시하는 옵저버 리스트를 저장하고 있다.
- subscribe() 를 사용해 옵저버를 추가한다.
- 객체 상태가 변하면 notify()를 사용해 옵저버에게 알려준다.
- 옵저버는 notify()를 통해 객체 상태 변화를 감지하고, update() 를 실행한다.

## 옵저버 패턴은 왜 사용하는가?

### 1.모듈 간의 의존성을 낮출 때 유용하다.

- js에서 코드를 설계할 때 모듈의 범위를 세부적으로 나누는 것이 중요하다.
- 또한 각 모듈간의 상호 의존성을 줄이는 게 좋다.

하지만 만약 a,b 모듈이 서로의 데이터가 필요한 경우라면?

- a,b 모듈을 합치는 건 상호 의존성을 높이며, 이는 유지 보수 측면에서 좋지 않다.
- 이 경우에는 모듈을 합치는 대신 옵저버 패턴을 이용하면 좋다.
- 먼저 A,B 모듈이 서로 필요로 하는 데이터의 변화를 감지하는 관찰자 객체를 만든다.
- 그리고 데이터가 변경될 때마다 각 모듈은 관찰자에게 데이터와 상태 변경을 통보한다.
- 관찰자는 데이터 변경에 따른 로직을 실행하면 된다.

### 2.polling을 방지할 수 있다.

- polling이란, 상태를 주기적으로 확인하고 만약 조건을 만족할 시 자료처리를 하는 방식이다.
- polling의 단점은 짧은 주기로 관찰하면 부하가 발생하며 긴 주기로 관찰하면 실시간성이 떨어진다는 것이다.
- 하지만, 옵저버 패턴을 사용하게 되면 관찰 대상의 상태가 변경되었을 때를 감지할 수 있으므로 polling을 사용하지 않아도 된다.

## 예시 코드

### 1.TODOList의 Store 만들기

```javascript
const createStore = (initialState, reducer) => {
  let state = initialState
  const events = {}

  //상태 변화 시 실행할 함수 등록
  const subscribe = (actionType, eventCallback) => {
    if (!events[actionType]) {
      events[actionType] = []
    }
    events[actionType].push(eventCallback)
  }

  // 이벤트에 해당하는 함수 모두 실행
  const publish = actionType => {
    if (!events[actionType]) {
      return
    }
    events[actionType].map(cb => cb())
  }

  //상태에 이벤트와 필요한 데이터를 보내는 함수
  const dispatch = action => {
    //action 에는 type(이벤트), payload(데이터)가 있음
    state = reducer(state, action)
    publish(action.type)
  }

  const getState = () => state

  return {
    getState,
    subscribe,
    dispatch,
  }
}
```

- state : 말 그래도 상태이다. 이벤트에 따라 변화하게 되는 우리의 관심사.
- events : 이벤트 이름이 key, 해당 이벤트 발생시 실행되어야 하는 함수들이 배열로 저장되어 있다.
- subscribe : state에 어떤 이벤트가 발생할 때 실행되어야 하는 함수를 등록하는 함수이다. 한 마디로 변화를 감지하면 나에게도 알려달라고 구독하는 것이다.
- publish : 어떤 이벤트 이름을 넣어주면 events에서 이에 해당하는 함수를 모두 실행시키는 함수다.
- dispatch : 리듀서와 비슷하게 action 객체를 받는다. 이 action 객체는 type에는 이벤트 이름을, payload에는 해당 이벤트 발생 시 상태 변화를 주기 위해 필요한 데이터가 담겨있다. 그리고 이 상태 변화로직은 reducer에서 정의하고 있기 때문에 reducer를 호출하여 변화를 준다. 그 후, 변화가 되었다면 publish 함수를 호출하여 등록된 함수를 일괄적으로 실행한다.

```javascript
import Store from "../store/Store.js"

export const ADD_TODO = 'ADD_TODO"
export const GET_TODOS = 'GET_TODOS"

const reducer = (state, action) => {
    switch (action.type){
        case ADD_TODO :
            return [...state, action.payload]
        case GET_TODOS :
            return state
        default
            return state;
    }
}

const initialState = [];

const todoStore = Store.createStore(initialState, reducer);

export default todoStore;
```

### 2.옵저버 클래스 만들기

```javascript
class Observer {
  update(v) {}
}

class Observer1 extends Observer {
  update(isWaiting) {
    if (!isWaiting) console.log("첫째는 집에 갈거야")
  }
}

class Observer2 extends Observer {
  update(isWaiting) {
    if (!isWaiting) console.log("첫째는 집에 갈거야")
  }
}

class Observer3 extends Observer {
  update(isWaiting) {
    if (!isWaiting) console.log("첫째는 집에 갈거야")
  }
}

class Mom {
  constructor() {
    this.children = []
    this.waiting = true
  }
  subscribe(child) {
    this.children.push(child)
  }
  unsubscribe(removedChild) {
    this.children = this.children.filter(child => child !== removeChild)
  }
  notify() {
    this.waiting = false
    for (let child of this.children) {
      child.update(this.waiting)
    }
  }
}

const mother = new Mom()

const child1 = new Observer1()
const child2 = new Observer2()
const child3 = new Observer3()

mother.subscribe(child1)
mother.subscribe(child2)
mother.subscribe(child3)
```
