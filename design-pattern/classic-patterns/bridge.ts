/**
 * Metaphor: Why can't we buy a computer with Manjaro?
 * The computer vendor produces a computer but let us
 * select the system to be installed.
 *
 * Essence: In OOP, `inherit` a bit like `sum` type in FP world,
 * every derived type represent individual behaviour,
 * when we compose two behaviours A and B(two sum type A and B),
 * naturally, we get a product.
 * if we present `sum` type by inherit, the leaf class will
 * be N*M, the inherit tree is explode.
 * So, we need a **bridge** connect two sum type by:
 * abstract class A accept abstract class B instance as parameter,
 * so we could compose behaviours derived from A and behaviours
 * derived from B during runtime and composition possibility remained
 * to N*M.
 * We don't need neither hard code every possibility statically
 * nor maintain a huge inherit tree.
 * Why: flexibility
 * 歧义声明:
 * 桥梁模式的标准定义是抽象和实现分离,我认为这种描述不好:
 * 这个模式有两个实现步骤:
 * 1. 将功能分割为抽象(abstraction)和实现(implementor) => 反映了抽象和实现分离
 * 2. 使用继承分别实现implementor和abstraction => *没有*反映了抽象和实现分离
 * 3. 在运行时组合implementor和abstraction(具体类) => *没有*反映了抽象和实现分离
 * 一个词: 骨肉分离
 * 一句话: 相对于暴力穷举式继承,使用运行时组合简化了两个继承树的组合
 * */

abstract class Computer {
  constructor(private readonly system: System) {}
  abstract getDescription(): string;

  dislayInfo() {
    console.log(this.getDescription() + this.system.getName());
  }
}

class DellComputer extends Computer {
  getDescription(): string {
    return `This is a DELL computer`;
  }
}

class Huawei extends Computer {
  getDescription(): string {
    return `This is a DELL Huawei`;
  }
}

abstract class System {
  abstract getName(): string;
}

class Manjaro extends System {
  getName(): string {
    return "runing on Manjaro";
  }
}

class Ubuntu extends System {
  getName(): string {
    return "runing on Manjaro";
  }
}

new DellComputer(new Manjaro()).dislayInfo();
new DellComputer(new Ubuntu()).dislayInfo();

new Huawei(new Manjaro()).dislayInfo();
new Huawei(new Ubuntu()).dislayInfo();

