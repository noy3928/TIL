
- If-None-Match는 HTTP의 요청헤더이다. 이 헤더를 사용하면 요청을 조건부로 만들 수 있다. 
- GET 및 HEAD 메서드의 경우에는, 서버는 주어진 ETag와 일치하는 것이 없을 때만 요청된 리소스를 반환한다. 그리고 200 상태도 함께 반환한다. 
	- (그렇다면 무엇이 매치하느냐를 체크하는 것의 대상이 ETag라는 말인건가? 헤더의 이름이 "만약 match가 안되면"이니까. "만약 ETag가 match가 안되면 그러면 요청된 리소스를 반환할께" 의 의미가 되는 것 같다. 만약 ETag가 match가 된다면 해당 데이터에 대해서는 변경사항이 없으니까, 니가 캐싱하고 있는 데이터를 그냥 사용해. 내가 굳이 똑같은 데이터를 다시 보내줄 필요는 없잖아? 라고 하는 것과 같은 의미가 되는 것 같다.)
- 다른 메서드의 경우에는, 요청은 해당 값 중 어느 것돠고 일치하지 않는 eventually existing 리소스의 ETag가 있는 경우에만 처리된다. 
- GET 및 HEAD 메서드에서 조건이 충족되지 않으면, 서버는 HTTP 상태 코드 304(Not Modified)를 반환해야 한다. 서버 측 변경 사항을 적용하는 메서드의 경우, 상태 코드 412(Precondition Failed)가 사용된다. 304응답을 생성하는 서버는 200(OK)응답에도 전송된 다음 헤더 필드 중 하나를 생성해야 한다 : Cache-Control, Content-Location, Date, ETag, Expires, Vary. 

이것을 사용하는 몇가지 사용 사례가 존재한다. 
- GET 및 HEAD 메서드를 사용할 때, 연관된 ETag가 있는 캐시된 Entity를 업데이트 하려고 하는 경우.  
- 나머지 사례는 잘 이해가 안된다.