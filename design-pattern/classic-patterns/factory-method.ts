/**
 * Metaphor1: Get tableware --
 * People(Abstract class) have `a skill to get tableware`(method
 * for get a object of certain interface/abstract class...),
 * but `different race of people`(concrete class)
 * will get `different kind of tableware`(different concrete type which
 * share some interface/parent class...).
 *
 * Metaphor2: 五彩螺旋丸,召唤N个分身(继承),这N个分身都可以
 * 产生不同元素能量(method for get object),将元素能量注入
 * 螺旋丸中,最后产生多种元素攻击的螺旋丸.
 *
 * 一句话表述: 一个抽象类将创建其所依赖的抽象类的实例的工作
 * 派发给类的继承者来实现
 *
 * 命名缘由: 全名应为 -- dependent object factory method(依赖对象的工厂方法)
 * 来源于该模式的核心组件 -- 创建依赖对象的工厂方法
 *
 * 场景: 一个抽象类依赖于另外一个抽象类
 *
 * 对比:
 *  simple factory:
 *    相同: 名字中都有一个`factory`单词,此外意义/使用场景相去甚远
 *    不同: simple factory着重于简化单独一个类的创建过程, 而
 *         factory method是着重于使得抽象类与抽象类之间的依赖关系更加灵活
 *
 * Core: Delegate the creation of dependent object to sub class.
 * 
 * When: Type of dependent object depend on concrete sub class.  
 * */
