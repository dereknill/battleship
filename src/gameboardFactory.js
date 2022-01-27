const shipFactory = require('./shipFactory');

function gameboardFactory() {
  const shipArray = [];

  function placeShip(length, x, y, isVertical, name) {
    if (!checkPlaceable(length, x, y, isVertical)) {
      return false;
    }
    shipArray.push(shipFactory(length, x, y, isVertical, name));
    return true;
  }

  function checkPlaceable(length, x, y, isVertical) {
    if (isVertical) {
      if (Number(length) + Number(y) > 11) {
        return false;
      } else {
        for (let i = y; i < length + y; i++) {
          if (!checkAvailable(x, i)) {
            return false;
          }
        }
      }
    } else {
      if (Number(length) + Number(x) > 11) {
        return false;
      } else {
        for (let i = x; i < length + x; i++) {
          if (!checkAvailable(i, y)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  function receiveAttack(x, y) {
    let result = false;
    for (let i = 0; i < shipArray.length; i++) {
      let hitInfo = shipArray[i].hit(x, y);
      if (hitInfo) {
        result = hitInfo;
        break;
      }
    }
    return result;
  }

  function allSunk() {
    for (let i = 0; i < shipArray.length; i++) {
      if (!shipArray[i].isSunk()) {
        return false;
      }
    }
    return true;
  }

  function checkAvailable(x, y) {
    for (let i = 0; i < shipArray.length; i++) {
      if (!shipArray[i].checkAvailable(x, y)) {
        return false;
      }
    }
    return true;
  }

  function getShips() {
    return shipArray;
  }
  return {
    placeShip,
    receiveAttack,
    allSunk,
    checkAvailable,
    placeShip,
    checkPlaceable,
    getShips,
  };
}

module.exports = gameboardFactory;
