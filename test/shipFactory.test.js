const shipFactory = require('../src/shipFactory');

test('Test Ship Factory Hit Function Vertical', () => {
  const ship = shipFactory(5, 1, 1, true);
  expect(ship.hit(1, 1)).toBe(true);
  expect(ship.hit(1, 2)).toBe(true);
  expect(ship.hit(1, 3)).toBe(true);
  expect(ship.hit(1, 4)).toBe(true);
  expect(ship.hit(1, 5)).toBe(true);
  expect(ship.hit(1, 6)).toBe(false);
  expect(ship.hit(2, 1)).toBe(false);
});

test('Test Ship Factory Hit Function Horizontal', () => {
  const ship = shipFactory(5, 1, 1, false);
  expect(ship.hit(1, 1)).toBe(true);
  expect(ship.hit(2, 1)).toBe(true);
  expect(ship.hit(3, 1)).toBe(true);
  expect(ship.hit(4, 1)).toBe(true);
  expect(ship.hit(5, 1)).toBe(true);
  expect(ship.hit(6, 1)).toBe(false);
  expect(ship.hit(1, 2)).toBe(false);
});

test('Test Ship isSunk function', () => {
  const ship = shipFactory(3, 1, 1, true);

  expect(ship.isSunk()).toBe(false);

  ship.hit(1, 1);
  expect(ship.isSunk()).toBe(false);

  ship.hit(1, 2);
  expect(ship.isSunk()).toBe(false);

  ship.hit(1, 3);
  expect(ship.isSunk()).toBe(true);
});
