# 보호절

- 프로그램에는 주요 흐름이 있지만 주요 흐름에서 벗어나야 할 때가 있다.

```java
void initialize(){
    if(!isInitialized){
        ...
    }
}

void initialize(){
    if(isInitialized){
        return
    }
```

- 첫번째 코드는 then에 해당하는 코드를 보면서 else 조건을 찾는다.
  - 독자들 입장에서 고려해야 하는 요소를 한 가지 더 추가한 것이다.
- 두번째 코드는 두 줄만 읽으면 해당 내용이 초기화 되지 않았다는 것을 금방알 수 있다.

- Guard Clause의 경우 한 쪽의 제어흐름이 다른 쪽보다 중요한 경우에 유용하다.
- 보호절은 특히 여러개의 조건문이 있을 때 유용하다.

```javascript
let server = getServer()

if (server != null) {
  client = server.getClient()
  if (client != null) {
    current = client.getRequest()
    if (current != null) {
      processRequest(current)
    }
  }
}
```

이렇게 중첩된 조건을 사용하면 복잡하다.  
코드에 문제가 발생할 확률도 높다. Guard clause를 사용해 간단하게 표현해보자.

```javascript
compute(){
    let server = getServer();
    if(server == null) return client = server.getClient()
    if(client = null) return client = server.getRequest()
    if(current == null) return processRequest(current);
}
```
