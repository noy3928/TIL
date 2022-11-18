- next-auth를 사용중인데, 이 에러가 계속발생한다. 
- 깃 히스토리를 추적해서 다시 확인을 해보는 중인데, 이건 커밋에서 잘 작동해서 이용하고 있던 이 라이브리리가 다시 이전 커밋으로 돌아가서 확인해보니까 이번에는 안 된다. 무슨 일인지 모르겠다. 
- 그냥 설치하고 가장 기본적인 SessionProvider만 연결시켜도 바로 Invalid URL이라면서 에러를 내뱉는다. 
- 검색을 해도 나오는 자료가 없다. 내가 잘못사용하고 있는것인가? 
	- 잘못사용하고 있다기에는,,, 내가 뭐 한게 없는데,,
- 우선은 한번 새로운 브런치를 만들어서, next-auth를 설치하고 작동시켜보자.
	- 새로운 브런치를 만들어서 next-auth를 설치하고, 그 다음 딱 SessionProvider를 _app.tsx 파일에 넣어줬는데 그냥 그대로 에러가 발생한다. 이정도면 라이브러리 문제 아닌가...??? 
	- 내가 파악해야 하는 것은 이 에러의 책임이 나에게 있는가, 라이브러리에게 있는가이다. 
		- 아주 오래전의 커밋에서 새로운 브런치를 만들어서 테스트 해보았다. 그래도 안된다... 무슨일이지?
		- next를 이용하는 다른 프로젝트에서 한번 시도를 해봤더니, 이번에는 잘된다. 
			- 내 프로젝트에서 뭔가 잘못된 것이 있는 것 같다. 
			- 근데 진짜 이럴때는 어디서부터 문제가 생긴것인지 파악하는 것이 너무 어려운 것 같다. 

- next-auth 라이브러리의 소스코드를 살펴보기로 했다. 에러문구를 확인해보니, 에러가 나는 위치는 
```
at parseUrl (/Users/noyechan/Desktop/RECOEN/.yarn/__virtual__/next-auth-virtual-f0457d539e/0/cache/next-auth-npm-4.15.0-7410f860a5-af225d5848.zip/node_modules/next-auth/utils/parse-url.js:17:16)
```

utils 폴더 안에 존재하는 parse-url 이다. 이 함수에서는 어떤 일을 하고 있는가? 


```javascript
export interface InternalUrl {
	/** @default "http://localhost:3000" */
	origin: string
	/** @default "localhost:3000" */
	host: string
	/** @default "/api/auth" */
	path: string
	/** @default "http://localhost:3000/api/auth" */
	base: string
	/** @default "http://localhost:3000/api/auth" */
	toString: () => string
}

  

/** Returns an `URL` like object to make requests/redirects from server-side */
export default function parseUrl(url?: string): InternalUrl {
	const defaultUrl = new URL("http://localhost:3000/api/auth")
	
	if (url && !url.startsWith("http")) {
		url = `https://${url}`
	}

const _url = new URL(url ?? defaultUrl)
const path = (_url.pathname === "/" ? defaultUrl.pathname : _url.pathname)
	// Remove trailing slash
	.replace(/\/$/, "")

const base = `${_url.origin}${path}`

return {
	origin: _url.origin,
	host: _url.host,
	path,
	base,
	toString: () => base,
	}
}
```


- 해당 함수에서는 들어온 string을 파싱해주고 있다. URL객체로 파싱해주고 있다. 
	- 그리고 만약 pathname이 그냥 메인이면 defaultURL의 pathname을 사용한다. 
	- 그게 아니라 다른 url이면 받아온 url의 pathname을 사용한다. 

- MDN을 살펴보니, new URL을 만들때 잘못된 형식의 string 값이 들어오면 TypeError를 내뱉는다고 한다. 아무래도 이 parseUrl을 사용하는 곳에서 잘못된 string 값을 넣어주고 있는 것 같다. 