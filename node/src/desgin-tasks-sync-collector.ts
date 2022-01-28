/**
 * SyncCollectorOfTasks will collect all calls in current synchronous execution context.
 * @example see unit test.
 * */

import {findIndex, isEqual} from 'lodash';

// use object reference as unique identity
const NOT_HIT_CACHE = {marking: 'ISJKJI<ZLIJI<:P'} as const;
type NotHitCache = typeof NOT_HIT_CACHE;

export default class TaskSyncCollector<T, R> {
  private cache: StackWithMaxSize<ResponseCache<T, R>>;
  private collectedParams: T[];
  private actionPromise: Promise<R[]>;
  private resolveActionPromise: (response: Promise<R[]>) => void;
  private rejectActionPromise: (error: unknown) => void;

  constructor(
    private readonly action: (params: T[]) => Promise<R[]>,
    private readonly cacheSize: number = 24
  ) {
    this.action = action;
    this.cache = new StackWithMaxSize(cacheSize);
    this.bindCollectedParamsAndActionPromise();
  }

  async getResultFor(queryParams: T, withCache = false): Promise<R> {
    if (withCache) {
      const resultFromCache = await this.getResultFromCacheOrScheduledTask(
        queryParams
      );
      if (resultFromCache !== NOT_HIT_CACHE) {
        return resultFromCache as R;
      }
    }

    if (this.collectedParams.length === 0) {
      this.runActionNextEventLoop();
    }

    const resultFromNewScheduledTask = await this.scheduleTaskAndReturnResult(
      queryParams
    );

    if (withCache) {
      this.pushCache({queryParams, result: resultFromNewScheduledTask});
    }
    return resultFromNewScheduledTask;
  }

  private bindCollectedParamsAndActionPromise() {
    this.collectedParams = [];
    this.actionPromise = new Promise((res, rej) => {
      this.resolveActionPromise = data => {
        res(data);
        this.bindCollectedParamsAndActionPromise();
      };
      this.rejectActionPromise = error => {
        rej(error);
        this.bindCollectedParamsAndActionPromise();
      };
    });
  }

  private async getResultByReuseScheduledTask(
    queryParams: T
  ): Promise<R | NotHitCache> {
    const currentParamsIndexFromCollectedParams = findIndex(
      this.collectedParams,
      paramsFromCollected => isEqual(paramsFromCollected, queryParams)
    );

    if (currentParamsIndexFromCollectedParams !== -1) {
      const response = await this.actionPromise;
      return response[currentParamsIndexFromCollectedParams];
    }

    return NOT_HIT_CACHE;
  }

  private getResultFromCache(queryParams: T): R | NotHitCache {
    const maybeCache = this.cache.find(({params: storedParams}) =>
      isEqual(storedParams, queryParams)
    );
    if (maybeCache) {
      return maybeCache.response;
    }
    return NOT_HIT_CACHE;
  }

  private pushCache(cache: {queryParams: T; result: R}) {
    this.cache = this.cache.push(
      new ResponseCache(cache.queryParams, cache.result)
    );
  }

  private async getResultFromCacheOrScheduledTask(
    queryParams: T
  ): Promise<R | NotHitCache> {
    const resultFromScheduledTask = await this.getResultByReuseScheduledTask(
      queryParams
    );
    if (resultFromScheduledTask !== NOT_HIT_CACHE) {
      return resultFromScheduledTask;
    }
    const resultFromCache = this.getResultFromCache(queryParams);
    if (resultFromCache !== NOT_HIT_CACHE) {
      return resultFromCache;
    }
    return NOT_HIT_CACHE;
  }

  private async scheduleTaskAndReturnResult(queryParams: T): Promise<R> {
    this.collectedParams.push(queryParams);
    const index = this.collectedParams.length - 1;
    const response = await this.actionPromise;
    return response[index];
  }

  private runActionNextEventLoop(): void {
    setTimeout(() => {
      try {
        const response = this.action(this.collectedParams);
        this.resolveActionPromise(response);
      } catch (error) {
        this.rejectActionPromise(error);
      }
    }, 0);
  }
}

class StackWithMaxSize<T> {
  constructor(private readonly maxSize: number, private state: T[] = []) {}

  push(...values: T[]): StackWithMaxSize<T> {
    const state = [...values, ...this.state].slice(0, this.maxSize);
    return new StackWithMaxSize(this.maxSize, state);
  }

  find(predicate: (x: T) => boolean): T | undefined {
    return this.state.find(predicate);
  }
}

class ResponseCache<P, R> {
  constructor(readonly params: P, readonly response: R) {}
}
