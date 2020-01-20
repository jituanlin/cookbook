/**
 * Core: Unify part-whole instance interface.
 * Compose a group of object to a instance which has same interface(composite)
 * Why: The client client don't need extra logic
 * to handle `whole` instance.
 * Elements:
 * 1. A `part` class
 * 2. A `whole` class extend `part` class(unify) for
 * maintain a group of `part`
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
  constructor(private readonly files: FileNode[]) {
    super();
  }

  getContent(): string {
    return this.files.map(f => f.getContent()).join("\n");
  }
}

const file = new FileNode("one");
const file2 = new FileNode("two");

const dir = new DirectorNode([file, file2]);

console.log(file.getContent());
console.log(dir.getContent());

