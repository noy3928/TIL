# ProxyPattern

- 프록시는 번역하면 대리자, 대변인의 의미를 가지고 있다.
- 이는 프로그래밍에서도 마찬가지다. 프록시에게 특정 일을 대신 맡기는 것이다.
- 일반적으로 프록시는 다른 무언가와 이어지는 인터페이스의 역할을 하는 클래스이다.
- 프록시는 비서역할을 한다.
- 중요한 것은 흐름만 제어할 뿐이지, 결과값을 조작하거나 변경시키면 안된다.
- 비서에게 대신 연락처 목록을 정리해서 달라고 지시했다면, 그 연락처 목록을 정리한 결과만 컴퓨터에서 받아서 전달해줘야 한다. 연락처를 수정하거나, 전화를 하면 안된다. 마찬가지로 프록시도 자신의 의견을 반영하는 것을 목적으로 하지 않고 제어의 흐름을 변경하거나 다른 로직을 수행하기 위해 사용하는 것이다.
- 사장님한테 사소한 질문을 하기보다는 비서한테 먼저 물어보는 개념이라고 생각할 수 있다.
- 어떤 객체를 사용하고자 할때, 객체를 직접적으로 참조 하는것이 아니라, 해당 객체를 대행(대리, proxy)하는 객체를 통해 대상객체에 접근하는 방식을 사용한다. 이렇게하면 해당 객체가 메모리에 존재하지 않아도 기본적인 정보를 참조하거나 설정할 수 있다. 또한 실제 객체의 기능이 반드시 필요한 시점까지 객체의 생성을 미룰 수 있다.
- 실제 기능을 수행하는 객체Real Object 대신 가상의 객체Proxy Object를 사용해 로직의 흐름을 제어하는 디자인 패턴이다.
- 프록시 서버 : 프록시 서버는 클라이언트와 서버 사이에서 데이터를 대신 요청하고 대신 받아주는 역할을 한다. 보안을 이유로 클라이언트가 서버에 직접 접근하지 못하게 하기 위해서, 혹은 중간에서 자주 쓰는 데이터를 캐싱해놓아 서버의 부담을 덜어주기 위해서 사용하기도 한다. (물론 프록시가 위치한 곳에 따라 더 많고 다양한 기능이 있겠지만)
- 프록시는 대리인이라는 뜻입니다. 즉 사용자가 원하는 행동을 하기 전에 한 번 거쳐가는 단계를 뜻합니다.
- 좋은 프록시는 사용자의 요청을 캐싱하여 성능을 높일 수도 있고, 에러를 잡아낼 수도 있다. 하지만 나쁜 프록시는 사용자의 요청을 왜곡하여 다른 동작을 하도록 만들 수도 있다. 양날의 검이다.
- 서버 구성을 할 때 프록시 서버를 두어 패킷양을 조절하거나 중간 레이어를 두어 완충 역할을 할 수도 있다.
- proxy와 subject는 같은 인터페이스를 가지고 있다.
- proxy는 subject에서 실행될 작업의 전부 또는 일부를 가로채서 해당 동작을 향상시키거나 보완한다.
- proxy 객체가 있으면 우리는 특정 객체에 대해서 더 많은 상호작용을 주고받을 수 있다. proxy 객체와 상호작용할 때 할 행동을 결정할 수 있다. 이를테면 객체의 값을 가져오거나, 값을 설정 할 때도 행동들을 설정할 수 있다.
- 일반적오는 proxy는 대리인을 말한다. 특정 사람에게 직접 말하기 보다는, proxy person에게 말할 것이다. 그리고 이 proxy person은 당신이 접근하려는 사람의 대리인 역할을 하는 사람이다. 이런 일이 자바스크립트에도 동일하게 일어난다. target object에 직접 접근하기 보다는 proxy object를 통해서 소통하게 될 것이다.
-

<br>

## 이 패턴이 필요한 이유?

- 성능 개선에 도움을 준다. 왜냐면 실제 대상 객체를 보호하여 되도록 일을 적게 시키기 때문이다. 구체적으로 lazy한 초기화 이다. 초기화의 경우 비용이 발생하는데, 최초 초기화 요청을 대신 받지만 실제 객체가 정말로 사용되기 전까지는 요청 전달하지 않는다. 이는 애플리케이션의 응답성을 향상 시킨다.

<br>

## 특징

- 원래 하려던 기능을 수행하며 그외의 부가적인 작업(로깅, 인증, 네트워크 통신 등)을 수행하기에 좋습니다.
- 비용이 많이 드는 연산(DB 쿼리, 대용량 텍스트 파일 등)을 실제로 필요한 시점에 수행할 수 있습니다.
- 사용자 입장에서는 프록시 객체나 실제 객체나 사용법은 유사하므로 사용성이 좋습니다.
- 프록시를 미들웨어라고 부르기도 한다.
  - 미들웨어 패턴과 비슷한 부분이 있기 때문이다.
  - 1)미들웨어 패턴처럼 어떤 함수의 입력/출력 전처리와 후처리를 할 수 있다.
  - 2)미들웨어와 유사한 pipeline을 이용해서 동일한 method에 대해 여러 후크를 등록할 수 있다.

