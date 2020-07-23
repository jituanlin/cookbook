import React, { useState } from 'react';
import { constant, some, every } from 'lodash';
import daggy from 'daggy';
import ErrorDisplay from '../components/base-m/ErrorDisplay';
import GlobalLoading from '../components/base-m/GlobalLoading';

export const Response = daggy.taggedSum('Result', {
  Success: ['data'],
  Failure: ['error'],
  Pending: [],
  Ready: [],
});

const alwaysNull = constant(null);

Response.prototype.caseOf = function caseOf(fs) {
  return this.cata({
    Success: alwaysNull,
    Failure: alwaysNull,
    Pending: alwaysNull,
    Ready: alwaysNull,
    ...fs,
  });
};

Response.prototype.getDataOr = function getDataOr(defaultValue) {
  return this.cata({
    Success: data => data,
    Failure: () => defaultValue,
    Pending: () => defaultValue,
    Ready: () => defaultValue,
  });
};

Response.prototype.getState = function getState() {
  return this.cata({
    Success: () => 'Success',
    Failure: () => 'Failure',
    Pending: () => 'Pending',
    Ready: () => 'Ready',
  });
};

Response.prototype.renderSuccess = function renderSuccess(fs) {
  return this.caseOf({
    Failure: error => <ErrorDisplay error={error} />,
    Pending: () => <GlobalLoading />,
    Ready: () => <GlobalLoading />,
    ...fs,
  });
};

Response.prototype.map = function map(fn) {
  return this.cata({
    Success: data => Response.Success(fn(data)),
    Failure: () => this,
    Pending: () => this,
    Ready: () => this,
  });
};

Response.prototype.flatMap = function flatMap(fn) {
  return this.cata({
    Success: data => fn(data),
    Failure: () => this,
    Pending: () => this,
    Ready: () => this,
  });
};

/**
 * @see https://github.com/fantasyland/fantasy-land#traversable
 * This function is Promise.all for Response
 * */
Response.sequence = (...responseList) => {
  if (some(responseList, Response.Pending.is)) {
    return Response.Pending;
  }

  if (every(responseList, Response.Ready.is)) {
    return Response.Ready;
  }

  const firstError = responseList.find(Response.Failure.is);
  if (firstError) {
    return firstError;
  }

  return Response.Success(responseList.map(response => response.data));
};

const useApiFactory = ({ apiCaller }) => ({
  defaultParams = {},
  transform: transformFactory = () => anything => anything,
} = {}) => {
  const [response, setResponse] = useState(Response.Ready);

  const call = async ({
    params = {},
    withTransform = true,
    transformOptions = {},
  } = {}) => {
    setResponse(Response.Pending);
    try {
      setResponse(
        Response.Success(
          withTransform
            ? transformFactory(transformOptions)(
                await apiCaller({ ...defaultParams, ...params }),
              )
            : await apiCaller({ ...defaultParams, ...params }),
        ),
      );
    } catch (error) {
      setResponse(Response.Failure(error));
    }
  };

  Object.assign(response, {
    toReady: () => setResponse(Response.Ready),
    toPending: () => setResponse(Response.Pending),
    toSuccess: data => setResponse(Response.Success(data)),
    toFailure: error => setResponse(Response.Failure(error)),
  });

  return [
    response,
    arg => {
      call(arg);
    },
    {
      toReady: () => setResponse(Response.Ready),
      toPending: () => setResponse(Response.Pending),
      toSuccess: data => setResponse(Response.Success(data)),
      toFailure: error => setResponse(Response.Failure(error)),
    },
  ];
};

export default useApiFactory;