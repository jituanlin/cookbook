export interface PositiveBrand {
    readonly Positive: unique symbol;
}

/**
 * When declare unique symbol without assign value to it,
 * there will be not way to make value of that symbol
 * */
// const p: PositiveBrand = {
//   Positive: Symbol(),
// };
