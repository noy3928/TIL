### 날짜 : 2022-11-13 01:04
### 주제 : #함수형프로그래밍 

---- 

### 메모 : 
- 지연성을 가지고 있는 L.map을 한번 구현해보자 
	- 앞서 만들었던 map을 제너레이터, 이터레이터 기반으로 만든 map을 만들게 될 것이다. 
	- 평가를 미루는 성질을 가지고, 평가 순서를 달리 조작할 수 있는 그런 이터레이터를 반환하는 제너레이터라고 할 수 잇다. 

```javascript
L.map = function *(f, iter){
	for (const a of iter) yield f(a);
}
```


- 지연성을 가진 L.filter를 만들어보자. 
	- 평가하고자 하는 값이 f에 들어갔을 때, true가 되는 경우에 값을 반환한다. 

```javascript
L.filter = function *(f, iter){
	for (const a of iter) if(f(a)) yield a;
}

L.filter(a => a % 2, [1,2,3,4]);
```



### 내 생각과 정리 : 


### 출처(참고문헌) : 


### Link : 
