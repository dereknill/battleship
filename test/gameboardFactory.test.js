const gameboardFactory = require('../src/gameboardFactory');

test('Test gameboard factory', () => {
  const gameboard = gameboardFactory();

  gameboard.placeShip(3, 1, 1, false);

  expect(gameboard.receiveAttack(1, 1).success).toBe(true);
  expect(gameboard.receiveAttack(2, 1).success).toBe(true);
  expect(gameboard.receiveAttack(3, 1).success).toBe(true);
  expect(gameboard.receiveAttack(4, 1).success).toBe(false);
  expect(gameboard.receiveAttack(1, 2).success).toBe(false);
});

test('Test gameboard factory allSunk function', () => {
  const gameboard = gameboardFactory();

  gameboard.placeShip(3, 1, 1, false);
  gameboard.placeShip(4, 2, 2, true);

  expect(gameboard.allSunk()).toBe(false);
  gameboard.receiveAttack(1, 1);
  gameboard.receiveAttack(2, 1);
  gameboard.receiveAttack(3, 1);
  expect(gameboard.allSunk()).toBe(false);
  gameboard.receiveAttack(2, 2);
  gameboard.receiveAttack(2, 3);
  gameboard.receiveAttack(2, 4);
  gameboard.receiveAttack(2, 5);
  expect(gameboard.allSunk()).toBe(true);
});
