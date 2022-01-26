class ComputerController {
  constructor(computer, player, ships) {
    this.computer = computer;
    this.player = player;
    this.ships = ships;
  }

  attemptAttack() {
    let x, y;
    while (true) {
      x = this.getRandomInt(1, 11);
      y = this.getRandomInt(1, 11);

      if (this.player.checkIfAttackable(x, y)) {
        break;
      }
    }
    let success = null;
    let attackInfo = { x, y, success };
    console.log(attackInfo);
    attackInfo.success = this.player.attemptReceiveAttack(x, y);
    return attackInfo;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  placeShips() {
    this.ships.forEach((ship) => {
      let x, y, isVertical;
      while (true) {
        x = this.getRandomInt(1, 11);
        y = this.getRandomInt(1, 11);
        isVertical = this.getRandomInt(1, 3) > 1;
        if (this.computer.checkPlaceable(ship.length, x, y, isVertical)) {
          this.computer.attemptPlaceShip(
            ship.length,
            x,
            y,
            isVertical,
            ship.name
          );
          console.log(
            `Placed ship at: ${x} ${y} with length of ${ship.length}`
          );
          break;
        }
      }
    });
  }
}

module.exports = ComputerController;
