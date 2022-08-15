- It is quite flexible to set up the relationship at runtime between the objects.
- With the Open/Closed Principle's help, we can introduce the new subscriber class without making a change in the publisher's code.
- This method carefully describes the coupling existing between the objects and the observer.

[자바포인트](https://www.javatpoint.com/observer-design-pattern-in-python)

- Open/Closed Principle. You can introduce new subscriber classes without having to change the publisher’s code (and vice versa if there’s a publisher interface).
- You can establish relations between objects at runtime.

[리팩토링 구루](https://refactoring.guru/design-patterns/observer)

- It supports the principle of loose coupling between objects that interact with each other
- It allows sending data to other objects effectively without any change in the Subject or Observer classes
- Observers can be added/removed at any point in time

[오렐리](https://www.oreilly.com/library/view/learning-python-design/9781785888038/ch06s06.html)

- Open/Closed Principle: Introducing subscriber classes is much easier in Observer method as compared to others without making changes in the client’s code.
- Establishes Relationships: Its really easy to establishes the relationships at the runtime between the objects.
- Description: It carefully describes about the coupling present between the objects and the observer. Hence, there is no need to modify Subject to add or remove observers.

- Provides a loosely coupled design between objects that interact. Loosely coupled objects are flexible with changing requirements. Here loose coupling means that the interacting objects should have less information about each other.

- Observer pattern provides this loose coupling as:

- Subject only knows that observer implement Observer interface.Nothing more.
- There is no need to modify Subject to add or remove observers.
- We can reuse subject and observer classes independently of each other.

[geeksforgeeks](https://www.geeksforgeeks.org/observer-method-python-design-patterns/)
