const playerFactory = require("./playerFactory");
const DOMControllerFactory = require("./DOMControllerFactory");

let DOMController = DOMControllerFactory();
let player = null;
let computer = null;
let lastTouchedTile = null;
let ships = [
  { name: "Carrier", length: 5 },
  { name: "Battleship", length: 4 },
  { name: "Destroyer", length: 3 },
  { name: "Submarine", length: 3 },
  { name: "Patrol Boat", length: 2 },
];
let shipToSelect = -1;

function startScreen() {
  DOMController.loadStartScreen(attachLoadScreenHandlers);
  DOMController.fadeIn();
}

function gameScreen() {
  DOMController.loadGameScreen(boardCreated, attachTileDragHandler);
  DOMController.fadeIn();
}

function gameLoop() {}

function boardCreated(playerName) {
  player = playerFactory(playerName);
  computer = playerFactory("Computer");
  selectShipScreen();
}

function setBoard() {
  console.log("All ships placed");
}
function selectShipScreen() {
  shipToSelect++;
  if (shipToSelect >= ships.length) {
    setBoard();
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
  if (
    player.checkPlaceable(length, x, y, DOMController.placementIsVertical())
  ) {
    DOMController.placeShipOnGrid(x, y, DOMController.placementIsVertical());
    player.attemptPlaceShip(length, x, y, DOMController.placementIsVertical());
    selectShipScreen();
    return true;
  }
  return false;
}
// Event Handlers

function startGameButtonHandler() {
  DOMController.fadeOut(gameScreen);
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
  console.log("Axis button pressed");
}

function shipTouchStartHandler(e) {}

function shipTouchMoveHandler(event) {
  let touch = event.targetTouches[0];
  event.target.style.position = "absolute";
  event.target.style.left = touch.pageX - event.target.width / 2 + "px";
  event.target.style.bottom =
    document.body.clientHeight - touch.pageY - 17.5 + "px";

  event.preventDefault();
}

function shipTouchEndHandler(event) {
  event.preventDefault();
  let touch = event.changedTouches[0];
  let currentShip = DOMController.getCurrentShip();
  let bottomElement = document.elementFromPoint(touch.pageX, touch.pageY);

  if (!tileDrop(bottomElement)) {
    currentShip.style.position = "relative";
    currentShip.style.left = "auto";
    currentShip.style.bottom = "auto";
  }
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
setTimeout(startScreen, 300);
setTimeout(DOMController.fadeInLogo, 300);
