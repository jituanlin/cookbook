/*
一个词: 八股文
一句话: 基类定骨架,子类补充细节
术语: template模式是控制反转的一种,
因为高层次(high level,直接说是后面写在子类里的代码)
的运行是由第层次(low level,直接说是一开始写在基类里的代码)控制的
*/

class Tree<T> {
    constructor(readonly self:T,readonly children:Array<Tree<T>> =[] ) {
    }
}

abstract class TraverseTreeAlgorithm<T> {
    traverse(op:(v:T)=>void){

    }


}

const tree = new Tree<string>(
    'A',
    [
        new Tree('AA',[new Tree('AAA')]),
        new Tree('AB')
    ]
)
