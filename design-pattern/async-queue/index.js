const TimeOut = async timeout => new Promise(
    res => setTimeout(
      res,
      timeout
    )
  );
  
  const mockRequest = async (a, timeout, isSuccess = true) => {
    await TimeOut(timeout);
    if (isSuccess) return a;
    throw  a;
  };
  
  class AsyncQueue {
    constructor () {
      this.promise = Promise.resolve();
    }
  
    async push (promise) {
      this.promise = this.promise
        .then(() => promise)
        .then(
          a => ({ result: a, isSuccess: true }),
          e => ({ result: e, isSuccess: false })
        );
      const { result, isSuccess } = await this.promise;
      if (isSuccess) return result;
      throw result;
    }
  }
  
  const asyncQueue = new AsyncQueue();
  
  const log = (title = '') => a => console.log(title, a);
  
  asyncQueue.push(mockRequest(1, 2, false))
    .then(log(), log('error'));
  
  asyncQueue.push(mockRequest(2, 1))
    .then(log());