/**
 * Following code is a simplified implementation of mobx 's `autoRun`.
 * Whenever Observable 's properties changing, the `observer` passed to autoRun will run.
 * */

class DependenciesController {
  private target2property2observers = new Map<
    unknown,
    Map<keyof any, Array<() => any>>
  >();
  private currentObserver: (() => any) | undefined;

  setCurrentObserver(observer: () => any) {
    this.currentObserver = observer;
  }

  removeCurrentObserver() {
    this.currentObserver = undefined;
  }

  hasCurrentObserverBeenSet(): boolean {
    return this.currentObserver !== undefined;
  }

  addCurrentObserverAsDependency(target: unknown, property: keyof any): void {
    if (this.currentObserver === undefined) {
      return;
    }
    this.initTarget2property2observers(target, property);
    const observers = this.getObserversOfDependency(target, property);
    if (observers.find(this.currentObserver)) {
      return;
    }
    observers.push(this.currentObserver);
  }

  getObserversOfDependency(
    target: unknown,
    property: keyof any
  ): Array<() => any> {
    return this.target2property2observers.get(target)?.get(property) ?? [];
  }

  private initTarget2property2observers(
    target: unknown,
    property: keyof any
  ): void {
    if (!this.target2property2observers.get(target)) {
      this.target2property2observers.set(target, new Map());
    }
    if (!this.target2property2observers.get(target)?.get(property)) {
      this.target2property2observers.get(target)?.set(property, []);
    }
  }
}

const dependenciesController = new DependenciesController();

const autoRun = <T>(observer: () => T): T => {
  dependenciesController.setCurrentObserver(observer);
  const result = observer();
  dependenciesController.removeCurrentObserver();
  return result;
};

// eslint-disable-next-line @typescript-eslint/ban-types
const Observable = <T extends object>(target: T): T => {
  return new Proxy(target, {
    get(obj, prop) {
      if (dependenciesController.hasCurrentObserverBeenSet()) {
        dependenciesController.addCurrentObserverAsDependency(target, prop);
      }
      return (obj as any)[prop];
    },
    set(obj, prop, value) {
      (obj as any)[prop] = value;
      dependenciesController
        .getObserversOfDependency(target, prop)
        .forEach((observer) => observer());
      return true;
    },
  });
};

it("should trigger the observer passed to autorun when modifying the observable", () => {
  const obj = Observable({ a: 1 });
  const observer = jest.fn();
  autoRun(observer);
  obj.a = 2;
  expect(observer).toBeCalled();
});
