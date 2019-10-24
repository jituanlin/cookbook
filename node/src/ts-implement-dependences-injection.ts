/**
 * Following code is a simplified version of nestjs DI(dependent inject) implementation.
 * */
import "reflect-metadata";

interface Type<T> extends Function {
  new (...args: any[]): T;
}

class Module {
  constructor(
    readonly providers: Array<Type<any>> = [],
    readonly components: Array<Type<any>>,
    readonly imports: Array<Module> = [],
    readonly exports: Array<Type<any>> = []
  ) {}
}

class Scanner {
  constructor(private readonly container: Container) {}

  scan(module: Module): void {
    this.container.addModule(module);
    module.imports.forEach((exModule) => this.scan(exModule));
  }
}

class Injector {
  /**
   * Reduce the cases to:
   * - All dependencies are classes.
   * - All dependencies are injected through the constructor.
   * */
  resolveInstance<T>(InstanceType: Type<T>, modules: Module[]): T {
    const dependentTypes: Type<any>[] =
      Reflect.getMetadata("design:paramtypes", InstanceType) || [];
    const dependentInstances = dependentTypes.map((Type) =>
      this.resolveInstance(Type, modules)
    );
    return new InstanceType(...dependentInstances);
  }
}

class Container {
  modules: Module[] = [];

  addModule(module: Module): void {
    this.modules.push(module);
  }
}

class InstanceLoader {
  private injector: Injector;

  constructor(readonly container: Container) {
    this.injector = new Injector();
  }

  async loadInstance(Component: Type<any>): Promise<any> {
    return this.injector.resolveInstance(Component, this.container.modules);
  }
}

class DI {
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

// `getMetadata` only works with decorated classes
const Injectable = () => (target: any) => {
  return target;
};

it("_", async () => {
  class Logger {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}

    log(message: string) {
      console.log(message);
    }
  }

  const loggerModule = new Module([Logger], [], [], [Logger]);

  @Injectable()
  class CatService {
    constructor(readonly logger: Logger) {}

    async findCat() {
      return this.logger.log("cat is missing");
    }
  }

  const appModule = new Module([CatService], [CatService], [loggerModule], []);

  const di = new DI(appModule);
  const catService = await di.get(CatService);
  expect(catService.logger).toBeInstanceOf(Logger);
});
