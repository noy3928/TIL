> https://www.youtube.com/watch?v=YRdS7qcZ8AY&list=PL93mKxaRDidG_OIfRQ4nztPQ13y74lCYg&index=13&ab_channel=%EB%A9%94%ED%83%80%EC%BD%94%EB%94%A9

- DispatchServlet에 의해서 생성되는 수 많은 객체들은 어디에서 관리되는 것일까? 

- request를 받으면 톰캣이 반응한다. 톰캣의 첫번째 관문에 web.xml이 있다. 이 web.xml에서 spring 내부에 들어가기 위해서 2가지 일을 한다. 1번째는 dispatchServlet이라는 친구가 동작을 한다. 그 다음 이 친구가 컴포넌트 스캔을 한다. 그런 다음 이 dispatchServlet이 하는 일은 주소를 분배하는 것이다. 어떤 주소가 왔을 때, 어디로 가, 어떤 주소로 왔을 때 어디로 가. 이것이 분배를 하기 위해서는 메모리에 떠 있어야 한다. 어떤 요청이 왔을 때, 어디로 가게 만들기 위해서는 클래스들이 여러개가 있어야 한다. 그리고 이 클래스들이 메모리에 떠 있어야 그 클래스로 보낼 수 있다. 