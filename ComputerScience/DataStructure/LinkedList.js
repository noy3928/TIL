class LinkedList {
  size = 0
  head = null

  get isEmpty() {
    return this.size === 0
  }

  createNode(element) {
    return { element, next: null }
  }

  push(element) {
    const node = this.createNode(element)
    if (this.head === null) {
      this.head = node
    } else {
      let current = this.head

      //current를 노드의 맨 뒤로 보낸다.
      while (current.next !== null) {
        current = current.next
      }
      current.next = node
    }
    this.size++
    return this.size
  }

  insert(element, index = 0) {
    if (index < 0 || index > this.size) return false

    const node = this.createNode(element)

    if (index === 0) {
      node.next = this.head
      this.head = node
    } else {
      let previous = this.head

      for (let i = 0; i < index - 1; i++) {
        previous = previous.next
      }

      // 노드를 index 번째 양쪽 사이에 넣어준다.
      node.next = previous.next
      previous.next = node
    }

    this.size++
    return true
  }

  toString() {
    if (!this.size) return ""

    let str = `${this.head.element}`
    let current = this.head

    for (let i = 0; i < this.size - 1; i++) {
      current = current.next
      str += `,${current.element}`
    }

    return str
  }

  print() {
    let arr = []

    if (this.size) {
      let current = this.head

      for (let i = 0; i < this.size; i++) {
        arr.push(current)
        current = current.next
      }
    }

    console.log(arr)
  }
}
