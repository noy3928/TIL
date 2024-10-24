https://www.youtube.com/watch?v=4HlNv1qpZFY&t=450s

- agenda
  - http
  - websocket
  - server sent event
  - sse example
  - sse pros and cons

## http 1.0

- 이 프로토콜에서는 GET /index.html 요청을 보내면 서버는 파일을 찾아서 응답을 보낸다. 그렇게 응답을 보내고나면 한번 열었던 커넥션은 닫는다.
- 다른 요청을 보내기 위해서는 커넥션을 다시 열어야 한다.
- 이러한 방식은 비효율적이다.

## http 1.1

- 이 프로토콜에서는 커넥션을 열고 닫는 과정을 최적화하여 비효율적인 문제를 해결했다.
- 커넥션을 열고 닫는 과정을 최적화하여 비효율적인 문제를 해결했다.
- 커넥션을 열고 나서 여러번의 요청을 주고받은 후에 닫을 수 있다. 이것이 훨씬 더 효율적이다.

## websocket

- 웹소켓도 처음에 3웨이 핸드 쉐이크 처럼 커넥션을 열고 닫는다.
- 최초에 GET 1.1 UPGRADE 요청을 보낸다.
- 그러면 서버는 101 - SWITCHING PROTOCOLS 응답을 보낸다.
- 이후에는 커넥션이 열려있는 상태로 양방향으로 데이터를 주고받을 수 있다.

## server sent event

- 양방향이 필요없고, 클라이언트가 뭔가를 보낼필요가 없는 상황에서 유용하다.
- 최초에 클라이언트는 GET text/event-stream 요청을 보낸다. 이것이 trigger이다. to establish a connection.
- 그럼 서버는 text/event-stream 타입의 응답을 보낸다. 헤더에는 content-type이 text/event-stream이다.
  - 그리고 Transfer-Encoding: chunked 헤더가 있다. 이것은 데이터를 여러 청크로 나누어 보낸다는 것을 의미한다.
  - 이렇게하는 이유는 언제 어떤 데이터가 마지막 데이터가 될 지 모르기 때문에 알려주는 것이다.
- 이후에 서버는 데이터를 보내면 클라이언트는 받아서 처리한다.

## code example

```js
const app = require("express")();

app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");

  res.send("data: hello world\n\n");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```
