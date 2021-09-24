import { Props } from "types";
import React from "react";

const UserConsoleWrapper = ({ children }: Props): JSX.Element => {
  return (
    <div className="border-l-2 border-white bg-blue-light border-opacity-30 pt-12">
      {children}
    </div>
  );
};

export default UserConsoleWrapper;
