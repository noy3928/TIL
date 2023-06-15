# Learn About Functional Programming

Functional programming is about:

- Isolated functions - there is no dependence on the state of the program, which includes global variables that are subject to change(독립성)
- Pure functions - the same input always gives the same output(순수성)
- Functions with limited side effects - any changes, or mutations, to the state of the program outside the function are carefully controlled(불변성)

```javascript
// Function that returns a string representing a cup of green tea
const prepareTea = () => "greenTea"

/*
Given a function (representing the tea type) and number of cups needed, the
following function returns an array of strings (each representing a cup of
a specific type of tea).
*/
const getTea = numOfCups => {
  const teaCups = []

  for (let cups = 1; cups <= numOfCups; cups += 1) {
    const teaCup = prepareTea()
    teaCups.push(teaCup)
  }
  return teaCups
}

// Only change code below this line
const tea4TeamFCC = getTea(40)
// Only change code above this line
```

<br>

## Understand Functional Programming Terminology

*Terminology : 전문용어, 기술용어
*mood swings : 변심

상황을 가정해보자. 아까 greenTea를 원했던 FCC팀원들이 이제는  
blackTea와 greenTea 둘 다를 원한다.

이런 정보와 함께 getTea 함수를 다시 들여다보자.  
getTea함수를 수정할텐데, 그 파라미터로 준비해야하는 Tea를 받을 수 있도록 하는 함수를 받도록 수정해줄 것이다.  
이렇게 함으로써 getTea를 훨씬 더 유연하게 만들어줄 것이고, 고객의 요구에 쉽게 반응할 수 있게 될 것이다.  
<br>

하지만, 그 전에 FP의 전문 용어를 살펴보자.
**콜백** 은 자신의 제어권을 다른 함수에게 넘겨주는 함수이다.
또한 변수에 할당되거나, 다른 함수로 전달되거나, 다른 함수에서 반환될 수 있는 함수들을 **first class function** 이라고 한다.  
그리고 함수를 인수로 사용하거나 함수를 반환 값으로 반환하는 함수를 **고차 함수** 라고 한다. **High Order Function**  
함수가 다른 함수로 전달되거나 반환되는 경우, 전달되거나 반환된 함수는 **람다** 라고 할 수 있다. **Lambda**

```javascript
// Function that returns a string representing a cup of green tea
const prepareGreenTea = () => "greenTea"

// Function that returns a string representing a cup of black tea
const prepareBlackTea = () => "blackTea"

/*
Given a function (representing the tea type) and number of cups needed, the
following function returns an array of strings (each representing a cup of
a specific type of tea).
*/
const getTea = (prepareTea, numOfCups) => {
  const teaCups = []

  for (let cups = 1; cups <= numOfCups; cups += 1) {
    const teaCup = prepareTea()
    teaCups.push(teaCup)
  }
  return teaCups
}

// Only change code below this line
const tea4GreenTeamFCC = getTea(prepareGreenTea, 27)
const tea4BlackTeamFCC = getTea(prepareBlackTea, 13)
// Only change code above this line

console.log(tea4GreenTeamFCC, tea4BlackTeamFCC)
```

<br>

## Understand the Hazards of Using Imperative Code

함수형으로 프로그래밍하는 것은 매우 좋은 습관이다.  
이것이 가져다 주는 유익은 매우 많다.  
그러나 이것에 대해서 본격적으로 알아보기전에,  
명령형으로 프로그래밍을 할 때, 발생할 수 있는 이슈들에 대해서 알아보자.

<br>
영어에서 명령형 시제는 명령을 내리기 위해서 많이 사용한다.  
프로그래밍에서도 마찬가지로 컴퓨터에게 명령을 내리기 위해서,  
명령형 스타일을 사용한다.  
다양한 명령 구문들을 통해서 그렇게한다.

<br>
반대로 함수형 프로그래밍에서는 '선언적' 스타일을 사용한다.  
이게 무슨말이냐하면,  
내가 원하는 작업을 그저 컴퓨터에게 말하는것이다.

