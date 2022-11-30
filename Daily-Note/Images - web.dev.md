### 날짜 : 2022-11-30 15:37
### 주제 : #웹접근성 

---- 

### 메모 : 
- 접근성있는 이미지를 만들어봅시다. 

- 접근성있는 이미지는 아마도 간단히 볼 때는 쉬워보일 수 있다. 
	- 뭐 그냥 alt만 삽입해주면 되는거 아닌가? 라고 생각할 수 있다. 
	- 하지만, 사람들이 생각하는 것보다 미묘한 차이가 있다. 
	- 우리가 살펴볼 것은 다음과 같다. 
		- 이미지를 접근성있게 만들기 위해서 어떻게 코드를 업데이트 할 것인가 
		- 어떤 정보를 공유할 것인가? 어디에 공유할 것인가? 
		- 장애가 있는 분들에게 이미지를 지원할 수 있는 추가적인 방법들을 알아볼 것이다. 


## Image purpose and context 

- 코드를 작성하기 전에, 당신은 이미지의 관점에서 생각해보고, 이것이 어떻게 사용될 것인지를 생각해봐야한다. 
	- 스스로 한번 이미지의 목적과 맥락에 대해서 질문을 하는 것은 결정하는 것을 도와줄 수 있다. 어떻게 AT를 이용하는 유저에게 가장 정보를 잘 전달할 수 있을지
	- 이런 질문들을 한번 물어보자. 
		- 맥락속에서 봤을 때, 이미지가 필수적인가? 
		- 어떤 종류의 정보를 이미지가 전달하려고하는가?
		- 이미지가 간단한가, 복잡한가? 
		- 이미지가 특정 행동을 유도하는가? 
		- 아니면 이미지가 특정한 목적 없이 그냥 시각적인 효과만 나타내는가? 
- 시각적인 플로차트는, 예를 들어 이미지 결정 트리 같은 것, 너의 이미지가 어떤 범주에 속하는지 결정하는데에 도움을 준다. 

- 브라우저의 확정 프로그램이나, 메서드를 이용해서 이미지를 한번 감춰봐라. 
	- 그리고 한번 질문해보자. "내가 나머지 맥락을 이해할 수 있을까?"
		- 만약 대답이 "그렇다"이다면, 이것은 그냥 장식용에 불과한 이미지가 될 것이다. 
		- 그렇지 않다이면, 문맥 속에서 필요한 정보일 가능성이 있다. 
	- 이미지의 목적이 결정되고 나면 어떻게 코드로 표현할 지에 대한 방법이 결정할 수 있다. 

## Decorative images 

- 장식용의 이미지는 시각적인 요소다. 어떤 문맥적인 정보나, 유저가 맥락을 더 잘 이해할 수 있게 도와주는 요소가 없다. 
	- 이것은 그냥 보완적인 요소일 뿐이고, 스타일을 제공해 줄 뿐이다. 
- 만약 이미지가 장식용에 불과하다고 결정되었다면, 이미지는 AT로 부터 감추어져야 한다. 
	- 만약 이미지를 감추도록 프로그래밍한다면, 이것은 AT에게 맥락상 이해할 필요가 없는 것이라고 알려주는 것이 된다. 
	- 이미지를 감출 수 있는 다양한 방법이 있다. empty/null text를 넣거나, aria를 사용하거나, css의 배경으로 이미지를 추가하거나. 이런 방법들이 있다. 
	- 아래에는 어떻게 이미지를 감출 수 있는지에 대한 방법들이다.

```javascript
// alt에 empty를 넣어주는 방법 
<div class="grid">
  <div class="grid-item">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Ladybug_%2813794506584%29.jpg/320px-Ladybug_%2813794506584%29.jpg" alt="" />
  </div>
</div>
```

