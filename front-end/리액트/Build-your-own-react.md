# [Build your own react](https://pomb.us/build-your-own-react/)

> 본 글은 build your own react라는 문서를 읽고 정리한 글입니다. 




## Step Zero : Review 

```javascript
const element = <h1 title="foo">Hello</h1>
const container = document.getElementById("root")
ReactDOM.render(element, container)
```

먼저 주어진 코드를 가지고 이해해볼 것이다. 

### `const element = <h1 title="foo">Hello</h1>`


가장 첫 번째 라인부터 js로 변경해보자. 첫 번째 라인은 Jsx 코드로 작성되어있고, 이것은 정말 간단하게도 트랜스 파일링 되어서 createElement를 사용하는 Js 코드로 변경된다. 

```javascript 
const element = React.createElement(
	"h1",
	{ title: "foo" },
	"Hello"
)
```

이 createElement는 객체를 반환하는 함수이다. 이 함수가 반환한 객체의 모습은 어떤 모습일까? 

```javascript 
const element = {
	type: "h1",
	props: {
		title: "foo",
		children: "Hello",
	},
}
```
이런 모습일 것이다. 이 객체는 2가지 프로퍼티를 가지고 있는데 `type`과 `props`이다. 
- type : 여기에 작성되어있는 코드는 만들기 원하는 dom을 명시한다. 이것은 jsx에서 tag로 작성되었던 부분이라고 생각하면된다. 
- props : 이 또한 하나의 객체인데, 때문에 이것들은 전부와 키-값으로 이루어져있다. 이 Props 또한 특별한 프로퍼티를 가지고 있는데 바로 `children`이다. 
	- children : 이 children이라는 프로퍼티에는 부모의 자식이 되는 컴포넌트들이 담겨있다. 


### `ReactDOM.render(element, container)`

여기서 render가 바로 리액트가 dom을 변경시키는 곳이다. 이것을 한번 우리 스스로 만들어보자 

자 먼저 주어진 type을 따라서 node를 생성해보자. 그리고 그 node에 props를 넣어주겠다. 
```javascript
const element = {
	type: "h1",
	props: {
		title: "foo",
//		children: "Hello",
	},
}

//const container = document.getElementById("root")

const node = document.createElement(element.type)
node["title"] = element.props.title
```

그런 다음 자식 노드를 만들자. 


```javascript
const element = {
	type: "h1",
	props: {
		title: "foo",
//		children: "Hello",
	},
}

//const container = document.getElementById("root")

//const node = document.createElement(element.type)
//node["title"] = element.props.title

  
const text = document.createTextNode("")
text["nodeValue"] = element.props.children
```

그리고 최종적으로 우리는 textNode를 h1에 붙이고, h1 node를 dom에 붙일 것이다. 

```javascript
//const element = {
//	type: "h1",
//	props: {
//		title: "foo",
//		children: "Hello",
//	},
//}

const container = document.getElementById("root")

//const node = document.createElement(element.type)
//node["title"] = element.props.title

//const text = document.createTextNode("")
//text["nodeValue"] = element.props.children

  
node.appendChild(text)
container.appendChild(node)
```


자, 이것으로 리액트 없이 리액트처럼 DOM을 구성했다. 



## Step I: The `createElement` Function

이번에는 `createElement` 함수의 내부를 살펴보자 

```javascript
function createElement(type, props, ...children) {
	return {
		type,
		props: {
			...props,
			children,
		},
	}
}
```


여기서 만약 children이 다른 Object가아닌 primitive 값이 들어왔다면, 우리는 그것을 처리할 또 다른 로직이 필요하다. 그래서 리액트에서는 이것을 처리할 수 있도록 확인하고 있다. 
```javascript
	children: children.map(child =>
		typeof child === "object"
		? child
		: createTextElement(child)
		),
	},
}
}
```

그리고 createTextElement라는 함수를 통해서 이것을 처리한다. 
```javascript 
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}
```

우리는 지금 새로운 React를 만들고 있기 때문에 이것의 이름을 살짝 바꿔보자. 

