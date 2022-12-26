#compound-component-pattern 

# [ React Hooks: Compound Components](https://kentcdodds.com/blog/compound-components-with-react-hooks)



여러 개의 컴포넌트가 한 가지 유용한 작업을 수행하기 위해 함께 작동하는 것이 목표입니다. 일반적으로 하나의 컴포넌트가 부모이고 다른 컴포넌트가 자식입니다. 이를 통해 더 표현력 있고 유연한 API를 제공할 수 있습니다.

```html
<select>
  <option value="value1">key1</option>
  <option value="value2">key2</option>
  <option value="value3">key3</option>
</select>
```