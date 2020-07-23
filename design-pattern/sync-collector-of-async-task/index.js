import deepEqual from "deep-equal";
import findIndex from "find-index/ponyfill";

class StackWithMaxSize {
  constructor(maxSize, state = []) {
    this.maxSize = maxSize;
    this.state = state;
  }

  push(...values) {
    const state = [...values, ...this.state].slice(0, this.maxSize);
    return new StackWithMaxSize(this.maxSize, state);
  }

  find(predicate) {
    return this.state.find(predicate);
  }
}

class ResponseCache {
  constructor(params, response) {
    this.params = params;
    this.response = response;
  }
}

const NOT_HIT_CACHE = {};

export default class SyncCollectorOfAsyncTask {
  constructor({ action, cacheSize = 24 }) {
    this.action = action;
    this.cache = new StackWithMaxSize(cacheSize);
    this.bindCollectedParamsAndActionPromise();
  }

  bindCollectedParamsAndActionPromise() {
    this.collectedParams = [];
    this.actionPromise = new Promise((res, rej) => {
      this.resolveActionPromise = data => {
        res(data);
        this.bindCollectedParamsAndActionPromise();
      };
      this.rejectActionPromise = data => {
        rej(data);
        this.bindCollectedParamsAndActionPromise();
      };
    });
  }

  async getResultByReuseScheduledTask({ queryParams }) {
    const currentParamsIndexFromCollectedParams = findIndex(
      this.collectedParams,
      paramsFromCollected => deepEqual(paramsFromCollected, queryParams)
    );

    if (currentParamsIndexFromCollectedParams !== -1) {
      const response = await this.actionPromise;
      return response[currentParamsIndexFromCollectedParams];
    }

    return NOT_HIT_CACHE;
  }

  getResultFromCache({ queryParams }) {
    const hitCache = this.cache.find(({ params: paramsWhenStore }) =>
      deepEqual(paramsWhenStore, queryParams)
    );
    if (hitCache) {
      return hitCache.response;
    }
    return NOT_HIT_CACHE;
  }

  pushCache({ queryParams, result }) {
    this.cache = this.cache.push(new ResponseCache(queryParams, result));
  }

  async getResultFromCacheOrScheduledTask({ queryParams }) {
    const resultFromScheduledTask = await this.getResultByReuseScheduledTask({
      queryParams
    });
    if (resultFromScheduledTask !== NOT_HIT_CACHE) {
      return resultFromScheduledTask;
    }
    const resultFromCache = this.getResultFromCache({ queryParams });
    if (resultFromCache !== NOT_HIT_CACHE) {
      return resultFromCache;
    }
    return NOT_HIT_CACHE;
  }

  async scheduleTaskAndReturnResult({ queryParams }) {
    this.collectedParams.push(queryParams);
    const index = this.collectedParams.length - 1;
    const response = await this.actionPromise;
    return response[index];
  }

  async getResultFor({ queryParams, withCache = false }) {
    if (withCache) {
      const resultFromCache = await this.getResultFromCacheOrScheduledTask({
        queryParams
      });
      if (resultFromCache !== NOT_HIT_CACHE) {
        return resultFromCache;
      }
    }

    if (this.collectedParams.length === 0) {
      this.runActionNextEventLoop();
    }

    const resultFromNewScheduledTask = await this.scheduleTaskAndReturnResult({
      queryParams
    });

    if (withCache) {
      this.pushCache({ queryParams, result: resultFromNewScheduledTask });
    }
    return resultFromNewScheduledTask;
  }

  runActionNextEventLoop() {
    setTimeout(() => {
      try {
        const response = Promise.resolve(this.action(this.collectedParams));
        this.resolveActionPromise(response);
      } catch (error) {
        this.rejectActionPromise(error);
      }
    }, 0);
  }
}