### 날짜 : 2022-11-08 19:39
### 주제 : #번들링

---- 

### 인용 : 
>  소스 맵(Source Map)이란 배포용으로 빌드한 파일과 원본 파일을 서로 연결시켜주는 기능입니다. 보통 서버에 배포를 할 때 성능 최적화를 위해 HTML, CSS, JS와 같은 웹 자원들을 압축합니다. 그런데 만약 압축하여 배포한 파일에서 에러가 난다면 어떻게 디버깅을 할 수 있을까요?
>  정답은 바로 소스 맵을 이용해 배포용 파일의 특정 부분이 원본 소스의 어떤 부분인지 확인하는 것입니다. 이러한 편의성을 제공하는 것이 소스 맵입니다.


>As the name suggests, a source map consists of a whole bunch of information that can be used to map the code within a compressed file back to it’s original source.


### 내 생각과 정리 : 
- 소스맵의 용도 : 배포된 파일에서 원본 소스를 확인할 수 있도록 편의성을 제공해주기 위함. 
	- 이런 편리성이 필요한 이유는 배포될 때는 파일들이 압축되기 때문에 압축되어있는 파일들은 알아보는 것이 힘들어지기 때문이다. 



### 출처(참고문헌) : 
[웹팩핸드북 - 소스맵](https://joshua1988.github.io/webpack-guide/devtools/source-map.html#%EC%86%8C%EC%8A%A4-%EB%A7%B5)
[An Introduction to Source Maps](https://blog.teamtreehouse.com/introduction-source-maps)



### Link : 
