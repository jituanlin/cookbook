/**
 * Disadvantage:
 * - global state => one component change it, will affect other component which depend on it
 *  => (all component depend on this state has tightly coupled,hard to debug)
 * Characteristic:
 * - Lazy: only initial when be need
 * - Cache: When it be initial, subsequence call will return cached instance
 * In JS/Typescript:
 * This pattern is not necessary, because JS module mechanism:
 * > Modules are cached after the first time they are loaded.
 * So, in JS/TS, all we need is:
 * export const singleton = new Singleton()
 * */
