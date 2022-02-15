export class A {
    f(): this {
        return this;
    }
}

export class B extends A {
    private n = 42;

    f1() {
        /**
         * The this.f return value of `this` type.
         * It inferred as class which containing it.
         * In this case, it is class B, which own the `n` property.
         * */
        console.log(this.f().n);
    }
}
