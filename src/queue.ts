import { LinkedList, DoublyLinkedList } from './linked-list'

export class Queue<T> {
  private readonly list: DoublyLinkedList<T>

  public constructor() {
    this.list = new LinkedList<T>()
  }

  public push(data: T): T {
    this.list.addToRear(data)
    return data
  }

  public pop(): T {
    if (this.list.isEmpty()) {
      throw new Error('Tried to pop an empty queue.')
    }

    const data = this.list.getFront()!
    this.list.removeFront()
    return data
  }

  public getFront(): T | undefined {
    return this.list.getFront()
  }

  public getRear(): T | undefined {
    return this.list.getRear()
  }

  public isEmpty() {
    return this.list.isEmpty()
  }
}
