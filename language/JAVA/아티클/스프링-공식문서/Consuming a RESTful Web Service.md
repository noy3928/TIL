```java
package com.example.consumingrest; 

import com.fasterxml.jackson.annotation.JsonIgnoreProperties; 

@JsonIgnoreProperties(ignoreUnknown = true) 
public record Quote(String type, Value value) { }
```
- @JsonIgnoreProperties 
	- 데이터를 사용자 정의 타입에 직접 바인딩하려면 변수 이름을 API에서 반환되는 JSON 문서의 키와 정확히 동일하게 지정해야 합니다.