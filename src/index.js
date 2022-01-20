const playerFactory = require('./playerFactory');
const DOMControllerFactory = require('./DOMControllerFactory');

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
  computer = playerFactory('Computer');
}

// Event Handlers

function startGameButtonHandler() {
  DOMController.fadeOut(gameScreen);
}

function dragShipHandler(e) {}

function dragShipStartHandler(e) {
  console.log('start draggin');
  //   let img = new Image();
  //   img.src =
  //     'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
  //   e.dataTransfer.setDragImage(img, 0, 0);
}

function dragShipEndHandler(e) {
  console.log('on drag end');
  e.target.style.opacity = 1;
}

function dragShipOverHandler(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  e.target.style.opacity = 0;
}

function tileDragoverHandler(e) {}

function tileDropHandler(e) {
  console.log('dropped on tile');
}

function tileDragEnterHandler(e) {
  if (
    player.checkPlaceable(
      DOMController.getCurrentShip().dataset.length,
      e.target.dataset.x,
      e.target.dataset.y,
      DOMController.placementIsVertical()
    )
  ) {
    e.target.style.background = 'green';
  } else {
    e.target.style.background = 'red';
  }
  console.log(DOMController.getTile(e.target.dataset.x, e.target.dataset.y));
}

function tileDragExitHandler(e) {
  e.target.style.background = 'inherit';
}
// Event Handler Attachers

function attachLoadScreenHandlers(button) {
  button.addEventListener('click', startGameButtonHandler);
}

function attachDragShipHandler(ship) {
  ship.addEventListener('dragstart', dragShipStartHandler);
  ship.addEventListener('drag', dragShipHandler);
  ship.addEventListener('dragend', dragShipEndHandler);
  ship.addEventListener('dragover', dragShipOverHandler);
}

function attachTileDragHandler(tileDiv) {
  tileDiv.addEventListener('dragover', tileDragoverHandler);
  tileDiv.addEventListener('drop', tileDropHandler);
  tileDiv.addEventListener('dragenter', tileDragEnterHandler);
  tileDiv.addEventListener('dragleave', tileDragExitHandler);
}
setTimeout(startScreen, 300);
setTimeout(DOMController.fadeInLogo, 300);
