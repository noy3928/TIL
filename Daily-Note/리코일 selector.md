### 날짜 : 2022-11-23 20:44
### 주제 : 

---- 

### 메모 : 
selector를 사용하지 않고 atom을 변경하기 
```javascript
import React, { useCallback, useEffect, useMemo, useState } from "react"; 
import { useRecoilState, useRecoilValue } from "recoil"; 
import { userList } from "../modules/UserList/atom"; 
const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 

export default function List() { 
const [number, setNumber] = useState(1); 
const [list, setList] = useRecoilState(userList); 
const handleChange = useCallback( (event: React.ChangeEvent<HTMLSelectElement>) => { 
	const number = Number(event.currentTarget.value); setNumber(number); 
}, [] ); 

useEffect(() => {
	setList(() => list.filter((li) => li.phone.includes(`${number}`))); 
}, [list, number]); 

return ( 
	<div> 
		<h2>Select number</h2> 
		<select onChange={handleChange} value={number}> 
			{numberList.map((num) => ( 
			<option value={num} key={num}> {num} </option>))
			} 
		</select> 
		<h1>Select List</h1> 
		<hr /> 
		{list.map(({ id, addr, name, phone }) => 
		( <div> 
			<p>id: {id}</p> 
			<p>name: {name}</p> 
			<p>addr: {addr}</p> 
			<p>phone: {phone}</p> 
			<hr /> 
		</div> ))
		} 
		</div> ); 
		}
```
- 이렇게 atom을 직접 변경하는 경우 해당 atom을 사용하고 있는 모든 컴포넌트에서 렌더링이 일어나게 될 것이다. 

이 코드를 셀렉터를 이용해서 다시 수정해보자. 

```javascript 
// Component 
import React, { useCallback, useEffect, useMemo, useState } from "react"; 
import { useRecoilState, useRecoilValue } from "recoil"; 
import { userSelector as selector } from "../modules/UserList/selector"; 
const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 

export default function List() {
const [number, setNumber] = useState(1); 
const userSelector = useRecoilValue(selector(number)); 
const handleChange = useCallback( (event: React.ChangeEvent<HTMLSelectElement>) => {
	const number = Number(event.currentTarget.value); 
	setNumber(number); 
}, [] ); 

return ( 
	<div> 
		<h2>Select number</h2> 
			<select onChange={handleChange} value={number}> 
			{numberList.map((num) => ( <option value={num} key={num}> {num} </option> ))} 
			</select> 
			<h1>Select List</h1> 
			<hr /> 
			{userSelector.map(({ id, addr, name, phone }) => (
			 <div> 
				 <p>id: {id}</p> 
				 <p>name: {name}</p> 
				 <p>addr: {addr}</p> 
				 <p>phone: {phone}</p> 
				 <hr /> 
			 </div> ))
			 } 
			 </div> ); 
			 }

```


```javascript
// Selector 
import { selectorFamily } from "recoil"; 
import { IUser } from "../type"; 
import { userList } from "./atom"; 

export const userSelector = selectorFamily<IUser[], number>({ 
	key: "userSelector", 
	get: (param: number) => 
	({ get }) => 
	get(userList).filter((person) => 
	person.phone.includes(`${param}`)), } );
```

- 셀렉터에 값을 제공하고, 셀렉터에 반환하는 값을 화면에 보여주는 역할만 하고있다. 
- 해당 컴포넌트에서 수행하는 연산이 줄어들고, 관리 포인트가 분리되었다. 
- selector는 내부에서 get이라는 메서드를 파라미터로 받는다. 
- get메서드를 활용해 atom을 사용할 수 있다. 
- 여러 atom을 가공해 사용해야하는 경우 더욱 효과적으로 사용할 수 있다. 
- 


### 내 생각과 정리 : 


### 출처(참고문헌) : 
[Recoil 정확하게 사용하기! (feat. Selector)](https://tech.osci.kr/2022/09/02/recoil-selector/)

### Link : 
