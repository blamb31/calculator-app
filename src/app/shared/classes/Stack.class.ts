export class Stack {
  stack = [];
  constructor() {}

  push(item) {
    this.stack.push(item);
    return this.stack;
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.depth() - 1];
  }

  depth() {
    return this.stack.length;
  }

  reset() {
    this.stack = [];
  }
}