자바스크립트에는 그런 선언적 스타일을 도와주는 많은 메서드들이 있다.  
예를 들어 for문을 통하면 컴퓨터에게 배열의 각각 인덱스에 대해서 무엇을 하라고 하나하나 명령을 할 수 있겠지만,  
map을 사용하면 datail한 부분들은 뒤로 감추고 그저 선언하는 방식으로 이용할 수 있다.  
이런 방식으로 코드를 작성하면 sematic error를 피할 수 있다.

<br>
이런 시나리오를 생각해보자 :  
당신은 브라우저에서 여러가지 웹 서핑을 하는 중이다.  
그리고 당신이 열었던 페이지들을 추적해보고싶다.  
이런 기능을 oop로 구현한다고 가정해보자.

창 개체는 탭으로 구성되며 일반적으로 두개 이상의 창이 열려 있다.  
각 Window 객체에 있는 각 열린 사이트의 제목은 배열로 유지된다.  
브라우저에서 작업한 후(새 탭 열기, 창 병합 및 탭 닫기) 아직 열려 있는 탭을 print하려고 한다.  
닫힌 탭은 배열에서 제거될테고, 새 탭(간단하게)이 배열 끝에 추가될 것이다.

아래 코드는 tabOpen(), tabClose() 및 join()에 대한 함수와 함께 이 기능의 구현을 보여준다.  
tabs 배열은 열린 페이지의 이름을 저장하는 window 개체의 일부이다.

아래 코드는 제대로 동작하지 않는데,  
코드를 뜯어보면서 한번 이해해보길 바란다.  
tabClose에 문제가 있다.

```javascript
// tabs is an array of titles of each site open within the window
const Window = function (tabs) {
  this.tabs = tabs // We keep a record of the array inside the object
}

// When you join two windows into one window
Window.prototype.join = function (otherWindow) {
  this.tabs = this.tabs.concat(otherWindow.tabs)
  return this
}

// When you open a new tab at the end
Window.prototype.tabOpen = function (tab) {
  this.tabs.push("new tab") // Let's open a new tab for now
  return this
}

// When you close a tab
Window.prototype.tabClose = function (index) {
  // Only change code below this line

  const tabsBeforeIndex = this.tabs.splice(0, index) // Get the tabs before the tab
  const tabsAfterIndex = this.tabs.splice(index + 1) // Get the tabs after the tab

  this.tabs = tabsBeforeIndex.concat(tabsAfterIndex) // Join them together

  // Only change code above this line

  return this
}

// Let's create three browser windows
const workWindow = new Window([
  "GMail",
  "Inbox",
  "Work mail",
  "Docs",
  "freeCodeCamp",
]) // Your mailbox, drive, and other work sites
const socialWindow = new Window(["FB", "Gitter", "Reddit", "Twitter", "Medium"]) // Social sites
const videoWindow = new Window(["Netflix", "YouTube", "Vimeo", "Vine"]) // Entertainment sites

// Now perform the tab opening, closing, and other operations
const finalTabs = socialWindow
  .tabOpen() // Open a new tab for cat memes
  .join(videoWindow.tabClose(2)) // Close third tab in video window, and join
  .join(workWindow.tabClose(1).tabOpen())
console.log(finalTabs.tabs)
```

이 코드의 문제점은 splice에 있다. splice는 원본 배열에 변형을 가하는데,  
이렇게하면 원치 않는 결과를 초래한다.  
지금의 경우만해도 누락되는 리스트가 생겨버렸다.

이것을 고치기 위해서는 불변성을 지켜줘야할 것 같다.  
slice를 이용하면 원본 배열에는 변형을 가하지 않고 새로운 배열을 반환받을 수 있다.

<br>

## Avoid Mutations and Side Effects Using Functional Programming

위의 챕터에서 살펴봤듯이 문제는 splice에 있었다.  
왜냐, splice는 원본 배열에 변형을 가하기 때문이다.

이것은 하나의 큰 패턴에 대한 예시인데,  
우리는 함수를 만들고 그 안에서 객체내부의 값을 변화시킨다.

함수형 프로그래밍의 한가지 핵심적인 원칙은 **무언가를 변화시키지 않는 것이다.**  
변화는 버그를 만든다.  
함수 내부에서 무언가가 변하지 않는다는 것을 안다면, 디버깅은 훨씬 쉬워질 것이다.

