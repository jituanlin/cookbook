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
 * 一句话描述:
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

