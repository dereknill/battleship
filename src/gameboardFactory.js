const shipFactory = require('./shipFactory');

function gameboardFactory() {
  const shipArray = [];

  function placeShip(length, x, y, isVertical) {
    if (isVertical) {
      if (length + y > 11) {
        return false;
      } else {
        for (let i = y; i <= length + y; i++) {
          if (!checkAvailable(x, i)) {
            return false;
          }
        }
      }
    } else {
      if (length + x > 11) {
        return false;
      } else {
        for (let i = x; i <= length + x; i++) {
          if (!checkAvailable(i, y)) {
            return false;
          }
        }
      }
    }

    shipArray.push(shipFactory(length, x, y, isVertical));
    return true;
  }

  function receiveAttack(x, y) {
    let success = false;
    for (let i = 0; i < shipArray.length; i++) {
      if (shipArray[i].hit(x, y)) {
        success = true;
        break;
      }
    }
    return success;
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
  return { placeShip, receiveAttack, allSunk, checkAvailable, placeShip };
}

module.exports = gameboardFactory;