이전 챕터에서 복잡한 연산이 있는 것도 아니었고,  
그저 splice를 사용했는데, 버그가 만들어졌다.

다시 한번 상기해보자면 함수형 프로그래밍에서는,  
무언가 변화되거나 대체되는 것을 mutation이라고 부르고,  
그로부터 나온 결과를 side effect라고 부른다.  
함수는 순수함수이어야 한다.  
이게 무슨 말이냐?? 어떤 side effect도 없어야 한다는 말이다.

Let's try to master this discipline and not alter any variable or object in our code.

```javascript
// The global variable
let fixedValue = 4

function incrementer() {
  // Only change code below this line
  let returnedValue = fixedValue
  return ++returnedValue
  // Only change code above this line
}
```

<br>

## Pass Arguments to Avoid External Dependence in a Function

함수형 프로그래밍의 또 다른 원칙은 함수의 의존성을 항상 명시적으로 알려주는 것이다.  
만약 함수가 이미 존재하고 있는 변수가 객체에 의존하고 있다면,  
함수의 인자로 넘겨줌으로써 명시적으로 알려주어야 한다.

```javascript
// The global variable
let fixedValue = 4

// Only change code below this line
function incrementer(value) {
  let result = value + 1
  return result
  // Only change code above this line
}
```

<br>

## Refactor Global Variables Out of Functions

2가지 원칙을 지켜서 리팩토링해보기.

1. 변수나 객체를 변형시키지 말 것 - 새롭게 만들어서 조작할 것
2. 함수의 파라미터를 활용할 것 - 함수 내부의 작동은 인자를 통해서 받은 값을 조작하도록한다.

```javascript
// The global variable
const bookList = [
  "The Hound of the Baskervilles",
  "On The Electrodynamics of Moving Bodies",
  "Philosophiæ Naturalis Principia Mathematica",
  "Disquisitiones Arithmeticae",
]

// Change code below this line
function add(bookList, bookName) {
  const resultList = [...bookList, bookName]
  return resultList

  // Change code above this line
}

// Change code below this line
function remove(bookList, bookName) {
  const resultList = bookList.filter(book => book !== bookName)
  // Change code above this line
  return resultList
}

add(bookList, "A Brief History of Time")
remove(bookList, "On The Electrodynamics of Moving Bodies")
```

<br>

## Use the map Method to Extract Data from an Array

for문 대신 map 메서드 사용해보기

