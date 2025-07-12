> https://upsun.com/blog/restful-api-design-principles/



## 노트

- rest api는 동작(actions)보다는 리소스(명사)를 중심으로 구조화된다.
- 무상태 통신 : 
	- rest api 통신에는 필요한 모든 정보가 포함되어있다. 서버는 요청 간에 클라이언트의 컨텍스트를 저장하지 않는다.
- 일관된 인터페이스(uniform interface) : 
	- 자기 설명적 메시지
	- HATEOAS(hypermedia as the engine of application state)
		- 이건 처음 듣는 단어다! 이 내용에 대해 조금 더 알아봐야할 것 같다.


- restful api의 3가지 핵심 구성요소 : client, server, database
	- client : who consumes the api
	- api server : 
		- 클라이언트의 요청에 대한 책임자. 요청에 응답을 보내기 위해 데이터 베이스와 소통하거나 다른 서비스와 소통을 한다. 
		- 미들웨어는 서버의 핵심 로직에 도달하기 전에나 로직 이후에, 여타 다양한 작업을 수행하게 한다. 이를테면, 권한검증, 로깅, 유효성 검증, 에러 핸들링, 요청과 응답 변형의 작업들이다.
	- database :
		- 데이터를 저장하는 곳.ㄴ
		- 


- 무상태 통신
	- 무상태 통신이 중요한 이유는 각 요청을 독립적으로 만듦으로써, 로드 밸런싱이 간소화된다는 것이다. (이 파트는 조금 더 찾아봐야할 것 같다.)


