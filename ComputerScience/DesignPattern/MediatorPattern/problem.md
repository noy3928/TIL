Say you have a dialog for creating and editing customer profiles. It consists of various form controls such as text fields, checkboxes, buttons, etc.

Chaotic relations between elements of the user interface
Relations between elements of the user interface can become chaotic as the application evolves.
Some of the form elements may interact with others. For instance, selecting the “I have a dog” checkbox may reveal a hidden text field for entering the dog’s name. Another example is the submit button that has to validate values of all fields before saving the data.

Elements of the UI are interdependent
Elements can have lots of relations with other elements. Hence, changes to some elements may affect the others.
By having this logic implemented directly inside the code of the form elements you make these elements’ classes much harder to reuse in other forms of the app. For example, you won’t be able to use that checkbox class inside another form, because it’s coupled to the dog’s text field. You can use either all the classes involved in rendering the profile form, or none at all.

[리팩토링구루](https://refactoring.guru/design-patterns/mediator)
