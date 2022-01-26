const gameboardFactory = require('./gameboardFactory');

function playerFactory(playerName) {
  const gameboard = gameboardFactory();
  const shotAttempts = [];
  function getName() {
    return playerName;
  }

  function attemptPlaceShip(length, x, y, isVertical, name) {
    return gameboard.placeShip(length, x, y, isVertical, name);
  }

  function checkPlaceable(length, x, y, isVertical) {
    return gameboard.checkPlaceable(length, x, y, isVertical);
  }
  function checkIfAttackable(x, y) {
    if (shotAttempts.find((coords) => coords[0] === x && coords[1] === y)) {
      return false;
    }
    return true;
  }

  function attemptReceiveAttack(x, y) {
    shotAttempts.push([x, y]);
    let success = gameboard.receiveAttack(x, y);
    return success;
  }

  function getShips() {
    return gameboard.getShips();
  }

  function allSunk() {
    return gameboard.allSunk();
  }
  return {
    getName,
    attemptPlaceShip,
    checkIfAttackable,
    attemptReceiveAttack,
    checkPlaceable,
    getShips,
    allSunk,
  };
}

module.exports = playerFactory;
