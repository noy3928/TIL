sitemap을 동적으로 생성해야하는데, 동적으로 생성되지 않고 있다. 
기존에는 package.json에 postbuild 스크립트를 넣어서, build 다음에 postbuild가 실행되도록 해두었는데, 
이게 내가 기대했던 것 처럼 실행되지가 않는다. 

```javascript
"scripts": {
	...
	"build": "next build",
	"postbuild": "next-sitemap",
	...
},
```

독립적으로 yarn postbuild를 실행하면 잘만되는데, 그냥 build만 실행했을 때, postbuild가 연이어서 실행되지 않는 문제가 있다.  

