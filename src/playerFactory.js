const gameboardFactory = require('./gameboardFactory');

function playerFactory(name, isComputer) {
  const gameboard = gameboardFactory();
  const shotAttempts = [];
  function getName() {
    return name;
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

  function attemptAttackComputer() {
    let x, y;
    while (true) {
      x = getRandomInt(1, 11);
      y = getRandomInt(1, 11);

      if (checkIfAttackable(x, y)) {
        break;
      }
    }

    return attemptReceiveAttack(x, y);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
