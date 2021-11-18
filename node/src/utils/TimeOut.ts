export const TimeOut = async (timeout: number): Promise<void> =>
  new Promise(res => setTimeout(res, timeout));
