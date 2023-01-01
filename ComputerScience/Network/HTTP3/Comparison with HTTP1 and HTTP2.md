HTTP1과 HTTP2는 HTTP 프로토콜의 이전 버전이다. 이것들은 인터넷에서 널리 사용했었다. 아래의 글들은 3버전과 다른 몇가지 주된 내용들을 소개하고 있다. 

- 멀티플렉싱 : HTTP1은 멀티플렉싱을 지원하지 않는다. 이것이 의미하는 바는 하나의 커넥션에서는 오직 하나의 요청만 보내질 수 있다는 것이다. HTTP2는 멀티플렉싱을 소개하고 있으며, 이것은 하나의 커넥션에서 자수의 요청들이 동시에 전달될 수 있도록 만들어준다. HTTP3는 프레이밍을 이용한 이런 멀티플렉싱이라는 기술에 근거에 만들어졌으며, 이는 멀티플렉싱을 훨씬 더 효율적으로 만들어준다. [[HTTP3의 프레이밍레이어는 어떻게 HTTP2보다 효율적으로 멀티플렉싱을 가능하게 했는가?]]

- 헤더 압축 : HTTP1은 어떤 헤더 압축도 하지 않았다. 때문에 헤더는 무거워졌고, 대역폭을 크게 차지하게 되었다. HTTP2는 HPACK이라는 알고리즘을 통해서 헤더 압축을 달성했다. 이를 통해서 헤더의 사이즈를 줄이고, 데이터 전송의 효율성을 향상시켰다. HTTP3 또한 HPACK을 사용한다. 


- 전송 프로토콜 : 
    
-   Transport protocol: HTTP/1 uses TCP (Transmission Control Protocol) as its transport protocol, which provides reliable data transmission but can suffer from high latency. HTTP/2 introduced the option to use TCP or a multiplexed version of TCP called HTTP/2 over TLS (Transport Layer Security). HTTP/3 uses the QUIC transport protocol, which is based on UDP (User Datagram Protocol) and provides multiplexing, flow control, encryption, and error correction.
    
-   Compatibility with existing infrastructure: HTTP/3 was designed to be compatible with existing HTTP infrastructure, which means that it can be used with existing servers, clients, and network equipment that support HTTP. HTTP/1 and HTTP/2 are also compatible with existing infrastructure, but HTTP/3 includes additional features and improvements that may require some additional configuration or testing to ensure optimal performance.
    

Overall, HTTP/3 represents a significant improvement over previous versions of HTTP in terms of performance, security, and support for modern web applications. While HTTP/1 and HTTP/2 are still widely used, HTTP/3 is expected to become more widely adopted over time as more servers and clients support it.