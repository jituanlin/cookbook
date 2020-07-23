/**
 * 一个词: 下一个
 * 一句话: 隐藏容器底层的逻辑提供统一的遍历手段
 * 场景:
 *  1. 不同的容器需要统一的遍历手段
 *  2. 隐藏迭代底层的细节
 *  3. 聚合(aggregate)与遍历(traverse)的逻辑分离同一个数据需要不同的遍历逻辑
 * 实现:
 *  1. 定义一个抽象迭代器类,它拥有一个next和hasNest方法
 *  2. 其他具体迭代器继承这个抽象类
 *  3. 容器类聚合迭代器,提供创建迭代器的接口
 *
 *  消歧义:
 *  createIterator方法意义:
 *      如果去掉createIterator方法,让迭代器的构造函数
 *      直接接受容器(aggregate)作为参数,这样其实是破坏了"接口隔离原则"
 *      因为迭代器往往关系容器底层的数据,而不是整个容器(比如迭代的时候你不会用到move/add方法),
 *      这会使得增加新迭代器的开发者的认知成本
 *  迭代器模式和迭代器的区别:
 *      迭代器模式由迭代器和容器两个组件组成,他们是组件与整体的关系
 *  于JS的iteration机制的区别:
 *      JS的iteration实现了迭代器(但不等同于迭代器模式)
 *  JS的迭代器另开专题
 * */

interface Comparable<T> {
  compare(b: T): number;
}

interface IIterator<T extends Comparable<any>> {
  next(): T;

  hasNext(): boolean;
}

interface IContainer<T extends Comparable<any>> {
  createIterator(): IIterator<T>;
}

abstract class MyArray<T extends Comparable<any>> implements IContainer<T> {
  readonly xs: T[];

  constructor(...xs: T[]) {
    this.xs = xs;
  }

  abstract createIterator(): IIterator<T>;
}

class DescIterator<T extends Comparable<any>> implements IIterator<T> {
  private readonly xs: T[];
  private idx: number = 0;

  constructor(xs: T[]) {
    this.xs = xs.sort((a, b) => -a.compare(b));
  }

  next(): T {
    return this.xs[this.idx++];
  }

  hasNext(): boolean {
    return this.idx < this.xs.length;
  }
}

class Integer implements Comparable<number> {
  constructor(readonly v: number) {}

  compare(b: number) {
    return this.v === b ? 0 : this.v > b ? 1 : -1;
  }
}

class DescArray<T extends Comparable<any>> extends MyArray<T> {
  createIterator(): IIterator<T> {
    return new DescIterator(this.xs);
  }
}

const descArray = new DescArray(new Integer(1), new Integer(2));
const iterator = descArray.createIterator();
while (iterator.hasNext()) {
  console.log(iterator.next());
}
