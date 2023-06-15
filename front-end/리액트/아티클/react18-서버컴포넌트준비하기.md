# [React 18: 리액트 서버 컴포넌트 준비하기](https://tech.kakaopay.com/post/react-server-components/) 

> 본 문서는 [React 18: 리액트 서버 컴포넌트 준비하기](https://tech.kakaopay.com/post/react-server-components/) 를 읽고 정리한 글입니다 


서버 컴포넌트는 리액트 18버전에서 가장 기대받는 기능 중 하나이다. 그럼 이 기능은 어떤 문제를 해결하기 위해서 나왔을까? 이 기능은 무엇이며, 이 기능이 제공해주는 이점은 무엇일까? 


## 문제점 : waterfall 

아래는 일반적으로 리액트 컴포넌트에서 데이터를 패칭해와서 화면에 보여주는 방식이다. 
```javascript 
function render(element, container) {
  const dom = document.createElement(element.type)
​
  container.appendChild(dom)
}
​// Note.js
function Note(props) {
  const [note, setNote] = useState(null);
  useEffect(() => {
    // NOTE: loads *after* rendering, triggering waterfalls in children
    fetch(`https://api.example.com/notes/${props.id}`)
      .then(res => res.json())
      .then(
        (result) => {
          setNote(result);
        }
      )
  }, [props.id]])
  
  if (note == null) {
    return "Loading";
  } else {
    return (/* render note here... */);
  }
```
그런데 이런 방식으로 데이터를 패칭해오게 되면, server-client waterfall이 발생하게 된다. (이런 방식이란 각 컴포넌트에서 필요한 데이터 api를 요청하는 방식)

- 이런 방식의 장점 :  실제 컴포넌트가 렌더링될 때 필요한 데이터만 가져와 보여줄 수 있다. 
- 이런 방식의 단점 : 
	- api 요청이 늘어난다. 
	- 컴포넌트가 렌더링 된 이후 데이터를 받아온다. 이렇게 데이터를 받아오는 과정이 끝나기 전까지 자식 컴포넌트의 렌더링과 자식 컴포넌트의 api 호출은 지연된다. 


이런 문제점을 해결하기 위해서, 리액트 서버 컴포넌트가 도입되었다. 



## 리액트 서버 컴포넌트란 무엇인가?(RSC)

리액트 서버 컴포넌트는 말 그대로, 서버에서 동작하는 컴포넌트를 말한다. 이 컴포넌트를 사용하면, 컴포넌트 렌더링을 클라이언트가 아닌 서버에서 수행할 수 있다. 그리고 컴포넌트에 필요한 데이터 fetching의 latency도 줄일 수 있다. 그리고 클라이언트에서의 연속된 api 호출을 방지할 수 있다. 이를 통해 waterfall 문제를 해결한다. 



## 리액트 서버 컴포넌트의 3가지 이점 


### 1.자유로운 서버 리소스 접근 

데이터베이스, 파일 시스템 그리고 인터널 서비스 같은 서버 사이드 데이터 소스에 직접 접근할 수 있다. 
```javascript
**​// Note.server.js - 서버 컴포넌트
import fs from 'react-fs';
import db from 'db.server';
function Note(props) {
  // NOTE: loads *during* render, w low-latency data access on the server
  const note = db.notes.get(props.id); // 데이터베이스 접근
  const noteFromFile = JSON.parse(fs.readFile(`${id}.json`)); // 파일 접근
  if (note == null) {
    // handle missing note
  }
  return (/* render note here... */);
}**
```



### 2. 제로 번들 사이즈 컴포넌트

기존 클라이언트 컴포넌트는 패키지를 추가하면 그대로, 번들 사이즈에 반영되는 방식이었다. 

```javascript 
// NoteWithMarkdown.server.jsx - 서버 컴포넌트
import marked from 'marked'; // ZERO IMPACT on bundle size
import sanitizeHtml from 'sanitize-html'; // ZERO IMPACT on bundle size
function NoteWithMarkdown({ text }) {
  // client component와 동일
}
```
하지만, 서버 컴포넌트를 사용하면 사용된 패키지는 번들 사이즈에 포함되지 않게 된다. 이유는 미리 서버에서 렌더링 된 static content를 전달하기 때문이다. 이렇게되면, 번들사이즈를 줄이면서 초기 렌더링 시간을 줄일 수 있을 것이다. 


### 3. 자동 코드분할 

기존에는 dynamic import를 적용해주어야만 code splitting이 적용되었지만, 서버 컴포넌트에서는 client 컴포넌트를 import 해오는 것을 자동으로 code splitting의 대상으로 여기게 된다. 



## 서버 컴포넌트와 서버 사이드 렌더링의 차이 


이렇게 듣고보면, 서버 컴포넌트와 서버 사이드 렌더링이 무슨 차이가 있는지 모를 수 있다. 그래서 해당 내용도 한번 정리를 해보겠다. 아래는 그 차이점이다.

- 서버 컴포넌트의 코드는 클라이언트로 전달되지 않는다. 하지만, ssr은 포함된 모든 코드를 자바스크립트 번들에 포함 시켜 클라이언트로 전달한다. 
- 서버 컴포넌트는 모든 컴포넌트 수준에서 서버에 접근이 가능하다. 하지만, Nextjs 같은 라이브러리에선 상위 수준의 컴포넌트에서만 서버에 접근한다. 
- 서버 컴포넌트에서는 클라이언트의 상태를 유지하며 refetch될 수 있다. 이것이 가능한 이유는 html이 아닌 특별한 형태로 컴포넌트를 전달하기 때문에 가능한 것이다. 하지만, ssr의 경우 html을 그대로 전달하기 때문에 클라이언트의 상태를 유지하며 보낼 수 없고, 새로운 refetch가 필요한 경우 html 전체를 리렌더링해야한다. 





--- 
## 질문 : 

- client-server waterfall이란 무엇일까?



