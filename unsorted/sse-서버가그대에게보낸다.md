https://www.youtube.com/watch?v=i4-MNzNML_c

## SSE를 사용하게 되는 배경

- 경우에 따라 웹소켓의 대체제가 될 수 있는 것이다.
- 일반적인 http 프로토콜은 클라이언트에서 요청을 보내야만 서버가 응답할 수 있다.
- 이러한 구현은 제한이 있음. 그래서, 서버의 단에서 클라이언트에게 데이터를 보내는 방법이 필요하다. 이것을 위해 웹소켓이 활용되기도 함.
- 그러나, 꼭 양방향이 아니어도 서버 측에서만 보내는 것이 필요할 수도 있다.
  - 예를 들면, 서버에서 어떤 프로그래스가 진행되고 있음을 보여주기만 하는 되는 경우라면 서버에서만 응답을 보내주면 된다. 굳이 클라이언트가 응답을 요구하지 않아도 되는 것이다.
  - 실시간으로 어떤 소식이나 동향을 알려주는 경우에
- SSE를 사용하며 좋다.

- 나만의 정리 :
  - 클라이언트의 요청이 없이도, 서버 측에서 특정한 응답을 보내주고 싶은 경우에 SSE를 사용하면 좋다.

## 구현과 동작방식

- 클라이언트가 먼저 서버에게 SSE로 통신하자고 요청을 보낸다.
  - 지금부터 무슨 일이 있으면 나에게 말해줘. 나는 듣기만 할께.
- 서버는 이 요청을 수신하고 수락했음을 알리는 메시지를 보낸다.
- 클라이언트는 이를 받고, 지금부터 서버가 보내주는 데이터들에 반응할 준비를 한다.
- 이 시점부터 서버는 정해진 이벤트가 있을 때마다 클라이언트에게 메시지를 보내게 된다.
- 단방향 통신이기 때문에 응답을 할 수는 없다.
- 클라이언트는 서버로부터 메시지가 도착할 때마다 이에 반응하여 화면을 업데이트하는 등 필요한 작업을 한다.
- 이 모든 과정은 하나의 연결 안에서 계속 이루어진다. 만약 연결이 끊어지면 클라이언트는 자동으로 재연결을 요청하여 통신을 재개한다.
- 필요한 작업을 마치면 클라이언트 또는 서버에서 상대방에게 종료를 통보하는 메시지를 보냄으로써 연결이 끝나게 된다.
- 이 모든 과정은 HTTP를 통해서 이루어진다.

## 코드

```js
const source = new EventSource("(sse-server-url)");

source.onopen = function () {
  console.log("Connection opened.");
};

source.onmessage = function (event) {
  console.log("New message", event.data);
};

source.onerror = function (err) {
  console.error("EventSource failed:", err);
};
```

- EventSource는 HTML5 웹 표준에 정의되어있다.
- 클라이언트는 지정된 URI로 서버에게 요청을 보낸다.
- 해당 요청에는 SSE 통신을 통해 이벤트 스트림이라는 형식의 메시지를 수신하겠다는 의미의 헤더가 실린다.

```
GET /sse HTTP/1.1
Host : sse-server-url
Accept : text/event-stream
```

- 이것을 수신한 서버는, 해당 형식으로 작성된 메시지임을 명시하는 헤더를 실은 응답을 보낸다.

```
HTTP/1.1 200 OK
Content-Type : text/event-stream
Cache-Control : no-cache
Connection : keep-alive // 연결을 유지한다는 응답
```

- Connection 을 keep-alive로 해놓음으로써 하나의 TCP 연결을 계속 유지한다. 때문에 SSE에서 서버는 큰 부담을 받지 않고 지속적인 메시지 전송을 할 수 있게 된다.
- 서버의 첫번째 응답 이후로는 메시지에 HTTP 헤더가 실릴 필요가 없게 된다.
- 이후에 서버는 지정된 이벤트가 발생할 때마다 실시간으로 클라이언트에게 메시지들을 보내고 클라이언트에서는 EventSource 또는 이에 해당하는 객체가 각 메시지에 반응하여 해당하는 프론트엔드 작업을 실행한다.

### 서버에서 보내는 데이터의 형식은 다양할 수 있다.

```
data : Hello!
```

```
data : First message
data : Second message
data : Third message
```

```
id : 1
data : First message
```

이런 방식으로 다양한 데이터를 담을 수도 있고,
id를 담아서 보낼 수도 있다.
이렇게 id를 담는 경우에는 연결이 끊어졌다가 재개될 경우, 클라이언트가 마지막으로 받은 id를 요청에 실어보냄으로써 어디서부터 다시 받아야 할 지 명시할 수 있게 된다.

```
event : customEvent
data : Custom message
```

- 이런 방식으로 이벤트의 유형도 명시할 수 있다.
- 그러면 클라이언트도 아래와 같이 반응할 수 있다.

```js
source.addEventListener("customEvent", function (event) {
  console.log("Received " + event.data);
});
```

```
retry : 5000
```

이 값은 연결이 끊어진 경우에 몇 밀리초 후에 시도할지를 명시할 수 있다

```
: ping
```

- 이런 식으로 코멘트도 달 수 있다.

### 자동 재연결

- 브라우저의 EventSource 객체는 자동 재접속 기능을 내장하고 있다.
- 때문에 클라이언트가 따로 구현해두지 않아도, 연결이 비정삭적으로 끊길 때마다 자동으로 다시 요청을 보낸다.
- 심지어 아래와 같이

```
GET /sse HTTP/1.1
Host : sse-server-url
Accept : text/event-stream
Last-Event-ID : 123456
```

- 이렇게 Last-Event-ID가 포함되어있을 경우, 이를 헤더에 실어보내서 서버가 그 다음에 해당하는 메시지부터 보낼 수 있도록 해준다.

### 종료하는 법

- 클라이언트에서 종료하는 법

```
source.close();
```

- 서버에서 종료하는 법

```
event : end
data : Connection closed
```

```js
source.addEventListener("end", function (event) {
  console.log("Connection closed");
  source.close();
});
```

- 이렇게 서버가 종료 객체를 보내면 그것을 수신하고 닫는 방식으로 해도 된다.

---

## HTTP2의 서버푸시와 sse의 차이점

- 용도와 방식이 다르다. HTTP2의 서버 푸시는 클라이언트가 필요로 할 것이라 여겨지는 리소스들을 미리 보내주는 것이다.

---

## 웹소켓과 비교한 장점 :

- 웹소켓처럼 서버 설정등이 까다롭지 않다.
- HTTP 기반이기 때문에 방화벽에도 친화적이다.
-
