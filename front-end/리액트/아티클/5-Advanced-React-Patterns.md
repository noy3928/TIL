# [5 Advanced React Patterns](https://javascript.plainenglish.io/5-advanced-react-patterns-a6b7624267a6)

> 본 글은 5 Advanced React Patterns라는 문서를 읽고 정리한 글입니다. 


모든 리액트 개발자라면 아래와 같은 3가지 질문을 던질 것이다. 

- 어떻게 다양한 케이스에서 재사용성이 높은 컴포넌트를 작성할 수 있을까? 
- 어떻게 사용하기 쉽게 설계된 컴포넌트 API를 만들 수 있을까?
- 어떻게 UI이고 기능적인 관점에서 확장 가능성 높은 컴포넌트를 만들 수 있을까?

이런 3가지 질문은 결국 리액트의 고급 패턴들에 주목하게 만든다. 

---

## 1.Compound component pattern 

이 패턴은 Prop drilling 문제를 해결해주면서, 훨씬 더 풍성하고 선언적인 컴포넌트를 작성할 수 있게 만들어준다. 만약 더 커스마이징 하기 쉬우면서, 관심사의 분리도 확실하게 구분하고 이해하기 쉽게 만들고 싶다면 이 패턴을 고려해보자. 


```javascript
import React from "react";
import { Counter } from "./Counter";

function Usage() {
  const handleChangeCounter = (count) => {
    console.log("count", count);
  };

  return (
    <Counter onChange={handleChangeCounter}>
      <Counter.Decrement icon="minus" />
      <Counter.Label>Counter</Counter.Label>
      <Counter.Count max={10} />
      <Counter.Increment icon="plus" />
    </Counter>
  );
}

export { Usage };
```


### 장점 : 

- API의 복잡성 감소 : 이전에는 부모 컴포넌트에 거대한 props를 내려주는 방식으로 만들어야했습니다. 하지만 이 패턴을 사용하고 나면, props는 더욱 단순해지고, 각각의 자식들의 props에 직접적으로 값을 내려줄 수 있게 됩니다. 
- 유연한 마크업 구조 : 다양한 상황에서 유연하게 UI를 구성할 수 있다는 장점을 가지고 있다. 예를 들어서, Counter의 자식들의 순서를 쉽게 수정할 수 있다.
- 관심사의 분리 : 대부분의 로직은 Counter에 들어가 있다. 각각의 자식들은 자신의 역할을 나누어저 감당할 수 있게 된다.


### 단점 :

- 유연성이 너무 높아진다 : 이 정도 수준의 유연성은 개발자가 제대로 사용하지 않으면, 예상치 못하게 UI를 해칠수도 있다. 상황에 따라서는 이런 유연성이 필요없을 수도 있다. 
- 무거워진 JSX : 이 패턴은 JSX를 반환하는 줄이 점점 길어진다. 보기 안좋을 수 있다. (근데, 내 눈엔 이뻐보임.)


## 2.Control Props Pattern 

이 패턴은 당신의 컴포넌트가 재어 컴포넌트가 되게 해준다. 외부의 상태는 하나의 진리의 원천으로 사용된다. 그리고 이 하나의 진리의 원천은 개발자로 하여금 그들만의 컴포넌트의 기본행동을 수정하는 로직을 넣는 것을 허용한다. 

```js
import React, { useState } from "react";
import { Counter } from "./Counter";

function Usage() {
  const [count, setCount] = useState(0);

  const handleChangeCounter = (newCount) => {
    setCount(newCount);
  };
  return (
    <Counter value={count} onChange={handleChangeCounter}>
      <Counter.Decrement icon={"minus"} />
      <Counter.Label>Counter</Counter.Label>
      <Counter.Count max={10} />
      <Counter.Increment icon={"plus"} />
    </Counter>
  );
}

export { Usage };
```


## 3.Custom Hook Pattern 

Let’s go further in “inversion of control”: the main logic is now moved into a custom hook. This hook exposes several internal logics (`States`, `Handlers`), which gives great control to the developers.


```js
import React from "react";
import { Counter } from "./Counter";
import { useCounter } from "./useCounter";

function Usage() {
  const { count, handleIncrement, handleDecrement } = useCounter(0);
  const MAX_COUNT = 10;

  const handleClickIncrement = () => {
    //Put your custom logic
    if (count < MAX_COUNT) {
      handleIncrement();
    }
  };

  return (
    <>
      <Counter value={count}>
        <Counter.Decrement
          icon={"minus"}
          onClick={handleDecrement}
          disabled={count === 0}
        />
        <Counter.Label>Counter</Counter.Label>
        <Counter.Count />
        <Counter.Increment
          icon={"plus"}
          onClick={handleClickIncrement}
          disabled={count === MAX_COUNT}
        />
      </Counter>
      <button onClick={handleClickIncrement} disabled={count === MAX_COUNT}>
        Custom increment btn 1
      </button>
    </>
  );
}

export { Usage };
```

단점 : 구현 복잡성의 증가 


## 4. Props Getters Pattern

The `Custom Hook Pattern` provides great control, but it also makes the component harder to integrate because the developers have to deal with lots of native hook props and recreate the logic on his side.

The `Props Getters Pattern` pattern attempts to mask this complexity. We provide a shortlist of `props getters` instead of exposing native props.

> A `getter` is a function that returns many props, it has a meaningful name, making it clear to the developers which `getter` corresponds to which JSX element.

```js
import React from "react";
import { Counter } from "./Counter";
import { useCounter } from "./useCounter";

const MAX_COUNT = 10;

function Usage() {
  const {
    count,
    getCounterProps,
    getIncrementProps,
    getDecrementProps
  } = useCounter({
    initial: 0,
    max: MAX_COUNT
  });

  const handleBtn1Clicked = () => {
    console.log("btn 1 clicked");
  };

  return (
    <>
      <Counter {...getCounterProps()}>
        <Counter.Decrement icon={"minus"} {...getDecrementProps()} />
        <Counter.Label>Counter</Counter.Label>
        <Counter.Count />
        <Counter.Increment icon={"plus"} {...getIncrementProps()} />
      </Counter>
      <button {...getIncrementProps({ onClick: handleBtn1Clicked })}>
        Custom increment btn 1
      </button>
      <button {...getIncrementProps({ disabled: count > MAX_COUNT - 2 })}>
        Custom increment btn 2
      </button>
    </>
  );
}

export { Usage };

```