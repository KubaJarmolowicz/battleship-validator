function validateBattlefield(field: number[][]) {
  interface Coordinates {
    y: number;
    x: number;
  }

  const existingShipCoords: Coordinates[] = [];

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

  let unusedStartCoords = getShipStartCoordsAndAddToExisting(field);

  while (unusedStartCoords) {
    if (hasMoreThanOneAdjustentNode(unusedStartCoords)) {
      return false;
    }

    if (isSubmarine(unusedStartCoords)) {
      recordShipOfLength(1);
      unusedStartCoords = getShipStartCoordsAndAddToExisting(field);
      continue;
    }

    const shipDirection = getShipDirection(unusedStartCoords);

    let shipLength = 1;

    let currentNodeCoords: Coordinates = { x: 0, y: 0 };

    let nextNodeCoords = getNextNodeCoords(
      {
        y: unusedStartCoords.y,
        x: unusedStartCoords.x,
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

    unusedStartCoords = getShipStartCoordsAndAddToExisting(field);
  }

  return containsCorrectShips(correctShips, recordedShips);

  ////////////////////////////////////////////////////////////////////////

  function getShipStartCoordsAndAddToExisting(field: number[][]) {
    for (let i = 0; i < field.length; i++) {
      const row = field[i];

      const y = i;

      for (let j = 0; j < row.length; j++) {
        if (
          row[j] === 1 &&
          areFoundCoordsUnused(existingShipCoords, { y: i, x: j })
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

  function containsCorrectShips(patternArr: number[], checkedArr: number[]) {
    const sortedPatternArr = patternArr.sort();
    const sortedCheckedArr = checkedArr.sort();

    return sortedPatternArr.every(
      (elt, index) => elt === sortedCheckedArr[index]
    );
  }

  function markCoordsAsUsed(coords: Coordinates) {
    existingShipCoords.push({
      y: coords.y,
      x: coords.x,
    });
  }

  function isSubmarine(coords: Coordinates) {
    const { left, right, up, down } = getAdjustentNodesXandYAxes(coords);

    const sum = +!!left + +!!right + +!!up + +!!down;

    return sum === 0;
  }

  function recordShipOfLength(length: number) {
    recordedShips.push(length);
  }

  function getShipDirection(coords: Coordinates): string {
    const right = !!field[coords.y] ? field[coords.y][coords.x + 1] : null;

    return right ? "right" : "down";
  }

  function getNextNodeCoords(coords: Coordinates, direction: string) {
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
    existingShipCoords: Coordinates[],
    foundCoords: Coordinates
  ) {
    const { y, x } = foundCoords;

    return !existingShipCoords.some(
      ({ y: existingShipStartY, x: existingShipStartX }) =>
        existingShipStartY === y && existingShipStartX === x
    );
  }

  function hasMoreThanOneAdjustentNode(coords: Coordinates) {
    const { left, right, up, down } = getAdjustentNodesXandYAxes(coords);

    const sum = +!!left + +!!right + +!!up + +!!down;

    return sum > 1;
  }

  function hasMoreThanTwoAdjustentNodes(coords: Coordinates) {
    const { left, right, up, down } = getAdjustentNodesXandYAxes(coords);

    const sum = +!!left + +!!right + +!!up + +!!down;

    return sum > 2;
  }

  function hasAdjustentNodeZAxis(coords: Coordinates) {
    const { y: cellY, x: cellX } = coords;

    if (!field[cellY][cellX]) return false;

    const upperLeft = field[cellY - 1] ? field[cellY - 1][cellX - 1] : null;
    const upperRight = field[cellY - 1] ? field[cellY - 1][cellX + 1] : null;
    const lowerLeft = field[cellY + 1] ? field[cellY + 1][cellX - 1] : null;
    const lowerRight = field[cellY + 1] ? field[cellY + 1][cellX + 1] : null;

    return !!upperLeft || !!upperRight || !!lowerLeft || !!lowerRight;
  }

  function getAdjustentNodesXandYAxes(coords: Coordinates) {
    const { y: cellY, x: cellX } = coords;

    const left = field[cellY] ? field[cellY][cellX - 1] : null;
    const right = field[cellY] ? field[cellY][cellX + 1] : null;
    const up = field[cellY - 1] ? field[cellY - 1][cellX] : null;
    const down = field[cellY + 1] ? field[cellY + 1][cellX] : null;

    return { left, right, up, down };
  }
}

export default validateBattlefield;
