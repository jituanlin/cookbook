import {Result, Spin} from 'antd';
import React, {ReactElement} from 'react';
import * as RD from '@devexperts/remote-data-ts';

export const foldPartially = <TData,>(
  onSuccess: (data: TData) => ReactElement
) => <TError,>(rd: RD.RemoteData<TError, TData>) =>
  RD.fold(
    () => <Spin />,
    () => <Spin />,
    (error: TError) => <Result subTitle={(error as any)?.message}> </Result>,
    onSuccess
  )(rd);
