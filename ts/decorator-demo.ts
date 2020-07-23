import 'reflect-metadata';

// class decorator accept constructor, and return value to be replace with original class definition

// typescript type infer is problematic, so use any
const ClassDecorator = (): any => Base => {
    return class Extended extends Base {
        n1 = 42;
    };
};

@ClassDecorator()
class ClassA {
    n = 0;
}

const obj = new ClassA();
// @ts-ignore
console.log(obj.n1);

// method decorator could access property descriptor, so it can modify the method behavior

const MethodDecorator = (): any => (prototypeOrConstructor, p, d) => {
    console.log(prototypeOrConstructor, typeof prototypeOrConstructor);
    return {
        ...d,
        value: () => 42,
    };
};

class ClassB {
    @MethodDecorator()
    f() {
        return 0;
    }
    // in static method, the target argument will be constructor
    @MethodDecorator()
    static f2() {}
}

const objB = new ClassB();
console.log(objB.f());

// access decorator is special kind of method decorator

const AccessorDecorator = (): any => (prototypeOrConstructor, p, d) => {
    return {
        get: () => 42,
        set: () => undefined,
    };
};

class ClassC {
    _n = 0;
    // decorate in get, but influence set
    @AccessorDecorator()
    get n() {
        return this._n;
    }
    set n(v) {
        this._n = v;
    }
}

const objC = new ClassC();
console.log(objC.n);
objC.n = 0;
console.log(objC.n);

// property decorator is only for attach metadata
const PropertyDecorator = (): any => (prototypeOrConstructor, p) => {
    Reflect.defineMetadata('n', 42, prototypeOrConstructor);
};

class ClassD {
    @PropertyDecorator()
    n;
}

const showMetadata = (obj: ClassD) => {
    console.log(Reflect.getMetadata('n', obj.constructor.prototype));
};

showMetadata(new ClassD());

// parameter decorator is only for attach metadata with parameter
const ParameterDecorator = (): any => (prototypeOrConstructor, p, idx) => {
    console.log({ p, idx });
    Reflect.defineMetadata(`n`, 42, prototypeOrConstructor);
};

class ClassE {
    f(@ParameterDecorator() g) {}
}

const objE = new ClassE();
console.log(Reflect.getMetadata('n', objE.constructor.prototype));
