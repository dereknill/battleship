const playerFactory = require("./playerFactory");
const DOMControllerFactory = require("./DOMControllerFactory");
const ComputerController = require("./computerController");

let DOMController = DOMControllerFactory();
let player = null;
let computer = null;
let computerController = null;
let tileButtonsActive = true;
let ships = [
  { name: "Carrier", length: 5 },
  { name: "Battleship", length: 4 },
  { name: "Destroyer", length: 3 },
  { name: "Submarine", length: 3 },
  { name: "Patrol Boat", length: 2 },
];
let shipToSelect = -1;

window.addEventListener("touchmove", function (event) {
  event.preventDefault();
});

async function startScreen() {
  let button = DOMController.loadStartScreen();

  await DOMController.fadeIn();
  attachLoadScreenHandlers(button);
}

function gameScreen() {
  DOMController.loadGameScreen(boardCreated, attachTileDragHandler);
  DOMController.fadeIn();
}

function computerAttack() {
  const attackInfo = computerController.attemptAttack();
  attackTimer(attackInfo.x, attackInfo.y, attackInfo.ship, true);
}

function attackTimer(x, y, ship, isPlayerTarget) {
  let name;
  if (isPlayerTarget) {
    name = "Computer";
  } else {
    name = player.getName();
  }
  DOMController.aiming(name);

  setTimeout(() => {
    if (ship) {
      DOMController.tileHit(x, y, isPlayerTarget, name, ship);
    } else {
      DOMController.tileMiss(x, y, isPlayerTarget, name, ship);
    }

    let winner = checkWinner();
    if (checkWinner()) {
      gameoverHandler();
    } else {
      if (!isPlayerTarget) {
        setTimeout(() => {
          computerAttack();
        }, 1500);
      } else {
        tileButtonsActive = true;
      }
    }
  }, 1000);
}

function checkWinner() {
  return player.allSunk() || computer.allSunk();
}

function boardCreated(playerName) {
  player = playerFactory(playerName);
  computer = playerFactory("Computer");
  selectShipScreen();
}

function setBoard() {
  DOMController.setGameLoopScreen(attachTileGameClickHandler);
  let ships = player.getShips();
  ships.forEach((ship) => {
    DOMController.placeShipOnGridGameLoop(ship);
  });
  computerController = new ComputerController(computer, player, ships);
  computerController.placeShips();
  DOMController.fadeIn();
}
function selectShipScreen() {
  shipToSelect++;
  if (shipToSelect >= ships.length) {
    DOMController.clearElement(document.querySelector(".info-container"));
    DOMController.fadeOut(setBoard);
  } else {
    DOMController.loadShipSelect(
      attachPlacementHandlers,
      ships[shipToSelect].name,
      ships[shipToSelect].length
    );
  }
}

function tileDrop(tileElement) {
  let x = Number(tileElement.dataset.x);
  let y = Number(tileElement.dataset.y);
  tileElement.style.background = "inherit";
  let length = Number(DOMController.getCurrentShip().dataset.length);
  let name = DOMController.getCurrentShip().dataset.name;
  if (
    player.checkPlaceable(length, x, y, DOMController.placementIsVertical())
  ) {
    DOMController.placeShipOnGrid(x, y, DOMController.placementIsVertical());
    player.attemptPlaceShip(
      length,
      x,
      y,
      DOMController.placementIsVertical(),
      name
    );
    selectShipScreen();
    return true;
  }
  return false;
}
// Event Handlers

function restartGame() {
  player = null;
  computer = null;
  computerController = null;
  shipToSelect = -1;
  tileButtonsActive = true;
  startScreen();
}
function gameoverHandler() {
  let computerWon = player.allSunk();
  let playerWon = computer.allSunk();

  if (computerWon) {
    DOMController.gameover("Computer", attachPlayAgainHandler);
  } else if (playerWon) {
    DOMController.gameover(player.getName(), attachPlayAgainHandler);
  }
}
function startGameButtonHandler(event) {
  DOMController.fadeOut(gameScreen);
  event.target.removeEventListener("click", startGameButtonHandler);
}

function shipDragHandler(e) {}

function shipDragStartHandler(e) {
  e.target.style.opacity = 0;
  e.dataTransfer.effectAllowed = "move";
  let img = new Image();
  img.src = DOMController.getCurrentShip().src;
  if (DOMController.placementIsVertical()) {
    e.dataTransfer.setDragImage(img, img.width / 2, img.height - 17.5);
  } else {
    e.dataTransfer.setDragImage(img, 17.5, img.height / 2);
  }
}

