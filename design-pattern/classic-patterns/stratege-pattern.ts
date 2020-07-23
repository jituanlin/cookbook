/**
 * Strategy-pattern:
 * Core:
 * 1. Separate a set of operations that implement different
 * but same semantics into separate classes,
 * but share the same interface.
 * 2. Differ the operation selection to runtime and
 * passes the selection to the client end.
 *
 * 一句话表述:
 *  - OOP版本的高阶函数
 *  - 动态注入操作实现
 * 阐述:
 * const incStrategy = n=>n+1
 * const decStrategy = n=>n-1
 * array.map(incStrategy) 或 array.map(decStrategy)
 *
 * 实现:
 * 将操作(/算法)实现从常见的编译时写死替换为由参数传入构造器(或方法)
 * 从而实现类(或方法)的开放性
 *
 * 场景:
 * 一个类/方法依赖一个操作(/算法),且该操作(/算法)具有多种派生
 *
 * 组件:
 * Context为操作的使用者
 * 策略抽象类
 * 策略具体类
 *
 * 常见引用:
 * 需要根据数据的特征动态调用操作(/算法),
 * 这个时候会
 *  1. 在策略类中增加一个`match():boolean`方法
 *  2. 将可选的策略类写成数组作为配置文件
 * 运行时遍历可选策略类,选择匹配的操作进行调度
 *
 * Why:
 * 1. Open: Meaning if we add new operation, we could
 * implement new class, and then the client end could select it and use it,
 * rather than modify the `long switch case`
 *
 * 2. Subdivision complexity: Separate different implementation to
 * independent sub class
 *
 * When:
 * 1. A set of operations that implement different but same semantics
 * */
