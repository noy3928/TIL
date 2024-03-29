
`jest.spyOn` 은 제스트의 함수다. 그런데 이 함수는 mock 함수를 만드는 것을 허용해준다. 그리고 이것을 통해서 어떻게 함수가 호출되었고, 이것이 무엇을 반환하는지도 추적할 수 있다. `jest.spyOn` 을 통해서 함수를 만들면, jest의 내장 함수들을 이용할 수 있는데, 이를테면 `toHaveBeenCalled`, `toHaveBeenCalledWith`, and `toHaveReturned` 이런 함수들, 이것들을 활용해서 함수가 기대하는 인자들로 호출이 되고, 기대되는 값으로 반환되는지를 확인할 수 있다. 

`jest.spyOn` 은 두 가지 인자를 받는다. 첫번째 인자는 spy on 하고 싶은 함수를 포함한 객체를 넣는 것이고, 두번째 인자는 spy on 하고 싶은 함수의 이름을 넣는 것이다. 이렇게 spyOn하고나면 spy 함수를 반환한다. 그리고 이 함수를 통해 몇가지 작업들을 할 수 있다. 

예를 들면, createArticle 함수 같은 경우,  `jest.spyOn(axios, 'post')` 는 axios의 post 메서드를 반환한다. 이것을 가지고 실제로 함수가 호출되었는지, 어떤 인자를 가지고 호출되었는지를 확인할 수 있다. 

`jest.spyOn` 은 외부에 의존성을 가지고 있는 함수를 테스트할 때 굉장히 유용하다. 테스트 하고 싶은 함수를 독립적으로 만들고, 이것이 의존하고 있는 행위들을 컨트롤할 수 있게 해준다. 
