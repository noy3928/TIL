> https://fullstackopen.com/en/part12

- in this part, we will learn how to package code into standard units of software called containers. these containers can help us develop software faster and easier than before. along the way, we will also explore a completely new viewpoint for web development outsiede of the now-fammillar node.js backend and react. 
	- 이 파트에선 컨테이너를 배울것임. 이 컨테이너는 개발을 빠르게, 그리고 쉽게 만들어줌. 
- we will utilize containers to create immutable excution enviroments for out node.js and react projects. containers also make it easy to include multiple services with our projects. with the flexibility, we will explore and experiment with many different and popular tools by utilizing containers.


---


"Utilize containers to create immutable execution environments"라는 표현은 컨테이너 기술을 사용하여 변경 불가능한(immutable) 실행 환경을 만드는 것을 의미합니다. 여기서의 '컨테이너'는 도커(Docker)와 같은 기술을 지칭하며, 이는 소프트웨어 개발과 배포에서 중요한 역할을 합니다.

1. **컨테이너의 개념**: 컨테이너는 애플리케이션과 그 종속성들을 함께 묶어 독립적으로 실행할 수 있게 해주는 가벼운, 독립적인 환경을 제공합니다. 이는 여러 다른 시스템에서도 동일한 환경을 보장해 줍니다.
    
2. **변경 불가능한 실행 환경**: '변경 불가능한'이란 한 번 생성된 후에 변경되지 않는다는 의미입니다. 이는 소프트웨어 개발에서 중요한 개념으로, 한번 설정된 환경이 변경되지 않아 일관성과 안정성을 보장합니다.
    
3. **왜 만드는가**: 이러한 환경을 만드는 이유는 여러 가지가 있습니다.
    
    - **일관성**: 모든 개발자와 운영 환경에서 동일한 설정과 종속성을 보장하여 버그와 충돌을 최소화합니다.
    - **이식성**: 컨테이너는 다양한 환경(개발, 테스트, 프로덕션 등)에서 동일하게 작동하므로, 코드를 한 환경에서 다른 환경으로 쉽게 이동할 수 있습니다.
    - **효율성**: 컨테이너는 가상머신보다 훨씬 가볍고 빠르게 시작되며, 시스템 자원을 효율적으로 사용합니다.

Node.js와 React 프로젝트에 이러한 컨테이너 기술을 적용함으로써, 개발에서 배포에 이르기까지의 전 과정에서 일관성과 효율성을 크게 향상시킬 수 있습니다.
