/*
一个词: 消息群发
一句话:
多个对象松耦合地听命于一个对象

为什么: 解耦N对多

场景: 一个类(记为类S)的某个状态改变后,需要通知多个其他对象;
如果在这个对象中直接引用其他对象,会造成紧密耦合,且
这样无法支持动态配置;
为了解耦和支持动态配置被通知对象,类S提供一个注册方法,该方法
接受实现了`notify`方法的对象,在类S状态该变化后,将会调用
这一系列对象的`notify`方法.

函数式编程语言中:
支持函数作为第一公民的语言中(如JS),直接提供`notify`方法本身
就行,不用那么麻烦.

变种:
1. 如果不只有一个对象会发出通知(一对多),而是多个对象会发出通知(多对多),
需要把类S的注册,发布功能单独抽取出来作为一个对象.
2. 使用WeakList应该可以解决没有手动取消订阅带来的内存泄露

* */

//  不支持函数作为第一公民的语言中才需要这么做
class Observe<T> {
  notify(context: T): void {}
}

class BoyA extends Observe<string> {
  notify(context: string): void {
    console.log('boyA got message:', context);
  }
}

class BoyB extends Observe<string> {
  notify(context: string): void {
    console.log('boyB got message:', context);
  }
}

class Girl {
  private sbs: Observe<string>[] = [];

  addSpareTire(sb: Observe<string>) {
    this.sbs.push(sb);
    return {
      giveUp: () => {
        this.sbs.splice(
          this.sbs.findIndex(sb$ => sb === sb$),
          1
        );
      },
    };
  }

  speak(msg: string) {
    this.sbs.forEach(sb => sb.notify(msg));
  }
}

const girl = new Girl();
const boyA = new BoyA();
const boyB = new BoyB();

girl.addSpareTire(boyA);
girl.addSpareTire(boyB);

girl.speak('I am hungry');
