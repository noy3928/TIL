### 날짜 : 2022-11-18 17:36
### 주제 : 

---- 

### 메모 : 
- then 메서드를 통해서 값을 꺼냈을 때, 반드시 promise가 아니라는 어떤 규칙이 존재한다. 

```javascript
Promise.resolve(Promise.resolve(Promise.resolve(1))).then(log)
```
- 이렇게 프로미스로 값이 중첩되어 있다할지라도, 단 하나의 then으로 모든 값을 꺼낼 수 있다. 
- 이런 점은 프로미스가 연속적으로 체인이 걸려있어도, then 한번으로 원하는 결과를 얻을 수 있다는 이야기가 된다. 

```javascript
new Promise(resolve => resolve(new Promise(resolve => resolve(1)))).then(log)
```
- 아무리 프로미스가 중첩되어도, 원하는 곳에서 한번에 then으로 값을 꺼내서 사용할 수 있다. 
- 아무리 깊이 promise를 중첩하게 놔두었어도, 가장 안쪽에 있는 값을 꺼내서 사용하게 해준다. 


### 내 생각과 정리 : 
- 단 한번의 then으로 값을 꺼낼 수 있다는 것은 모나드의 flatten 특성과 비슷한 것 같다. 


### 출처(참고문헌) : 


### Link : 
