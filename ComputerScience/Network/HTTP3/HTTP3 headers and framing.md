# HTTP3의 헤더와 프레이밍 

HTTP3 헤더는 전송된 요청과 응답 정보를 전달하기 위해서 사용된다. 예를 들면 보내진 컨텐츠의  타입이나, 사용된 인코딩이나, 리소스의 위치같은 정보들이 제공되는 것이다. 

HTTP3에서 헤더는 HPACK을 이용해서 포맷되고, 인코딩되어 있다. 이것은 헤더의 사이즈를 줄이고 데이터 전송의 효율을 높이기 위해서 설계된 압축 알고리즘이다. 

HTTP3는 또한 커넥션을 통해 전송되는 데이터를 구조화하기 위해서 framing layer를 사용한다. framing layer는 어떻게 데이터가 프레임으로 나누어 들어가는지 정의한다. 그러니까 커넥션을 통해서 들어가는 것이다. 각각의 프레임은 헤더를 포함하고 있다. 그리고 이 헤더에는 프레임이 포함된 데이터의 타입과 길이를 가지고 있다. 다른 플래그나 메타데이터도 물론 포함하고 있다. 

framing layer의 사용은 HTTP3가 mulitiplexing을 할 수 있도록 허용해준다. 이것은 다수의 데이터 스트림이 하나의 커넥션에서 동시에 전송될 수 있도록 허용한다. 이것은 병렬적으로 다수의 요청이 진행되는 것이 허용함으로써, HTTP3의 성능을 향상시키는데에 도움을 줄 수 있다. 

결국에, 헤더의 사용과 프레이밍의 사용은 데이터 전송의 효율성과 신뢰성을 향상시키는데에 도움이 된다. 또한 멀티 플렉싱과 흐름제어와 같은 새로운 기능도 가능하게 만들어주는 것이다. [[what is flow control in http?]]  


## framing layer를 사용하는 것이 어떻게 멀티 플렉싱을 가능하게 만들어주는가? 

In HTTP/3, the framing layer is responsible for multiplexing, which is the process of transmitting multiple streams of data concurrently over a single connection. The framing layer is a layer of the HTTP/3 protocol stack that sits above the transport layer (QUIC) and below the HTTP layer.

The framing layer enables multiplexing by dividing the data into frames, which are then transmitted over the connection. Each frame is assigned a stream identifier, which allows the receiver to identify the stream that the frame belongs to. The receiver can then reassemble the frames for each stream in the correct order to reconstruct the original data.

The framing layer also includes flow control and error correction mechanisms, which help to ensure the efficient and reliable transmission of data. For example, the framing layer can use a sliding window mechanism to regulate the rate at which data is transmitted, and can include error correction codes to detect and correct errors in the transmitted data.

Overall, the framing layer in HTTP/3 enables multiplexing by dividing the data into frames and assigning stream identifiers, and also includes flow control and error correction mechanisms to improve the efficiency and reliability of data transmission.


## 헤더의 사용과 프레이밍의 사용이 흐름 제어와 같은 새로운 기능을 가능하게 만들어주는 이유는 무엇인가? 




