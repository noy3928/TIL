
```
npx storybook init
```

이 명령어를 통해서 스토리북을 설치한 다음, 

```
npm run storybook
```

명령어를 실행하면, 아래와 같은 에러가 나온다. 

![스토리북 에러메시지](https://recoen.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/2cb2d176-feb5-4b2b-bc89-43040042e09f/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA%25202023-03-10%2520%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE%252011.26.29.png)

혼자서 해결을 해보려다, 잘모르겠다 싶어서, 
```
Cannot find module 'react/package.json'
```

이 문장으로 검색을 했다. 그랬더니, https://github.com/storybookjs/storybook/issues/13665 여기에 다른 사람들도 똑같이 문제를 겪고 있는 것을 알 수 있었다. 

찬찬히 읽어보니, peer dependencies로 인한 문제인 것 같았다. 그래서 저 이슈에서 알려주는대로, 

```
npm install --save-dev react react-dom
```

이렇게 react와 react-dom을 설치해주었다. 그랬더니, 

![해결된 이미지](https://recoen.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/6778baad-30a4-4d0e-8a5d-d94c384579be/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA%25202023-03-10%2520%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE%252011.29.19.png)

이렇게 이쁜 그림을 만날 수 있었다. 