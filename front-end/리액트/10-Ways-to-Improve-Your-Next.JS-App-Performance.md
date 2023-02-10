# [10 Ways to Improve Your Next.JS App Performance](https://www.solutelabs.com/blog/improve-nextjs-performance) 



## 1. Multi zones

영역은 Next.js 앱의 단일 배포입니다. 여러 개의 영역을 가질 수도 있고 단일 앱으로 병합할 수도 있습니다.

## 2. Doing dynamic imports

동적 임포트를 사용하기. 라우트 기반의 스플리팅도 할 수 있고, 컴포넌트 기반의 스플리팅도 할 수 있다. 라우트 기반의 스플리팅은 Nextjs가 기본적으로 제공해주는 기능이다. 유저가 필요로 할 때 해당 코드 조각을 가지고 온다. 

특정한 컴포넌트도 동적 임포트를 통해서 코드 스플리팅을 적용할 수 있다. 


## 3. Delay loading the non-essential scripts until it gets neutral

불필요한 스크립트를 딜레이시키기. next/script를 이용해서 우선순위를 조정할 수 있다. ga와 같은 스크립트들을 적절한 시기에 로드할 수 있도록 조정해보자. 