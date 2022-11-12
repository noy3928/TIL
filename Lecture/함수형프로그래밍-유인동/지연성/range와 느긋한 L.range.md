### 날짜 : 2022-11-13 00:27
### 주제 : #함수형프로그래밍 

---- 

### 메모 : 

```javascript
const add = (a, b) => a + b;

const range = l => {
	let i = -1;
	let res = [];
	
	while(++i < l){
		res.push(i);
	}
	return res;
}
```

- 느긋한 range를 보자 

```javascript
const L = {};

L.range = function *(l){
	let i = -1;
	while(++i < l){
		yield i;
	}
}
```


### 내 생각과 정리 : 


### 출처(참고문헌) : 


### Link : 
