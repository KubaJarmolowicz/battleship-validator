import React from "react";
import { Props } from "customTypes/types";

const MainWrapper = ({ children }: Props): JSX.Element => {
  return (
    <main className="bg-gray-400 grid grid-cols-2/1 w-screen h-screen">
      {children}
    </main>
  );
};

export default MainWrapper;