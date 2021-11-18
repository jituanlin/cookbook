/**
 * The following code is an example showing stale closure in React hook.
 * See: https://jituanlin.github.io/react/2020-08-12-React-hook-%E5%B8%B8%E8%A7%81%E9%99%B7%E9%98%B1/#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E5%B0%86deps%E4%BC%A0%E5%85%A5usestate%E5%92%8Cuseeffect%E4%B8%AD%E4%BC%9A%E5%AF%BC%E8%87%B4%E5%85%B6%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0%E4%BD%BF%E7%94%A8%E9%99%88%E6%97%A7%E7%9A%84%E7%8A%B6%E6%80%81
 * */
import React, { useEffect, useState } from "react";

export const StaleClosureExample = () => {
  const [count, setCount] = useState(0);
  const incCount = () => setCount(count + 1);

  const intervalLogCount = () => {
    const intervalId = setInterval(() => console.log(count), 1000);
    return () => clearInterval(intervalId);
  };
  useEffect(intervalLogCount, []);

  return (
    <div>
      <p>count:{count}</p>
      <button onClick={incCount}>inc count</button>
    </div>
  );
};
