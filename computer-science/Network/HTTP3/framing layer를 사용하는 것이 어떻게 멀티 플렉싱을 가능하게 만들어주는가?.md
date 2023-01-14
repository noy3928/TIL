## framing layer를 사용하는 것이 어떻게 멀티 플렉싱을 가능하게 만들어주는가?

HTTP3에서 프레밍 레이어는 하나의 연결 커넥션에서 다수의 데이터 스트림을 전송하는 것을 가능하게 하는 멀티 플렉싱에 대한 책임을 가지고 있다. 프레이밍 레이어는 HTTP3의 레이어인데, 이것은 전송 계층인 QUIC 프로토콜 위에 있고, HTTP 계층 아래에 있다. 그 사이에 있는 계층인 것이다. 

프레이밍 레이어는 데이터를 프레임들로 쪼갬으로써 멀티플렉싱을 가능하게 한다. 그러고나면 프레임들은 연결을 통해서 전송된다. 각각의 프레임들은 스트림 식별자를 할당받는다. 이 식별자는 수신자가 프레임이 어디 스트림에 속해있는 것인지 식별할 수 있도록 해준다. 수신자는 원래의 데이터를 올바르게 재구축하기 위해서 프레임들을 각각의 스트림별로 한데 모을 수 있다. 

프레이밍 레이어는 또한 흐름 제어, 에러 정정 메커니즘을 포함하고 있다. 이것들은 데이터 전송의 효율성과 안정성을 보장하는데에 도움을 준다. 예를 들어서, 프레이밍 레이어는 데이터가 전송될 때의 비율을 조율하기 위해서 슬라이딩 윈도우 메커니즘을 사용할 수 있다. 그리고 에러를 감지하고 전송된 데이터 안에 있는 에러를 고치기 위해서 에러 정정 코드를 포함할 수 있다. 

결론적으로, HTTP3안에서의 프레이밍 레이어는 데이터를 프레임으로 쪼개고, 스트림 식별자를 부여하는 행위를 통해서 그리고 흐름제어와 에러정정 메너커니즘을 포함함으로써 멀티플렉싱을 가능하게 한다. 


## framing layer의 어떤 점이, HTTP2의 멀티플렉싱 보다 HTTP3의 멀티플렉싱을 더 낫도록 만들어 준 것인가?

HTTP2에서 멀티플렉싱은 하나의 연결에서 다수의 데이터 스트림을 보낼 수 있게 함으로써 달성되었다. 그리고 이 각각의 스트림들에는 스트림 식별자가 부여되어있다. H2에서 프레이밍 레이어는 이 스트림 식별자와 컨트롤 정보들을 프레임으로 인코딩 하는 것에 책임이 있다. 
반면에, H3에서 멀티플렉싱은 QUIC이라는 전송 프로토콜에 의해서 달성된다. 이 QUIC은 TCP대신 UDP를 기반으로 만들어져있다. QUIC은 새로운 종류의 프레임을 가지고 있는데, 그것은 packetization 계층이라고 불린다. 이것은 데이터를 패킷이라고 불리는 훨씬 작은 단위로 쪼갠다. 이 패킷들은 더 효율적으로 네트워크의 리소스를 이용하고, 성능적인 측면을 최적화하면서, 독립적으로 보내질 수도 있고, 받을 수도 있다. 
핵심적인 차이점은 H3에서의 멀티플렉싱은 스트림 레벨 보다는 패킷 레벨에서 이루어진다는 것인데, 이 말인즉 이것은 네트워크의 리소스를 이용할 때 훨씬 더 유역하고 효율적이라는 의미가 된다. 또한 H3는 QUIC을 이용하기 때문에 성능적인 측면에서 이점이 존재한다. 

- 영문 내용 :
	- In HTTP2, multiplexing is achieved by sending multiple streams of data over a single connection, with each stream being assigned an associated stream ID. The framing layer in HTTP2 is responsible for encoding this stream ID and other control information into the frames that are transmitted over the connection.
	- In contrast, in HTTP3, multiplexing is achieved by using the new QUIC (Quick UDP Internet Connections) transport protocol, which is built on top of the User Datagram Protocol (UDP) instead of TCP. QUIC includes a new type of framing called packetization layer that divides data into smaller units called packets. These packets can be sent and received independently of one another, allowing for more efficient use of network resources and improved performance in certain network environments.
	- The key difference is that, in HTTP3 the multiplexing is done at packet level instead of a stream level, which allows more flexibility and efficiency in using the network resources. Also HTTP3 uses QUIC which is built on top of UDP thus providing improved performance over TCP that is used in HTTP2.

## pacektization이란 무엇인가? 

## HTTP3에서의 멀티플렉싱은 스트림 레벨 보다는 패킷 레벨에서 이루어진다는 것은 어떤 의미인가? 


## HTTP2의 프레이밍 레이어와 HTTP3의 프레이밍 레이어는 어떤 차이가 있는가? 

