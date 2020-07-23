/**
 * @description use for lazy import module
 * Sometimes, we need load module dynamic, use this factory function
 * will create a convenient interface for using this lazy module and init it
 * @example
 * `
 *  const {afterImport:afterImportVisibility,startImport:startImportVisibility }= LazyImporter(()=>import('visibilityjs'))
 *
 *  afterImportVisibility.then(
 *    Visibility=>Visibility.every(1000,()=>console.log('hello world))
 *  )
 *  // ...
 *  componentDidMount(){
 *    startImportVisibility()
 *  }
 *
 * `
 * */
const LazyImporter = executor => {
    let resolve;
    let reject;
    const afterImport = new Promise((resolve$, reject$) => {
      resolve = resolve$;
      reject = reject$;
    });
    return {
      startImport: async options => {
        try {
          const module = await executor(options);
          resolve(module);
        } catch (e) {
          reject(e);
        }
      },
      afterImport,
    };
  };
  
  export default LazyImporter;