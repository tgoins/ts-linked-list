import { LinkedList, DoublyLinkedList } from './linked-list'

export class OrderedList<T extends number | string> {
  private list: DoublyLinkedList<T>

  public constructor() {
    this.list = new LinkedList<T>()
  }

  public add(data: T) {
    if (this.list.isEmpty()) {
      this.list.addToRear(data)
      return this
    }

    if (data > this.list.getFront()!) {
      this.list.addToFront(data)
      return this
    }

    if (data < this.list.getRear()!) {
      this.list.addToRear(data)
      return this
    }

    const iterator = this.list.traverse()

    let currentValue = iterator.next()

    while (!currentValue.done) {
      if (currentValue.value > data) {
        this.list.addBefore(currentValue.value, data)
        break
      }

      currentValue = iterator.next()
    }

    return this
  }

  public pop() {
    const data = this.list.getFront()
    this.list.removeFront()
    return data
  }

  public isEmpty() {
    return this.list.isEmpty()
  }

  public getSize() {
    return this.list.getSize()
  }

  public getMinimum() {
    return this.list.getRear()
  }

  public getMaximum() {
    return this.list.getFront()
  }
}
