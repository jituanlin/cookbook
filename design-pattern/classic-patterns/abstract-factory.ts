/**
 * Metaphor: Put `multiple ingredients`(abstract class factories)
 * that can `be used for a single dish`(relation) in the same bag(composed abstract class)
 * Core: Packaging a set of the same theme / related abstract class factories into an abstract class.
 * 一句话表述: 将一组抽象类的创建方法打包在一个抽象类里.
 * When: *Abstract* factories need to use together, and there are a pairing relationship.
 * Why: Avoid using mismatched factories.
 * 对比:
 *  与factory-method:
 *      相同: 名字里都有一个`factory`单词,都是处理多个抽象类关系时的设计模式
 *      不同: 使用场景的不同,abstract-factory处理的是多个抽象类存在相关关系的场景
 *           factory-method处理的是两个抽象类存在依赖关系的场景
 *  于simple-factory:
 *      相同: 名字里都有一个`factory`单词
 *      不同: 除了名字外其他地方都不同
 * */
