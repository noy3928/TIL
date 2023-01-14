# Mediator Pattern

- mediator pattern defines an object that encapsulates how a set of objects interact.
- 이 패턴의 핵심은 객체들끼리의 소통 방식을 캡슐화한 객체를 정의하는 것이다.
- use a central mediator object to handle communication between components
- 직접적으로 객체들끼리 소통하기 보다는 중재자를 통해서 소통하게 만드는 방식이다.

## 필요한 이유

- 개발을 하다보면 수 없이 많은 클래스와 객체가 만들어지게 될 것이다. 이것이 많아질 수록 더 복잡해지고, 사용하기 어려워 질 것이다. 더구나 이런 것들끼리 소통하다보면 복잡한 문제가 생길 수 있다.
- 이런 복잡함을 낮춰주는 것이 바로 중재자 패턴이다. 객체들끼리 소통을 하는 방식을 규정하는 것이 바로 중재자 패턴이다.
- 이 중재자 객체를 통해서 소통을 하면 각 객체들 끼리의 의존성을 낮출 수 있다.

## 예시

채팅방 예시 :

- 채팅방에 참여하는 모든 사람들은 중재자를 통해서 소통한다.
- 참여자1 -> 메시지 -> 중재자 -> 메시지 -> 참여자 2

관제소와 파일럿의 관계 예시 :

- 파일럿이 다른 파일럿과 직접 소통하지 않는다.
- 만약 그렇게 한다면 결국에는 엄청난 혼란을 불러일으킬 것이다.
- 파일럿은 관제소에게 말한다.
- 그러면 관제소는 확실하게 해준다. 모든 비행기들이 정보를 받을 수 있도록. 그들이 안전하게 이륙하고 착륙할 수 있는 정보를 받을 수 있도록.
- 우리가 자바스크립트에서 비행기를 다루지는 않지만, 우리는 수없이 많은 객체들을 다룬다.
- 이런 컴포넌트들끼리의 의사소통은 객체가 많아질 수록 복잡해질 수 있다.

## 예제코드

```javascript
class Participant {
  constructor(name) {
    this.name = name
    this.chatroom = null
  }

  send(message, to) {
    this.chatroom.send(message, this, to)
  }

  receive(message, from) {
    log.add(from.name + "to" + this.name + ": " + message)
  }
}

let Chatroom = function () {
  let participants = {}

  return {
    register: function (participant) {
      participants[participant.name] = participant
      participant.chatroom = this
    },

    send: function (message, from, to) {
      if (to) {
        to.receive(message, from)
      } else {
        for (let key in participants) {
          if (participants[key] !== from) {
            participants[key].receive(message, from)
          }
        }
      }
    },
  }
}

log = (function () {
  let log = " "
  return {
    add: msg => {
      log += msg + "\n"
    },
    show: () => {
      alert(log)
      log = " "
    },
  }
})()

function run() {
  let yoko = new Participant("Yoko"),
    john = new Participant("John"),
    chatroom = new Chatroom()

  chatroom.register(yoko)
  chatroom.register(john)

  yoko.send("All you need is love.")
  yoko.send("I love you john")
  john.send("Hey, no need to broadcast", yoko)

  log.show()
}

run()
```

중재자 패턴의 가장 좋은 예시는 채팅방이다.

```javascript
class ChatRoom {
  logMessage(user, message) {
    const time = new Date()
    const sender = user.getName()

    console.log(`${time} [${sender}] : ${message}`)
  }
}

class User {
  constructor(name, chatroom) {
    this.name = name
    this.chatroom = chatroom
  }

  getName() {
    return this.name
  }

  send(message) {
    this.chatroom.logMessage(this, message)
  }
}

const chatroom = new ChatRoom()

const user1 = new User("John Doe", chatroom)
const user2 = new User("Jane Doe", chatroom)

user1.send("Hi there!")
user2.send("Hey!")
```

```javascript
var mediator = function () {
  //storage for topics that can be broadcast or listened to
  var topics = {}

  // subscribe to a topic, supply a callback to be executed
  // when that topic is broadcast to
  var subscribe = function (topic, fn) {
    if (!topic[topic]) {
      topics[topic] = []
    }

    topics[topic].push({ context: this, callback: fn })

    return this
  }

  var publish = function (topic) {
    var args
    if (!topic[topic]) {
      return false
    }

    args = Array.prototype.slice.call(arguements, 1)
    for (var i = 0, l = topics[topic].length; i < l; i++) {
      var subscription = topics[topic][i]
      subscription.callback.apply(subscription.context, args)
    }
    return this
  }

  return {
    publish: publish,
    subscribe: subscribe,
    installTo: function (obj) {
      obj.subscribe = subscribe
      obj.publish = publish
    },
  }
}
```

## 중재자 패턴의 장단점 :

- 중재자 패턴의 가장 큰 장점은 이것은 줄여준다 커뮤니케이션 채널을. 객체들 사이에 필요한 채널. 각각 소통이 필요했던 녀석들에 의해서 생길 뻔한 수없이 많은 채널들을 줄여줄 수 있다.
- 가장 큰 단점이라고 한다면 성능상의 문제일 수 있다. 항상 비 간접적으로 소통하기 때문에 그렇다.
- loose coupling의 특성 때문에, 시스템이 broadcasts만 보고 어떻게 반응해야할지 확립하는 것이 쉽지 않다.
- 중재자 패턴의 유용성은 곧 decoupled system의 장점이라고 말할 수 있다.
- decoupled되지 않은 system의 경우에는 수없이 많은 두통을 낳을 수 있다.
- 왜냐하면 이것은 하나에 문제가 생기면 domino같은 문제를 낳을 수 있기 때문이다.

## 중재자 패턴과 옵저버 패턴의 차이 :

- 많은 개발자들이 이 부분을 헷갈려한다.
- 인정하건데, 비슷한 부분이 많다.
- 이 둘 모두 loose coupling 해준다.
- 하지만 중재자 패턴은 객체가 중재자를 통해서 소통하도록 엄격하게 통제한다.
- 그리고 옵저버 패턴은 관찰 가능한 객체를 만든다. 그리고 그 객체가 자신을 구독하고 있는 객체에게 이벤트 알림을 보내는 방식이다.

[참고 : https://www.patterns.dev/posts/hoc-pattern/]
[참고 : https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch09s06.html]
[참고 : https://jsmanifest.com/the-mediator-pattern-in-javascript/]
[참고 : https://flowarc.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8Javascript-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4-%EC%A4%91%EC%9E%AC%EC%9E%90Mediator-%ED%8C%A8%ED%84%B4]
[참고 : http://jargon.js.org/_glossary/MEDIATOR_PATTERN.md]
