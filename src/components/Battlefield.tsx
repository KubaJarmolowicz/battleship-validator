import React from "react";

const columnNames = "ABCDEFGHIJ".split("");

const Battlefield = () => {
  return (
    <div className="m-auto w-full max-w-battlefield grid grid-cols-battlefield grid-rows-battlefield h-full max-h-battlefield border border-blue gap-1 mt-12">
      {new Array(121).fill(null).map((cell, index) => {
        if (index === 0) return <div></div>;

        if (index <= 10) {
          return <div>{columnNames[index - 1]}</div>;
        }
        return index % 11 ? (
          <button className="border bg-blue text-white">{`[${
            (index - (index % 11)) / 11 - 1
          }, ${(index % 11) - 1}]`}</button>
        ) : (
          <div>{index / 11}</div>
        );
      })}
    </div>
  );
};

export default Battlefield;
