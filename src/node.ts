export class Node<T> {
  private data: T
  private next: Node<T> | undefined
  private previous: Node<T> | undefined

  public constructor(
    previous: Node<T> | undefined,
    next: Node<T> | undefined,
    data: T
  ) {
    this.data = data
    this.next = next
    this.previous = previous
  }

  public getNext() {
    return this.next
  }

  public getPrevious() {
    return this.previous
  }

  public getData() {
    return this.data
  }

  public setData(data: T) {
    this.data = data
  }

  public setNext(next: Node<T>) {
    this.next = next
  }

  public setPrevious(previous: Node<T>) {
    this.previous = previous
  }
}
