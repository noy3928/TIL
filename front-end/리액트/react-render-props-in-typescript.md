# [React Render Props in TypeScript](https://medium.com/@jrwebdev/react-render-props-in-typescript-b561b00bc67c) 

> 본 문서는 React Render Props in TypeScript 라는 글을 읽고 정리한 글입니다. 

이 글에서는 render props 패턴을 사용할 때 props를 받아오는 컴포넌트의 타입을 체킹하는 방법에 대한 글이다. 

```javascript
export interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

interface MakeCounterProps {
  minValue?: number;
  maxValue?: number;
}

interface MakeCounterState {
  value: number;
}

const makeCounter = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
) =>
  class MakeCounter extends React.Component<
    Subtract<P, InjectedCounterProps> & MakeCounterProps,
    MakeCounterState
  > {
    state: MakeCounterState = {
      value: 0,
    };

    increment = () => {
      this.setState(prevState => ({
        value:
          prevState.value === this.props.maxValue
            ? prevState.value
            : prevState.value + 1,
      }));
    };

    decrement = () => {
      this.setState(prevState => ({
        value:
          prevState.value === this.props.minValue
            ? prevState.value
            : prevState.value - 1,
      }));
    };

    render() {
      const { minValue, maxValue, ...props } = this.props;
      return (
        <Component
          {...props as P}
          value={this.state.value}
          onIncrement={this.increment}
          onDecrement={this.decrement}
        />
      );
    }
  };
```