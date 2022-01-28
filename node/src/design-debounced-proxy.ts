import {debounce} from 'lodash';

/**
 * `DebouncedProxy` combines multiple function invocations within a certain time interval
 * into a batched version of the function invocation.
 * */
export default class DebouncedProxy<Param, Result> {
  private collectedParams: ReadonlyArray<Param>;
  private batchedFnResult: Promise<ReadonlyArray<Result>>;
  private debouncedBatchAPI: () => void;

  constructor(
      debounceTime: number,
      maxWait: number,
      batchApi: (params: ReadonlyArray<Param>) => Promise<ReadonlyArray<Result>>
  ) {
    this.init(debounceTime, maxWait, batchApi);
  }

  async invoke(param: Param): Promise<Result> {
    this.collectedParams = [...this.collectedParams, param];
    const indexInResults = this.collectedParams.length - 1;
    this.debouncedBatchAPI();
    const results = await this.batchedFnResult;
    return results[indexInResults];
  }

  private init(
      debounceTime: number,
      maxWait: number,
      batchedFn: (params: ReadonlyArray<Param>) => Promise<ReadonlyArray<Result>>
  ) {
    this.collectedParams = [];
    let resolveBatchedFn: (params: ReadonlyArray<Result>) => void;
    let rejectBatchedFn: (error: Error) => void;
    this.batchedFnResult = new Promise<ReadonlyArray<Result>>(
        (resolve, reject) => {
          resolveBatchedFn = resolve;
          rejectBatchedFn = reject;
        }
    );
    this.debouncedBatchAPI = debounce(
        () => {
          batchedFn(this.collectedParams)
              .then(resolveBatchedFn, rejectBatchedFn)
              .finally(() => this.init(debounceTime, maxWait, batchedFn));
        },
        debounceTime,
        {
          maxWait,
        }
    );
  }
}
