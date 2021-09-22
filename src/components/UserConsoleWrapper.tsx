import { Props } from "customTypes/types";
import React from "react";

const UserConsoleWrapper = ({ children }: Props): JSX.Element => {
  return <div className="border-l-2 border-gray-800">{children}</div>;
};

export default UserConsoleWrapper;
