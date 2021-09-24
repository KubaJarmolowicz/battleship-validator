import React, { useMemo } from "react";
import { validField } from "components/passingTestCase";
import validateBattlefield from "components/logic";
import StyledTitle from "components/StyledTitle";
import MainWrapper from "components/MainWrapper";
import BattlefieldWrapper from "components/BattlefieldWrapper";
import UserConsoleWrapper from "components/UserConsoleWrapper";
import { ReactComponent as BattleshipIcon } from "assets/shipIcons/Battleship.svg";
import { ReactComponent as CruiserIcon } from "assets/shipIcons/Cruiser.svg";
import { ReactComponent as DestroyerIcon } from "assets/shipIcons/Destroyer.svg";
import { ReactComponent as SubmarineIcon } from "assets/shipIcons/Submarine.svg";
import Battlefield from "components/Battlefield";

function App() {
  const isBattlefieldValid = useMemo(() => validateBattlefield(validField), []);

  return (
    <MainWrapper>
      <BattlefieldWrapper>
        <StyledTitle text="Place your ships on the battlefield" />
        <Battlefield />
      </BattlefieldWrapper>
      <UserConsoleWrapper>
        <StyledTitle text="Choose a ship" />
        <BattleshipIcon />
        <CruiserIcon />
        <DestroyerIcon />
        <SubmarineIcon />
      </UserConsoleWrapper>
    </MainWrapper>
  );
}

export default App;
