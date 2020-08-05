const obj = {};

// 直接扩展对象
// @ts-ignore
obj[Symbol.iterator] = () => {
  let idx = 0;
  return {
    next() {
      if (idx > 3) {
        return {done: true};
      }
      return {
        done: false,
        value: idx++,
      };
    },
  };
};

// for (const v of obj) {
//     console.log(v)
// }

class DataContainer {
  constructor(readonly data: number[]) {}

  // mdn那种把idx存储在DataContainer对象上而不是闭包中,是有严重bug的
  // 在闭包中的话,每次使用for ... of会创建一份自己的idx,从而支持嵌遍历
  // 而mdn的实现中,将id储存于类的实例域, 会使得嵌套遍历出现问题
  [Symbol.iterator]() {
    let idx = 0;
    return {
      next: () => {
        if (idx < this.data.length) {
          return {
            done: false,
            value: this.data[idx++],
          };
        }
        return {
          done: true,
        };
      },
    };
  }
}
const dataContainer = new DataContainer([1, 2, 3, 4]);
for (const x of dataContainer) {
  for (const y of dataContainer) {
    console.log('inner', y);
  }
  console.log('outer', x);
}
