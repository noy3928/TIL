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
