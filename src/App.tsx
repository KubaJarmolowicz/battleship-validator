import React from "react";
import { validField } from "./components/passingTestCase";
import validateBattlefield from "./components/logic";
import StyledTitle from "./components/StyledTitle";

function App() {
  return (
    <>
      <StyledTitle />
      <div>{validateBattlefield(validField) && <span>works</span>}</div>
    </>
  );
}

export default App;
