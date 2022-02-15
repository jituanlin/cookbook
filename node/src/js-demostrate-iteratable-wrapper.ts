class DataContainer {
    constructor(readonly data: number[]) {
    }

    /**
     *  mdn的示例中把idx存储在DataContainer对象上而不是闭包中,是有严重bug的.
     *  采用闭包方案时, 使用for ... of时会创建一份自己的idx, 从而支持嵌套遍历.
     *  而mdn的实现中, 将id储存于类的实例域, 使得嵌套遍历会出现问题
     */
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
