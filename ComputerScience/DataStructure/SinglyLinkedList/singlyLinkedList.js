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
    let newNode = new Node(val)

    if (!this.head) {
      this.head = newNode
      this.tail = this.head
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length++
    return this
  }
  pop() {
    if (!this.head) {
      return undefined
    } else {
      let current = this.head
      let newTail = current
      while (current.next) {
        newTail = current
        current = current.next
      }
      this.tail = newTail
      this.tail.next = null
      this.length--
      if (this.length === 0) {
        this.head = null
        this.tail = null
      }
      return current
    }
  }

  shift() {
    if (!this.head) return undefined
    else {
      let head = this.head
      this.head = this.head.next
      this.length--
      if (this.length === 0) {
        this.tail = null
      }
      return head
    }
  }

  unshift(val) {
    const newNode = new Node(val)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head = newNode
    }

    this.length++
    return this
  }

  get(index) {
    if (index < 0 || index >= this.length) return null
    else {
      let count = 0
      let val = this.head
      while (count < index) {
        val = val.next
        count++
      }
      return val
    }
  }

  set(val, index) {
    let foundNode = this.get(index)
    if (foundNode) {
      foundNode.val = val
      return true
    }
    return false
  }

  traverse() {
    let current = this.head
    while (current) {
      console.log(current.val)
      current = current.next
    }
  }
}

let list = new SinglyLinkedList()
list.push("Hello")
list.push("Goobye")
