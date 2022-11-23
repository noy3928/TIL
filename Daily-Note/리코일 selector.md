### 날짜 : 2022-11-23 20:44
### 주제 : 

---- 

### 메모 : 

> **Selector**는 파생된 상태(**derived state**)의 일부를 나타낸다. 파생된 상태를 어떤 방법으로든 주어진 상태를 수정하는 순수 함수에 전달된 상태의 결과물로 생각할 수 있다.


```javascript
const todoListStatsState = selector({  
	key: 'todoListStatsState',  
	get: ({get}) => {  
		const todoList = get(todoListState);  
		const totalNum = todoList.length;  
		const totalCompletedNum = todoList.filter((item) => item.isComplete).length;  
		const totalUncompletedNum = totalNum - totalCompletedNum;  
		const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;  
  
return {  
	totalNum,  
	totalCompletedNum,  
	totalUncompletedNum,  
	percentCompleted,  
};  
},  
});
```


## 사용예시 : 

1. 원본 데이터는 마일인데, 화면 상에는 킬로미터로 표시해야하는 경우 : 
	- 이런 경우에 selector를 사용하기 용이하다. 

```javascript
const mphState = atom({
  key: 'mphState',
  default: 0,
});

const kphState = selector({
  key: 'kphState',
  get: ({ get }) => {
    const mph = get(mphState);
    return mph * 1.609; // 1마일은 약 1.609킬로부터
  },
});
```
이렇게 작성해둔 state는 쓰기가 불가능한 상태다. 하지만 set 속성을 추가하면 쓰기가 가능해진다. 

```javascript
export const kphState = selector<number>({
  key: 'kphState',
  get: ({ get }) => {
    const mph = get(mphState);
    return mph * 1.609;
  },
  set: ({ set }, newValue) => {
    if (typeof newValue === 'number') {
      set(mphState, newValue / 1.609); // 킬로미터를 마일로 변환한다
    }
  },
});

const KPHInput: React.FC<Props> = () => {
  const setKph = useSetRecoilState(kphState);
  return (
    <input type="number" onChange={(e) => setKph(parseInt(e.target.value))} />
  );
};
```


2. 분으로 가져온 데이터를 시간으로 바꿔서 표시해야 할 때 : 

```javascript
import { atom, selector } from "recoil";

export const minuteState = atom({ 
	key: "minutes", 
	default: 0, 
}); 

export const hourSelector = selector<number>({ 
	key: "hours", 
	get: ({ get }) => { 
		const minutes = get(minuteState) / 60; 
		return minutes; 
	}, 
	set: ({ set }, newValue) => { 
	// console.log(Number(newValue)); 
		const minutes = Number(newValue) * 60; 
		set(minuteState, minutes); 
	}, 
});

```





### 내 생각과 정리 : 

- 파생된 상태라는 단어가 좀 어색하다. 분명 뜻은 이해했는데, 단어가 그렇게 와닿지 않는다. 
	- 원래 recoil이 가지고 있는 state가 있는데, 그 state에서 비롯해 새롭게 만들어진 state를 말하는 것 같다. 
		- ex. 필터링된 state, article state가 있다면 그 state의 갯수. 
		- ex. 마일로 받아온 recoil state를 킬로미터로 표시. 
- 이는 기존에 있던 데이터에 의존하는 동적인 데이터를 만들 수 있게 해준다. 
- selector의 set : 
	- 파생된 state에 대해서 쓰기가 가능하도록 만들어준다. 




### 출처(참고문헌) : 
[Selectors](https://recoiljs.org/ko/docs/basic-tutorial/selectors/)
[Recoil 정확하게 사용하기! (feat. Selector)](https://tech.osci.kr/2022/09/02/recoil-selector/)
[Recoil의 쓰기 가능한 셀렉터](https://blog.rhostem.com/posts/2021-11-24-recoil-writable-selector)


### Link : 
