/*
一个词: 快照
一句话: 将类的状态输出一份快照保存起来,用以回滚.
消歧义:
    为什么不直接复制保存对象的上一个状态?
        那样客户端没有控制权,会很不灵活,如:
            1. 只能回滚到上一个状态,memento模式却能想回滚到哪就到哪(只要你有快照)
            2. 客户端不需要回滚操作的时候也储存了快照,这就是浪费
* */


export class SystemMemento {
    constructor(readonly kernelVersion: number,
                readonly kdeName: string) {
    }
}

class System {
    private kernelVersion: number
    private kdeName: string

    constructor(kernelVersion: number, kdeName: string) {
        this.kdeName = kdeName
        this.kernelVersion = kernelVersion
    }

    update() {
        this.kernelVersion += 1
    }

    changeKde(newKdeName: string) {
        this.kdeName = newKdeName
    }

    createMemento(): SystemMemento {
        return new SystemMemento(this.kernelVersion, this.kdeName)
    }

    restore(m: SystemMemento) {
        this.kernelVersion = m.kernelVersion
        this.kdeName = m.kdeName
    }
}


const myPoorSystem = new System(1, 'xfce')

const beforeUpdateMemento = myPoorSystem.createMemento()
myPoorSystem.update()

const beforeChangeKdeMemento = myPoorSystem.createMemento()
myPoorSystem.changeKde('gnome')

// 现在系统出现问题了,无法解决,只能回滚

// 回滚到修改桌面环境之前的状态
myPoorSystem.restore(beforeChangeKdeMemento)

// 还是不行就再回滚
myPoorSystem.restore(beforeUpdateMemento)
