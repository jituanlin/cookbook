/**
 * Case: Widely used in ORM
 * Metaphor: Before `ordering`(build) dish, you `choose whether to add spicy or onion`(compose various setting step).
 * This way, you don't need know the detail of cook, but you control the final favour of dish.
 * Core: Provide another way to construct a object instead pass complexity options to constructor.
 * How: Builder is a class, separate options setting into various setting step(method) and finally step -- `build`.
 * The client could compose various setting step to set construct options flexibly, then call `build` to get object.
 * When: the processing to  construct object need too much and too complexity options setting.
 * */
