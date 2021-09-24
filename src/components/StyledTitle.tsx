import React from "react";
import { Props } from "types";

const StyledTitle = ({ text }: Props) => {
  return (
    <h2 className="font-black font-sans text-4xl text-white text-center uppercase text-stroke-sm text-stroke-blue text-shadow font-sm-caps">
      {text}
    </h2>
  );
};

export default StyledTitle;
