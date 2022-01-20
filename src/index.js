const playerFactory = require("./playerFactory");
const DOMControllerFactory = require("./DOMControllerFactory");

let DOMController = DOMControllerFactory();
let player = null;
let computer = null;

function startScreen() {
  DOMController.loadStartScreen(attachLoadScreenHandlers);
  DOMController.fadeIn();
}

function gameScreen() {
  DOMController.loadGameScreen(
    gameLoop,
    attachDragShipHandler,
    attachTileDragHandler
  );
  DOMController.fadeIn();
}

function gameLoop(playerName) {
  player = playerFactory(playerName);
  computer = playerFactory("Computer");
}

// Event Handlers

function startGameButtonHandler() {
  DOMController.fadeOut(gameScreen);
}

function shipDragHandler(e) {}

function shipDragStartHandler(e) {
  e.target.style.opacity = 0;
  e.dataTransfer.effectAllowed = "move";
  //   let img = new Image();
  //   img.src =
  //     'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
  //   e.dataTransfer.setDragImage(img, 0, 0);
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
  let x = Number(e.target.dataset.x);
  let y = Number(e.target.dataset.y);
  let length = Number(DOMController.getCurrentShip().dataset.length);
  if (
    player.checkPlaceable(length, x, y, DOMController.placementIsVertical())
  ) {
    DOMController.placeShipOnGrid(x, y, DOMController.placementIsVertical());
    player.attemptPlaceShip(length, x, y, DOMController.placementIsVertical());
  }
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
// Event Handler Attachers

function attachLoadScreenHandlers(button) {
  button.addEventListener("click", startGameButtonHandler);
}

function attachDragShipHandler(ship) {
  ship.addEventListener("dragstart", shipDragStartHandler);
  ship.addEventListener("drag", shipDragHandler);
  ship.addEventListener("dragend", shipDragEndHandler);
  ship.addEventListener("dragover", shipDragOverHandler);
}

function attachTileDragHandler(tileDiv) {
  tileDiv.addEventListener("dragover", tileDragoverHandler);
  tileDiv.addEventListener("drop", tileDropHandler);
  tileDiv.addEventListener("dragenter", tileDragEnterHandler);
  tileDiv.addEventListener("dragleave", tileDragExitHandler);
}
setTimeout(startScreen, 300);
setTimeout(DOMController.fadeInLogo, 300);
