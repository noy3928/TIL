### 날짜 : 2022-11-14 16:39
### 주제 : 

---- 

### 메모 : 
- 중첩된 값을 펼쳐주는 함수
```javascript
// 지연
L.flatten = function *(iter){
	for(const a of iter){
		if(isIterable(a)) for (const b of a) yield b;
		else yield a;
	}
}

var it = L.flatten([1,2], 3, 4, [5,6], [7,8,9])


// 즉시
const flatten = pipe(L.flatten, takeAll)
```

`yield *iterable` 은 ``

```javascript
yield *iterable 
```

- 더 깊은 flatten도 가능 
```javascript
L.deepFlat = function *f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield *f(a);
    else yield a;
  }
};
log([...L.deepFlat([1, [2, [3, 4], [[5]]]])]);
// [1, 2, 3, 4, 5];
```

### 내 생각과 정리 : 
- 이번 강의나 저번 강의나 계속해서 지연성을 지닌 특정 함수들을 만들어나가고 있다. 
- flatten 함수 같은 경우도, 함수형 자바스크립트에서 계속 봐온 함수이다. 이것은 모나드의 join과 비슷한 역할을 하는 듯 하다. 

### 출처(참고문헌) : 


### Link : 
