/**
 * The following code is a simple implementation of mobx 's autoRun.
 * Whenever Observable property changes, the fn passed to autoRun will run.
 * */

class DepsCollector {
  private deps = new Map<unknown, Map<keyof any, Array<() => any>>>();
  private currentFn: () => any;

  startRunFn(fn: () => any) {
    this.currentFn = fn;
  }

  endRunFn(fn: () => any) {
    this.currentFn = undefined;
  }

  isRunningFn(): boolean {
    return this.currentFn !== undefined;
  }

  addDeps(target: unknown, property: keyof any): void {
    if (!this.deps.get(target)) {
      this.deps.set(target, new Map());
    }
    if (!this.deps.get(target).get(property)) {
      this.deps.get(target).set(property, []);
    }
    if (this.deps.get(target).get(property).find(this.currentFn)) {
      return;
    }
    this.deps.get(target).get(property).push(this.currentFn);
  }

  getDepFns(target: unknown, property: keyof any): Array<() => any> {
    return this.deps.get(target).get(property) || [];
  }
}

const depsCollector = new DepsCollector();

export const autoRun = <T>(fn: () => T): T => {
  depsCollector.startRunFn(fn);
  const result = fn();
  depsCollector.endRunFn(fn);
  return result;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const Observable = <T extends object>(target: T): T => {
  return new Proxy(target, {
    get(obj, prop) {
      if (depsCollector.isRunningFn()) {
        depsCollector.addDeps(target, prop);
      }
      return obj[prop];
    },
    set(obj, prop, value) {
      obj[prop] = value;
      depsCollector.getDepFns(target, prop).forEach(f => f());
      return true;
    },
  });
};
