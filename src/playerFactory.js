const gameboardFactory = require('./gameboardFactory');

function playerFactory() {
  const gameboard = gameboardFactory();
  const shotAttempts = [];
  let playerName = '';
  function getName() {
    return playerName;
  }

  function setName(name) {
    playerName = name;
  }
  function attemptPlaceShip(length, x, y, isVertical) {
    return gameboard.placeShip(length, x, y, isVertical);
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
    setName,
  };
}

module.exports = playerFactory;
