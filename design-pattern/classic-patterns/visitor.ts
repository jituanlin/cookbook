/*
概念:
    双重派发(double dispatch/multiple polymorphism):
        大多数面向对象语语言都是单重派发(simple dispatch),
        其方法调用后决定派发到哪个具体方法取决于调用者的类型
        但是双重派对此进行了扩展,不仅取决于调用者的类型,还取决于参数的类型
        visitor模式是双重派发机制的一种实现

一个词: 继承者们的操作
一句话: 派生类带来的派生操作外部管理,便于添加新的操作到整个派生树
利弊: 新增操作简单且符合开闭原则,新增派生类麻烦且不负荷开闭原则

和bridge模式的比较:
    相同:
        都是涉及到多个继承树相乘的关系;
    不同:
        bridge考虑的是对象于对象的继承树相乘;
        visitor考虑的是对象于一个以上的操作的相乘;

和策略模式比较:
    相同:
        将对象的方法依赖的操作单独抽离出来;
    不同:
        是否有继承树;策略模式下的操作无继承树结构;而策略模式下的操作有继承树结构;
        策略模式的策略选择依然需要编写代码去匹配(运行时,有的时候是没有这个需求的);
        而visitor模式的方法是静态(编译时)匹配好的
* */

interface Operation {
  textMessage(m: Message): void;

  fileMessage(m: Message): void;
}

abstract class Message {
  constructor(readonly content: string, readonly type: string) {}

  abstract accept(op: Operation): void;
}

class TextMessage extends Message {
  constructor(content: string) {
    super(content, 'text');
  }

  accept(op: Operation): void {
    op.textMessage(this);
  }
}

class FileMessage extends Message {
  constructor(content: string) {
    super(content, 'file');
  }

  accept(op: Operation): void {
    op.textMessage(this);
  }
}

class PersistOp implements Operation {
  textMessage(m: Message): void {
    console.log(`saving message with content ${m.content} to database`);
  }

  fileMessage(m: Message): void {
    console.log(`upload message with content ${m.content} to CDN`);
  }
}

class SendOp implements Operation {
  textMessage(m: Message): void {
    console.log(`send message with content ${m.content}`);
  }

  fileMessage(m: Message): void {
    console.log(`send file`);
  }
}

const textMsg = new TextMessage('hi');
textMsg.accept(new PersistOp());
textMsg.accept(new SendOp());
