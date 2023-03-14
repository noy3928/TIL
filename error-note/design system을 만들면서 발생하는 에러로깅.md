
> ReferenceError: exports is not defined in ES module scope

라이브러리를 배포하고 사용해보니, 위와 같은 에러가 나타났다. 만든 라이브러리에서 cjs와 esm을 지원하도록 만들었는데, 무슨 이유에서인지 사용부에서 cjs를 사용하고 있었다. 
우선은 어떻게 해결해야할지 모르겠다싶었고, 어차피 ui 라이브러리는 cjs 환경에서 사용할 일이 없으니 output에 esm만 빌드되도록 만들었다. 이렇게 빌드를 한 후 배포를 하고 다시 사용해봤더니, 
이번에는 또 아래와 같은 에러가 나타났다. 

---

>Error: Hydration failed because the initial UI does not match what was rendered on the server.

해당 에러를 어떻게 고칠 수 있는지 알려주는 next.js의 페이지는 다음 링크이다 : https://nextjs.org/docs/messages/react-hydration-error

이런 문제가 발생하는 이유는 ssr을 사용할 때, prerender된 tree와 리액트에서의 render tree 사이에 차이가 있기 때문이라고 한다. 예를 들어 window 환경일 경우에만 특정 컴포넌트가 렌더링되도록 작업이 되었다면, 서버에서는 제대로 동작되지 않은 상태로 렌더링되었다가, 클라이언트로 보내지게 될 것이다. 

뭔가 예측하기로는 cjs를 사용하지 않도록 만들어버린 것이 문제가 된 것이 아닐까 싶은 생각이 든다. nextjs에서 서버측에서 컴포넌트를 그리기 위해서는 cjs를 사용해야하는데, cjs를 사용할 수 없게 만들어버렸으니 문제가 되는 것이다. 

이렇게 생각하게 되는 것은, 컴포넌트를 작성할 때, 브라우저 환경에 따라서 렌더링이 되고 안되고 영향을 미치도록 작성된 코드가 없기 때문이다. 현재로써 생각나는 유일한 원인은 cjs에 있다. 