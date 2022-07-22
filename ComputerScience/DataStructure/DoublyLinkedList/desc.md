## Push

- create a new node with the value passed to the function
- if the head property is null set the head and tail to be the newly created node
- if not, set the next property on the tail to be that node
- set the previous property on the newly created node to be the tail
- set the tail to be the newly created node
- increment the length

## Pop

- if there is no head, return undefined
- store the current tail in a variable to return later
- if the length is 1, set the head and tail to be null
- update the tail to be the previous node
- set the newTail's next to null
- decrement the length
- return the value removed