### 장점 :

- 사이즈가 큰 객체(ex : 이미지)가 로딩되기 전에도 프록시를 통해 참조를 할 수 있다.
- 실제 객체의 public, protected 메소드들을 숨기고 인터페이스를 통해 노출시킬 수 있다.
- 로컬에 있지 않고 떨어져 있는 객체를 사용할 수 있다.
- 원래 객체의 접근에 대해서 사전처리를 할 수 있다.

### 단점 :

- 객체를 생성할때 한단계를 거치게 되므로, 빈번한 객체 생성이 필요한 경우 성능이 저하될 수 있다.
- 프록시 내부에서 객체 생성을 위해 스레드가 생성, 동기화가 구현되야 하는 경우 성능이 저하될 수 있다.
- 로직이 난해해져 가독성이 떨어질 수 있다.

<br>

## 예시

### 1.이미지 & 텍스츠 초기 렌더링

- 용량이 큰 이미지와 글이 같이 있는 문서를 모니터 화면에 띄운다고 가정하자. 이미지는 용량이 크고 텍스트는 용량이 작다. 텍스트는 빠르게 나타나지만 그림은 조금 느리게 로딩될 것이다. 만약 이렇게 처리가 안되고 이미지와 텍스트가 모두 로딩이 된 후에야 화면이 나온다고 가정해보자. 그럼 사용자는 페이지가 로딩될때까지 의미없이 기다려야 한다. 그러므로 로딩이 빠르게 되는 텍스트라도 먼저 나오는게 좋습니다. 이런 방식을 어떻게 구현하나? 텍스트 처리용 프로세서, 그림 처리용 프로세스를 별도로 운영하면 된다. 이런 구조를 갖도록 설계하는것이 바로 프록시 패턴이다. 일반적으로 프록시는 다른 무언가와 이어지는 인터페이스의 역할을 하는 클래스를 의미한다.

### 2.동영상 목록 받아오기

- 프록시가 없다면 동영상 목록들을 매번 받아와야 한다. 프록시가 있으면 횟수를 줄일 수 있다.
  - Videos <--> HTTP : 3번 요청 시 3번의 id 요청 / 3번의 응답이 발생
  - Videos <--> Proxy <--> HTTP : 프록시에 id요청을 모아놓은 후 보내고, 한번에 응답을 받는다. 프록시는 응답을 각각 나눠준다.

### 3.캐시 처리

- 프록시 내에 캐시 프로퍼티를 정의하여 요청 결과를 캐싱할 수 있다.
  Videos <--> Proxy <--> HTTP

  1.Proxy로 보낸 후 HTTP로 보낸다.  
  2.요청을 받아 프록시 캐시에 저장하고 리턴한다.  
  3.요청을 받을 때 프록시 캐시에 이미 결과가 있나 확인한다.  
  4.있으면 캐시에서 바로 내려주고, 없으면 1번 작업 반복

- proxy가 내부 캐시를 유지해서 데이터에 캐시가 존재하지 않는 경우에만 subject에서 작업이 실행되도록 한다.

### 4.데이터 유효성 검사

proxy가 subject로 데이터를 보내기 전에 유효성을 검사한다.

### 5.비밀번호 암호화

회원가입 시 db에 데이터를 저장하기 전에 proxy가 암호화를 진행한다.

## 프록시 패턴의 종류

### 가상 프록시(virtual proxy) :

### 보호 프록시(protection proxy) :

<br>

## 프록시 예제 코드

<br>

### 전화번호부 예제 :

```javascript
function PhoneBook() {
  this.dictionary = {
    이승민: "01012341234",
    이현섭: "01023456789",
    오유근: "01077777777",
  }
}

PhoneBook.prototype.get = function (name, callback) {
  var self = this
  setTimeout(function () {
    callback(self.dictionary[name])
  }, 3000)
}
```

이 전화번호부 클래스의 get()이 호출될 때마다, 조회수를 따로 기록하여 저장하고 싶다면 어떡해야 할까? 전화번호부 클래스의 코드를 고치는 것은 예상치못한 사이드 이펙트를 초래할 수 있기 때문에 지양하고 싶다.

이런 경우에 프록시 패턴을 사용할 수 있다.

```javascript
function PhoneBookProxy() {
  var phoneBook = new PhoneBook()
  var viewCount = 0

  return {
    get: function (name, callback) {
      viewCount++
      phoneBook.get(name, callback)
    },

    getViewCount: function () {
      return viewCount
    },
  }
}
```

