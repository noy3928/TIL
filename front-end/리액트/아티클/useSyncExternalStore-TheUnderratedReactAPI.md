
# [useSyncExternalStore - The underrated React API](https://thisweekinreact.com/articles/useSyncExternalStore-the-underrated-react-api) 


> 본 글은 useSyncExternalStore - The underrated React API라는 아티클을 읽고 정리한 문서입니다. 


이 useSyncExternalStore라는 api는 보통 redux와 같은 상태관리 라이브러리 내부에서 selector 시스템을 구현하기 위해서 사용되는 api이다. 하지만, 이 api를 우리가 사용하는 어플리케이션에서는 사용할 수 없을까? 


이번 아티클에서는 이런 문제를 가정해보겠다.
- 불필요한 렌더링을 일으키는 리액트 훅. 

그리고 이런 상황을 어떻게 `useSyncExternalStore()` 가 해결할 수 있는지도 알아보자. 


## Over-returning hooks


useLocation이라는 훅을 사용한다고 가정해보자. 이 훅에는 수없이 많은 속성들이 존재할 것이다. 그런데 우리는 이 속성들 중 대부분은 사용하지 않는다. 그럼에도 불구하고, 그 안의 속성들이 변경되면 우리의 컴포넌트는 리렌더링될 것이다. 


```javascript
function CurrentPathname() {
  const { pathname } = useLocation();
  return <div>{pathname}</div>;
}

function CurrentHash() {
  const { hash } = useLocation();
  return <div>{hash}</div>;
}

function Links() {
  return (
    <div>
      <Link to="#link1">#link1</Link>
      <Link to="#link2">#link2</Link>
      <Link to="#link3">#link3</Link>
    </div>
  );
}

function App() {
  return (
    <div>
      <CurrentPathname />
      <CurrentHash />
      <Links />
    </div>
  );
}
```

이 예제를 보면 link를 클릭할 때, hash 값이 변경된다. 그러면 useLocation이 가지고 있는 속성 중에서 hash만 변경되는 것임이 분명하다. 그럼에도 불구하고, CurrentPathname 컴포넌트도 다시 렌더링이 된다. 


## useSyncExternalStore 란 무엇인가? 

-   `subscribe`: function to register a callback that is called whenever the store changes.
-   `getSnapshot`: function that returns the current value of the store.
-   `getServerSnapshot`: function that returns the snapshot used during server rendering.



```javascript 
function subscribe(callback) {  
	window.addEventListener("online", callback);  
	window.addEventListener("offline", callback);  
	return () => {  
		window.removeEventListener("online", callback);  
		window.removeEventListener("offline", callback);  
	};  
}  
  
function useOnlineStatus() {  
	return useSyncExternalStore(  
		subscribe,  
		() => navigator.onLine,  
		() => true  
	);  
}  
  
function ChatIndicator() {  
	const isOnline = useOnlineStatus();  
	// ...  
}

```



## `useHistorySelector()` 구현하기 

-  [`useHistory()`](https://v5.reactrouter.com/web/api/Hooks/usehistory) 를 통해서 브라우저 히스토리에 접근해야한다. 
-  [`history.listen(callback)`](https://github.com/remix-run/history/blob/main/docs/api-reference.md#history.listen) 를 통해서 히스토리가 업데이트 되는 것을 구독해야한다. 
-  [`history.location`](https://github.com/remix-run/history/blob/main/docs/api-reference.md#historylocation) 를 통해서 현재의 위치의 스냅샷에 접근해야한다. 


useHistorySelector를 상대적으로 간단하게 한번 구현해보자. 

```javascript
function useHistorySelector(selector) {
  const history = useHistory();
  return useSyncExternalStore(history.listen, () =>
    selector(history)
  );
}
```

그리고 이것을 우리의 앱에 사용해보자. 

```javascript
function CurrentPathname() {
  const pathname = useHistorySelector(
    (history) => history.location.pathname
  );
  return <div>{pathname}</div>;
}

function CurrentHash() {
  const hash = useHistorySelector(
    (history) => history.location.hash
  );
  return <div>{hash}</div>;
}
```

이렇게 바꾸고 나면 더 이상 hash 값에 변경이 없는 컴포넌트에 대해서는 렌더링이 일어나지 않게 된다. 



## 또 다른 예시 : `scrollY`

우리가 외부에서 구독할 수 있는 수없이 많은 데이터 저장소가 존재한다. 때문에 당신만의 selector 시스템을 구축해보자. 

이번에는 페이지의 scrollY의 포지션 정보를 select 해오는 예제를 만들어보자. 


```javascript 
// A memoized constant fn prevents unsubscribe/resubscribe
// In practice it is not a big deal
function subscribe(onStoreChange) {
  global.window?.addEventListener("scroll", onStoreChange);
  return () =>
    global.window?.removeEventListener(
      "scroll",
      onStoreChange
    );
}

function useScrollY(selector = (id) => id) {
  return useSyncExternalStore(
    subscribe,
    () => selector(global.window?.scrollY),
    () => undefined
  );
}
```

이제 이것을 사용해보자 

```javascript
function ScrollY() {
  const scrollY = useScrollY();
  return <div>{scrollY}</div>;
}

function ScrollYFloored() {
  const to = 100;
  const scrollYFloored = useScrollY((y) =>
    y ? Math.floor(y / to) * to : undefined
  );
  return <div>{scrollYFloored}</div>;
}
```


