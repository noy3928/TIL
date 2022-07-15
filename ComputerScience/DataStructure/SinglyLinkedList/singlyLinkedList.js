class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  push(val) {
    if (!this.head) {
      this.head = new Node(val)
      this.tail = this.head
      this.length++
    } else {
      this.tail.next = new Node(val)
      this.tail = this.tail.next
      this.length++
    }
  }
}

let list = new SinglyLinkedList()
list.push("Hello")
list.push("Goobye")
