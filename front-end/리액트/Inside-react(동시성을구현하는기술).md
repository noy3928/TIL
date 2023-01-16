# [Inside-react(동시성을구현하는기술) ](https://tv.naver.com/v/23652451)  

> 본 글은 inside react(동시성을 구현하는 기술)이라는 강연을 듣고 정리한 문서입니다. 


## 요약 정리 :

이 강의는 리액트에서의 동시성과 18버전에 대한 개략적인 이해를 위해서 시청했다. 덕분에 동시성과 병렬성의 차이가 무엇인지 이해할 수 있었고, 이 동시성의 개념을 리액트에서는 왜 도입하려고 했는지를 이해할 수 있었다. 리액트에서는 blocking rendering 문제를 해결하기 위해 동시성을 활용했다. 그리고 18버전에서 이 동시성을 지원하는 다양한 기능들이 출시되었다. 더 나아가 이런 동시성이 지원됨으로 인해서 서버사이드 렌더링시 선택적인 하이드레이션이 가능하게 되었는데, 이것이 어떻게 가능해졌는지도 소개한다. 

---


## 1. 5년의 실험

###  React 18 Alpha 릴리즈

- 워킹 그룹을 설립 후 열띤 토론을 이어났었음 

### 무엇이 달라지나

- autimatic batching 

### 수정된 업그레이드 전략

- 기존의 기능과 추후의 기능을 동시에 사용가능하도록 수정

###  "Concurrent" 용어 정리

- ReactDOM.createRoot 실행시 내부적으로 'concurrent mode'가 활성화된다. 
- 그러나 이 조건에서 반드시 "concurrent rendering"을 하는 것은 아니다. 
- "concurrent features"를 사용할 때만 "concurrent rendering"을 수행한다. 


## 2. 동시성으로 해결하려는 문제

### Concurrency vs Parallelism

- 동시성과 병렬성 
	- 동시성은 독립적으로 실행되는 프로세스들의 조합이다. 병렬성은 연관된 복수의 연산들을 동시에 실행하는 것이다. 동시성은 여러 일을 한꺼번에 다루는 문제에 관한 것이다. 병렬성은 여러 일을 한꺼번에 실행하는 방법에 관한 것이다. 
	- 동시성이란 마음의 상태이다. 실제로는 여러 개의 스레드가 사용되지는 않지만, 겉으로 보기에는 마치 여러 개의 스레드가 사용되고 있는 것처럼 보이게 만드는 것을 의미한다. 이것이 바로 협력적 멀티스레딩이다. 
	- 동시성 : 동시에 실행되는 것처럼 보임. 컨텍스트 스위칭이 필요함 / 최소 두 개의 논리적 통제 흐름 
	- 병렬성 : 실제로 동시에 2개가 실행  / 최소 한 개의 논리적 통제 흐름
	- 동시성이란 2개 이상의 독립적인 작업을 잘게 나누어 동시에 실행되는 것처럼 보이도록 프로그램을 구조화하는 방법 
- 그럼 리액트는 어떤 문제를 해결하려고 이 동시성을 도입하려했는가? 

![[스크린샷 2023-01-16 오후 9.49.57.png]]

![[스크린샷 2023-01-16 오후 9.50.09.png]]


### Blocking Rendering 문제

- 블로킹 렌더링 : 한번 렌더링에 돌입하고 나서 멈출 수 없는 현상 
	- 일반적으로는 이것이 문제가 되지 않지만, 렌더링을 하는게 걸리는 시간이 오래걸리는 경우에는 문제가 될 수 있다. 
	- https://ajaxlab.github.io/deview2021/blocking/
	- 화면이 오래 블록되면 사용자 경험이 악화된다. 

### 적당한 지연은 어떤가요?

- 디바운스와 쓰로틀을 이용해서 적당한 지연을 구현해보기도 했지만, 모두 불안정한 사용자 경험을 유발했었다. 
- 그래서 리액트 팀은 동시성 렌더링으로 이문제를 해결하조가 했다.


### 동시성 렌더링으로 해결해 보자

- 리액트는 우선순위를 나누었다 : 급한 렌더링과 급하지 않은 렌더링 


