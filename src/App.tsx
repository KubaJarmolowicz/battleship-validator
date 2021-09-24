import React, { useMemo } from "react";
import { validField } from "components/passingTestCase";
import validateBattlefield from "components/logic";
import StyledTitle from "components/StyledTitle";
import MainWrapper from "components/MainWrapper";
import BattlefieldWrapper from "components/BattlefieldWrapper";
import UserConsoleWrapper from "components/UserConsoleWrapper";
import { ReactComponent as BattleshipIcon } from "assets/shipIcons/Battleship.svg";

function App() {
  const isBattlefieldValid = useMemo(() => validateBattlefield(validField), []);

  return (
    <MainWrapper>
      <BattlefieldWrapper>
        <StyledTitle text="Place your ships on the battlefield" />
      </BattlefieldWrapper>
      <UserConsoleWrapper>
        <StyledTitle text="Choose a ship" />
        <BattleshipIcon />
      </UserConsoleWrapper>
    </MainWrapper>
  );
}

export default App;
