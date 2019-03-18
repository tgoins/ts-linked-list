import { LinkedList, SinglyLinkedList } from './linked-list'

export class Stack<T> {
  private readonly list: SinglyLinkedList<T>

  public constructor() {
    this.list = new LinkedList<T>()
  }

  public push(data: T): T {
    this.list.addToRear(data)
    return data
  }

  public pop(): T {
    if (this.list.isEmpty()) {
      throw new Error('Popped an empty stack.')
    }

    const data = this.list.getRear()!
    this.list.removeRear()
    return data
  }

  public getSize() {
    return this.list.getSize()
  }

  public isEmpty() {
    return this.list.isEmpty()
  }
}
