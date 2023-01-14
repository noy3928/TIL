### 날짜 : 2022-11-05 19:33
### 주제 : #자바스크립트 #ES6 

---- 

### 메모 : 

```javascript
const map = new Map([['a', 1], ['b', 2], ['c', 3])
for(const a of map.keys()) log(a); // 'a'  'b'  'c'
for(const a of map.values()) log(a); // 1  2  3 
for(const a of map.entries()) log(a); // ['a', 1], ['b', 2], ['c', 3]
```

map은 이렇게 keys, values, entries라는 메서드를 가지고 있다. 
보다시피 각각은 순회를 할 수가 있는데, 그렇다는 말은 
map.keys()를 통해서 반환되는 값이 [Symbol.iterator]라는 값을 가지고 있다는 말이 된다. 
실제로 확인을 해보면 해당 값을 가지고 있는 것을 확인할 수 있다. 


### 메모를 한 이유 : 



### 출처(참고문헌) : 


### Link : 
[[for of문과 이터러블,이터레이터]]
