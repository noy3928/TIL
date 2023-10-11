> 스프링은 MessageConverter를 가지고 있다. 기본값은 현재 Json이다. 

- 두개의 다른 언어가 소통하기 위해서 중간에서 어떤 컨버터 역할을 해주는 다리가 있다. 
- 중간언어라고 하는데, 예전에는 xml을 사용했지만, 요즘에는 Json이 기본이다. 
- 자바의 객체가 전송되기 직전에 json으로 변경하고, 파이썬으로 보낸다. 파이썬을 json을 받으면 파이썬 object로 바꾼다. 
- 한국말 -> 영어 -> 외계인어 -> 영어 -> 한국말. 
	- 자바 -> Json -> 파이썬 -> json -> 자바. 
- 이런 역할을 해주는 친구가 MessageConverter이다. 


---

> 스프링은 BufferReader와 BufferedWriter를 쉽게 사용할 수 있다. 

- 전기선을 통해서 통신을 할 것이다. bit 단위로 통신을 한다. 
	- 근데 bit 단위로 통신하면 너무 어렵잖아. 어떻게하면 영어 한 문자라도 통신을 할 수 있을까? 영어 한 문자 -> 8 bit. 256가지의 문자 전송. 가능. 한글은 최소 16bit가 필요하다. 8bit씩 끊어읽으면 한 문자씩 받을 수 있을 것이다. 1바이트. 1바이트는 통신의 단위가 될 것이다. 1byte는 하나의 문자. 
	- 유니코드 UTF-8 -> 3byte 
- Byte Stream -> 1Byte(8bit) 이런 데이터를 InputStream으로 읽는다. InputStream은 바이트로 받아서 읽게 된다. 그런데 바이트로 읽으면 어려우니까, InputStreamReader라는 클래스를 이용하고, 이 클래스에게 바이트 데이터를 넘겨주면, 문자 하나를 반환해준다. 그리고 배열로 여러개의 문자를 받을 수 있다. 근데 문제는 이렇게 문자열로 받으려고 할 때, 크키를 미리 정해놓아야한다. 크기를 미리 정해놓는 것은 거의 불가능 한 일. 왜냐하면 사용자가 어느정도의 크기긔 문자열을 보낼지 모르기 때문에. 그래서 이 InputStreamReader라는 것은 사용하지 않게 됨. 대신 BufferedReader라는 것을 활용해서 읽음. 
- BufferedReader는 가변 길이의 문자를 받을 수 있다. 요청이 왔고, 어떤 데이터를 받을 것인데, 그때 BufferedReader를 통해서 받는다. 실제로는 reqeuest.getReader라는 메서드를 사용할텐데 그 내부에서 BufferedReader를 사용한다. out자체가 BufferedWriter이다. 
- 이런 것들을 우리가 직접 사용할 필요가 없다. @ResponseBody 라는 어노테이션, @RequestBody라는 어노테이션만 사용하면 된다. 그러면 알아서 BufferedReader, Writer를 사용해준다. 


