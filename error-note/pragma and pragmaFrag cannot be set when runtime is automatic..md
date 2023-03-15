emotion을 사용하면서 스토리북을 실행하려고 할 때 다음과 같은 에러가 발생했다. 

>  pragma and pragmaFrag cannot be set when runtime is automatic.

내가 작성했던 코드는 아래와 같다. 

```js
/** @jsx jsx */

import React from "react"
import { jsx, css } from "@emotion/react"

export interface ButtonProps {
text: string
}

const Button = (props: ButtonProps) => {
	return <button css={style}>{props.text}</button>
}
```

그리고 https://github.com/system-ui/theme-ui/issues/1160#issuecomment-715530924
위 링크를 통해서 문제를 해결했다. 

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
```


