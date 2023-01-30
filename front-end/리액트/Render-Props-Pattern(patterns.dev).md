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

여기서 문제는 Input에 들어온 값을 Kelvin과 Fahrenheit에 공유해야한다는 것이다. 그런데 지금은 글러