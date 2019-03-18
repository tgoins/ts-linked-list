import { Node } from './node'

export interface LinkedList<T> {
  addToFront(data: T): LinkedList<T>
  addToRear(data: T): LinkedList<T>
  addAfter(element: T, newData: T): LinkedList<T>
  addBefore(element: T, newData: T): LinkedList<T>
  removeFront(): LinkedList<T>
  removeRear(): LinkedList<T>
  removeFirst(data: T): LinkedList<T>
  removeAll(data: T): LinkedList<T>
  replaceFirst(find: T, replaceWith: T): LinkedList<T>
  replaceAll(find: T, replaceWith: T): LinkedList<T>
  getFront(): T | undefined
  getRear(): T | undefined
  clear(): LinkedList<T>
  getSize(): number
  isEmpty(): boolean
}

export class LinkedList<T> implements LinkedList<T> {
  private front: Node<T> | undefined
  private rear: Node<T> | undefined
  private size: number = 0

  public constructor() {
    this.front = undefined
    this.rear = undefined
    this.size = 0
  }

  public addToFront(data: T) {
    const node = new Node(this.front, undefined, data)

    if (this.front) {
      this.front.setNext(node)
    }

    if (this.isEmpty()) {
      this.rear = node
    }

    this.front = node
    this.size++

    return this
  }

  public addToRear(data: T) {
    const node = new Node(undefined, this.rear, data)

    if (this.rear) {
      this.rear.setPrevious(node)
    }

    if (this.isEmpty()) {
      this.front = node
    }

    this.rear = node
    this.size++

    return this
  }

  public addAfter(element: T, newData: T) {
    if (this.isEmpty()) {
      throw new Error('List is empty.')
    }

    let currentNode = this.rear!

    let next = currentNode.getNext()

    while (currentNode.getData() !== element) {
      const next = currentNode.getNext()

      if (!next) {
        throw new Error(`Could not find element ${element}`)
      }

      currentNode = next
    }

    if (currentNode === this.rear) {
      this.addToRear(newData)
      return this
    } else {
      const newNode = new Node(currentNode, next, newData)

      if (next) {
        next.setPrevious(newNode)
      }

      currentNode.setNext(newNode)

      return this
    }
  }

  public addBefore(element: T, newData: T) {
    if (this.isEmpty()) {
      throw new Error('Tried to add before an element on an empty list.')
    }

    let currentNode = this.rear!

    while (currentNode.getData() !== element) {
      const next = currentNode.getNext()

      if (!next) {
        throw new Error(`Could not find element "${element}"`)
      }

      currentNode = next
    }

    const previousNode = currentNode.getPrevious()
    const newNode = new Node(previousNode, currentNode, newData)

    if (previousNode) {
      previousNode.setNext(newNode)
    }

    currentNode.setPrevious(newNode)

    return this
  }

  public getFront(): T | undefined {
    if (this.front) {
      return this.front.getData()
    }

    return undefined
  }

  public getRear(): T | undefined {
    if (this.rear) {
      return this.rear.getData()
    }

    return undefined
  }

  public removeFront() {
    if (!this.front) {
      throw new Error('The list is empty.')
    }

    this.front = this.front.getPrevious()
    this.size--

    return this
  }

  public removeRear() {
    if (!this.rear) {
      throw new Error('The list is empty.')
    }

    this.rear = this.rear.getNext()
    this.size--

    return this
  }

  public removeFirst(data: T) {
    let currentNode = this.rear

    while (currentNode) {
      if (currentNode.getData() !== data) {
        currentNode = currentNode.getNext()
        continue
      }

      if (currentNode === this.rear) {
        return this.removeRear()
      }

      if (currentNode === this.front) {
        return this.removeFront()
      }

      const previous = currentNode.getPrevious()!
      const next = currentNode.getNext()!

      previous.setNext(next)
      next.setPrevious(previous)

      this.size--
    }

    return this
  }

  public removeAll(data: T) {
    let currentNode = this.rear

    while (currentNode) {
      if (currentNode.getData() !== data) {
        currentNode = currentNode.getNext()
        continue
      }

      if (currentNode === this.rear) {
        this.removeRear()
        continue
      }

      if (currentNode === this.front) {
        this.removeFront()
        continue
      }

      const previous = currentNode.getPrevious()!
      const next = currentNode.getNext()!

      previous.setNext(next)
      next.setPrevious(previous)

      this.size--

      currentNode = next
    }

    return this
  }

  public replaceFirst(find: T, replaceWith: T) {
    let currentNode = this.rear

    while (currentNode) {
      if (currentNode.getData() !== find) {
        currentNode = currentNode.getNext()
        continue
      }

      currentNode.setData(replaceWith)
      break
    }

    return this
  }

  public replaceAll(find: T, replaceWith: T) {
    let currentNode = this.rear

    while (currentNode) {
      if (currentNode.getData() !== find) {
        currentNode = currentNode.getNext()
        continue
      }

      currentNode.setData(replaceWith)

      currentNode = currentNode.getNext()
    }

    return this
  }

  public clear() {
    this.front = undefined
    this.rear = undefined

    return this
  }

  public getSize() {
    return this.size
  }

  public isEmpty() {
    return this.size === 0
  }

  public forEach(callback: (data: T, list: this) => void) {
    let currentNode = this.rear

    while (currentNode) {
      const data = currentNode.getData()

      if (!data) {
        return
      }

      callback(data, this)
      currentNode = currentNode.getNext()
    }
  }
}
