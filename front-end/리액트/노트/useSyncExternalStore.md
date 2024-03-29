
useSyncExternalStore이 api를 이해해보려 노력하는 중, 잘 이해가 안되는 부분이 
tearing 현상이었다. 

tearing 현상은 동시성이 도입되면서 생긴 문제라고 한다. 아직까지 제대로 이해하지는 못했지만, 간략하게 이해한 내용을 한번 글로 풀어보겠다. concurrent 모드가 되면, 특정 ui에 대해서는 우선순위를 낮추게 된다. 해당 ui를 업데이트 하는 우선순위를 낮추는 것이다. 그리고 우리가 특정 external store를 구독하고 있다면, 해당 store가 업데이트 되었을 때, 그 store를 구독하고 있는 컴포넌트들은 업데이트 될 것이다. 
결론적인 그림으로는 tearing 현상이 일어나면, store가 변경되었을 때 모든 ui가 같이 변경되어야 하는데, 특정 부분만 변경되는 현상이 생기는 것이다. 여기서 내가 궁금해지는 지점은 동시성의 무엇이 이렇게 sync가 안맞도록 하는 것일까?   

아 이런 현상이 발생하는 것이다. 렌더링을 시작했다. 원래 ui색은 blue 였다. 그래서 blue로 렌더링을 하는 중이었다. 그런데 렌더링을 하는 도중에 red로 변경된 것이다. 그러면 blue로 렌더링을 하다가 red로 렌더링을 하게 된다. 이것이 동시성 이후에 발생하는 현상이다. 유저의 입력을 즉각적으로 대응할 수 있게 해주는 기술이 도입되다보니, 이런 현상이 발생했던 것이다. 


```javascript
import React, { useState, useEffect, useCallback, startTransition } from "react";

// library code

const createStore = (initialState) => {
  let state = initialState;
  const getState = () => state;
  const listeners = new Set();
  const setState = (fn) => {
    state = fn(state);
    listeners.forEach((l) => l());
  }
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
  return {getState, setState, subscribe}
}

const useStore = (store, selector) => {
  const [state, setState] = useState(() => selector(store.getState()));
  useEffect(() => {
    const callback = () => setState(selector(store.getState()));
    const unsubscribe = store.subscribe(callback);
    callback();
    return unsubscribe;
  }, [store, selector]);
  return state;
}

//Application code

const store = createStore({count: 0, text: 'hello'});

const Counter = () => {
  const count = useStore(store, useCallback((state) => state.count, []));
  const inc = () => {
    store.setState((prev) => ({...prev, count: prev.count + 1}))
  }
  
  return (
    <div>
      {count} <button onClick={inc}>+1</button>
    </div>
  );
}

const TextBox = () => {
  const text = useStore(store, useCallback((state) => state.text, []));
  
  const setText = (event) => {
    store.setState((prev) => ({...prev, text: event.target.value}))
  }
  
  return (
    <div>
      <input value={text} onChange={setText} className='full-width'/>
    </div>
  );
}

const App = () => {
  return(
    <div className='container'>
      <Counter />
      <Counter />
      <TextBox />
      <TextBox />
    </div>
  )
}
```
