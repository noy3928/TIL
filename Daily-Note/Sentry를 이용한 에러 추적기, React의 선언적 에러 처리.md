
> 본 문서는 카카오에서 발표한  [Sentry를 이용한 에러 추적기, React의 선언적 에러 처리](https://if.kakao.com/2022/session/84) 를 듣고 정리한 글이다. 


## 요약정리 : 

본 영상은 카카오페이팀에서 어떻게 에러를 처리했는지에 대한 내용을 다루고 있다.  첫번째 파트에서는 어떻게 에러를 수집하고, 분석했는지를 설명하고 있다. 막무가내로 에러를 수집하고 분석하다보면 에러를 정확하고 빠르게 파악하는 것에 시간이 많이 들고 어렵게된다. 때문에 더욱 효율적으로 에러를 수집하기 위해서 sentry에서 제공해주는 여러가지 분류기법과 필터링을 활용하고 있다. 두번째 파트에서는 어떻게 하면 효율적으로 에러를 처리할 수 있는지에 대해서 다루고 있다. 단순히 인터셉트를 통해서 에러를 처리하다보면 투박하게 에러를 처리하게 된다. 더욱 세부적으로 처리할 수 있고, 명령형이 아닌 선언적인 방식으로 에러를 처리하기 위해서 에러바운더리를 활용한 방법을 소개하고 있다. 이런 에러 바운더리를 활용하면 선언적으로 에러를 처리할 수 있을 뿐만 아니라, 전역적이지 않고, 로컬의 영역에서도 에러를 처리할 수 있게 만들어준다. 


## 카카오페이팀은 왜 에러처리에 관심을 가지게 되었을까? 

에러가 발생했는데, 어디서 온 에러인지를 확인했는데, 약속되지 않은 케이스 였음을 파악했다. 그리고 이렇게 파악하는데까지 긴 시간이 걸렸다. 파악까지 약 4시간이 걸렸는데, 이것은 사용자 경험상으로 좋지 않은 것이었다. 

그래서 더 좋은 사용자 경험과 개발자 경험을 제공하기 위해 에러처리를 어떻게 할지를 놓고 딥다이브 하게 되었다. 


# part.1 에러 로깅을 효율적으로 해보자


## 프론트엔드에서의 에러에는 무엇이 있을까? 

- 에러의 종류
	- 컨트롤 가능한 에러 
		- 데이터 영역에서의 에러 
		- 화면 영역에서의 에러
	- 컨트롤하기 힘든 에러
		- 외부 요인에 의한 에러 
		- 런타임 에러
- 우리가 주목해야할 부분은 컨트롤하기 힘든 에러이다. 


## 에러 추적을 개선하기 위한 작업 

에러 데이터 쌓기 -> severity 기준 설정 및 모니터링 -> 에러 데이터 분석 -> 분석 결과에 따른 개선 

### 에러 데이터 쌓기 
- 카카오에서는 sentry를 이용해서 에러 데이터를 쌓았다. 
	- sentry를 에러전송 api를 제공한다. 
		- `captureException`으로 에러 데이터 제공 
		- `captureMessage`는 문자열만 전송할 수 있다. 
	- 그런데 이렇게 에러 데이터를 수집했어도, 데이터를 파악하고 분석하는 것이 쉽지 않았다. 

잘 찾아보니 sentry에는 에러를 추적하기 위한 더 풍성한 기능이 있었다. 

#### scope :

```javascript
import * as Sentry from "@sentry/react";

Sentry.configureScope((scope) => {
	scope.setUser({
		accountId : 2022,
		email : 'chloe.ykim@nana.na',
	})

	scope.setTag({
		webviewType : 'WEB'
	})
})
```

이렇게 configureScope를 통해서 사용자 정보를 전송할 수 있었다. 


#### Context : 

이벤트에 임의의 데이터를 연결할 수 있는 context를 이용해 추가 정보를 전송한다. 검색은 할 수 없고 해당 이벤트가 발생한 이벤트 로그에서 확인할 수 있다. 

```javascript 
import {method, url, params, data, headers} = error.config;
const {data, status} = error.response;

Sentry.setContext('API Request Detail', {
	method, 
	url, 
	params,
	data,
	headers,
})

Sentry.setContext('API Response Detail', {
	status, 
	data
})
```


#### Customized Tags 

tags는 키와 값이 쌍으로 이루어진 문자열이다. tags는 인덱싱이 되는 요소이기 때문에 이슈 검색 및 트래킹을 신속하게 진행할 수 있다. 

api 관련 에러를 빠르게 추적할 수 있도록 tag 값을 추가해주었다. 
```javascript 
Sentry.withScope((scope) => {
	scope.setTag("type", "api");
	scope.setTag("api", "general");

	scope.setLevel(Sentry.Severity.Warning);

	Sentry.captureException(new Error("API Internal Server Error"))
})
```


#### Level : 

이벤트마다 level을 설정하여 이벤트의 중요도를 식별할 수 있다. 
fetal, error, waring, log, info, debug, critical 로 severity를 설정할 수 있다. 

```javascript 
Sentry.withScope((scope) => {
	scope.setTag("type", "api");
	scope.setTag("api", "general");

	scope.setLevel(Sentry.Severity.Error); // error level로 설정 

	Sentry.captureException(new Error("API Internal Server Error"))
})
```

```javascript 
Sentry.withScope((scope) => {
	scope.setTag("type", "api");
	scope.setTag("api", "general");

	scope.setLevel(Sentry.Severity.Warning); // warning level로 설정 

	Sentry.captureException(new Error("API Internal Server Error"))
})
```


### Severity 기준설정 및 모니터링 

#### 알람 조건 설정하기 

- when : 모니터링 할 이슈의 유형을 조정한다. 
	- 처음 보는 이슈가 생길 경우 
	- 해결된 이슈가 다시 발생할 경우 
	- 무시하고 있던 이슈가 해제될 경우 
- if : if 조건을 확인하여 이슈를 필터한다.
	- 이벤트의 level이 조건에 맞는 경우 
	- 이벤트의 attribute가 조건에 맞는 경우 
	- 이벤트의 Tag가 조건에 맞는 경우 
	- 이슈가 N번 중복 발생할 경우 
	- 원하는 레벨의 이벤트가 N번 발생할 경우 
- then : 
	- slack 
	- kakaowork 
	- jira

특정 조건에 알맞게 알람이 오도록 만들면 slack에 에러 알람을 받을 수 있다. 


### 에러 데이터 분석

#### 에러 데이터 수집 전 세웠던 가설 

에러 데이터를 수집하기 전에 어디서 에러가 발생할 것인지 가설을 세운다. 그리고 데이터를 수집하고, 분석한 다음 세웠던 가설이 맞는지 확인하는 시간을 가진다. 

이런 시간을 가지고나면 세웠던 가설이 알맞는지 아닌지를 판단할 수 있고, 수집된 데이터들이 의미있는지 아닌지를 확인할 수 있다. 


#### 유의미한 데이터를 수집하자 

- chunk load 에러나 network 에러는 수집 제외 
- 분석하고자 하는 api의 http status를 구분하여 수집 
- 에러 데이터뿐만 아니라 디버깅과 분석에 필요한 추가적인 정보 수집 


#### 커스텀헤더 사용하기 

api를 요청할 때 헤더에 커스텀헤더를 추가하고, 해당 값을 태그에 추가하여 에러 데이터를 수집할 때 어떤 서버에서 발생한 것인지를 더욱 정확하게 체크할 수 있었다. 


## 에러 추적 개선 후 이런 점이 좋아졌어요 

- 예상치 못한 에러를 발견하여 사용자 경험을 향상시킬 수 있었다. 
- 장애탐지시간, 원인 파악, 해결까지의 시간이 줄었다. 
- CS 진입 시 사용자의 환경에서 재현하지 않아도 에러 원인을 파악하고 이전보다 정확하게 안내할 수 있게 되었다. 
- 개발자 경험이 좋아졌다. 
	- 에러 추적에 많은 시간을 들이지 않아도 되도록 시간을 아낄 수 있었다. 


--- 

# part.2 에러 처리 방식을 개선해보자

## 기존에는 어떻게 에러를 처리했나? 

각 에러 상황에 알맞는 화면을 보여주도록 처리했었다. 

그리고 axios interceptor를 이용했다. 
```javascript 
axios.interceptors.response.use(_, onResponseRejected);

function onResponseRejected(error : Error){
	/* 중략 */

	// 네트워크 에러 체크
	if(checkIsAxiosNetworkError(error)){
		setTiemout(() => handleNetworkError(error, reject), 200);
		return;
	}

	// 타임아웃 에러 체크
	if(checkIsAxiosTimeoutError(error)){
		return handleTimeoutError(error, reject);
	}

	const errorCode = error.response?.data?.errorCode;
	const status = error.response?.status;

	
	if(errorCode){
		switch(errorCode){
		// 계정이상 에러 체크
			case KPAY_COMMON_ERROR_CODES.계정이상;
				return handleKickOutError(error);
			/* 중략 */
		}
	}
}
```

대부분의 프론트엔드 에러는 api 요청에서 발생한다. 그래서 인터셉터를 활용해서 에러를 처리하도록 했다. 에러의 타입과, 코드, 우선순위에 따라서 에러를 처리하도록 만드는 방식이다. 


## 과연 이런 에러 처리가 최선인가? 


### 인터셉트를 이용하는 것의 불편함 

명령형으로 처리하는 불편함이나, 라우트 이동으로 에러를 보여주는 방식으로 처리되었었다. 
그런데, 이런 방식으로는 화면 내에 부분적으로 에러 상황을 보여주려고 할 때는 어려움이 있었다. 
그래서 이런 문제를 해결하기 위해서 리액트에서 제공하는 에러 바운더리를 사용해보려고 했다. 


### ErrorBoundaries 

React 16에서 도입된 에러 경계를 활용하여 하위 컴포넌트 트리의 자바스크립트 에러를 포착하고 Fallback UI를 보여줄 수 있다. 에러 바운더리를 통해 선언적 에러 처리가 가능하다.  

- 명령형 프로그래밍과 선언형 프로그래밍 
	- 명령형 : 
		- 어떻게? 원하는 결과를 달성하는 과정을 기술 
	- 선언형 : 
		- 무엇을? 에 집중 


명령형 에러처리 : 어떻게 에러를 처리하여 화면에 보여줄지에 집중 
```javascript
const ComponentWithPossiblyError = () => {
	const { error : err1 } = useSomeQuery();
	const { error : err2 } = useAnotherQuery() ;

	if(err1 || err2){
		return <ErrorFallback/>;
	}

	return <NormalComponent/>
}
```


선언형 에러 처리 : 무엇을 보여줄지를 코드를 통해 결정한다 
```javascript 
const ComponentWithPossiblyError = () => {
	return (
		<ApiErrorBoundary>
			<NormalComponent/>
		</ApiErrorBoundary>
	)
}
```


### react-error-boundary 

Error Boundaries의 Fallback Component를 직관적으로 작성할 수 있도록 도와주는 라이브러리이다. 

```javascript 
import {ReactErrorBoundary} from "react-error-boundary";

const FallbackComponent = () => {
	return (
		<div>에러페이지</div>
	)
}

export const App = () => {
	return (
		<ReactErrorBoundary fallback={<FallbackComponent/>}>
			<Routes>
			{/*중략*/}
			</Routes>
		</ReactErrorBoundary>
	)

}
```

 
## 선언적 에러 처리를 적용해보자! 

### axios interceptor의 로직을 줄이기 

네트워크 에러에 대한 지연 처리 외에는 어떤 에러도 처리하지 않도록 바꾸었다. 

```javascript 
if(isAxiosError(error) && isNetwortError(error)){
	setTimeout(() => reject(error), 200);
}else{
	reject(error)
}
```


### Error 바운더리의 관심사를 분리 

에러 바운더리를 관심사별로 분리하기 위해 중첩으로 구성하였다. 

```javascript
import {Outlet} from "react-router-dom";

import {ApiErrorBoundary, RootErrorBoundary} from "~/shared/components"

export const AppLayout = () => {
	return (
		<RootErrorBoundary> // 그외 frontend Error 
			<ApiErrorBoundary> // api 에서 발생하는 Error
				<Outlet />
			</ApiErrorBoundary>
		</RootErrorBoundary>
	)
}
```


### Fallback 컴포넌트에서 세부적인 에러를 처리하기 [23:00](https://youtu.be/012IPbMX_y4?t=1399)


Api 에러를 처리하는 에러 바운더리(Root Level)
```javascript
const ApiErrorBoundary = ({children}) => {
	const {reset} = useQueryErrorBoundary();
	const {key} = useLocation();

	return (
		<ReactErrorBoundary
			FallbackComponent={FallbackComponent}
			onReset={reset}
			resetKeys={[key]}
			>	
		{children}
		</ReactErrorBoundary>
	)
}
```


```javascript 
function FallbackComponent({error, resetErrorBoundary}){
	useEffect(() => {
		captureApiError(props.error); // 모니터링 서비스에 에러 데이터 전송
	},[])

	if(!isAxiosError(error)){
		throw error; // 상위 에러 바운더리인 글로벌 에러로 전파 
	}

	/*중략*/

	return (
		<CommonErrorHandler 
			resetErrorBoundary={resetErrorBoundary}
		/>
	)
}
```

적용해 본 로컬레벨의 에러 바운더리 
```javascript 
const ProductList = () => {
	return (
		<>
			<Container>
				<Banners/>
				<Title/>
				<FundCompareButton/>
				<LocalApiErrorBoundary height={300} >
					<AllProductList />
				</LocalApiErrorBoundary >
			</Container>
			<Footer/>
		</>
	)
}
```