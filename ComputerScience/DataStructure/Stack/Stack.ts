{
  interface IStack {
    readonly size: number
    push(value: string): void
    pop(): string
  }

  //불변성을 위해서 readonly를 사용한다.
  type StackNode = {
    readonly value: string
    readonly next?: StackNode
  }

  class Stack implements IStack {
    private _size: number = 0
    private head?: StackNode

    get size() {
      return this._size
    }

    push(value: string) {
      const node: StackNode = { value, next: this.head }
      this.head = node
      this._size++
    }

    pop(): string {
      if (this.head == null) {
        throw new Error("Stack is Empty")
      }
      const node = this.head
      this.head = node.next
      this._size--
      return node.value
    }
  }

  const stack = new Stack()
  stack.push("하이1")
  stack.push("하이2")
  stack.push("하이3")
  while (stack.size !== 0) {
    console.log(stack.pop())
    console.log(stack.size)
  }

  //[출처 : 드림엘리코딩 타입스크립트 강좌에서 배운 stack을 직접 구현하기]
}
