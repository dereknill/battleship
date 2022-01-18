const playerFactory = require('./playerFactory');
const DOMControllerFactory = require('./DOMControllerFactory');

let DOMController = DOMControllerFactory();

function startScreen() {
  DOMController.loadStartScreen(attachLoadScreenHandlers);
  DOMController.fadeIn();
}

function gameScreen() {
  DOMController.loadGameScreen(gameLoop);
  DOMController.fadeIn();
}

function gameLoop(playerName) {
  let player = playerFactory();
  console.log(player);
}

// Event Handlers

function startGameButtonHandler() {
  DOMController.fadeOut(gameScreen);
}

// Event Handler Attachers

function attachLoadScreenHandlers(button) {
  button.addEventListener('click', startGameButtonHandler);
}

setTimeout(startScreen, 300);
setTimeout(DOMController.fadeInLogo, 300);