```javascript
// The global variable
const watchList = [
  {
    Title: "Inception",
    Year: "2010",
    Rated: "PG-13",
    Released: "16 Jul 2010",
    Runtime: "148 min",
    Genre: "Action, Adventure, Crime",
    Director: "Christopher Nolan",
    Writer: "Christopher Nolan",
    Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy",
    Plot: "A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
    Language: "English, Japanese, French",
    Country: "USA, UK",
    Awards: "Won 4 Oscars. Another 143 wins & 198 nominations.",
    Poster:
      "http://ia.media-imdb.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    Metascore: "74",
    imdbRating: "8.8",
    imdbVotes: "1,446,708",
    imdbID: "tt1375666",
    Type: "movie",
    Response: "True",
  },
  {
    Title: "Interstellar",
    Year: "2014",
    Rated: "PG-13",
    Released: "07 Nov 2014",
    Runtime: "169 min",
    Genre: "Adventure, Drama, Sci-Fi",
    Director: "Christopher Nolan",
    Writer: "Jonathan Nolan, Christopher Nolan",
    Actors: "Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow",
    Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    Language: "English",
    Country: "USA, UK",
    Awards: "Won 1 Oscar. Another 39 wins & 132 nominations.",
    Poster:
      "http://ia.media-imdb.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SX300.jpg",
    Metascore: "74",
    imdbRating: "8.6",
    imdbVotes: "910,366",
    imdbID: "tt0816692",
    Type: "movie",
    Response: "True",
  },
  {
    Title: "The Dark Knight",
    Year: "2008",
    Rated: "PG-13",
    Released: "18 Jul 2008",
    Runtime: "152 min",
    Genre: "Action, Adventure, Crime",
    Director: "Christopher Nolan",
    Writer:
      "Jonathan Nolan (screenplay), Christopher Nolan (screenplay), Christopher Nolan (story), David S. Goyer (story), Bob Kane (characters)",
    Actors: "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
    Plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.",
    Language: "English, Mandarin",
    Country: "USA, UK",
    Awards: "Won 2 Oscars. Another 146 wins & 142 nominations.",
    Poster:
      "http://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    Metascore: "82",
    imdbRating: "9.0",
    imdbVotes: "1,652,832",
    imdbID: "tt0468569",
    Type: "movie",
    Response: "True",
  },
  {
    Title: "Batman Begins",
    Year: "2005",
    Rated: "PG-13",
    Released: "15 Jun 2005",
    Runtime: "140 min",
    Genre: "Action, Adventure",
    Director: "Christopher Nolan",
    Writer:
      "Bob Kane (characters), David S. Goyer (story), Christopher Nolan (screenplay), David S. Goyer (screenplay)",
    Actors: "Christian Bale, Michael Caine, Liam Neeson, Katie Holmes",
    Plot: "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from the corruption that Scarecrow and the League of Shadows have cast upon it.",
    Language: "English, Urdu, Mandarin",
    Country: "USA, UK",
    Awards: "Nominated for 1 Oscar. Another 15 wins & 66 nominations.",
    Poster:
      "http://ia.media-imdb.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg",
    Metascore: "70",
    imdbRating: "8.3",
    imdbVotes: "972,584",
    imdbID: "tt0372784",
    Type: "movie",
    Response: "True",
  },
  {
    Title: "Avatar",
    Year: "2009",
    Rated: "PG-13",
    Released: "18 Dec 2009",
    Runtime: "162 min",
    Genre: "Action, Adventure, Fantasy",
    Director: "James Cameron",
    Writer: "James Cameron",
    Actors: "Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang",
    Plot: "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    Language: "English, Spanish",
    Country: "USA, UK",
    Awards: "Won 3 Oscars. Another 80 wins & 121 nominations.",
    Poster:
      "http://ia.media-imdb.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg",
    Metascore: "83",
    imdbRating: "7.9",
    imdbVotes: "876,575",
    imdbID: "tt0499549",
    Type: "movie",
    Response: "True",
  },
]

// Only change code below this line

const ratings = watchList.map(movie => {
  const result = { title: movie.Title, rating: movie.imdbRating }
  return result
})

// Only change code above this line

console.log(JSON.stringify(ratings))
```

<br>

## Implement map on a Prototype

map 메서드 직접 만들어보기

```javascript
// The global variable
const s = [23, 65, 98, 5]

Array.prototype.myMap = function (callback) {
  const newArray = []
  // Only change code below this line
  for (const v of this) {
    newArray.push(callback(v))
  }
  // Only change code above this line
  return newArray
}

const new_s = s.myMap(function (item) {
  return item * 2
})
```

<br>

## Use the filter Method to Extract Data from an Array

filter와 map의 조합으로 데이터 뽑아내기

