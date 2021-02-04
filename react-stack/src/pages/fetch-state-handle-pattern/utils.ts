import {message} from 'antd';

export type OnLoading = () => void | (() => void);

export const getStateHandler = <T>(
  onLoading: OnLoading,
  onSuccess: (data: T) => void,
  onError: (error: unknown) => void
) => async (p: Promise<T>): Promise<T> => {
  const cleanupLoading = onLoading();
  try {
    const data = await p;
    onSuccess(data);
    return data;
  } catch (error) {
    onError(error);
    throw error;
  } finally {
    if (cleanupLoading) {
      cleanupLoading();
    }
  }
};

interface Data<T> {
  data: T;
  isError: false;
}

interface Error {
  data: undefined;
  isError: true;
}

export const error: Error = {
  isError: true,
  data: undefined,
};

export type Security<T> = Data<T> | Error;

export const secure = async <T>(p: Promise<T>): Promise<Security<T>> => {
  try {
    const data = await p;
    return {
      data,
      isError: false,
    };
  } catch (error) {
    return error;
  }
};

export const getOnLoading = (message$: string): OnLoading => {
  return () => {
    return message.loading(message$);
  };
};
