import * as _ from 'lodash';
import * as R from 'ramda';

export default class CallsMerger<Param, Result> {
  private collectedParams: ReadonlyArray<Param>;
  private resultOfBatchApiCall: Promise<ReadonlyArray<Result>>;
  private debouncedBatchApi: () => void;

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
    this.debouncedBatchApi = _.debounce(
      () => {
        batchApi(this.collectedParams)
          .then((results: ReadonlyArray<Result>) => {
            resolveBatchApiCall(results);
            this.init(debounceTime, maxWait, batchApi);
          })
          .catch(rejectBatchApiCall);
      },
      debounceTime,
      {
        maxWait,
      }
    );
  }

  constructor(
    debounceTime: number,
    maxWait: number,
    batchApi: (params: ReadonlyArray<Param>) => Promise<ReadonlyArray<Result>>
  ) {
    this.init(debounceTime, maxWait, batchApi);
  }

  async callApiSingly(param: Param): Promise<Result> {
    this.collectedParams = R.append(param, this.collectedParams);
    const positionInResults = R.length(this.collectedParams) - 1;
    this.debouncedBatchApi();
    const results = await this.resultOfBatchApiCall;
    return results[positionInResults];
  }
}
