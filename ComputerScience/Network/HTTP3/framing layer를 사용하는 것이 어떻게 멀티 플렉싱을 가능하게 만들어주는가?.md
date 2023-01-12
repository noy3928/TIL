## framing layer를 사용하는 것이 어떻게 멀티 플렉싱을 가능하게 만들어주는가?

HTTP3에서 프레밍 레이어는 하나의 연결 커넥션에서 다수의 데이터 스트림을 전송하는 것을 가능하게 하는 멀티 플렉싱에 대한 책임을 가지고 있다. 프레이밍 레이어는 HTTP3의 레이어인데, 이것은 전송 계층인 QUIC 프로토콜 위에 있고, HTTP 계층 아래에 있다. 그 사이에 있는 계층인 것이다. 

프레이밍 레이어는 데이터를 프레임들로 쪼갬으로써 멀티플렉싱을 가능하게 한다. 그러고나면 프레임들은 연결을 통해서 전송된다. 각각의 프레임들은 스트림 식별자를 할당받는다. 이 식별자는 수신자가 프레임이 어디 스트림에 속해있는 것인지 식별할 수 있도록 해준다. 수신자는 원래의 데이터를 올바르게 재구축하기 위해서 프레임들을 각각의 스트림별로 한데 모을 수 있다. 

프레이밍 레이어는 또한 흐름 제어, 에러 정정 메커니즘을 포함하고 있다. 이것들은 데이터 전송의 효율성과 안정성을 보장하는데에 도움을 준다. 예를 들어서, 프레이밍 레이어는 데이터가 전송될 때의 비율을 조율하기 위해서 슬라이딩 윈도우 메커니즘을 사용할 수 있다. 그리고 에러를 감지하고 전송된 데이터 안에 있는 에러를 고치기 위해서 에러 정정 코드를 포함할 수 있다. 

결론적으로, HT

Overall, the framing layer in HTTP/3 enables multiplexing by dividing the data into frames and assigning stream identifiers, and also includes flow control and error correction mechanisms to improve the efficiency and reliability of data transmission.


## framing layer의 어떤 점이, HTTP2의 멀티플렉싱 보다 HTTP3의 멀티플렉싱을 더 낫도록 만들어 준 것인가?



## HTTP2의 프레이밍 레이어와 HTTP3의 프레이밍 레이어는 어떤 차이가 있는가? 

