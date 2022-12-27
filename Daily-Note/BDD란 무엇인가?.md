# BDD란 무엇인가? 

BDD는 유저의 관점으로부터 어플리케이션의 행동에 초점을 맞추어 테스트 하는 개발 방법론이다. 이것은 테스트 주도 개발의 확장된 접근법이다. 그리고 이것은 유저의 관점에서 시스템의 행동을 묘사하는 테스트에 주도된 방법으로 개발되어야 한다는 생각에 기초해있다.

BDD는   개발자든 비개발직군의 사람이든 모두가 읽을 수 있게 자연 언어 형식으로 구체적인 어플리케이션의 행동을 정의하는 것을 포함하고 있다. 이 형식은 "Given-When-Then" 형식이라고 불린다. (GWT) 이것은 3가지 파트로 이루어져있다. 

1.Given : 시작 문맥 또는 테스트에 대한 셋업 
2.When : 취해진 액션이나 이벤트
3.Then : 액션이나 이벤트에 의해서 예상되는 결과

예를 들어서, 로그인 폼이 제대로 작동하는지 검증하기 위한 간단한 테스트를 생각해보자. 

```
Given : a user with a valid username and password
When  : the user submits the login form 
Then : the user should be redirected to the home page 
```

BDD는 구현의 기술적인 세부사항에 집중하기 보다는, 어플리케이션의 개발이 유저의 필요와 기대에 주도될 수 있도록 도와준다. 이것은 또한 개발자들, 비지니스 분석가 등등 여러 직군의 사람들 사이에서 소통과 협업을 용이하게 만들어주는 측면이 있다. 


## 리액트에서 살펴볼 수 있는 BDD 코드 예시 

```javascript
import React from "react"

const ItemList = ({items}) => (
	<ul>
		{items.map(item => (
			<li key={item.id}>{item.name}</li>
		))}
	</ul>
)

export default ItemList;
```

이런 코드를 한번 테스트 해보자. `Jest` 나 `React Testing Library` 와 같은 라이브러리를 활용해 BDD 테스트를 할 수 있다.  이것을 통해 GWT 테스를 해보자. 

```javascript
import React from "react"
import {render} from "@testing-library/react"
import ItemList from "./ItemList";

describe("ItemList", () => {
	if("should render a list of itmes", () => {
	// Given 
	const items = [ 
	{ id: 1, name: 'Item 1' }, 
	{ id: 2, name: 'Item 2' }, 
	{ id: 3, name: 'Item 3' }, 
	];

	// When 
	const { getByText } = render(<ItemList items={items} />)

	// Then 
	items.forEach(item => {
		expect(getByText(item.name)).toBeIntheDocument()
	})
	})
})

```

위 테스트에서 "Given" 섹션에서는 최초의 문맥을 세팅하고 있다. 그리고 컴포넌트에 넘겨 줄 아이템들의 배열을 정의 내려주고 있다. 
"When" 섹션에서는 "render"를 이용해서 컴포넌트를 렌더링하고 있다. 
"Then" 섹션에서는 배열에 있는 각각의 아이템들이 문서에 잘 렌더링되고 있는지 "getByText" 를 이용해서 증명하고 있다. 

이것이 BDD의 한 예시이다. 


## "Jest-plugin-context" 라는 라이브러리를 활용한 



