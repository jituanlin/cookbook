import { CodeDiffPanel } from "../../components/CodeDiffPanel";
import React from "react";
import { adtWayCodeStr } from "./adt-way-code-str";
import { nativeWayCodeStr } from "./native-way-code-str";

export const WhyAdtExample = () => {
  return (
    <CodeDiffPanel
      leftCodeStr={nativeWayCodeStr}
      rightCodeStr={adtWayCodeStr}
    />
  );
};
