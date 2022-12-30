js는 웹페이지와 상호작용할 수 있도록 가볍고 쉽게 배울 수 있는 프로그래밍 언어로 설계되었다. 1995년에 출시되었고, oop 개념이 상대적으로 새로운 시점이었으며, 당시에 지배적인 oop 패러다임의 언어는 class 기반의 언어였다. 

그러나 js의 창시자인, 넷스케이프 공동체는, 자바스크립트에서 프로토타입을 기반으로해서 Oop에 접근하기로 했다. 이런 결정을 내리게 된 몇 가지 이유가 존재한다.

- 클래스 기반 보다 간단하고 이해하기 쉽다 : 프로토타입 기반 언어들에선, 클래스를 새로 만들고, 그 클래스들로부터 객체를 새롭게 만들기 보다는, 기존에 존재하는 객체들을 복사해서 새로운 객체를 만들 수 있다.  이런 것들은 자바스크립트에서 OOP를 하려고하는 새로운 프로그래머들을 쉽게 만들어주었다. 
    
-  프로토타입 기반의 OOP는 더 유연하고 확장가능성이 있기 때문이다 : 클래스 기반 언어세너는, 클래스 계층에서 정의된 메서드와 속성들에 한정된다. 프로토타입 기반언어에서는, 어느 시점에서나 메서드를 수정하고 속성들을 더할 수 있다.  In a prototype-based language, you can add or modify the methods and properties of an object at any time, making it easier to create objects that are tailored to your specific needs.
    
-   Prototype-based OOP is more efficient than class-based OOP. In a class-based language, you have to create a new instance of a class for each object you want to create, which can be inefficient. In a prototype-based language, you can create new objects simply by cloning existing objects, which is generally more efficient.
    

Overall, the decision to use a prototype-based approach to OOP in JavaScript was likely driven by a desire to create a lightweight and easy-to-learn programming language that was well-suited to the needs of web developers. While class-based OOP is still prevalent in many other programming languages, the prototype-based approach has proven to be a powerful and effective way to implement OOP in JavaScript.