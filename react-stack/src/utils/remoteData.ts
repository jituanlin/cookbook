import {UseQueryResult} from 'react-query/types/react/types';
import {
  failure,
  initial,
  pending,
  RemoteData,
  success,
} from '@devexperts/remote-data-ts';
import {useMemo} from 'react';

export const fromQuery = <TData, TError>(
  query: UseQueryResult<TData, TError>
): RemoteData<TError, TData> => {
  if (query.isSuccess) {
    return success(query.data);
  }
  if (query.isError) {
    return failure(query.error);
  }
  if (query.isFetching) {
    return pending;
  }
  return initial;
};

export const useRemoteData = <TData, TError>(
  query: UseQueryResult<TData, TError>
): RemoteData<TError, TData> => {
  return useMemo(() => fromQuery(query), [query]);
};
