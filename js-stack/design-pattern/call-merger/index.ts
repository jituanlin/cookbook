import {debounce} from 'lodash';

/**
 * CallMerger is used to merge multiple API calls in a certain time interval into a batch version of API call.
 * */
export default class CallsMerger<Param, Result> {
  private collectedParams: ReadonlyArray<Param>;
  private resultOfBatchApiCall: Promise<ReadonlyArray<Result>>;
  private debouncedBatchApi: () => void;

  constructor(
    debounceTime: number,
    maxWait: number,
    batchApi: (params: ReadonlyArray<Param>) => Promise<ReadonlyArray<Result>>
  ) {
    this.init(debounceTime, maxWait, batchApi);
  }

  async callApiSingly(param: Param): Promise<Result> {
    this.collectedParams = [...this.collectedParams, param];
    const positionInResults = this.collectedParams.length - 1;
    this.debouncedBatchApi();
    const results = await this.resultOfBatchApiCall;
    return results[positionInResults];
  }

  private init(
    debounceTime: number,
    maxWait: number,
    batchApi: (params: ReadonlyArray<Param>) => Promise<ReadonlyArray<Result>>
  ) {
    this.collectedParams = [];
    let resolveBatchApiCall: (params: ReadonlyArray<Result>) => void;
    let rejectBatchApiCall: (error: Error) => void;
    this.resultOfBatchApiCall = new Promise<ReadonlyArray<Result>>(
      (resolve, reject) => {
        resolveBatchApiCall = resolve;
        rejectBatchApiCall = reject;
      }
    );
    this.debouncedBatchApi = debounce(
      () => {
        batchApi(this.collectedParams)
          .then(resolveBatchApiCall, rejectBatchApiCall)
          .finally(() => this.init(debounceTime, maxWait, batchApi));
      },
      debounceTime,
      {
        maxWait,
      }
    );
  }
}
