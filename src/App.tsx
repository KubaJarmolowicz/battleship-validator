import React, { useMemo } from "react";
import { validField } from "components/passingTestCase";
import validateBattlefield from "components/logic";
import StyledTitle from "components/StyledTitle";
import MainWrapper from "components/MainWrapper";
import BattlefieldWrapper from "components/BattlefieldWrapper";
import UserConsoleWrapper from "components/UserConsoleWrapper";

function App() {
  const isBattlefieldValid = useMemo(() => validateBattlefield(validField), []);

  return (
    <MainWrapper>
      <BattlefieldWrapper>
        {isBattlefieldValid ? <span>works</span> : null}
      </BattlefieldWrapper>
      <UserConsoleWrapper>
        <StyledTitle />
      </UserConsoleWrapper>
    </MainWrapper>
  );
}

export default App;
