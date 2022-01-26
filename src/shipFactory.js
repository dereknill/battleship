function shipFactory(length, startPosX, startPosY, isVertical, name) {
  const posArray = [];

  console.log({ length, startPosX, startPosY });
  if (isVertical) {
    for (let i = startPosY; i < startPosY + length; i++) {
      posArray.push({ x: startPosX, y: i, isHit: false });
    }
  } else {
    for (let i = startPosX; i < startPosX + length; i++) {
      posArray.push({ x: i, y: startPosY, isHit: false });
    }
  }

  function hit(x, y) {
    const pos = posArray.find((element) => {
      return element.x == x && element.y == y;
    });
    if (pos == undefined) {
      console.log(`${name} not hit as ${x} ${y}`);
      return false;
    }
    pos.isHit = true;
    return true;
  }

  function isSunk() {
    let isSunk = true;
    posArray.forEach((position) => {
      if (position.isHit === false) {
        isSunk = false;
      }
    });

    return isSunk;
  }

  function checkAvailable(x, y) {
    const pos = posArray.find((element) => {
      return element.x === x && element.y === y;
    });
    if (pos == undefined) {
      return true;
    }
    return false;
  }
  return {
    hit,
    isSunk,
    checkAvailable,
    startPosX,
    startPosY,
    isVertical,
    length,
    name,
  };
}

module.exports = shipFactory;
