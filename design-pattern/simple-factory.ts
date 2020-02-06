/**
 * Metaphor1: Call takeaway -- you don't need to know
 * how to cook(how class init),
 * just take a phone(involve simple factory), 
 * the food(object) is ready for you.
 * Metaphor2: 能召唤螺旋丸的卷轴,你不需要会捏螺旋丸,
 * 只要有这个卷轴,你就能打开卷轴甩个螺旋丸.
 *
 * 一句话表述: 将复杂的类的实例化过程封装在一个function或者static method中
 *
 * 命名缘由: 完整的命名应该为simple factory function(static method)
 * 该名称来源于这个设计模式的关键组件 -- 一个*简单的*创建对象(factory)的函数/静态类方法
 *
 * Core: create a method/function which
 * 1. accept relative simple parameter
 * 2. return a object of certain class
 * to hide the complex initiate logic of class
 * 
 * When: the initiate logic of class is complex and
 * repeat occur
 * */
