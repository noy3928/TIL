> https://www.youtube.com/watch?v=fZv9rkwSO3g&list=PL93mKxaRDidG_OIfRQ4nztPQ13y74lCYg&index=12&ab_channel=%EB%A9%94%ED%83%80%EC%BD%94%EB%94%A9

- FrontController 패턴 : 
	- 최초 앞단에서 Request 요청을 받아서 필요한 클래스에 넘겨준다. 왜? web.xml에 다 정의하기가 너무 어렵기 때문이다. 

- 맨 처음에 request 요청이 들어온다. 예를들어 ".do" 라는 주소로 요청이 들어오면 frontcotroller로 보내라는 어떤 약속의 코드를 짜놓는다. (web.xml에 그 약속의 코드를 짜놓는다.)
	- 특정 요청이 들어오면 바로 자원에 접근하지 못하고, 바로 톰캣으로 접근한다. 톰캣으로 가면 최초에 request와 Response라는 객체를 만든다. request는 요청한 사람의 정보를 가지고 있다. 그리고 어떤 데이터를 들고 들어왔는지에 대한 정보를 가지고 있다. 그리고 이런 정보를 토대로 response라는 정보를 만든다. 이런 일들을 톰캣이 자동으로 객체를 만들어준다. 
		- web.xml에 접근한다. 