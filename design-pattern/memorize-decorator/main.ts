import * as R from 'ramda';

/**
 * @example
 class Test {
  readonly n = 42;
  @memorizeAsync()
  async getData(a, b) {
    console.log('call dao', { a, b });
    return { a, b };
  }
}
 const t = new Test();
 t.getData(1, 2).then(r => console.log(r));
 t.getData(1, 2).then(r => console.log(r))
 t.getData(1, 3).then(r => console.log(r));
 //=> call dao { a: 1, b: 2 }
 //=> call dao { a: 1, b: 3 }
 //=> { a: 1, b: 2 }
 //=> { a: 1, b: 2 }
 //=> { a: 1, b: 3 }
 * */
const memorize = () => <PS extends ReadonlyArray<any>, Result>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<(...params: PS) => Result>,
) => {
  const originalMethod = descriptor.value;
  return {
    value: function(...params: PS): Result {
      if (R.isNil(this.$$paramsToResult)) {
        this.$$paramsToResult = new Map<string, Result>();
      }
      const paramStr = JSON.stringify(params);
      if (R.isNil(this.$$paramsToResult.get(paramStr))) {
        this.$$paramsToResult.set(
          paramStr,
          originalMethod.call(this, ...params),
        );
      }
      return this.$$paramsToResult.get(paramStr);
    },
  };
};

export default memorize;

class Test {
  readonly n = 42;
  @memorize()
  async getData(a, b) {
    console.log('call dao', { a, b });
    return { a, b };
  }
}

const t = new Test();
t.getData(1, 2).then(r => console.log(r));
t.getData(1, 2).then(r => console.log(r));
t.getData(1, 3).then(r => console.log(r));
//=> call dao { a: 1, b: 2 }
//=> call dao { a: 1, b: 3 }
//=> { a: 1, b: 2 }
//=> { a: 1, b: 2 }
//=> { a: 1, b: 3 }

setTimeout(
    ()=>{
      const t1 = new Test();
      t1.getData(1, 2).then(r => console.log(r));
      t1.getData(1, 2).then(r => console.log(r));
      t1.getData(1, 3).then(r => console.log(r));
    },
    1000
)
//=> call dao { a: 1, b: 2 }
//=> call dao { a: 1, b: 3 }
//=> { a: 1, b: 2 }
//=> { a: 1, b: 2 }
//=> { a: 1, b: 3 }