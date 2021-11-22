/**
 * The following code is a simplify version of nestjs DI(dependent inject) implementation.
 * */
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

  scan(module: Module): void {
    this.container.addModule(module);
    module.imports.forEach(exModule => this.scan(exModule));
  }
}

export class Injector {
  /**
   * Simplification:
   * 1. All dependencies are classes
   * 2. All dependencies are injected through the constructor
   * */
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

  addModule(module: Module): void {
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

// Only decorated classes can be `getMetadata`
export const Injectable = () => (target: any) => {
  return target;
};