![[스크린샷 2023-01-16 오후 9.59.44.png]]


한 차선을 고속차선, 다른 차선을 저속차선이라고 부른다. 리액트팀에서는 이것을 Lane 부르기로 했다. 우선순위를 제어하기 위해서 사용한다. 

![[스크린샷 2023-01-16 오후 10.02.05.png]]

- 리액트가 동시성을 구현하는 방법 : 
	- 기존에는 첫번째 요소를 렌더링하기 위해서 걸리는 시간만큼 기다리고, 해당 요소의 렌더링이 완료되고 다면 그 다음 렌더링을 실시했었다. 
	- 이후에는 첫 번째 요소의 렌더링이 다 렌더링되지 않은 상태로 그 다음 렌더링 요소가 들어오면, 이전의 완료되지 않은 렌더링 요소는 차단된다. 그리고 가장 최근에 들어온 렌더링 요소의 우선순위를 높여 해당 요소를 먼저 렌더링한다. 이런 방식으로 계속해서 최근에 들어온 렌더링 요소를 먼저 처리한다. 그리고 남아있는 요소들은 리베이스 시킨다(여기서 리베이스 시킨다는 것은 무슨 말인지 이해가 안된다) 


## 3. React 18의 동시성 기능

### startTransition

```javascript
let isInTransition = false;

function startTransition(fn){
	isInTransition = true
	fn()
	isInTransition = false
}

function setState(value){
	stateQueue.push({
		nextState: value,
		isTransition : isInTransition
	})
}

```

- api를 통해서 우선순위를 조정할 수 있다. 우선순위를 조정하고나면 cpu 사용을 양보할 수 있다. 

```javascript
const { useState, useTransition } = React;

function TextInput({onChange}){
	const [text,setText] = useState("");
	return {
		<input type="text" value={text}
			onChange={({target}) => {
				setText({target.value})
				onChange(target.value);
			}}
	}
}

function App() {
	const [size, setSize] = useState(0);
	const [isPending, startTransition] = useTransition();

	function handleChange(text){
		startTransition(() => {
			setSize(text.length);
		})
	}

	return(
		<div className="container">
			<h1>Concurrent {size}</h1>
			<TextInput onChange={handleChange} />
			<div className={isPending ? "pending" : ""}>
				<ColorList length={size} />
			</div>
		</div>
	)
}
```

https://ajaxlab.github.io/deview2021/concurrent/


- 어떻게 작동하는가 
	- yielding : 렌더링 과정을 작게 분할하고 일시 중지할 수 있음
	- interrupting : 동시성 모드에서 업데이트에 대해 우선 순위가 있음 
	- 이전 결과 건너뛰기 : 현재 상태만 반영하도록 중간 상태 반영을 건너 뜀 
- setTimeout과 어떻게 다른가 
	- setTimeout으로 Task Queue에 들어간 작업은 들어간 순서대로 처리되고 취소될 수 없다. 
- Urgent Updates 
	- 입력, 클릭, 누르기 등과 같은 직접적인 상호 작용을 반영하기 
	- 즉각적 응답이 필요 
- Transition Updates 
	- 하나의 view에서 다른 view로 전환 
	- 전환되는 중간과정을 기대하지 않는다. 
	- Load Transition , Refresh Transition 


### Streaming SSR with Selective Hydration

- 기존 SSR의 문제 : (아직 이 부분 이해가 안됨)
	- 어떤 것이라도 보여주기 위해 모든 data를 fetch 해야 함 
	- 어떤 것이라도 hydrate 하기 전에 필요한 모든 것을 로드해야 함 
	- 어떤 것이라도 상호작용하기 위해 모든 부분을 hydrate해야 함 
- React 18에서 잠금 해제된 두 가지 기능 :
	- server : Streaming HTML 
		- 기존의 renderToString() 대신 pipeToNodeWritable() 사용 
	- client : Selective Hydration 
		- createRoot()와 용량이 크거나 처리가 느린 부분을 Suspense로 감싸기 
