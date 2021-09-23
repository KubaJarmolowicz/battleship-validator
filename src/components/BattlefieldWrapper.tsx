import { Props } from "customTypes/types";
import React from "react";

const BattlefieldWrapper = ({ children }: Props): JSX.Element => {
  return (
    <div className="border-r-2 border-white border-opacity-30">{children}</div>
  );
};

export default BattlefieldWrapper;
