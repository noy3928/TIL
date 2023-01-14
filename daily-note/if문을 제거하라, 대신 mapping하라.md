### 날짜 : 2022-11-08 16:55
### 주제 : #클린코드 

---- 

### 메모 : 
```javascript 
function executePayment(paymentType){
	if(paymentType === 'KAKAO_PAYMENT'){
		return '카카오 결제 처리'
	} else if (paymentType === 'NAVER_PAYMENT'){
		return '네이버 결제 처리'
	} else if (paymentType === 'COOPANG_PAYMENT'){
		return '쿠팡 결제 처리'
	}	
}
```
이런 if문의 코드가 있다. 이런 if문은 코드의 가독성을 해친다. 
어떻게 이 코드를 수정할 수 있을까? 

```javascript
const paymentMap = {
	"KAKAO_PAYMENT" : '카카오 결제 처리',
	"NAVER_PAYMENT" : '네이버 결제 처리',
	"COOPANG_PAYMENT" : '쿠팡 결제 처리'
}

function executePayment(paymentMap){
	return paymentMap[paymentType]
}

console.log(executePayment('KAKAO_PAYMENT'))
```
이렇게 객체로 매핑을 해주면 훨씬 가독성 높은 코드를 작성할 수 있다. 


함수도 마찬가지다. 
```javascript
function payOnKakao() {}
function payOnNaver() {}
function payOnCoupang() {}


function executePayment(paymentType){
	if(paymentType === 'KAKAO_PAYMENT'){
		payOnKakao()
	} else if(paymentType === 'NAVER_PAYMENT'){
		payOnNaver()
	} else if(paymentType === 'COOPANG_PAYMENT'){
		payOnCoupang()
	}
}
```
이 코드를 매핑해서 클린하게 수정해보자. 

```javascript
function payOnKakao() {}
function payOnNaver() {}
function payOnCoupang() {}

const paymentMap = {
	KAKAO_PAYMENT(){
		payOnKakao();
	},
	NAVER_PAYMENT(){
		payOnNaver()
	},
	COOPANG_PAYMENT(){
		payOnCoupang()
	}
}

function executePayment(paymentType){
	paymentMap[paymentType]()
}

executePayment('KAKAO_PAYMENT');

```


### 내 생각과 정리 : 
- if문이 가독성을 해친다는 것은 알고 있었는데, 이것을 어떻게하면 더 읽기 좋게 작성할 수 있을지 몰랐던 것 같다. 
- 그런데 이 영상을 보고 이렇게 매핑하는 방식으로 코드를 작성하면 더 읽기 좋아진다는 사실을 알고나니 그 이전으로 돌아가기 어려울 것 같다. 
- 앞으로는 mapping하는 방식을 적극적으로 이용해보자


### 출처(참고문헌) : 
[if만 제거했을뿐인데.. 클린코드라니](https://www.youtube.com/watch?v=toUlXhTZZ8w)

### Link : 
