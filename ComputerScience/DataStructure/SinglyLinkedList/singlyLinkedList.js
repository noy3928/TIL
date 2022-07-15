class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

var first = new Node("Hi")
first.next = new Node("there")
first.next.next = new Node("how")
first.next.next.next = new Node("are you?")
