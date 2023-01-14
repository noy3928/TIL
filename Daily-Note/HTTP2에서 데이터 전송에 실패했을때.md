### 날짜 : 2022-11-05 02:50
### 주제 : #TCP의한계 #HTTP2 #네트워크

---- 

### 인용 : 
>  TCP's receiver sliding window does not progress if a segment with a lower sequence number hasn't arrived / been received yet, even if segments with higher number have. This can cause the TCP stream to hang momentarily or even close, even if only one segment failed to arrive. This problem is known as packet-level Head-of-Line (HoL) blocking of the TCP stream.

![](H2Fail.png)


### 메모를 한 이유 : 
- 하나의 패킷만 손상되어도, 다른 패킷들도 대기한다. 
- 기존에 알던 지식이었지만, 대기하는 장소가 커널이라는 것을 그림을 통해 알게 되었다. 


### 출처(참고문헌) : 
[HTTP/3 Deep Dive | HTTP/3's value, features, and use cases](https://ably.com/topic/http3)


### Link : 
[[TCP레벨의 HOLB]]