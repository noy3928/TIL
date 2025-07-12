- 이 주제를 다룰 때 내 머릿속에 있는 질문
    - patch 메서드는 어떻게 설계해야 맞는거지?
    - patch를 멱등하게 설계하는게 맞는걸까?
    - patch를 멱등하게 설계한다면, 특정한 리소스를 수정할 때, 다른 리소스에 사이드 이펙트를 원할때는 어떻게해야하지?
    - restful 하게 설계한다는건 무슨 말이지?


- 참고 자료
    - [https://www.qu3vipon.com/idempotence-of-patch#46bb1ad37fbb44d4ad11b6bea72ff72a](https://www.qu3vipon.com/idempotence-of-patch#46bb1ad37fbb44d4ad11b6bea72ff72a)
	- [https://www.devzery.com/post/what-is-a-patch-in-api](https://www.devzery.com/post/what-is-a-patch-in-api)
	    - APIs to make partial updates to a resource.
	    - PATCH modifies only the specified fields while leaving the rest untouched.
- [](https://datatracker.ietf.org/doc/html/rfc5789#:~:text=Internet,5741)[https://datatracker.ietf.org/doc/html/rfc5789](https://datatracker.ietf.org/doc/html/rfc5789)
    - The PATCH method requests that a set of changes described in the request entity be applied to the resource identified by the Request- URI.
- [https://upsun.com/blog/restful-api-design-principles/](https://upsun.com/blog/restful-api-design-principles/)
    - 명사 중심(리소스중심) 으로 구조화할 것 : REST API는 동작(동사)보다는 리소스(명사)를 중심으로 구조화되어 있으며, 표준 HTTP 메서드(GET, POST, PUT, DELETE)를 사용해 해당 리소스를 조작합니다
    - 상태 비저장(Stateless communication): REST API 요청에는 필요한 모든 정보가 포함되어 있으며, 각 요청 사이에 서버에 클라이언트의 컨텍스트가 저장되지 않습니다.
        - 이 부분은 잘 이해가 안되네.. 조금 더 맥락 이해가 필요한 것 같다.
    - **Uniform interface.** This principle ensures consistent resource identification and manipulation through self-descriptive messages using standard HTTP headers and [status codes](https://upsun.com/blog/http-status-codes/). It also incorporates HATEOAS (hypermedia as the engine of application state), allowing clients to discover API capabilities dynamically.
        - HATEOAS는 처음 알았다. 되게 신기한 내용이네.. 예시로 전달받은 json이다. 여기서 links에 해당하는 내용이 hateoas이다. 이런건 어떤 상황에서 써먹을까?
            
            ```sql
            {
              "userId": 1,
              "name": "홍길동",
              "links": [
                { "rel": "self", "href": "/users/1" },
                { "rel": "update", "href": "/users/1/update" },
                { "rel": "delete", "href": "/users/1/delete" }
              ]
            }
            ```