- The observer method should be used if there are multiple dependencies on the state of one object. It follows the one to many dependencies, which means any change in the object state will reflect the attached object (in case of loose coupling).
- This method is used to send notifications, emails, messages etc. When we subscribe to any particular website, we notify you of any new events on that website.
- The object should be coupled tightly. If there is loose coupling in objects, the change in one state will reflect in another object.
- The subscriber list is dynamic, which means subscribers can join and drop the subscription when they want.

[자바포인트](https://www.javatpoint.com/observer-design-pattern-in-python)

---

### Use the Observer pattern when changes to the state of one object may require changing other objects, and the actual set of objects is unknown beforehand or changes dynamically.

You can often experience this problem when working with classes of the graphical user interface. For example, you created custom button classes, and you want to let the clients hook some custom code to your buttons so that it fires whenever a user presses a button.

The Observer pattern lets any object that implements the subscriber interface subscribe for event notifications in publisher objects. You can add the subscription mechanism to your buttons, letting the clients hook up their custom code via custom subscriber classes.

### Use the pattern when some objects in your app must observe others, but only for a limited time or in specific cases.

The subscription list is dynamic, so subscribers can join or leave the list whenever they need to.

[리팩토링 구루](https://refactoring.guru/design-patterns/observer)

As described above, when you have a design a system where multiple entities are interested in any possible update to some particular second entity object, we can use the observer pattern.

Observer Pattern
Observer Pattern
The flow is very simple to understand. Application creates the concrete subject object. All concrete observers register themselves to be notified for any further update in the state of subject.

As soon as the state of subject changes, subject notifies all the registered observers and the observers can access the updated state and act accordingly.

[HowTodoInJava](https://howtodoinjava.com/design-patterns/behavioral/observer-design-pattern/)

- Multi-Dependency: We should use this pattern when multiple objects are dependent on the state of one object as it provides a neat and well tested design for the same.
- Getting Notifications: It is used in social media, RSS feeds, email subscription in which you have the option to follow or subscribe and you receive latest notification.
- Reflections of Object: When we do not coupled the objects tightly, then the change of a state in one object must be reflected in another object.

[geeksforgeeks](https://www.geeksforgeeks.org/observer-method-python-design-patterns/)
