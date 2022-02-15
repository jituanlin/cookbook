const instance = {
    rootObj: {
        innerProps: 42,
    },
};

const defineReactiveForRootObj = () => {
    let internalRootObj = instance.rootObj;
    Object.defineProperty(instance, 'rootObj', {
        set(value) {
            console.log('rootObj is setting');
            internalRootObj = value;
        },
        get() {
            return internalRootObj;
        },
    });
};

const defineReactiveForInnerProps = () => {
    let internalInnerProps = instance.rootObj.innerProps;
    Object.defineProperty(instance.rootObj, 'innerProps', {
        set(value) {
            console.log('innerProps is setting');
            internalInnerProps = value;
        },
        get() {
            return internalInnerProps;
        },
    });
};
defineReactiveForRootObj();
defineReactiveForInnerProps();

instance.rootObj.innerProps = 42;
console.log(instance.rootObj, instance.rootObj.innerProps);
