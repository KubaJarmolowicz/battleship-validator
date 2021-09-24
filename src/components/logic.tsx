import { Battlefield } from "types";

function validateBattlefield(field: Battlefield): boolean {
  interface Coordinates {
    y: number;
    x: number;
  }

  const alreadyOcupiedCoords: Coordinates[] = [];

  const correctShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

  const recordedShips: number[] = [];

  for (let i = 0; i < field.length; i++) {
    const row = field[i];

    for (let j = 0; j < row.length; j++) {
      const cellCoords = { y: i, x: j };

      if (hasAdjustentNodeZAxis(cellCoords)) {
        return false;
      }
    }
  }

  let availableStartCoords = getShipStartCoordsAndAddToOccupied(field);

  while (availableStartCoords) {
    if (hasMoreThanOneAdjustentNode(availableStartCoords)) {
      return false;
    }

    if (isSubmarine(availableStartCoords)) {
      recordShipOfLength(1);
      availableStartCoords = getShipStartCoordsAndAddToOccupied(field);
      continue;
    }

    const shipDirection = getShipDirection(availableStartCoords);

    let shipLength = 1;

    let currentNodeCoords: Coordinates = { ...availableStartCoords };

    let nextNodeCoords = getNextNodeCoords(
      {
        y: availableStartCoords.y,
        x: availableStartCoords.x,
      },
      shipDirection
    );

    while (field[nextNodeCoords.y][nextNodeCoords.x] !== 0) {
      if (hasMoreThanTwoAdjustentNodes(nextNodeCoords)) {
        return false;
      }

      markCoordsAsUsed({ y: nextNodeCoords.y, x: nextNodeCoords.x });

      shipLength++;

      currentNodeCoords = { ...nextNodeCoords };

      nextNodeCoords = getNextNodeCoords(
        { y: currentNodeCoords.y, x: currentNodeCoords.x },
        shipDirection
      );
    }

    if (hasMoreThanOneAdjustentNode(currentNodeCoords)) {
      return false;
    }

    recordShipOfLength(shipLength);

    availableStartCoords = getShipStartCoordsAndAddToOccupied(field);
  }

  return containsCorrectShips(correctShips, recordedShips);

  ////////////////////////////////////////////////////////////////////////

  function getShipStartCoordsAndAddToOccupied(
    field: Battlefield
  ): Coordinates | null {
    for (let i = 0; i < field.length; i++) {
      const row = field[i];

      const y = i;

      for (let j = 0; j < row.length; j++) {
        if (
          row[j] === 1 &&
          areFoundCoordsUnused(alreadyOcupiedCoords, { y: i, x: j })
        ) {
          const x = j;

          const coords = { y, x };

          markCoordsAsUsed(coords);

          return coords;
        }
      }
    }

    return null;
  }

  function containsCorrectShips(
    patternArr: number[],
    checkedArr: number[]
  ): boolean {
    const sortedPatternArr = patternArr.sort();
    const sortedCheckedArr = checkedArr.sort();

    return sortedPatternArr.every(
      (elt, index) => elt === sortedCheckedArr[index]
    );
  }

  function markCoordsAsUsed(coords: Coordinates): void {
    alreadyOcupiedCoords.push({
      y: coords.y,
      x: coords.x,
    });
  }

  function isSubmarine(coords: Coordinates): boolean {
    const { left, right, up, down } = getAdjustentNodesXandYAxes(coords);

    const sum = +!!left + +!!right + +!!up + +!!down;

    return sum === 0;
  }

  function recordShipOfLength(length: number): void {
    recordedShips.push(length);
  }

  function getShipDirection(coords: Coordinates): string {
    const right = !!field[coords.y] ? field[coords.y][coords.x + 1] : null;

    return right ? "right" : "down";
  }

  function getNextNodeCoords(
    coords: Coordinates,
    direction: string
  ): Coordinates {
    switch (direction) {
      case "right": {
        return { y: coords.y, x: coords.x + 1 };
      }

      case "down": {
        return { y: coords.y + 1, x: coords.x };
      }

      default: {
        throw new Error("getNextNodeCoords fn causing problems");
      }
    }
  }

  function areFoundCoordsUnused(
    alreadyOcupiedCoords: Coordinates[],
    foundCoords: Coordinates
  ): boolean {
    const { y, x } = foundCoords;

    return !alreadyOcupiedCoords.some(
      ({ y: occupiedY, x: occupiedX }) => occupiedY === y && occupiedX === x
    );
  }

  function hasMoreThanOneAdjustentNode(coords: Coordinates): boolean {
    const { left, right, up, down } = getAdjustentNodesXandYAxes(coords);

    const sum = +!!left + +!!right + +!!up + +!!down;

    return sum > 1;
  }

  function hasMoreThanTwoAdjustentNodes(coords: Coordinates): boolean {
    const { left, right, up, down } = getAdjustentNodesXandYAxes(coords);

    const sum = +!!left + +!!right + +!!up + +!!down;

    return sum > 2;
  }

  function hasAdjustentNodeZAxis(coords: Coordinates): boolean {
    const { y: nodeY, x: nodeX } = coords;

    if (!field[nodeY][nodeX]) return false;

    const upperLeft = field[nodeY - 1]?.[nodeX - 1] ?? null;
    const upperRight = field[nodeY - 1]?.[nodeX + 1] ?? null;
    const lowerLeft = field[nodeY + 1]?.[nodeX - 1] ?? null;
    const lowerRight = field[nodeY + 1]?.[nodeX + 1] ?? null;

    return !!upperLeft || !!upperRight || !!lowerLeft || !!lowerRight;
  }

  function getAdjustentNodesXandYAxes(coords: Coordinates) {
    const { y: nodeY, x: nodeX } = coords;

    const left = field[nodeY]?.[nodeX - 1] ?? null;
    const right = field[nodeY]?.[nodeX + 1] ?? null;
    const up = field[nodeY - 1]?.[nodeX] ?? null;
    const down = field[nodeY + 1]?.[nodeX] ?? null;

    return { left, right, up, down };
  }
}

export default validateBattlefield;