- 이미지에 empty나 Null을 넣는 방법은 아예 alt 속성을 넣지 않는 것과는 다르다. 
	- 만약에 애초에 해당 속성을 넣지 않는다면, AT는 그냥 파일 이름을 읽어나, 주변 정보를 읽어주게 될 것이다. 

```javascript
// aria를 이용하는 방법 
<div class="grid">
  <div class="grid-item">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Ladybug_%2813794506584%29.jpg/320px-Ladybug_%2813794506584%29.jpg" aria-hidden="true" />
  </div>
</div>
```

- role을 통해서 감추는 방법은 요소들의 시맨틱함을 접근성 트리에서의 노출로부터 제거해준다. 
	- 반면에 aria-hidden="true"를 이용하는 방법은 요소 전체를 접근성 API로부터 제거해준다. (그것의 자식까지 )

```javascript
<!-- All of these choices lead to the same result. -->  
<img src=".../Ladybug.jpg" role="presentation">  
<img src=".../Ladybug.jpg" role="none">  
<img src=".../Ladybug.jpg" aria-hidden="true">
```

- css에서 배경이미지로 이미지를 넣으면 스크린 리더가 이미지 파일을 인지하지 못할 것이다. 


## Informative images 

- 정보성이 있는 이미지는 간단한 개념이나, 아이디어, 감정 같은 것들을 전달한다. 
	- 이미지들의 타입들은 포함한다 실제 세상의 객체들이나, 필수적인 아이콘들, 간단한 그림, 그리고 이미지의 텍스트들. 
- 만약에 너의 이미지가 정보정있는 것이라면, 너는 포함해야한다. 프로그래머틱 alt text를. 이 text는 이미지의 목적을 설명해준다. 
	- 대체 이미지 설명글들은 AT 유저에게 이미지에 대한 더 많은 맥락을 제공해준다. 그리고 이미지의 메시지나 의도를 더 잘 이해할 수 있도록 도와준다. 
- 이미지 요소를 사용한 간단한 대체 설명글은 alt 속성을 이용해서 달성될 수 있고, 이미지의 타입과는 상관이 없다. 

```javascript
<img src=".../Ladybug_Swarm.jpg" alt="A swarm of red ladybugs are eating the leaves of my prize rose bush."> // 상당히 자세히 적어주는구만.
```

- svg요소를 인라인으로 사용한다면, 접근성 측면에서 더 집중해 볼 필요가 있다. 
	- 첫째, 먼저 svg가 시맨틱하게 코딩되어있기 떄문에, AT는 기본적으로 그것들을 스킵할 것이다.
		- 만약에 장식적인 이미지를 가지고 있다면, 이것은 문제가 아닐 것이다. (AT가 의도한 대로 무시할 것이다.)
		- 하지만, 정보성이 있는 이미지라면, ARIA `role="img"` 이라는 속성이 필요할 것이다. AT가 그것을 이미지로 인지하도록 하기 위해서 
	- 둘째, svg 요소들은 alt 속성을 사용하지 않는다. 그래서  alt 속성을 넣는 것 보단, 다른 코딩 방법이 사용되어야 한다.

```javascript
<svg role="img"...>  
	<title>Cartoon drawing of a red, black, and gray ladybug.</title>  
</svg>
```


## Functional images 

- 기능적인 이미지는 연결되어 있다. 행동과 연결되어있다. 
	- 예를 들어서 이미지가 로고라면, 그것은 홈 페이지와 연결되어 있다. 
		- 확대 이미지는 검색을 위해서 사용된다. 
		- 또는 소셜 미디어 아이콘은 다른 사이트로 연결되는 것을 알려준다. 
- 정보성이 있는 이미지와 같이 기능적인 이미지는 반드시 그들의 의도를 설명하는 설명적인 요소를 포함해야 한다.
	- 정보성있는 이미지와 다르게, 각각의 기능적인 이미지는 필요로 한다, 묘사하는 것을 이미지의 행동을. 단순히 시각적인 측면에서 설명하는 것과는 다르게. 

