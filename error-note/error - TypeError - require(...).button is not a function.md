> error - TypeError: require(...).button is not a function

rollup에서 emotionjs를 사용했다. 그리고 해당 라이브러리를 사용했더니, 사용한 곳에서 다음과 같은 에러를 만났다. 

https://stackoverflow.com/a/33008076

- 위 자료를 보니, 뭔가 작성하는 부분에서 해당 부분을 함수처럼 작성해주지 않은 게 있는 것 같다. 
- 이외에도 해당 에러는 여러가지 원인을 포함할 수 있는 것으로보인다. 왜냐하면 해당 스택오버플로우를 보면 굉장히 다양한 원인이 적혀있기 때문이다. 
- 뭔가 emotionjs를 호환성 있게 사용할 수 있도록 만들어주는 것이 필요한데, 현재로써 해줘야하는 작업이 무엇일까. 


---

https://velog.io/@velopert/create-your-own-design-system-with-storybook

이 글을 읽어보니 emotion/core를 사용하고 있는 듯했다. 그래서 나도 한번 core를 사용해서 시도를 해봐야겠다. 어떤 결과가 나올지. 

Emotion/react를 사용해서 코드를 작성했더니 문제가 해결되었다. 
작성한 코드는 아래와 같다. 

```js
/** @jsxRuntime classic */
/** @jsx jsx */

import React from "react"
import { jsx, css } from "@emotion/react"

export interface ButtonProps {
text: string
}

const Button = (props: ButtonProps) => {
return <button css={style}>{props.text}</button>
}

export default Button

const style = css`
padding: 32px;
background-color: hotpink;
font-size: 24px;
border-radius: 4px;
color: black;
font-weight: bold;
&:hover {
color: white;
}
`
```


---
그런데 위와 같은 방식으로 사용할 경우에는 styled-system이라는 라이브러리를 사용하기가 어려워진다. 