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

/* Battlefield title */

// position: absolute;
// width: 422px;
// height: 32px;

// font-family: Roboto;
// font-style: normal;
// font-weight: 900;
// font-size: 36px;
// line-height: 42px;
// text-align: center;
// font-variant: small-caps;

// color: #F8F4E3;

// border: 1px solid #29339B;
// text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
