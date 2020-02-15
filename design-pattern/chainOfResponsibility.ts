/**
 * 一个词: 层层上报
 * 一句话: 对消息的处理分层,这一层解决不了就报给下一层
 * 特征: 动态配置处理的分层
 * 实现: handler aggregate itself(处理者聚合他自己形成链表/树的结构)
 * */

abstract class FeedbackHandler {
    protected successor:FeedbackHandler
    setSuccessor(s:FeedbackHandler){
        this.successor= s
    }
    abstract handle(diePeopleAccount:number):void
}

class USACityHandler extends FeedbackHandler{
    handle(diePeopleAccount: number): void {
        if (diePeopleAccount<5){
            console.log('everything is ok!')
            return
        }
        if(this.successor){
            this.successor.handle(diePeopleAccount)
        }
        throw new Error('we try everything already!')
    }
}

class USAStateHandler extends FeedbackHandler{
    handle(diePeopleAccount: number): void {
        if (diePeopleAccount<100){
            console.log('quit somebody')
            return
        }
        if(this.successor){
            this.successor.handle(diePeopleAccount)
        }
        throw new Error('we try everything already!')
    }
}

const handler = new USACityHandler()
handler.setSuccessor(new USAStateHandler())

handler.handle(1)
handler.handle(50)
handler.handle(150)
