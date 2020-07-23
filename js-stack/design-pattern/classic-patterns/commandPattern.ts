/**
 * 一个词: 封装命令
 * 一句话: 将所有执行动作的所有信息封装起来
 * 特征：
 *  1. 使用统一的interface描述所有的命令
 *  2. 命令对象聚合其处理者
 *  3. 命令对象拥有状态
 * 场景:
 *  1. 命令的执行需要集中管理以支持回滚,优先级编排等
 *  2. 同一个命令可能会有不同的执行动作(配置化)
 *  3. 命令的创建者仅依赖最通用的命令的interface以支持所有的特殊化的命令
 * 组件：
 * 对比使用回调函数：
 *  1. 回调函数的参数依赖于调用者传入,使得调用者依赖回调函数的函数类型签名,
 *     同时也增加了统一化回调函数类型签名的难度
 *  3. 回调函数无法存储状态,难以支持状态回滚等高级功能
 * 对比策略模式:
 *  不同:
 *      策略模式解决的是做一件事情有多种方式
 *      命令模式是解决执行命令的上下文需要被打包起来
 *   相同:
 *      使用统一的interface表示操作/命令
 * */

interface Command {
  do(): void;
  unDo(): void;
}

class File {
  content: string;
  constructor(readonly path: string, content: string) {
    this.content = content;
  }
  delete() {
    console.log(`delete file:${this.path}`);
  }
  create() {
    console.log(`create file ${this.path} with content:${this.content}`);
  }
}

class DeleteFileCommand implements Command {
  constructor(readonly file: File) {}
  do(): void {
    this.file.delete();
  }
  unDo(): void {
    this.file.create();
  }
}

class CreateFileCommand implements Command {
  constructor(readonly file: File) {}
  do(): void {
    this.file.create();
  }
  unDo(): void {
    this.file.delete();
  }
}

export class UserOpHandler {
  private latestCommand: Command | undefined;
  submit(c: Command) {
    this.latestCommand = c;
    c.do();
  }
  unSubmit() {
    if (this.latestCommand) {
      this.latestCommand.unDo();
      this.latestCommand = undefined;
    }
  }
}

const handler = new UserOpHandler();
handler.submit(new DeleteFileCommand(new File('./tmp.txt', '42')));
handler.unSubmit();