```javascript
// The global variable
const watchList = [
  {
    Title: "Inception",
    Year: "2010",
    Rated: "PG-13",
    Released: "16 Jul 2010",
    Runtime: "148 min",
    Genre: "Action, Adventure, Crime",
    Director: "Christopher Nolan",
    Writer: "Christopher Nolan",
    Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy",
    Plot: "A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
    Language: "English, Japanese, French",
    Country: "USA, UK",
    Awards: "Won 4 Oscars. Another 143 wins & 198 nominations.",
    Poster:
      "http://ia.media-imdb.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    Metascore: "74",
    imdbRating: "8.8",
    imdbVotes: "1,446,708",
    imdbID: "tt1375666",
    Type: "movie",
    Response: "True",
  },
  {
    Title: "Interstellar",
    Year: "2014",
    Rated: "PG-13",
    Released: "07 Nov 2014",
    Runtime: "169 min",
    Genre: "Adventure, Drama, Sci-Fi",
    Director: "Christopher Nolan",
    Writer: "Jonathan Nolan, Christopher Nolan",
    Actors: "Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow",
    Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    Language: "English",
    Country: "USA, UK",
    Awards: "Won 1 Oscar. Another 39 wins & 132 nominations.",
    Poster:
      "http://ia.media-imdb.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SX300.jpg",
    Metascore: "74",
    imdbRating: "8.6",
    imdbVotes: "910,366",
    imdbID: "tt0816692",
    Type: "movie",
    Response: "True",
  },
  {
    Title: "The Dark Knight",
    Year: "2008",
    Rated: "PG-13",
    Released: "18 Jul 2008",
    Runtime: "152 min",
    Genre: "Action, Adventure, Crime",
    Director: "Christopher Nolan",
    Writer:
      "Jonathan Nolan (screenplay), Christopher Nolan (screenplay), Christopher Nolan (story), David S. Goyer (story), Bob Kane (characters)",
    Actors: "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
    Plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.",
    Language: "English, Mandarin",
    Country: "USA, UK",
    Awards: "Won 2 Oscars. Another 146 wins & 142 nominations.",
    Poster:
      "http://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    Metascore: "82",
    imdbRating: "9.0",
    imdbVotes: "1,652,832",
    imdbID: "tt0468569",
    Type: "movie",
    Response: "True",
  },
  {
    Title: "Batman Begins",
    Year: "2005",
    Rated: "PG-13",
    Released: "15 Jun 2005",
    Runtime: "140 min",
    Genre: "Action, Adventure",
    Director: "Christopher Nolan",
    Writer:
      "Bob Kane (characters), David S. Goyer (story), Christopher Nolan (screenplay), David S. Goyer (screenplay)",
    Actors: "Christian Bale, Michael Caine, Liam Neeson, Katie Holmes",
    Plot: "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from the corruption that Scarecrow and the League of Shadows have cast upon it.",
    Language: "English, Urdu, Mandarin",
    Country: "USA, UK",
    Awards: "Nominated for 1 Oscar. Another 15 wins & 66 nominations.",
    Poster:
      "http://ia.media-imdb.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg",
    Metascore: "70",
    imdbRating: "8.3",
    imdbVotes: "972,584",
    imdbID: "tt0372784",
    Type: "movie",
    Response: "True",
  },
  {
    Title: "Avatar",
    Year: "2009",
    Rated: "PG-13",
    Released: "18 Dec 2009",
    Runtime: "162 min",
    Genre: "Action, Adventure, Fantasy",
    Director: "James Cameron",
    Writer: "James Cameron",
    Actors: "Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang",
    Plot: "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    Language: "English, Spanish",
    Country: "USA, UK",
    Awards: "Won 3 Oscars. Another 80 wins & 121 nominations.",
    Poster:
      "http://ia.media-imdb.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg",
    Metascore: "83",
    imdbRating: "7.9",
    imdbVotes: "876,575",
    imdbID: "tt0499549",
    Type: "movie",
    Response: "True",
  },
]

// Only change code below this line

const filteredList = watchList
  .filter(movie => movie.imdbRating > 8.0)
  .map(movie => {
    return { title: movie.Title, rating: movie.imdbRating }
  })

// Only change code above this line

console.log(filteredList)
```

<br>

## Implement the filter Method on a Prototype

filter 메서드 직접 구현하기

```javascript
// The global variable
const s = [23, 65, 98, 5]

Array.prototype.myFilter = function (callback) {
  // Only change code below this line
  const newArray = []
  for (const v of this) {
    if (callback(v)) {
      newArray.push(v)
    }
  }
  // Only change code above this line
  return newArray
}

const new_s = s.myFilter(function (item) {
  return item % 2 === 1
})
```

<br>

## Use the reduce Method to Analyze Data

reduce로 데이터 뽑아내기

