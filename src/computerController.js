function attemptAttackComputer(target) {
  let x, y;
  while (true) {
    x = getRandomInt(1, 11);
    y = getRandomInt(1, 11);

    if (target.checkIfAttackable(x, y)) {
      break;
    }
  }

  return target.attemptReceiveAttack(x, y);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
