An observer design pattern is a behavioral design pattern where objects are represented as observers that wait for an event to trigger. When the new event is triggered, the multiple observers catch these events.

The event source (or object) attaches to the subject. Whenever the change is performed in the subject, it is notified by the observer. It follows the one to many approaches between the objects so that one change in the subject will reflect in all of its dependents and be updated automatically.

Let's understand the above concept using the real-world example.

If we are newspaper or magazine subscriber, we don't need to go the store to get the news. We get the newspaper at home. If there is a new update available, the publisher sends it directly to our mailbox right after publication.

[자바포인트](https://www.javatpoint.com/observer-design-pattern-in-python)

Observer is a behavioral design pattern. It specifies communication between objects: observable and observers. An observable is an object which notifies observers about the changes in its state.

For example, a news agency can notify channels when it receives news. Receiving news is what changes the state of the news agency, and it causes the channels to be notified.

[Baeldung](https://www.baeldung.com/java-observer-pattern)

The observer method is a Behavioral design Pattern which allows you to define or create a subscription mechanism to send the notification to the multiple objects about any new event that happens to the object that they are observing. The subject is basically observed by multiple objects. The subject needs to be monitored and whenever there is a change in the subject, the observers are being notified about the change. This pattern defines one to Many dependencies between objects so that one object changes state, all of its dependents are notified and updated automatically.

[geeksforgeek](https://www.geeksforgeeks.org/observer-method-python-design-patterns/)
