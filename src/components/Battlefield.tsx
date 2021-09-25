import React from "react";

const columnNames = "ABCDEFGHIJ".split("");

const getYAndXOnBattlefieldMatrix = (index: number): [number, number] => {
  return [(index - (index % 11)) / 11 - 1, (index % 11) - 1];
};

const Battlefield = () => {
  return (
    <div className="m-auto w-full max-w-battlefield grid grid-cols-battlefield grid-rows-battlefield h-full max-h-battlefield border-white border-4 border-opacity-30 gap-1 mt-12">
      {new Array(121).fill(null).map((cell, index) => {
        if (index === 0) return <div></div>;

        if (index <= 10) {
          return <div>{columnNames[index - 1]}</div>;
        }
        return index % 11 ? (
          <button className="border bg-blue text-white">
            {getYAndXOnBattlefieldMatrix(index).toString()}
          </button>
        ) : (
          <div>{index / 11}</div>
        );
      })}
    </div>
  );
};

export default Battlefield;
