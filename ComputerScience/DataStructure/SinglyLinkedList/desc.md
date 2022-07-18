# Singly Linked List

리스트의 개념을 먼저 알아보자.

단순 정의는 다음과 같다.

- a data structure that contains a head, tail and length property
- Linked Lists consist of nodes, and each node has a value and a pointer to another node or null.
- 중간에 있는 요소에 접근하고 싶다면, 첫번째 노드에서부터 다가가야한다. 첫번째 노드가 가리키고 있는 것을 따라가서 찾아야 한다.

리스트의 개념을 알아보려고 할 때, 배열을 비교해서 이해하면 쉽다.

### 배열 :

- indexed in order!
- insertion and deletion can be expensive
- can quickly be accessed at a specific index

### 리스트 :

- do not have indexes!
- connected via nodes with a next pointer
- random access is not allowed

## Pushing pseudocode

- this function should accept a value
- create a new node using the value passed to the function
- if there is no head property on the list, set the head and tail to be the newly created node
- otherwise set the next property on the tail to be the new node and set the tail property on the list to be the newly created node

## Pop

- removing a node from the end of the Linked List!

- if there are no nodes in the list, return undefined
- Loop through the list until you reach the tail
- set the next property of the 2nd to last node to be null
- set the tail to be the 2nd to last node
- decrement the length of the list by 1
- return the value of the node removed

<br>

## Shift

- If there are no nodes, return undefined
- Store the current head property in a variable
- Set the head property to be the current head's next property
- Decrement the length by 1
- Return the value of the node removed

<br>

## Unshift

- this function should accept a value
- create a new node using the value passed to the function
- if there is no head property on the list, set the head and tail to be the newly created node
- otherwise set the newly created node's next property to bet the current head property on the list
- set the head property on the list to be that newly created node
- increment the length of the list by 1
- return the linked list

<br>

## Get O(N)

- this function should accept an index
- if the index is less than zero or greater than or equal to the length of the list, return null
- loop through the list until you reach the index and return the node at that specific index

<br>

## Set

- this function should accept a value and an index.
- use your get function to find the specific node.
- if the node is not found, return false
- if the node is found, set the value of that node to be the value passed to the function and return true

<br>

## Insert O(1)

- If the index is less than zero or greater than the length, return false
- If the index is the same as the length, push a new node to the end of the list
- If the index is 0, unshift a new node to the start of the list
- Otherwise, using the get method, access the node at the index -1
- set the next property on that node to be the new node
- set the next property on the new node to be the previous next
- increment the length
- return true

<br>

## Remove O(1) or O(N)

- if the index is less than zero or greater than the length, return undefined
- if the index is the same as the length -1, pop
- if the index is 0, shift
- otherwise, using the get method, access the node at the index -1
- set the next property on that node to be the next of the next node
- decrement the length
- return the value of the node removed

<br>

## Reverse

- swap the head and tail
- create a variable called next
- create a variable called prev
- create a variable called node and initialize it to the head property
- loop through the list
- set next to be the next property on whatever node is
- set the next property on the node to be whatever prev is
- set prev to be the value of the node variable
- set the node variable to be the value of the next variable

<br>

## Recap

- singly linked lists are an excellent alternative to arrays when insertion and deletion at the beginning are frequently required
- arrays contain a built in index whereas linked lists do not
- the idea of a list data structure that consists of nodes is the foundation for other data structures like stacks and queues
