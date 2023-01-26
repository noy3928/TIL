
# [Guideline from the 70's on how to split your React components](https://joaoforja.com/blog/guideline-on-how-to-decompose-a-react-component) 


> 본 글은  Guideline from the 70's on how to split your React components 라는 문서를 읽고 정리한 글입니다. 


리액트 컴포넌트를 분리할 때 따르기 좋은 가이드 라인이 있을까?  
리액트 컴포넌트를 분리하려고 할 때, 어떻게-언제 분리해야할 지 결정하는 것은 쉬운 일이 아니다. 하지만, 컴포넌트를 분리할 때 어렵게 느끼는 것은 비단 리액트만의 일이 아니다. 때문에 리액트 바깥에서는 어떻게 컴포넌트를 분리하는지 아이디어를 얻어보도록 하자.  

이번 아티클에서는 어떻게 컴포넌트를 분리해서, 코드 재사용률을 높이고 유지보수 비용을 낮출 수 있는지에 대해서 알아볼 것이다. 이 가이드 라인은 1979년에 작성된 Designing Software for Ease of Extension and Contraction라는 글에서 아이디어를 얻었다. 

해당 문서를 보여주자면, 

> Component A is allowed to use component B when all the following conditions are met:
> 
> 1.  A is essentially simpler because it uses B.
> 2. B is not substantially more complex because it is not allowed to use A.
> 3. There is a useful subset containing B but not A.
> 4. There is no conceivable useful subset containing A but not B.


각각의 기준을 조금 더 명확하게 해보자. 

1. A가 B를 사용함으로써, A는 더 구현하기에 더 간단해질 것이다. 때문에 이런 관계가 만들어지는 것은 의미가 있다. 
2. 우리는 컴포넌트에서 의존성을 제거하고 싶고, 가능한 컴포넌트를 간단하게 유지하고 싶다. 그리고 두 컴포넌트가 서로에게 이득을 보는 상황에서 분해를 한다는 것은 약간의 재작업이 필요하다는 것을 의미힌다. 
3. 만약 B가 A 뿐 아니라 다른 컴포넌트에도 유용하다면, 이는 A없이 존재하는 것이 B에게만 의미있는 것이 된다. 
4. B가 제공하는 기능을 가지지 않는 A의 구현은 의미가 없다.


이번 아티클에서는, "use"의 의미를 한 컴포넌트가 다른 컴포넌트를 참조할 수 있다는 것으로 사용하기로 하겠다. 

자 이제 모든 것을 조금 더 구체화하기 위해서, 비디오 플레이어 컴포넌트를 예시로 가져와보겠다. 

1.  Optimized for videos with a 16:9 aspect ratio.
2.  Supports play and pause any time during the video.
3.  Allows for quick navigation to any part of the video.
4.  Supports mute and unmute.
5.  Has full-screen support.

![[스크린샷 2023-01-26 오전 10.21.14.png]]


그리고 이 비디오 플레이어 컴포넌트를 4가지 컴포넌트로 분리했다. 

![[스크린샷 2023-01-26 오전 10.21.28.png]]


- 비디오 플레이어는 본질적으로 간단하다. 왜냐하면 이 친구는 AspectRatioBox를 사용하고 있기 때문이다. 만약 AspectRatioBox를 사용하지 않는다면, 해당 기능을 직접 구현해야만 했을 것이다. 그리고 이것은 코드를 더욱 복잡하게 만들었을 것이다. 
- AspectRatioBox는 VideoPlayer를 사용할 수 없기 때문에, 더 복잡해질 일이 없다. AspectRatioBox가 VideoPlayer를 이용해서 유익을 얻을만한 구석이 없다. 때문에 AspectRatioBox는 VideoPlayer에게 영향을 받을 것을 걱정하지 않아도 된다. 
- AspectRatioBox는 비율을 조정해야하는 다른곳에서도 유용하게 사용될 것이다. 
- VideoPlayer가 다른 곳에서 유용하게 사용될 일은 없을 것 같다. VideoPlayer는 아마도 AspectRatioBox가 없으면 구현되지 못할 것이다. 



결국 본질은 컴포넌트를 쪼갬으로써, 기능에 해당하는 것들은 하위 컴포넌트로 들어가게 될 것이고, 그런 하위 컴포넌트는 다른 곳에서도 사용될 수 있는지에 대해서 고려해보아야 한다는 것이다. 


때문에 다음에 새롭게 컴포넌트를 분리해야한다면 다음의 가이드 라인을 생각해보자. 


> 1.  A is essentially simpler because it uses B.
> 2. B is not substantially more complex because it is not allowed to use A.
> 3. There is a useful subset containing B but not A.
> 4. There is no conceivable useful subset containing A but not B.


