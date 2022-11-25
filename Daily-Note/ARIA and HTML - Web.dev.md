### 날짜 : 2022-11-25 18:41
### 주제 : #웹접근성 

---- 

### 메모 : 

- 아마 aria에 대해서는 익숙하지 않을 것이다. 
- html이나 aria는 디지털 제품의 접근성에 있어서 매우 중요한 역할을 한다. 
	- 특히 스크린 리더와 같은 AT의 경우 더 중요하다. 
	- html이나 aria는 컨텐츠를 대체가능한 형식으로 사용될 수 있게 도와준다.  

- aria의 역사와 그것이 왜 중요한지, 언제 그리고 어떻게 쓰는 것이 가장 좋은지에 대해서 알아보자. 


## Introduction to ARIA

- aria는 wai 그룹에 의해서 개발되었다. 
- aria는 프로그래밍 언어는 아니고, 접근성을 향상시키기 위해서 html에 붙일 수 있는 속성이다. 
- 이런 속성들은 역할, 상태, 속성에 대해서 AT 와 소통할 수 있도록 도와준다. 이런 커뮤니케이션은 접근성 트리를 통해서 이루어진다. 


### The accessibility tree 

- aria는 AT기기를 이용하는 자들에게 더 좋은 경험을 주기 위해서  부정확하고, 미완성된 코드를  수정한다. 
	- 접근성 트리를 변경하고, 드러내고, 확대함으로써 그렇게 한다. 
- 접근성 트리는 브라우저에 의해서 만들어지는데, 그 기반은 DOM이다. 
- DOM tree처럼 접근성 tree는 마크업 요소들과 속성 그리고 텍스트 노드를 나타내는 객체를 포함한다. 
- 접근성 트리는 또한 플랫폼 별 접근성 API에서 AT가 이해할 수 있는 표현을 제공하기 위해서 사용되기도 한다. 
- aria 자체로는 요소의 기능이나 외형을 변경시키지 않는다. 
	- 이것은 단지 AT의 이용자들이 aria가 있는 것과 없는 것의 차이를 알 수 있도록 해줄 뿐이다. 
	- 이것이 의미하는 바는 요소가 더욱 접근성 있기 위해서는 개발자에게 적절한 코드를 작성하고, 스타일을 변경할 책임이 있다는 것이다.
- aria의 3가지 주요 기능은 roles, properties, state/value이다. 

- role : 
```javascript
<div role="button">Self-destruct</div>
```

- properties : 속성은 객체에 대한 특성이나 관계를 나타낸다.
```javascript
<div role="button" aria-describedby >Self-destruct</div>

<div id="more-info">This page will self-destruct in 10 seconds.</div>
```

- states/values : 요소와 관련있는 현재 상태나 데이터 값을 정의한다. 
```javascript
<div role="button" aria-describedby="more-info" aria-pressed="false">  
Self-destruct  
</div>  
  
<div id="more-info">  
This page will self-destruct in 10 seconds.  
</div>
```

- 이 이 ARIA의 3 요소들은 한줄의 코드에서 사용될 수 있지만, 필수는 아니다. 대신에 최종 접근성 목표를 달성할 때까지 ARIA의 역할, 속성, 상태/값을 계층화하도록 해라. 
- 정확하게 ARIA가 부여되면 AT를 이용하는 유저들이 웹사이트에 필요한 정보들을 받을 수 있다. 


## When to use ARIA 

- 2014에 HTML5 로 변경되면서 많은 변화들이 생겼고, 몇몇 부분에서는 ARIA를 덜 신경써도 되게 되었다. 
- 그렇다면 우리가 ARIA를 정말 사용해야 할 때는 언제일까? 
	- 이것을 위해서 WAI 그룹이 5가지 원칙을 소개해주었다. 


### Rule 1: Don't use ARIA 

- aria를 요소에 더하는 것이 본질적으로 접근성을 더 높여주는 것은 아니다. 
	- aria 요소가 70% 넘어가면 에러가 더 많이 감지되기도 한다. 
	- 이는 aria의 부적절한 사용으로 인한 것이다. 

- 이 원칙에 예외가 있긴하다. 
	- 만약 HTML 요소가 접근성에 대한 지원을 해주지 않는다면 필요하다. 
	- 


### Rule 2: Don't add (unnecessary) ARIA to HTML 

- 대부분의 상황에서 HTML 요소들은 기본적으로 잘 동작하고, ARIA를 필요로 하지않는다. 
	- 실제로 ARIA를 사용하는 개발자는 인터렉티브 요소의 경우 요소를 기능적으로 만들기 위해 추가 코드를 추가해야하는 경우가 많다. 
	- 의도대로 HTML을 사용한다면 더 적은 코드를 사용하면서도, 더 나은 퍼포먼스를 제공할 수 있다. 


### Rule 3: Always support keyboard navigation 

- 모든 상호작용적인  ARIA 컨트롤은 무조건 키보드로도 접근 가능해야한다. 
	- 일반적으로 키보드 포커스를 받지 않는 요소에 필요하다면, tabindex=0을 넣을 수 있다. 


### Rule 4: Don't hide focusable elements 

- 포커스가 필요하거나, tabindex=0이 지정된 요소를 감추어선 안된다. 
	- 그러면 AT rlrlrk




### 내 생각과 정리 : 


### 출처(참고문헌) : 

### 추가로 찾아본 내용 : 

- [The Accessibility Tree](https://web.dev/the-accessibility-tree/)
	- 브라우저는 DOM tree를 AT에게 유용한 방식으로 변환해주고, 우리는 그렇게 변환된 tree를 Accessibility Tree라고 부른다. 