function shipDragEndHandler(e) {
  e.target.style.opacity = 1;
}

function shipDragOverHandler(e) {}
function tileDragoverHandler(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}

function tileDropHandler(e) {
  tileDrop(e.target);
}

function tileDragEnterHandler(e) {
  let x = Number(e.target.dataset.x);
  let y = Number(e.target.dataset.y);
  let length = Number(DOMController.getCurrentShip().dataset.length);
  if (
    player.checkPlaceable(length, x, y, DOMController.placementIsVertical())
  ) {
    e.target.style.background = "green";
  } else {
    e.target.style.background = "red";
  }
}

function tileDragExitHandler(e) {
  e.target.style.background = "inherit";
}

function axisButtonHandler() {
  DOMController.changeAxis();
}

function shipTouchStartHandler(e) {}

function shipTouchMoveHandler(event) {
  let touch = event.targetTouches[0];
  event.target.style.position = "absolute";
  if (DOMController.placementIsVertical()) {
    event.target.style.left = touch.pageX - event.target.width / 2 + "px";
    event.target.style.bottom =
      document.body.clientHeight - touch.pageY - 17.5 + "px";
  } else {
    event.target.style.top = touch.pageY - event.target.height / 2 + "px";
    event.target.style.left = touch.pageX - 17.5 + "px";
  }

  event.preventDefault();
}

function shipTouchEndHandler(event) {
  event.preventDefault();
  let touch = event.changedTouches[0];
  let currentShip = DOMController.getCurrentShip();
  let bottomElement = document.elementFromPoint(touch.pageX, touch.pageY);
  if (bottomElement != null) {
    if (bottomElement.classList.contains("tile")) {
      if (tileDrop(bottomElement)) {
        return;
      }
    }
  }

  currentShip.style.position = "relative";
  currentShip.style.left = "auto";
  currentShip.style.bottom = "auto";
  currentShip.style.top = "auto";
}

function shipTouchCancelHandler(event) {
  let currentShip = DOMController.getCurrentShip();
  currentShip.style.position = "relative";
  currentShip.style.left = "auto";
  currentShip.style.bottom = "auto";
  currentShip.style.top = "auto";
}

function tileGameClickHandler(event) {
  if (!tileButtonsActive) {
    return;
  }
  let x = event.target.dataset.x;
  let y = event.target.dataset.y;

  let ship = computer.attemptReceiveAttack(x, y);
  attackTimer(x, y, ship, false);

  event.target.removeEventListener("click", tileGameClickHandler);
  tileButtonsActive = false;
}

// Event Handler Attachers

function attachLoadScreenHandlers(button) {
  button.addEventListener("click", startGameButtonHandler);
}

function attachPlacementHandlers(ship, axisButton) {
  if (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  ) {
    ship.addEventListener("touchstart", shipTouchStartHandler);
    ship.addEventListener("touchmove", shipTouchMoveHandler);
    ship.addEventListener("touchend", shipTouchEndHandler);
    ship.addEventListener("touchcancel", shipTouchCancelHandler);
  } else {
    ship.addEventListener("dragstart", shipDragStartHandler);
    ship.addEventListener("drag", shipDragHandler);
    ship.addEventListener("dragend", shipDragEndHandler);
    ship.addEventListener("dragover", shipDragOverHandler);
  }

  axisButton.addEventListener("click", axisButtonHandler);
}

function attachTileDragHandler(tileDiv) {
  if (
    !(
      "ontouchstart" in window &&
      navigator.maxTouchPoints > 0 &&
      navigator.msMaxTouchPoints > 0
    )
  ) {
    tileDiv.addEventListener("dragover", tileDragoverHandler);
    tileDiv.addEventListener("drop", tileDropHandler);
    tileDiv.addEventListener("dragenter", tileDragEnterHandler);
    tileDiv.addEventListener("dragleave", tileDragExitHandler);
  }
}

function attachTileGameClickHandler(tileDiv) {
  tileDiv.addEventListener("click", tileGameClickHandler);
}

function attachPlayAgainHandler(button) {
  button.addEventListener("click", restartGame);
}

// On Load

setTimeout(startScreen, 300);
setTimeout(DOMController.fadeInLogo, 300);
