# [Inside-react(동시성을구현하는기술) ](https://tv.naver.com/v/23652451)  

> 본 글은 inside react(동시성을 구현하는 기술)이라는 강연을 듣고 정리한 문서입니다. 



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
- case1 : 필요한 데이터를 모두 불러오기 전에 HTML 스트리밍하기 
```javascrip
```

-   React 18의 Suspense 변화
-   Automatic Batching
-   동시성 기능에 대한 공통 주제 : UX

## 4. React 동시성의 기반 기술

-   멘탈 모델
-   React Packages
-   동시성과 이벤트 루프
-   스케쥴러와 우선순위
-   Fiber Architecture
-   Double Buffering Model
-   Lane Priority Model