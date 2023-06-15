### 날짜 : 2022-11-16 20:54
### 주제 : #함수형프로그래밍 

---- 

### 메모 : 
- 클레이슬리 합성 관점에서의 프로미스를 알아보고 있다. 
- 클레이슬리 합성관점이란, g와 f라는 두 함수를 합성했을 때 f(g(x))
	- g라는 함수에서 에러가 발생한 경우 g나 f에서 동일한 에러가 난 상황으로 래핑해주는 방식이다. 

```javascript

const users = [
	{id:1, name:'aa'},
	{id:2, name:'bb'},
	{id:3, name:'cc'},
]

const getUserById = id => 
	find(u => u.id == id, users)


const f = ({name}) => name;
const g = getUserById;

users.pop()
users.pop()

const fg = id => f(g(id)) // 이 상황에선 f함수와 g함수가 동일한 형식의 에러를 반환하지 않는다. 

const fg = id => Promise.resolve(id).then(g).then(f).catch(a => a)

```


### 내 생각과 정리 : 
- 이 강의는 내용이 살짝 어려웠던 것 같다. 
- 그래서 이게 어떤 의의를 가지는 것일까? 
	- 항상 같은 형식을 가질 수 있도록 보장해준다.
	- 같은 형식을 가진다는 것은 합성과, 체이닝 관점에서 유리한 점이 생긴다. 

### 출처(참고문헌) : 


### Link : 
