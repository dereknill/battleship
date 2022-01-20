const gameboardFactory = require('./gameboardFactory');

function playerFactory(playerName) {
  const gameboard = gameboardFactory();
  const shotAttempts = [];
  function getName() {
    return playerName;
  }

  function attemptPlaceShip(length, x, y, isVertical) {
    return gameboard.placeShip(length, x, y, isVertical);
  }

  function checkPlaceable(length, x, y, isVertical) {
    return gameboard.checkPlaceable(length, x, y, isVertical);
  }
  function checkIfAttackable(x, y) {
    if (shotAttempts.find((coords) => coords[0] === x && cords[1] === y)) {
      return false;
    }
    return true;
  }

  function attemptReceiveAttack(x, y) {
    shotAttempts.push([x, y]);
    return gameboard.receiveAttack(x, y);
  }

  return {
    getName,
    attemptPlaceShip,
    checkIfAttackable,
    attemptReceiveAttack,
    checkPlaceable,
  };
}

module.exports = playerFactory;
