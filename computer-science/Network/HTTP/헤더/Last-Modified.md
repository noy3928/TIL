https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Last-Modified

- Last-Modified는 HTTP 응답 헤더 중 하나로, 원본 서버가 리소스가 마지막으로 수정된 시간을 포함한다. 이는 이전에 저장된 리소스와 동일한지 확인하는 유효성 검사기로 사용된다. 
- ETag 헤더보다 정확도가 떨어지지만, 대체 매커니즘으로 사용된다. 
- If-Modified-Since  또는 If-Unmodified-Since 헤더가 포함된 조건부 요청은 이 필드를 사용한다. 

- Last-Modified는 크롤러가 크롤 빈도를 조정하는 데 사용된다. 그리고 브라우저에서 휴리스틱 캐싱에 사용되고, 콘텐츠 관리 시스템에서 콘텐츠가 마지막으로 수정된 시간을 표시하는 데 사용된다. 


```
Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT
```