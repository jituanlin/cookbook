import {UseQueryResult} from 'react-query/types/react/types';
import {Result, Spin} from 'antd';
import React, {ReactNode} from 'react';

export type FoldPatternFull<TData, TError, R> = {
  error: (a: TError) => R;
  data: (a: TData) => R;
  else: (a: UseQueryResult<TData, TError>) => R;
};

export type FoldPatternPartial<TData> = (a: TData) => ReactNode;

export type FoldPattern<TData, TError, R> =
  | FoldPatternFull<TData, TError, R>
  | FoldPatternPartial<TData>;

const defaultPattern = {
  error: (e: unknown) => <Result subTitle={(e as any)?.message}> </Result>,
  else: () => <Spin />,
};

export const fold = <TData, TError>(q: UseQueryResult<TData, TError>) => <
  P extends FoldPattern<TData, TError, any>
>(
  pattern: P
): P extends FoldPatternFull<TData, TError, infer R> ? R : ReactNode => {
  if (q.error) {
    return ((pattern as any).error || defaultPattern.error)(q.error);
  }
  if (q.data) {
    return (pattern as any).data ?? (pattern as any)(q.data);
  }
  return ((pattern as any).else || defaultPattern.else)(q);
};