- Case1 : 필요한 데이터를 모두 불러오기 전에 HTML 스트리밍하기 
```javascript 
<Post/>
<Suspense fallback={<Spinner/>} >
	<Comments />
</Suspense >
```
특정 컴포넌트롤 서스펜스로 감싸면 해당 부분에서 필요한 데이터가 패치되지 않아도, 스트리밍을 시작할 수 있다. 그래서 나머지 필요한 부분을 먼저 보여줄 수 있다. 

- 질문 : 
	- 스트리밍을 시작한다는 것은 무슨 말일까?
		- When we say "streaming" in the context of server-side rendering, it refers to the process of sending the rendered HTML to the client in chunks, rather than waiting for the entire HTML to be generated before sending it. This allows the browser to start displaying the content to the user as soon as it receives the first chunk of HTML, rather than having to wait for the entire HTML to be generated and sent from the server. This way, users can see some of the content of the page faster, making for a more seamless and responsive experience.
	- HTML 스트림을 시작한다는 것은 무슨 말이지? 

- Case2(선택적 하이드레이션) : React.lazy와 함께 모든 코드가 로드되기 전에 Hydrate 
	- 서스펜스로 감싼 컴포넌트 이외의 부분이 먼저 렌더링되고, 먼저 하이드레이션 된다. 이것이 선택적 하이드레이션이다. 
	- 이것으로 하이드레이션을 진행하기 전에 모든 것을 로드해야함. 이 문제를 해결할 수 있었다. 

```javascript 
const Comment = lazy(() => import("./Comments.js"));
// ... 
<Suspense fallback={<Spinner />}>
	<Comment/>
</Suspense>
```

- Case 3 : 모든 HTML이 스트리밍되기 전에 하이드레이션 
	- js코드가 모든 HTML 보다 먼저 로드되면 기다릴 이유가 없다. 페이지의 나머지 부분을 하이드레이션 한다. 

![[스크린샷 2023-01-16 오후 10.50.48.png]]

- Case4 : 모든 컴포넌트가 하이드레이션되기 전에 상호작용 
	- React 18에서 하이드레이션은 매우 작은 간격으로 실행되므로 메인 스레드를 블록하지 않음 
![[스크린샷 2023-01-16 오후 10.51.48.png]]

- Case5 : 하이드레이션 우선순위 조정 
	- React는 가능한 빨리 모든 것을 하이드레이션하기 시작하고, 사용자 상호작용을 기반으로 화면에서 가장 긴급한 부분의 우선순위를 지정한다. 

![[스크린샷 2023-01-16 오후 10.52.33.png]]


### React 18의 Suspense 변화

- 추가될 기능 :
	- show old data while refetching pattern : startTransition과 함께 사용 
	- Built-in throttling : 스피너가 너무 자주 나타나지 않도록 조절  
- 추가되지 않는 기능 : 
	- 데이터 패칭과 관련된 전략은 x 

## 4. React 동시성의 기반 기술

### React Packages

- flow, rollup, babel 을 사용 
- monorepo 
- /fixtures 
- /packages 
	- scheduler
	- reconciler
	- renderers

### 동시성과 이벤트 루프

- 15.x이전 : render를 시작하면 멈출 수 없었음. renderer에 진입하기전에 연산을 일시정지할 수 있는게 필요했음 
- 렌더링 파이프라인시 진입 가능한 2 지점 : Draw Callback, Idle Callback 
	- Draw Callback(requestAnimationFrame) : 레이아웃 계산전에 돔을 수정해서 반영하고 싶을 때 유용하다. 그러나 layout 시점까지 남은 시간을 알 수 있는 방법이 없었기 때문에 일시정지하는 것은 한계가 있었다. 
	- Idle Callback(requestIdleCallback) : 이것은 메인 스레드를 블록하지 않고 idle 타임이 얼마나 남았는지를 알려준다. 유휴시간을 알려줌. 
- requestIdleCallback의 문제 : 
	- safari, ie 지원안함 
	- callback 호출 주기가 불안정 
	- 브라우저 탭 전환 시 비활성 탭의 호출 주기가 매우 낮아짐 

https://ajaxlab.github.io/deview2021/eventloop/ 

### Fiber Architecture

![[스크린샷 2023-01-16 오후 11.17.44.png]]
