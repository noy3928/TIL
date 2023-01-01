## framing layer를 사용하는 것이 어떻게 멀티 플렉싱을 가능하게 만들어주는가?

In HTTP/3, the framing layer is responsible for multiplexing, which is the process of transmitting multiple streams of data concurrently over a single connection. The framing layer is a layer of the HTTP/3 protocol stack that sits above the transport layer (QUIC) and below the HTTP layer.

The framing layer enables multiplexing by dividing the data into frames, which are then transmitted over the connection. Each frame is assigned a stream identifier, which allows the receiver to identify the stream that the frame belongs to. The receiver can then reassemble the frames for each stream in the correct order to reconstruct the original data.

The framing layer also includes flow control and error correction mechanisms, which help to ensure the efficient and reliable transmission of data. For example, the framing layer can use a sliding window mechanism to regulate the rate at which data is transmitted, and can include error correction codes to detect and correct errors in the transmitted data.

Overall, the framing layer in HTTP/3 enables multiplexing by dividing the data into frames and assigning stream identifiers, and also includes flow control and error correction mechanisms to improve the efficiency and reliability of data transmission.


## framing layer의 어떤 점이, HTTP2의 멀티플렉싱 보다 HTTP3의 멀티플렉싱을 더 낫도록 만들어 준 것인가?

