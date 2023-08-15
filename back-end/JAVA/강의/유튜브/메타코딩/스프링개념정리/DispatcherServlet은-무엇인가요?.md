> https://www.youtube.com/watch?v=fZv9rkwSO3g&list=PL93mKxaRDidG_OIfRQ4nztPQ13y74lCYg&index=12&ab_channel=%EB%A9%94%ED%83%80%EC%BD%94%EB%94%A9

- FrontController 패턴 : 
	- 최초 앞단에서 Request 요청을 받아서 필요한 클래스에 넘겨준다. 왜? web.xml에 다 정의하기가 너무 어렵기 때문이다. 

- 맨 처음에 request 요청이 들어온다. 예를들어 ".do" 라는 주소로 요청이 들어오면 frontcotroller로 보내라는 어떤 약속의 코드를 짜놓는다. (web.xml에 그 약속의 코드를 짜놓는다.)
	- 특정 요청이 들어오면 바로 자원에 접근하지 못하고, 바로 톰캣으로 접근한다. 톰캣으로 가면 최초에 request와 Response라는 객체를 만든다. request는 요청한 사람의 정보를 가지고 있다. 그리고 어떤 데이터를 들고 들어왔는지에 대한 정보를 가지고 있다. 그리고 이런 정보를 토대로 response라는 정보를 만든다. 이런 일들을 톰캣이 자동으로 객체를 만들어준다. 
		- 이렇게 객체를 자동으로 만들어주면 무엇이 좋을까?  자바에서 request.함수 나 request.변수 와 같은 것들을 사용할 수 있도록 톰캣이 request와 response라는 객체2개를 자동으로 만들어준다.  
	- web.xml에 할 일이 너무 많으면 특정 주소에 대해서는 frontController가 그 작업을 낚아챌 수 있도록 설정을 해둔다. 
		- 그리고 frontController는 이제 특정 주소에 대한 작업을 위해서 자원에 접근할 수 있도록 한다. request를 보낸다. 이런 종류의 request가 일어나면 톰캣에 있던 request가 변경된다. 그리고 이런 변경을 막기 위해서 RequestDispatcher가 필요하다 
		- RequestDispatcher는 request와 response를 그대로 유지시켜준다. 
			- 이것을 사용해야 페이지간 데이터 사용이 가능해진다. 

- DispatcherServlet 은 FrontController와 RequestDispatcher 두개를 합친 것이다. 
	- DispatcherServlet가 자동생성되어 질 때 수 많은 객체가 생성(IoC)된다. 


--- 

## 질문 : 

- 왜 기존의 request와 response가 변경되면 안되는 것일까? 
- 왜 frontController에서 자원에 request를 보낼 때 기존의 request와 response가 변경되는 것일까? 
- 
