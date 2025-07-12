> https://wonit.tistory.com/454







---
## 노트 

- 제약조건
	- (제약조건이라는 단어가 참 재밌는 것 같다. 제약조건은 판단의 기준을 만들어주는 특성이 있다.)
- uniform interface가 rest api를 구분 짓는 가장 큰 핵심이다. 여기엔 4가지 제약 조건이 있다.
	- resource-based
	- manipulation of resource through representations
	- self-descriptive message
	- hypermerdia as the engine of application state

- self-descriptive message
	- 메시지 스스로가 자신에 대한 설명을 할 수 있어야 한다.


---

## 질문 : 

- 과하지는 않은가..?
	- 과하지 않은 것 같다. rest라고 위키피디아에 검색하면, `It means that a server will respond with the representation of a resource (today, it will most often be an [HTML](https://en.wikipedia.org/wiki/HTML "HTML") document) and that resource will contain [hypermedia](https://en.wikipedia.org/wiki/Hypermedia "Hypermedia") links that can be followed to make the state of the system change.` 이렇게 명시되어있다. 그러니까 클라이언트의 요청에 응답을 함과 동시에, 시스템의 전이를 일으킬 수 있는 links들을 포함하고 있어야한다는 것이다. 이것이 rest api의 원칙이다.
- Uniform Interface의 4가지 제약 조건은 어디에 근거를 두고 있는가?
	- 위키피디아에도 명시되어 있다. -> https://en.wikipedia.org/wiki/REST#Uniform_interface
- 