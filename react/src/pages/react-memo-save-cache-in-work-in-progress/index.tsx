import React, {useEffect, useState} from 'react';

const MemorizedComponent = React.memo((props: {n: number}) => {
  console.log('MemorizedComponent render with n', props.n);
  return <> {props.n}</>;
});

export const ReactMemoSaveCacheInWorkInProgress = () => {
  const [n] = useState(1);
  const [otherState, setOtherState] = useState(2);

  useEffect(() => {
    setTimeout(() => setOtherState(100), 1000);
  }, []);

  console.log(
    'ReactMemoSaveCacheInWorkInProgress render with otherState',
    otherState
  );

  /**
   * Not matter how you use memorized component,
   * as long as their return ReactNode is rendered(exist in fiber),
   * then the return is cached
   * */
  const inFiber = (
    <>
      <MemorizedComponent n={n} />
      <MemorizedComponent n={n + 1} />
      <MemorizedComponent n={n + 2} />
    </>
  );

  /**
   * For that not rendered ReactNode, the component 's render(not matter has it been React.memo)
   * will NOT be call.
   * TODO: It may be cause by fiber architecture: (I guess,) when involve component in jsx,
   * eg. `<MemorizedComponent n={n} />`, it DOSE NOT compile to `MemorizedComponent({n})`,
   * but something like `createFiber(MemorizedComponent,{n})`, and then fiber will handle it,
   * call it's MemorizedComponent 's render only necessary
   * */
  const notInFiber = (
    <>
      <MemorizedComponent n={-1} />
      <MemorizedComponent n={-2} />
      <MemorizedComponent n={-3} />
    </>
  );
  console.log(notInFiber.type);

  return inFiber;
};
