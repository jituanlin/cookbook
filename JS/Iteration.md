JS迭代(iteration)机制

JS有两种语法使用到了迭代机制
 1. `for ... of`
 2. `...xs`

这两种语法都会运使用迭代机制获取一个元素序列

一个对象要想支持迭代需要支持两种协议(同时):
1. 可迭代的(iterable)
2. 迭代器(iterator)

定义:

迭代器：该对象拥有next函数,next函数调用后返回一个对象{done,value}

可迭代的: 该对象的[Symbol.Iterator]属性是一个函数(可以是生成器函数),
调用该函数后,这个函数返回一个`迭代器`,所以`可迭代的`机制和`迭代器`机制是
配合使用的(接近MDN的标准描述,但是这样理解起来很操蛋)

生成器函数: 即是"迭代器"(iterator)又是"可迭代的"(iterable),
生成器函数本质是一个
    1.支持特殊语法
    2.调用后返回一个"迭代器"
的函数
    
    

```typescript
const obj = {}

// 直接扩展对象
// @ts-ignore
obj[Symbol.iterator] = () => {
    let idx = 0
    return {
        next() {
            if (idx > 3) {
                return {done: true}
            }
            return {
                done: false,
                value: idx++
            }
        }
    }
}

// for (const v of obj) {
//     console.log(v)
// }

class DataContainer {
    constructor(readonly data: number[]) {
    }

    // mdn那种把idx存储在DataContainer对象上而不是闭包中,是有严重bug的
    // 在闭包中的话,每次使用for ... of会创建一份自己的idx,从而支持嵌遍历
    // 而mdn的实现,只要一个单例idx,会使得嵌套遍历出现问题
    [Symbol.iterator]() {
        let idx = 0
        return {
            next: () => {
                if (idx < this.data.length) {
                    return {
                        done: false,
                        value: this.data[idx++]
                    }
                }
                return {
                    done: true
                }
            }

        }
    }
}
const dataContainer = new DataContainer([1,2,3,4])
for (const x of dataContainer){
    for (const y of dataContainer){
        console.log('inner',y)
    }
    console.log('outer',x)
}
```
