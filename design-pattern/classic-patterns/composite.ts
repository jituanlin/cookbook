/**
 * Core: Unify part-whole instance interface.
 * Compose a group of object to a instance which has same interface(composite)
 * Why: The client client don't need extra logic
 * to handle `whole` instance.
 * Elements:
 * 1. A `part` class
 * 2. A `whole` class extend `part` class(unify) for
 * maintain a group of `part`
 * 一个词: 树
 * 一句话: 通过整体和部分实现同一个抽象类来表达树形结构
 * 容易混淆的细节: 整体组合的是*抽象类*,而不是部分的具体实现,这使得表达树的结构成为可能
 * */

abstract class StorageNode {
  abstract getContent(): string;
}

class FileNode extends StorageNode {
  constructor(private readonly content: string) {
    super();
  }

  getContent(): string {
    return this.content;
  }
}

class DirectorNode extends StorageNode {
  constructor(private readonly storageNodes: StorageNode[]) {
    super();
  }

  getContent(): string {
    return this.storageNodes.map(f => f.getContent()).join("\n");
  }
}

const file = new FileNode("one");
const file2 = new FileNode("two");

const dir = new DirectorNode([new DirectorNode([file]), file2]);

console.log(file.getContent());
console.log(dir.getContent());

