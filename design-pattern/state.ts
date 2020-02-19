/*
一个词: 状态机
前提: 依赖状态的一系列行为之间是独立的
实现:
将依赖状态的行为抽离对象本身,封装成一个个包含特定行为状态类,
对象本身保留一个方法去转换状态
好处:
    1. 不用在对象中写一大堆条件语句,而是将不同的行为分开实现,容易维护
    2. 新增新状态/新行为不需要修改原来的类,遵循开闭原则
场景: 在对象的不同状态里都有同一个方法,但是方法行为根据状态的不同而不同
比较策略模式:
    相同: 解决了扩展和分离操作的问题
    不同: 策略模式中不依赖对象的状态,选择哪种操作由客户端决定;
         而state模式中,不仅依赖对象的状态,由对象的状态决定选择哪种操作(外界无法干预),
         而且强调状态之间的转换过程;
* */

class LoginProcessing {
    private password: string
    private userName: string
    private fillingState: FillingState = new NeedFillUserNameState()

    setFillingState(s: FillingState) {
        this.fillingState = s
    }

    getUserName() {
        return this.userName
    }

    getPassword() {
        return this.password
    }

    fillUserName(value: string) {
        this.userName = value
        this.setFillingState(new NeedFillPasswordState())
    }

    fillPassword(value: string) {
        this.password = value

    }
    submit(){
        const isValid = this.fillingState.trySubmit(this)
        if(isValid){
            console.log('login success')
        }
    }
}


interface FillingState {
    trySubmit(lp: LoginProcessing): boolean
}

class NeedFillUserNameState implements FillingState {
    trySubmit(lp: LoginProcessing): boolean {
        const isFilling = lp.getUserName()
        if (!isFilling) {
            console.log('please input username!')
            return true
        }
        return false
    }
}

class NeedFillPasswordState implements FillingState {
    trySubmit(lp: LoginProcessing): boolean {
        const isFilling = lp.getPassword()
        if (!isFilling) {
            console.log('please input password!')
            return true
        }
        return false
    }
}

const loginProcessing = new LoginProcessing()
loginProcessing.submit()
loginProcessing.fillUserName('jit')
loginProcessing.submit()
loginProcessing.fillPassword('***')
loginProcessing.submit()