```javascript
// The global variable
const watchList = [
  {
    Title: "Inception",
    Year: "2010",
    Rated: "PG-13",
    Released: "16 Jul 2010",
    Runtime: "148 min",
    Genre: "Action, Adventure, Crime",
    Director: "Christopher Nolan",
    Writer: "Christopher Nolan",
    Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy",
    Plot: "A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
    Language: "English, Japanese, French",
    Country: "USA, UK",
    Awards: "Won 4 Oscars. Another 143 wins & 198 nominations.",
    Poster:
      "http://ia.media-imdb.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    Metascore: "74",
    imdbRating: "8.8",
    imdbVotes: "1,446,708",
    imdbID: "tt1375666",
    Type: "movie",
    Response: "True",
  },
  {
    Title: "Interstellar",
    Year: "2014",
    Rated: "PG-13",
    Released: "07 Nov 2014",
    Runtime: "169 min",
    Genre: "Adventure, Drama, Sci-Fi",
    Director: "Christopher Nolan",
    Writer: "Jonathan Nolan, Christopher Nolan",
    Actors: "Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow",
    Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    Language: "English",
    Country: "USA, UK",
    Awards: "Won 1 Oscar. Another 39 wins & 132 nominations.",
    Poster:
      "http://ia.media-imdb.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SX300.jpg",
    Metascore: "74",
    imdbRating: "8.6",
    imdbVotes: "910,366",
    imdbID: "tt0816692",
    Type: "movie",
    Response: "True",
  },
  {
    Title: "The Dark Knight",
    Year: "2008",
    Rated: "PG-13",
    Released: "18 Jul 2008",
    Runtime: "152 min",
    Genre: "Action, Adventure, Crime",
    Director: "Christopher Nolan",
    Writer:
      "Jonathan Nolan (screenplay), Christopher Nolan (screenplay), Christopher Nolan (story), David S. Goyer (story), Bob Kane (characters)",
    Actors: "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
    Plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.",
    Language: "English, Mandarin",
    Country: "USA, UK",
    Awards: "Won 2 Oscars. Another 146 wins & 142 nominations.",
    Poster:
      "http://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    Metascore: "82",
    imdbRating: "9.0",
    imdbVotes: "1,652,832",
    imdbID: "tt0468569",
    Type: "movie",
    Response: "True",
  },
  {
    Title: "Batman Begins",
    Year: "2005",
    Rated: "PG-13",
    Released: "15 Jun 2005",
    Runtime: "140 min",
    Genre: "Action, Adventure",
    Director: "Christopher Nolan",
    Writer:
      "Bob Kane (characters), David S. Goyer (story), Christopher Nolan (screenplay), David S. Goyer (screenplay)",
    Actors: "Christian Bale, Michael Caine, Liam Neeson, Katie Holmes",
    Plot: "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from the corruption that Scarecrow and the League of Shadows have cast upon it.",
    Language: "English, Urdu, Mandarin",
    Country: "USA, UK",
    Awards: "Nominated for 1 Oscar. Another 15 wins & 66 nominations.",
    Poster:
      "http://ia.media-imdb.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg",
    Metascore: "70",
    imdbRating: "8.3",
    imdbVotes: "972,584",
    imdbID: "tt0372784",
    Type: "movie",
    Response: "True",
  },
  {
    Title: "Avatar",
    Year: "2009",
    Rated: "PG-13",
    Released: "18 Dec 2009",
    Runtime: "162 min",
    Genre: "Action, Adventure, Fantasy",
    Director: "James Cameron",
    Writer: "James Cameron",
    Actors: "Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang",
    Plot: "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    Language: "English, Spanish",
    Country: "USA, UK",
    Awards: "Won 3 Oscars. Another 80 wins & 121 nominations.",
    Poster:
      "http://ia.media-imdb.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg",
    Metascore: "83",
    imdbRating: "7.9",
    imdbVotes: "876,575",
    imdbID: "tt0499549",
    Type: "movie",
    Response: "True",
  },
]

function getRating(watchList) {
  // Only change code below this line
  let averageRating = watchList.reduce(
    (obj, { Director: director, imdbRating: rating }) => {
      if (director === "Christopher Nolan") {
        obj.count++
        obj.sum += Number(rating)
      }
      return obj
    },
    { sum: 0, count: 0 }
  )
  // Only change code above this line
  return averageRating.sum / averageRating.count
}

console.log(getRating(watchList))
```
