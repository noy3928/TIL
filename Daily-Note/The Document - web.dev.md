### 날짜 : 2022-11-29 15:56
### 주제 : #웹접근성 

---- 

### 메모 : 
- 구조에 따라서 디지털 접근성을 위해서 고려해야 할 다양한 HTML 요소가 있다. 
- 이 섹션에서는 특정한 요소들에 대해서 한번 알아보자. 

## Page title : 

- title 요소는 페이지나 스크린의 내용을 정의한다. 
	- 이것은 html의 head 섹션 안에서 발견할 수 있으며, 페이지의 h1나 주요 주제와 동등하다. 
	- title은 브라우저 탭에서 보여지며, 유저가 그들이 어떤 페이지에 접속했는지 이해할 수 있게 도와주지만, 웹사이트 자체이는 표시되지 않는다. 

- spa에서는 title이 조금 다르게 다루어진다. 
	- spa에서 이것을 표시하기 위해서는 document.tile 속성 값을 수동으로 추가하거나, 헬퍼 패키지를 활용해야한다. 

- 설명적인 title은 유저에게나 검색 최적화에나 둘 다 좋다. 
	- title이 AT유저가 페이지에 접속했을 때 가장 먼저 말하게 되는 요소이기 때문에, 이것은 반드시 정확해야하고, 유일해야하고, 충분한 설명이 포함되어있으면서도, 간결해야 한다. 

- 페이지 타이틀을 작성할 때는 내부 페이지나 중요한 내용은 앞쪽에 표시하는 것이 좋습니다. 그리고 이전 페이지같은 정보들을 뒤에 추가하는 것이 가장 좋습니다. 
	- 이렇게 하면 AT유저들은 이미 들은 정보를 끝까지 들을 필요가 없게 됩니다. 

Don't :
```javascript
<title>The Food Channel | Outrageous Pumpkins | Season 3 </title>
```

Do :
```javascript
<title>Season 3 | Outrageous Pumpkins | The Food Channel</title>
```


<br>
## Language 

### Page language 

- 페이지 언어 속성은 전체 페이지에 대한 기본 언어를 설정한다. 
	- 이것은 html 태그에 추가된다. 
	- 유효한 언어 속성은 AT 에게 어떤 언어를 사용해야 할 지 알려주기 때문에 반드시 모든 페이지에 더해져야 한다.
- 만약에 언어 속성이 없다면, AT는 사용자의 프로그래밍된 언어로 기본적으로 설정된다.
	- 예를 들어서 AT가 스페인어로 설정되어 있었는데, 영어로된 사이트에 접속했다면 AT는 스페인 엑센트와 억양으로 읽어줄 것이다. 
		- 이것은 분명히 유저에게 좋지 않은 경험이 될 것이다. 

```javascript
<html lang="en">...</html>
```


### section language 

- 컨텐츠 자체로도 언어 속성을 바꿔줄 수 있다. 
	- 전체 페이지 언어 속성과 동일한 기본적인 규칙이 적용된다.
	- 하지만, 태그 대신 페이지 내의 특정 요소에 추가하는 경우는 제외다. 

- html에 추가한 언어 속성은 포함된 모든 요소들에 상속된다. 
	- 때문에 항상 lang 속성에는 가장 주된 언어를 설정하도록 하자 
	- 그러고나서 페이지 내에 존재하는 요소 중 다른 언어로 작성된 요소가 있다면, 적절한 언어 속성을 지정해주자. 
	- 이렇게 설정된 속성은 해당 요소의 태그가 닫힐 때까지 오버라이드 될 것이다. 

```javascript
<html lang="en">  
	<body>...  
		<div>  
			<p>While traveling in Estonia this summer, I often asked,  
				<span lang="ee">"Kas sa räägid inglise keelt?"</span>  
				when I met someone new.</p>  
		</div>  
	</body>  
</html>
```


## iFrames 

- iframe 요소는 다른 html 페이지나, 페이지 내의 타사 컨텐츠를 호스팅하는데에 사용된다. 
	- 이건은 필수적으로 다른 웹사이트를 부모 사이트에 넣게 된다. 
	- iframes는 일반적으로 광고에 사용되거나, 주입된 비디오나, 분석결과, 상호작용하는 요소에 사용된다. 
- iframe 접근성을 높이기 위해서는 2가지를 고려해야한다. 
	- 첫번째는 각각의 iframe 구별되는 다른 컨텐츠는 반드시 타이틀 요소를 부모 태그에 포함하고 있어야 한다. 
		- 이 타이틀은 AT사용자에게 iframe 내부 컨텐츠에 대한 자세한 정보를 제공해준다. 
	- 두번째는 모범 사례로써, scrolling을 'auto'나 'yes'로 설정하는 것이 좋다. 
		- 이것은 저시력 유저들이 iframe 안에 있는 요소들을 스크롤해서 볼 수 있게 해준다. 


```javascript
<iframe title="Google Pixel - Lizzo in Real Tone"  
	src="https://www.youtube.com/embed/3obixhGZ5ds"  
	scrolling="auto">  
</iframe>
```



### 내 생각과 정리 : 


### 출처(참고문헌) : 
[https://web.dev/learn/accessibility/more-html/]

### Link : 
