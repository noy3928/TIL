# [Inside-react(동시성을구현하는기술) ](https://tv.naver.com/v/23652451)  

> 본 글은 inside react(동시성을 구현하는 기술)이라는 강연을 듣고 정리한 문서입니다. 



## 1. 5년의 실험

-   동시성 실험 연대기
-   React 18 Alpha 릴리즈
-   무엇이 달라지나
-   실험적 세 가지 모드
-   수정된 업그레이드 전략
-   "Concurrent" 용어 정리

## 2. 동시성으로 해결하려는 문제

-   Concurrency vs Parallelism
-   Blocking Rendering 문제
-   적당한 지연은 어떤가요?
-   동시성 렌더링으로 해결해 보자

## 3. React 18의 동시성 기능

-   startTransition
-   Streaming SSR with Selective Hydration
-   React 18의 Suspense 변화
-   Automatic Batching
-   동시성 기능에 대한 공통 주제 : UX

## 4. React 동시성의 기반 기술

-   멘탈 모델
-   React Packages
-   동시성과 이벤트 루프
-   스케쥴러와 우선순위
-   Fiber Architecture
-   Double Buffering Model
-   Lane Priority Model