위와 같이 프록시 객체를 구현해서 조회수를 따로 저장하고 PhoneBook을 대리하는 객체로 PhoneBookProxy를 사용하면 된다. 이 때 프록시 클래스는 공개된 인터페이스인 get()메소드를 반드시 구현해야 한다.

<br>

### 대문자 이름 반환 예제

```javascript
/**
 * @target : proxy가 적용되는 subject
 * @handler : proxy의 동작을 정의하는 object, instance 에서 수행될 때 자동으로 호출되는 트랩
 */
const proxy = new Proxy(target, handler)

const scientist = {
  name: "nikola",
  surname: "tesla",
}

const uppercaseScientist = new Proxy(scientist, {
  get: (target, property) => target[property].toUpperCase(),
})

console.log(uppercaseScientist.name, uppercaseScientist.surname)
//NIKILA TESLA
```

### Person 예제 :

```javascript
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American",
}
```

이 person object에 직접 접근하기 보다는 proxy object를 통해서 접근할 것이다.

```javascript
const personProxy = new Proxy(person, {})
```

proxy의 두번째 인자는 객체이다. 그 객체는 handler를 가리킨다.  
이 handler 안에는 우리는 정의할 수 있다. 객체와 상호작용할 때 일으킬 특정 behavior들을.  
여러가지를 넣을 수 있겠지만, 가장 대표적으로는 get 과 set이 있다.
get : Gets invoked when trying to access a property
set : Gets invoked when trying to modify a property

이렇게 함으로써 person object에 직접 접근하지 않고, proxy object를 통해서 접근하게 되었다.

이제 handlers를 넣어보자.  
property를 수정하려고 할 때, 그러니까 set 메서드를 사용할 때,  
우리는 proxy가 출력해주기를 원한다. 이전의 value와 새롭게 바뀐 value를.  
그리고 특정 값에 접근하려고 할 때, 그러니까 get 메서드를 사용하려고 할 때,
우리는 proxy가 출력해주기를 원한다. 더 읽을 만한 문장을 property의 key와 value를 포함한.

```javascript
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`)
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`)
    obj[prop] = value
  },
})
```

이제 우리가 name 속성에 접근하려고 하면,  
프록시는 다음과 같은 문장을 반환할 것이다.
"The value of name is John Doe."

그리고 age 값을 수정하려고하면,  
프록시는 다음과 같은 값을 반환할 것이다.  
"Changed age from 42 to 43"

프록시는 또한 validation에도 유용하다.  
유저는 person의 age를 문자열로 바꾸는 것이 불가능하다.  
또는 빈 이름을 주는 것도 불가능하다.  
그리고 만약에 유저가 존재하지 않는 속성에 접근하려고 한다면, 우리는 유저에게 알려줄 필요도 있다.

```javascript
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log(
        `Hmm.. this property doesn't seem to exist on the target object`
      )
    } else {
      console.log(`The value of ${prop} is ${obj[prop]}`)
    }
  },
  set: (obj, prop, value) => {
    if (prop === "age" && typeof value !== "number") {
      console.log(`Sorry, you can only pass numeric values for age.`)
    } else if (prop === "name" && value.length < 2) {
      console.log(`You need to provide a valid name.`)
    } else {
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`)
      obj[prop] = value
    }
  },
})
```

또한 이런 프록시 객체는 객체의 순수성을 지켜주기도 한다.

## Reflect

자바스크립트는 Reflect라는 내장함수를 제공한다.  
이것은 우리가 proxy로 작업하려할 때, target object를 조작하기 쉽게 만들어준다.

이전에 우리는 proxy 안에서 직접 target object의 값에 접근해서 property를 조작했다.  
근데 우리는 Reflect object를 대신 사용할 수 있다.  
이 Reflect object의 methods는 handler object의 methods와 같은 이름을 가지고 있다.

obj[prop]와 같은 방식으로 접근하거나, obj[prop] = value 와 같은 방식으로 값을 설정하는 방법 대신에,  
우리는 Reflect.get() 그리고 Reflect.set() 과 같은 방식으로 동일한 동작을 할 수 있다.

이 methods들은 handler object와 같은 인자를 받는다.

```javascript
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`)
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`)
    Reflect.set(obj, prop, value)
  },
})
```

아래는 전체 코드이다.

```javascript
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American",
}

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`)
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`)
    return Reflect.set(obj, prop, value)
  },
})

personProxy.name
personProxy.age = 43
personProxy.name = "Jane Doe"
```

프록시는 강력한 방법이다 object의 행동에 대한 추가적인 행동을 하기에.  
프록시는 다양한 사용예시를 가지고 있다.  
validation, formatting, notification, debugging.
