- The observer method has a risk to implement. If it is not implemented carefully, it will be the cause of large complexity code.
- The main disadvantage of the observer design pattern that subscribers are notified in random order.
- There is also a memory leakage problem in the observer design pattern because of the observer's explicit register and unregistering.

[자바포인트](https://www.javatpoint.com/observer-design-pattern-in-python)

- Subscribers are notified in random order.

[리팩토링 구루](https://refactoring.guru/design-patterns/observer)

- The Observer interface has to be implemented by ConcreteObserver, which involves inheritance. There is no option for composition, as the Observer interface can be instantiated.
- If not correctly implemented, the Observer can add complexity and lead to inadvertent performance issues.
- In software application, notifications can, at times, ...

[오렐리](https://www.oreilly.com/library/view/learning-python-design/9781785888038/ch06s06.html)

- Memory Leakage: Memory leaks caused by Lapsed Listener Problem because of explicit register and unregistering of observers.
- Random Notifications: All the subscribers present gets notification in the random order.
- Risky Implementations: If the pattern is not implemented carefully, there are huge chances that you will end up with large complexity code.

[geeksforgeeks](https://www.geeksforgeeks.org/observer-method-python-design-patterns/)
