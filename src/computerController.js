class ComputerController {
  constructor(computer, player, ships) {
    this.computer = computer;
    this.player = player;
    this.ships = ships;
    this.lastHit = null;
  }

  attemptAttack() {
    let coords = null;
    if (this.lastHit) {
      coords = this.findShipSinkTile();
    } else {
      coords = this.findAttackableTile();
    }
    let ship = null;
    let attackInfo = { x: coords.x, y: coords.y, ship };
    attackInfo.ship = this.player.attemptReceiveAttack(coords.x, coords.y);

    if (attackInfo.ship) {
      if (attackInfo.ship.isSunk()) {
        this.lastHit = null;
      } else {
        this.lastHit = attackInfo;
      }
    }

    return attackInfo;
  }

  findShipSinkTile() {
    let posArray = this.lastHit.ship.posArray;
    for (let i = 0; i < posArray.length; i++) {
      let pos = posArray[i];
      if (!pos.isHit) {
        continue;
      }
      let possibleShots = [
        { x: pos.x + 1, y: pos.y },
        { x: pos.x - 1, y: pos.y },
        { x: pos.x, y: pos.y + 1 },
        { x: pos.x, y: pos.y - 1 },
      ];

      this.shuffleArray(possibleShots);

      for (let j = 0; j < possibleShots.length; j++) {
        if (
          possibleShots[j].x < 11 &&
          possibleShots[j].x > 0 &&
          possibleShots[j].y < 11 &&
          possibleShots[j].y > 0
        ) {
          if (
            this.player.checkIfAttackable(
              possibleShots[j].x,
              possibleShots[j].y
            )
          ) {
            return { x: possibleShots[j].x, y: possibleShots[j].y };
          }
        }
      }
    }
  }
  findAttackableTile() {
    let x, y;
    while (true) {
      x = this.getRandomInt(1, 11);
      y = this.getRandomInt(1, 11);

      if (this.player.checkIfAttackable(x, y)) {
        return { x, y };
      }
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
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

          break;
        }
      }
    });
  }
}

module.exports = ComputerController;
