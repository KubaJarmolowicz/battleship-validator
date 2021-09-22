import React, { useMemo } from "react";
import { validField } from "components/passingTestCase";
import validateBattlefield from "components/logic";
import StyledTitle from "components/StyledTitle";

function App() {
  const isBattlefieldValid = useMemo(() => validateBattlefield(validField), []);

  return (
    <>
      <StyledTitle />
      <div>{isBattlefieldValid && <span>works</span>}</div>
    </>
  );
}

export default App;
