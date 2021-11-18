import React, {useEffect} from 'react';
import {useState} from 'react';
import {getOnLoading, getStateHandler, secure} from './utils';
import {message} from 'antd';
import {pipe} from 'fp-ts/function';
import {TimeOut} from '../../utils/TimeOut';

interface User {
  name: string;
  id: number;
}

const fetchUser = async (id: number): Promise<User> => {
  await TimeOut(2000);
  if (id > 0) {
    return {
      name: `name[id=${id}]`,
      id,
    };
  }
  throw new Error(`cannot find user of id ${id}`);
};

const fetchMeStateHandler = getStateHandler<User>(
  getOnLoading('fetching self'),
  () => message.success('fetch self success'),
  () => message.error('fetch self fail')
);

const fetchHeStateHandler = getStateHandler<User>(
  getOnLoading('fetching he'),
  () => message.success('fetch he success'),
  () => message.error('fetch he fail')
);

export const FetchStateHandlePattern = () => {
  const [me, setMe] = useState<User>();
  const [he, setHe] = useState<User>();

  useEffect(() => {
    const run = async () => {
      const {data, isError} = await pipe(
        fetchUser(1),
        fetchMeStateHandler,
        secure
      );
      if (isError) {
        return;
      }
      setMe(data);
    };
    run();
  }, []);

  useEffect(() => {
    const run = async () => {
      const {data, isError} = await pipe(
        fetchUser(-1),
        fetchHeStateHandler,
        secure
      );
      if (isError) {
        return;
      }
      setHe(data);
    };
    run();
  }, []);

  return (
    <>
      <div>{JSON.stringify(me)}</div>
      <div>{JSON.stringify(he)}</div>
    </>
  );
};
