- 문제상황 : 
	- post를 생성하고나면, 리스트 페이지에서는 revalidate가 제대로 실행되는데, 디테일 페이지에서는 revalidate가 제대로 실행이 안된 것인지, 해당 페이지에 접속하면 500에러가 난다. 그런데 페이지가 존재하지 않는 것이면 404에러를 보여주는 것이 일반적인데, 왜 500에러를 내는지도 잘 모르겠다. 일단 생각나는 원인들을 하나씩 떠올려보고, 차근차근 해결해봐야할 것 같다. 


현재 post를 하고나면 아티클을 생성하고나서, 생성했다는 응답을 받으면 revalidate 요청을 보낸다. 
그리고 revalidate안에서는 

```js
import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

const handler = nc<NextApiRequest, NextApiResponse>({
	onError(error, req, res) {
	res.status(400).json({ result: false, message: 'Sorry!' });
},
onNoMatch(req, res) {
	res.status(404).json({ result: false, message: 'Not Mached Method!' });
	},
});

handler.post(async (req, res) => {
	const { type, ...article } = req.body;
	if (req.query.secret !== process.env.NEXT_PUBLIC_NEXTAUTH_SECRET) {
	console.log('revalidate시 토큰이 다릅니다.');
	return res.status(401).json({ message: 'Invalid token' });
}

try {
	await res.revalidate(`/${article.category}`);
	console.log('REVALIDATED ARTICLE');
	if (type !== 'delete') {
	await res.revalidate(`/${article.category}/${article._id}`);
	console.log('REVALIDATED ARTICLE');
}

return res.json({ revalidated: true });
} catch (err) {
	return res.status(500).send('Error revalidating');
	}
});
export default withSentry(handler);
```

이렇게 작성해주었다. 그런데 결과를 확인해보면 article.category까지는 revalidate가 잘 실행되는데, 디테일페이지까지는 revalidate가 잘 실행되지 않는 것 같다. 개별적으로 콘솔을 넣어놓고 한번 확인을 해봐야할 것 같다. 
왜 개별 페이지에 대해서는 revalidate가 제대로 실행되지 않는 것일까. 


--- 

yarn build 후 yarn start로 로컬에서 확인을 해봤다. 새로운 포스트를 작성해봤는데 다음과 같은 에러가 발생했다. 

https://legacy.reactjs.org/docs/error-decoder.html/?invariant=31&args%5B%5D=object%20with%20keys%20%7Bchildren%7D

한번 이 문서를 읽고 이 에러의 정체가 뭔지를 파악해봐야할 것 같다. 
일단 에러메시지는 개발모드로 로컬에서 실행해야 에러로그를 정확하게 받을 수 있다는 이야기를 하는 것 같았다. 그런데 나는 프로덕션모드로 로컬에서 실행에서 이렇게 말하는듯했다. 결론은 어떤 에러냐면, 
```
**Objects are not valid as a React child (found: object with keys {children}). If you meant to render a collection of children, use an array instead.**
```
이런 에러이다. 근데 이 에러가 어디에서 발생하고 있다는 것일까. 

---

확인을 해보니, 서버에서 작성한 revalidate에서 에러가 있었다. 
req.body에서 값을 받아올 때 이상한 방식으로 값을 가져오고 있는 것이 문제였다. 

```js
const { type, ...article } = req.body;
```
이런 식으로 값을 가져오고 있었는데, 이렇게하면 제대로 값을 받아서 revalidate할 수 없는 구조였던 것이다. 
그래서 해당 부분을 수정했더니 일단 로컬에서 실행한 프로덕트 환경에선 제대로 수행되는 것을 확인했다. 
이제 배포를 해서 배포한 환경에서도 제대로 동작하는지 확인이 필요하다. 

--- 
배포한 환경에서 제대로 실행되지 않는 것을 확인했다. 