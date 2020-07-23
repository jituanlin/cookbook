import 'reflect-metadata';

export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export class Module {
  constructor(
    readonly providers: Array<Type<any>> = [],
    readonly components: Array<Type<any>>,
    readonly imports: Array<Module> = [],
    readonly exports: Array<Type<any>> = []
  ) {}
}

export class Scanner {
  constructor(private readonly container: Container) {}

  scan(module: Module) {
    this.container.addModule(module);
    module.imports.forEach(exModule => this.scan(exModule));
  }
}

export class Injector {
  // 简化: 1.所有的依赖都是类 2.所有的依赖都是通过构造函数注入
  resolveInstance<T>(InstanceType: Type<T>, modules: Module[]): T {
    const dependentTypes: Type<any>[] =
      Reflect.getMetadata('design:paramtypes', InstanceType) || [];
    const dependentInstances = dependentTypes.map(Type =>
      this.resolveInstance(Type, modules)
    );
    const instance = new InstanceType(...dependentInstances);
    return instance;
  }
}

export class Container {
  modules: Module[] = [];

  addModule(module: Module) {
    this.modules.push(module);
  }
}

export class InstanceLoader {
  private injector: Injector;

  constructor(readonly container: Container) {
    this.injector = new Injector();
  }

  async loadInstance(Component: Type<any>): Promise<any> {
    return this.injector.resolveInstance(Component, this.container.modules);
  }
}

export class DI {
  private container: Container;
  private scanner: Scanner;
  private instanceLoader: InstanceLoader;

  constructor(module: Module) {
    this.container = new Container();
    this.scanner = new Scanner(this.container);
    this.instanceLoader = new InstanceLoader(this.container);
    this.scanner.scan(module);
  }

  async get<T>(Component: Type<T>): Promise<T> {
    return await this.instanceLoader.loadInstance(Component);
  }
}

class Logger {
  constructor() {}

  log(message: string) {
    console.log(message);
  }
}

const loggerModule = new Module([Logger], [], [], [Logger]);

// 一旦去掉这个装饰器,Reflect就无法获取到design:paramtypes类型
const Injectable = () => target => {
  return target;
};

@Injectable()
class CatService {
  constructor(readonly logger: Logger) {}

  async findCat() {
    return this.logger.log('cat is missing');
  }
}

const appModule = new Module([CatService], [CatService], [loggerModule], []);

const di = new DI(appModule);
di.get(CatService).then(catService => catService.findCat());
