- react native config를 사용하기로 결정. 인기가 많고, 지속적으로 관리되고 있음. 
- 모바일에서는 env를 사용하는 방법이 다름. 안일하게 생각했다. 그냥 env 관련 라이브러리 설치하고 사용하면 되는 줄 알았지만, 또 다른 설정을 해줘야한다. 
- 먼저 루트 폴더에 ios와 android가 있어야한다. 
	- 기존의 다른 많은 폴더들을 보니, 이 각각의 폴더들이 존재한 것을 볼 수 있었는데, 왜 존재했는지 알 것 같다. 각 디바이스별로 설정해줘야하는 내용들이 있는 것 같고, 관련 설명 파일들을 여기어 넣어두는 것이 아닐까. 
	- 이번에도 env관련 설정을 하기 위해서 이 폴더들을 이용해야했다. 
	- 나는 react-native init MyProject 로 프로젝트를 설정하지 않고, expo로 프로젝트를 설정했다. 그래서인지, 루트에 ios와 android 폴더가 없었던 것 같다. 이런 경우에는 직업 react-native eject를 설정해주어야 한다고 한다. 
	- expo eject라는 방법도 있다. 나는 expo로 시작했으니 이 방법으로 해보자. 
		- https://alcohol-dev.tistory.com/4
		- ![[스크린샷 2023-06-13 오전 11.52.47.png]] 이런 에러를 만난 상황. 우선 다른 설정을 하는데에는 문제가 없는 것 같은데, 여기서 로깅을 해놓고, 다음에 다시 해결해야할 것 같다. 


- yarn ios에서 에러가 발생하기 시작. 
	- expo eject 이후에 에러가 발생했다. 확인해보니 yarn ios의 명령어가 수정되어있었다. 수정된 내용대로 실행하기 위해서는, cocoapods이 필요한듯하다. 그래서 ruby도 새로 설치하고, cocoapods도 새로 설치했다. 
	- 일단 스크립트를 기존의 expo로 변경. 
		- 그런데 기존의 expo로 변경했더니 env가 적용이 안된다. 우선, 기능개발이 급하다. 추후에 다시 env를 설정해보자. 


참고할 자료 : 
- https://medium.com/armenotech/configure-environment-variables-with-react-native-config-for-ios-and-android-7079c0842d8b
- https://medium.com/armenotech/configure-environment-variables-with-react-native-config-for-ios-and-android-7079c0842d8b
- https://velog.io/@reum107/React-Native-react-native-config-%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0#-ios