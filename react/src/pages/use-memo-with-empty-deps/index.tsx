/**
 * useMemo with empty deps will only compute state at first render.
 * */
import React, { useEffect, useMemo, useState } from "react";

export const UseMemoWithEmptyDeps = () => {
  const memorized = useMemo(() => {
    console.log("useMemo be called");
    return 42;
  }, []);

  const [state, setState] = useState(-42);

  console.log("render component with", { state, memorized });

  useEffect(() => setState(-41), []);

  return <p>{memorized}</p>;
};