```javascript
<div class="grid">
  <div class="grid-item">
      <a href="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Ladybug_Logo.png" alt="Social bug network" /></a>

    </div>
  </div>
```

```javascript
<div class="grid">
  <div class="grid-item">
    <a href="/" target="_blank"><span class="visually-hidden">Social bug network</span>
      <img src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Ladybug_Logo.png" /></a>
  </div>
</div>
```


- 로고 이미지 예시에서, 이미지는 정보성이 있기도 하고, 행동적이기도 하다. 이것이 정보를 전달하기도 하고, 링크로서의 행동하고 있기 때문이다. 
	- 이런 경우들에는, 너는 alt 설명을 더할 수 있다. 각각의 요소들에, 하지만 필수는 아니다. 
- 첫번째, 대안적인 설명들을 이미지에 더할 수 있는 방법은 시각적으로 텍스트를 감추는 것이다. 
	- 이런 방법을 사용할 때, 텍스트는 아마도 스크린 리더에 의해서 읽히게 될 것이다. 왜냐하면 이것은 dom에 있기 때문이다. 하지만, 이것은 시각적으로는 css의 도움으로 감추어져있다. 
- 코드 스니펫을 보면,  "홈페이지로 이동하세요" 라는 글자가 타이틀 속성에 들어가 있음을 알 수 있다. 
	- 그리고 이미지의 alt text는 Lovely Ladybugs for your Lawn.라고 적혀있다. 
	- 만약에 스크린 리더에서  로고의 코드를 듣는다면, 하나의 이미지에서 시각적이고, 행동적인 것 둘 다 들을 수 있을 것이다. 


```javascript
<div class="grid">
  <div class="grid-item" title="Navigate to the homepage">
    <a href="/">
      <img src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Ladybug_Logo.png" alt="Lovely Ladybugs for your Lawn" /></a>
  </div>
</div>
```


## Complex images 

- 복잡한 이미지는 장식적이고, 설명적이고, 기능적인 이미지보다 더 많은 정보를 필요로 한다. 
	- 모든 메시지를 전달하기 위한 길고 짧은 대체 문구를 넣어줘야한다. 
	- 복잡한 이미지는 인포그래픽들과, 지도, 그래프 같은 복잡한 그림들이 포함된다. 

```javascript
<div class="grid">
  <div class="grid-item">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/Coccinellidae_%28Ladybug%29_Anatomy.svg" alt="Diagram of the anatomy of a ladybug.">
  <br><br>
  <a href="ladybug-science.html">Learn more about the anatomy of a ladybug</a>
  </div>
</div>
```

```javascript
<img src=".../Ladybug_Anatomy.svg" alt="Diagram of the anatomy of a ladybug."><a href="ladybug-science.html">Learn more about the anatomy of a ladybug</a>
```

- 이미지에 추가적인 설명을 더할 수 있는 한 가지 방법은 그것에 대한 긴 설명을 다른 곳에서 연결 짔는 방법이 있다. 
	- 이런 방법은 좋은 선택이다. 이것은 AT 유저에게만 도움이 되는 것은 아니다. 장애가 아닌 이들에게도 도움이 된다. 

```javascript
<div class="grid">
  <div class="grid-item">
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/Coccinellidae_%28Ladybug%29_Anatomy.svg" alt="Diagram of the anatomy of a ladybug." aria-describedby="description">
    <p id="description">In this course, you will learn more about the anatomy of a ladybug, including the head, antenna, eye, pronotum, elytra, leg, abdomen, and wing.</p>
  </div>
</div>
```


- 다른 방법은 `aria-describedby`  속성을 이미지요소에 사용하는 것이다. 
	- 개발적으로 id에 연결시킬 수 있다. 그리고 그 id 요소는 설명을 포 포함하고 있는 


### 내 생각과 정리 : 


### 출처(참고문헌) : 


### Link : 
