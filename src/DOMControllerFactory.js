function DOMControllerFactory() {
  const mainDiv = document.querySelector("main");
  function loadStartScreen(callback) {
    let subtitle = document.createElement("h2");
    let input = document.createElement("input");
    let button = document.createElement("button");
    subtitle.textContent = "Enter Player Name:";
    input.type = "text";
    input.id = "player-name-input";
    button.id = "start-game-button";
    button.textContent = "Start Game";
    mainDiv.appendChild(subtitle);
    mainDiv.appendChild(input);
    mainDiv.appendChild(button);
    callback(button);
  }

  function clearElement(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  function loadGameScreen(callback, shipEventCallback, tileEventCallback) {
    let playerName = document.querySelector("#player-name-input").value;
    clearElement(mainDiv);
    let gameContainer = document.createElement("div");
    gameContainer.classList.add("game-container");
    let infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");
    gameContainer.appendChild(infoContainer);
    mainDiv.appendChild(gameContainer);
    loadShipSelect(shipEventCallback, "carrier", 5);
    drawGrid(tileEventCallback);
    callback(playerName);
  }

  function getCurrentShip() {
    return document.querySelector(".ship-placing");
  }

  function placementIsVertical() {
    return true;
  }
  function loadShipSelect(callback, name, length) {
    const infoContainer = document.querySelector(".info-container");
    clearElement("infoContainer");
    let subtitle = document.createElement("h2");
    subtitle.textContent = `Place your ${name} (drag and drop)`;
    let shipDiv = document.createElement("img");
    shipDiv.src = "images/ShipCarrierHull.png";
    shipDiv.draggable = "true";
    shipDiv.classList.add("ship-placing");

    shipDiv.dataset.length = length;

    infoContainer.appendChild(subtitle);
    infoContainer.appendChild(shipDiv);
    callback(shipDiv);
  }

  function placeShipOnGrid(x, y, isVertical) {
    let image = new Image();
    image.src = getCurrentShip().src;
    let tile = getTile(x, y);
    image.classList.add("centered-ship");

    tile.appendChild(image);
  }
  function drawGrid(callback) {
    const gameContainer = document.querySelector(".game-container");
    let grid = document.createElement("div");
    grid.classList.add("grid");

    for (let y = 10; y > 0; y--) {
      for (let x = 1; x < 11; x++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.x = x;
        tile.dataset.y = y;
        callback(tile);
        grid.appendChild(tile);
      }
    }

    gameContainer.appendChild(grid);
  }

  function getTile(x, y) {
    let nodeList = document.querySelectorAll(`[data-x="${x}"]`);
    let array = Array.from(nodeList);
    for (let i = 0; i < array.length; i++) {
      if (array[i].dataset.y == y) {
        return array[i];
      }
    }
  }
  function fadeIn(callback) {
    let opacity = 0.0;
    mainDiv.style.opacity = opacity;
    let timer = setInterval(() => {
      if (opacity >= 1) {
        clearInterval(timer);
      }
      opacity += 0.05;
      mainDiv.style.opacity = opacity;
    }, 50);
  }

  function fadeOut(callback) {
    let opacity = 1.0;
    mainDiv.style.opacity = opacity;
    let timer = setInterval(() => {
      if (opacity <= 0) {
        clearInterval(timer);
        callback();
      }
      opacity -= 0.05;
      mainDiv.style.opacity = opacity;
    }, 50);
  }
  function fadeInLogo() {
    const logoDiv = document.querySelector("header");
    let opacity = 0.0;
    logoDiv.style.opacity = opacity;
    let timer = setInterval(() => {
      if (opacity >= 1) {
        clearInterval(timer);
      }
      opacity += 0.05;
      logoDiv.style.opacity = opacity;
    }, 50);
  }
  return {
    loadStartScreen,
    fadeIn,
    fadeInLogo,
    fadeOut,
    loadGameScreen,
    getCurrentShip,
    placementIsVertical,
    getTile,
    placeShipOnGrid,
  };
}

module.exports = DOMControllerFactory;
