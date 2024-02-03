# Request - Response

## Request와 Response의 모델

- client sends a Request
  - 이 request가 무엇인지에 대해서는 정말 할 말이 많다.
- server parses the Request
  - 서버는 reuqest를 이해해야 한다. 그리고 parse하는 것의 비용은 결코 가볍지가 않다.
- server processes the Request
  - 서버가 request를 parse하고 나면, 반드시 이것을 process해야한다.
  - parse하는 것과 execute하는 것은 다르다.
- server sends a Response
  - process가 끝나고나면, 서버는 response를 보내야 한다.
- client receives the Response and consume

  - client는 response를 받아야 한다.
  - 그리고 이것을 consume해야 한다.

## 이 Request와 Response의 모델은 어디에 쓰이는가?

- Web, HTTP, DNS, SSH
  - 이 모든 것들에 사용된다.
- RPC(remote procedure call)
- SQL and Database Protocols
- APIs(Rest, soap, graphql)

## Request와 Response에 대한 분석

- Request의 구조는 클라이언트와 서버 둘 다에 의해서 정의된다.
- request has a boundary
- defined by a protocol and message format
  - 여기서 정의된 것은 반드시 클라이언트와 서버 둘 다에서 이해될 수 있어야 한다.

## Building an upload image service with request response

## request와 response 모델이 사용되지 않는 곳

- notification service
  - 알림 서비스는 대체로 실시간으로 정보를 전달해야 하는 특성 때문에 request-response 모델에 제한을 받습니다. 클라이언트가 서버에 계속 요청을 보내 상태를 확인하는 대신, 서버는 특정 이벤트가 발생했을 때 클라이언트에게 자동으로 정보를 보내야 할 필요가 있습니다. 이 경우, 웹소켓 같은 지속적인 연결을 유지하는 기술이나 푸시 알림 같은 대안적인 방법이 더 적합할 수 있습니다.
- chatting application
  - 채팅 애플리케이션은 양방향 통신이 실시간으로 발생해야 하는 경우입니다. 사용자 간의 대화는 지속적이고 실시간적인 데이터 교환을 필요로 합니다. 이런 환경에서는 웹소켓 같은 기술이 request-response 모델보다 효율적입니다. 웹소켓은 한 번의 연결 설정 후 지속적인 데이터 교환이 가능하여 실시간 통신을 원활하게 합니다.
- very long requests
  - 매우 긴 요청은 처리 시간이 길거나, 서버가 요청을 처리하는 데 시간이 많이 걸리는 경우를 의미합니다. 이런 상황에서는 클라이언트가 타임아웃 없이 긴 시간 동안 대기하는 것이 비효율적일 수 있습니다. 대신, 비동기 통신 방식, 예를 들어 작업을 큐에 넣고 완료되면 결과를 클라이언트에 알리는 방법 등이 사용될 수 있습니다.
- what if client disconnects?
- we will talk about alternatives

---

## 추가 공부 자료

### RPC(Remote Procedure Call)

RPC(Remote Procedure Call)는 네트워크를 통해 다른 컴퓨터에 위치한 프로그램이나 프로세스를 마치 로컬에서 호출하는 것처럼 사용할 수 있게 하는 프로토콜 또는 기술입니다. RPC의 기본 개념은 클라이언트-서버 모델을 기반으로 하며, 클라이언트가 서버에 있는 함수나 프로시저를 원격으로 호출할 수 있게 해줍니다. 이 과정에서 함수의 실행을 위해 필요한 매개변수들은 네트워크를 통해 서버로 전송되고, 실행 결과는 다시 클라이언트로 반환됩니다.

RPC는 분산 시스템에서 널리 사용되며, 다양한 분야에서 응용 프로그램 간의 통신을 단순화하기 위해 활용됩니다. 예를 들어, 웹 서비스, 클라우드 기반 서비스, 마이크로서비스 아키텍처 등에서 RPC를 통해 서로 다른 서비스 간의 상호작용을 구현할 수 있습니다.

RPC는 여러 가지 프로토콜과 기술을 포함하는 개념으로, JSON-RPC, XML-RPC, gRPC와 같은 다양한 구현 방식이 있습니다. 각각의 구현 방식은 사용하는 데이터 포맷이나 프로토콜에 차이가 있지만, 기본적인 원리는 클라이언트가 서버의 함수를 원격으로 호출하여 결과를 받는 것입니다.

JSON-RPC와 XML-RPC는 각각 JSON과 XML 포맷을 사용하여 메시지를 교환합니다.
gRPC는 Google에서 개발한 RPC 시스템으로, 프로토콜 버퍼(Protocol Buffers)를 사용하여 효율적인 데이터 직렬화를 제공하며, HTTP/2를 기반으로 고성능 통신을 지원합니다.
RPC는 네트워크 상에서 복잡한 프로세스 간 통신을 추상화하고, 개발자가 분산 시스템에서 마치 로컬 시스템 내에서 함수를 호출하듯이 편리하게 작업할 수 있도록 돕습니다.
