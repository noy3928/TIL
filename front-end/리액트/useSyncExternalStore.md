
useSyncExternalStore이 api를 이해해보려 노력하는 중, 잘 이해가 안되는 부분이 
tearing 현상이었다. 

tearing 현상은 동시성이 도입되면서 생긴 문제라고 한다. 아직까지 제대로 이해하지는 못했지만, 간략하게 이해한 내용을 한번 글로 풀어보겠다. concurrent 모드가 되면, 특정 ui에 대해서는 우선순윌
