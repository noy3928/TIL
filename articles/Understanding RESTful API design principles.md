> https://upsun.com/blog/restful-api-design-principles/



## 노트

- rest api는 동작(actions)보다는 리소스(명사)를 중심으로 구조화된다.
- 무상태 통신 : 
	- rest api 통신에는 필요한 모든 정보가 포함되어있다. 서버는 요청 간에 클라이언트의 컨텍스트를 저장하지 않는다.
- 일관된 인터페이스(uniform interface) : 
	- 자기 설명적 메시지
	- HATEOAS(hypermedia as the engine of application state)
		- 