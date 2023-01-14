HTTP3 멀티플렉싱은 하나의 연결 안에서 다수의 데이터 스트림을 동시에 전송하는 것을 가능하게 하는 능력을 의미한다. 이것은 framing layer의 사용을 통해서 달성된다. 그리고 이 framing layer는 데이터를 프레임들로 나누고, 각각의 프레임을 특정한 스트림에 할당해준다. 

멀티 플렉싱은 다수의 요청이 병렬적으로 진행될 수 있도록 만들어줌으로써, HTTP3의 성능을 향상 시키는데에 도움을 준다. 전에는, 새로운 요청을 보내기 위해서는 직전에 보냈던 요청들이 완수되어야만 했었다. 이것은 웹페이지를 처음에 로딩할 때 다수의 리소스를 요청하는 상황처럼, 같은 연결 안에서 다수의 요청이 만들어지는 상황에서 유용하다. 

HTTP3는 또한 흐름 제어를 포함하고 있다. 이것은 수신자와 송신자가 데이터가 전송되는 것의 비율을 조절하는 것을 허용하는 메커니즘이다. 이것은 수신자가 너무 많은 데이터를 받음으로써 압도되는 것을 막도록 도울 수 있는데, 이렇게 압도되다보면 성능적인 문자나 연결이 끊기는 문제가 발생할 수 있다. 

- 참고하면 좋은 자료 : 
	- [[what is flow control in http?]]


결론적으로  HTTP3 안에서 멀티플렉싱과 흐름 제어를 사용하는 것은 요청 우선순위나 서버 푸시와 같은 새로운 기능을 가능하게 할 뿐만 아니라, 
효율성과 데이터 전송의 신뢰성을 향상시키는 데에도 도움을 준다. 