/*
一个词: 八股文
一句话: 基类定骨架,子类补充细节
术语: template模式是控制反转的一种,
因为高层次(high level,直接说是后面写在子类里的代码)
的运行是由第层次(low level,直接说是一开始写在基类里的代码)控制的
*/

export class Tree<T> {
  constructor(readonly self: T, readonly children: Array<Tree<T>> = []) {}
}

// 这样的写法的特殊之处在于,可以适配多种数据结构: 传统的对象, 简单的数组表示法, 临接表等等
abstract class TraverseTreeAlgorithm<T, V> {
  constructor(readonly tree: T) {}

  traverse(op: (v: V) => void) {
    let operateOnNode: T | undefined = this.tree;
    while (operateOnNode) {
      const value = this.getValue(operateOnNode);
      op(value);
      operateOnNode = this.getNextNode(operateOnNode);
    }
  }

  protected abstract getValue(node: T): V;

  protected abstract getNextNode(node: T): T | undefined;
}

class DFSForTree<T> extends TraverseTreeAlgorithm<Tree<T>, T> {
  private stack: Tree<T>[] = [];

  getValue(node: Tree<T>): T {
    return node.self;
  }

  getNextNode(node: Tree<T>): Tree<T> | undefined {
    if (node.children.length !== 0) {
      this.stack = [...node.children.slice(1), ...this.stack];
      return node.children[0];
    }
    if (this.stack.length !== 0) {
      const opNode = this.stack[0];
      this.stack = this.stack.slice(1);
      return opNode;
    }
    return undefined;
  }
}

const tree = new Tree<string>('A', [
  new Tree('AA', [new Tree('AAA'), new Tree('AAB')]),
  new Tree('AB', [new Tree('ABA'), new Tree('ABB')]),
]);
const dfsForTree = new DFSForTree(tree);

dfsForTree.traverse(console.log);
