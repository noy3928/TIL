# [Render Props Pattern ](https://www.patterns.dev/posts/render-props-pattern/)


> 본 글은 Render Props Patterns라는 문서를 읽고 정리한 글입니다. 


HOC 패턴에서도 봤듯이 재사용가능한 컴포넌트를 만드는 것은 같은 데이터를 필요로하는 많은 컴포넌트가 존재하거나, 비슷한 로직이 존재하는 경우에 매우 유용하다.

컴포넌트를 재사용 가능하게 만드는 다른 방법이 있는데, 그것은 바로 render prop을 이용하는 것이다. render prop이란 컴포넌트의 prop을 말하는데, jsx를 반환하는 함수를 값으로 가지는 그런 prop을 말한다. 

Title 컴포넌트가 존재한다. 이 컴포넌트는 우리가 넣어주는 값을 화면에 렌더링하는 것 말고는 아무것도 하지 않는다. 여기서 render prop을 이용할 수 있다. 


```js
<Title render={() => <h1>I am a render prop!</h1>} />
```

```js
const Title = ({render}) => render();
```


```js
import React from "react";
import { render } from "react-dom";

import "./styles.css";

const Title = (props) => props.render();

render(
  <div className="App">
    <Title
      render={() => (
        <h1>
          <span role="img" aria-label="emoji">
            ✨
          </span>
          I am a render prop!{" "}
          <span role="img" aria-label="emoji">
            ✨
          </span>
        </h1>
      )}
    />
  </div>,
  document.getElementById("root")
);
```

이 렌더 Prop 패턴의 장점은 Prop로 받아오는 내용이 매우 유연하다는 것입니다. 재사용가능성이 높고, 다양한 것들을 넣을 수 있고, 여러번 넣을 수 있습니다. 


```js
import React from "react";

import { render } from "react-dom";

import "./styles.css";

const Title = (props) => props.render();

render(

  <div className="App">

    <Title render={() => <h1>✨ First render prop! ✨</h1>} />

    <Title render={() => <h2>🔥 Second render prop! 🔥</h2>} />

    <Title render={() => <h3>🚀 Third render prop! 🚀</h3>} />

  </div>,

  document.getElementById("root")

);
```


## 왜 사용하나? 

render prop을 받는 컴포넌트는 단순히 render prop을 호출하는 것 말고는 하지 않고 있다. 대신에 우리가 그 컴포넌트에 데이터를 넣고, 넣은 그 데이터를 render prop에 넣어준 컴포넌트의 prop에 넘겨주고 싶을 수 있다. 

```js
function Component(props) {
  const data = { ... }

  return props.render(data)
}

// Use

<Component render={data => <ChildComponent data={data} />}
```

조금 더 실용적인 예제를 살펴보자 

```js
import React, { useState } from "react";
import "./styles.css";

function Input() {
  const [value, setValue] = useState("");

  return (
    <input
      type="text"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Temp in °C"
    />
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input />
      <Kelvin />
      <Fahrenheit />
    </div>
  );
}

function Kelvin({ value = 0 }) {
  return <div className="temp">{value + 273.15}K</div>;
}

function Fahrenheit({ value = 0 }) {
  return <div className="temp">{(value * 9) / 5 + 32}°F</div>;
}
```

여기서 문제는 Input에 들어온 값을 Kelvin과 Fahrenheit에 공유해야한다는 것이다. 그런데 지금은 그럴 수가 없다. 어떻게해야할까? 

### List State

```javascript
function Input({ value, handleChange }) {
  return <input value={value} onChange={e => handleChange(e.target.value)} />;
}

export default function App() {
  const [value, setValue] = useState("");

  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input value={value} handleChange={setValue} />
      <Kelvin value={value} />
      <Fahrenheit value={value} />
    </div>
  );
}
```

값을 승급하고 그 값을 공유하도록 코드를 수정했다. 하지만 이렇게 할 때 문제가 될 수 있는 지점은 여러 자식이 있을 때 이런 방식으로 구현하는 것이 어려울 수 있고, 불필요하게 자식컴포넌트들 사이에 리렌더링을 일어나는 경우가 발생할 수도 있다. 그러면 당연히 성능에도 문제가 생길 것이다. 


대신에 Render Prop을 사용해서 구현해보자.
```js
function Input(props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.render(value)}
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input
        render={value => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      />
    </div>
  );
}
```


### Children으로 사용해보기 

우리는 함수를 children으로 내려줄 수 있다. 

```js
export default function App() {
  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input>
        {value => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      </Input>
    </div>
  );
}
```

그리고 이렇게 사용하면 된다 
```js
function Input(props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.children(value)}
    </>
  );
}
```


## Hook이랑 같이 사용하기 


이것은 훅으로도 사용할 수 있다.

```js
import React from "react";
import "./styles.css";

import { Mutation } from "react-apollo";
import { ADD_MESSAGE } from "./resolvers";

export default class Input extends React.Component {
  constructor() {
    super();
    this.state = { message: "" };
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={ADD_MESSAGE}
        variables={{ message: this.state.message }}
        onCompleted={() =>
          console.log(`Added with render prop: ${this.state.message} `)
        }
      >
        {(addMessage) => (
          <div className="input-row">
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="Type something..."
            />
            <button onClick={addMessage}>Add</button>
          </div>
        )}
      </Mutation>
    );
  }
}
```


장점 :

1.  여러 컴포넌트 간의 논리와 데이터 공유 용이.
2.  render 또는 children prop을 통한 높은 재사용성.
3.  Higher Order Components (HOC)와 비교했을 때 이름 충돌 방지.
4.  HOC의 암시적 prop 문제를 해결하는 명시적인 prop 전달.
5.  앱 논리와 컴포넌트 렌더링의 분리.

단점:

1.  React Hooks에 의해 대부분 대체됨.
2.  라이프사이클 메서드를 추가할 수 없음.
3.  데이터를 변경할 필요가 없는 컴포넌트에만 제한됨.