```javascript
const Didact = {
  createElement,
}
​
const element = Didact.createElement(
  "div",
  { id: "foo" },
  Didact.createElement("a", null, "bar"),
  Didact.createElement("b")
)

//const container = document.getElementById("root")
//ReactDOM.render(element, container)
```


하지만 우리는 여전히 JSX를 사용하길 원한다. 그러면 바벨에게는 어떻게 명령해주어야 하는 것일까? 
```javascript 
/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)

const container = document.getElementById("root")
ReactDOM.render(element, container)
```

이렇게 주석을 달아주면 바벨은 알아서 jsx라고 인지하고 이것을 트랜스파일링 해줄 것이다. 



## Step II: The `render` Function

우리만의 render 함수를 작성해보자. 

```javascript 
function render(element, container) {
  const dom = document.createElement(element.type)
​
  container.appendChild(dom)
}
​
```

맨 처음에는 element를 하나 만들고, container가 될 dom에게 붙여줄 것이다. 


  

```javascript

function render(element, container) {
  //const dom = document.createElement(element.type)
  
  element.props.children.forEach(child =>
	render(child, dom)
  )
  ​
  //container.appendChild(dom)
}
```

그리고 우리는 이런 작업을 자식 요소들에게도 반복적으로 행해줄 것이다. (재귀적으로)


```javascript 
function render(element, container) {
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type)
​
//    element.props.children.forEach(child =>
//    render(child, dom)
//  )
​
//  container.appendChild(dom)
}
```

그리고 주어진 요소가 TEXT인지 아닌지도 계속 확인을 해줄 것이다. 

```javascript

function render(element, container) {
  /*const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type)*/
​
  const isProperty = key => key !== "children"
  
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })
​
  /*element.props.children.forEach(child =>
    render(child, dom)
  )
​
  container.appendChild(dom)*/
}
```

마지막으로 해줄 부분은 element의 Props를 노드에게 할당해주는 것이다. children인지 아닌지를 확인하고, children이 아닌 props를 가진 경우에만 props들을 해당 node에 할당해준다.  


## Step III: Concurrent Mode


이제 우리는 리팩터링을 해볼 필요가 있다. 현재의 코드에서 문제가 되는 지점이 있다면, 바로 재귀적으로 렌더링 작업을 한다는 것이다. 재귀적으로 렌더링을 하는 것이 왜 문제가 되는 것일까? 이것이 문제가 되는 이유는 컴포넌트 트리에 대한 렌더링이 한번 시작되고 나면 그것을 멈출 수 없다는 것이 문제가 된다. 만약에 컴포넌트 트리가 거대하다면, 그만큼 메인 스레드는 블록될 것이다. 때문에 렌더링 작업이 진행되는 동안에 유저의 입력이 들어온다면, 유저의 입력에 대해서 즉각적으로 대응해줄 수 없게된다. 유저의 입력에 대해서 우선순위를 높일 수 없게 되는 것이다. 이것을 위해서 필요한 것이 필요한 순가에는 렌더링 작업을 멈출 수 있게 해주는 것이다. 

그래서 우리는 작업을 나누어볼 것이다. 이렇게 작업을 나눈 이후에는 브라우저가 필요시에 렌더링 작업을 멈추도록 할 수 있게 될 것이다. 


```javascript
let nextUnitOfWork = null
​
function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}
​
requestIdleCallback(workLoop)
​
function performUnitOfWork(nextUnitOfWork) {
  // TODO
}
```


requestIdleCallback을 setTimeout과 비슷한 api라고 생각할 수 있는데, 다른 지점이 있다. requestIdleCallback은 콜백으로 넘어온 동작을 수행하기 전에 브라우저의 메인 스레드가 idle time에 들어갔는지를 묻는다. 그리고 idle 타임이 존재할 때 해당 작업을 수행하는 방식으로 이루어진다. 사실 실제로는 리액트 팀은 더 이상 requestIdleCallback을 사용하지 않는다. scheduler 패키지를 이용하고 있는데, 개념상으로는 거의 똑같다고 생각하면 된다. 



