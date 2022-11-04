### 날짜 : 2022-11-04 17:40
### 주제 : #UDP #HTTP3 #네트워크 #TCP의한계 

---- 

### 인용 : 
>  Unlike TCP’s ordered message exchange scheme, UDP allows multidirectional broadcasting of messages, which feature, among other things, helps address head-of-line blocking (HoL) issues at the packet level.

![]()
![](Assets/udp-mulidirectional.png)



### 메모를 한 이유 : 
- UDP의 장점을 보여주고 있다. 
- UDP는 multidirectional broadcasting이 가능하다. 
	- 이것 덕분에 패킷레벨에서의  HoL 를 방지할 수 있다.
	- 왜 이것이 패킷 레벨에서의 HoL을 방지하는가? 
		- 사진을 보면 알 수 있듯이 TCP는 순서를 보장하기 위해서 하나의 커넥션 안에서 일련번호를 공유하는 방식으로 데이터를 주고 받는다. 그래서 특정 패킷에 문제가 생긴것을 일련번호를 통해 인지하고 재전송한다.
		- 하지만 UDP는 손상이 생긴 패킷은 그냥 버린다. 그리고 다시 보낸다?? 
		- 음 이 부분은 설명이 제대로 되지 않는 것을 보니 조금 더 공부가 필요한 것 같다. 


### 출처(참고문헌) : 
[HTTP/3 Deep Dive | HTTP/3's value, features, and use cases](https://ably.com/topic/http3)


### Link : 
