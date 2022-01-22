function DOMControllerFactory() {
  const mainDiv = document.querySelector("main");
  const shipImgSrcMap = new Map();
  shipImgSrcMap.set("Carrier", [
    "images/Carrier.png",
    "images/CarrierHorizontal.png",
  ]);
  shipImgSrcMap.set("Battleship", [
    "images/Battleship.png",
    "images/BattleshipHorizontal.png",
  ]);
  shipImgSrcMap.set("Destroyer", [
    "images/Destroyer.png",
    "images/DestroyerHorizontal.png",
  ]);
  shipImgSrcMap.set("Submarine", [
    "images/Submarine.png",
    "images/SubmarineHorizontal.png",
  ]);
  shipImgSrcMap.set("Patrol Boat", [
    "images/Patrol.png",
    "images/PatrolHorizontal.png",
  ]);

  function loadStartScreen() {
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
    return button;
  }

  function clearElement(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  function changeAxis() {
    let currentShip = getCurrentShip();
    if (placementIsVertical()) {
      currentShip.dataset.vertical = "false";
      currentShip.src = shipImgSrcMap.get(currentShip.dataset.name)[1];
    } else {
      currentShip.dataset.vertical = "true";
      currentShip.src = shipImgSrcMap.get(currentShip.dataset.name)[0];
    }
  }

  function loadGameScreen(callback, tileEventCallback) {
    let playerName = document.querySelector("#player-name-input").value;
    clearElement(mainDiv);
    let gameContainer = document.createElement("div");
    gameContainer.classList.add("game-container");
    let infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");
    gameContainer.appendChild(infoContainer);
    mainDiv.appendChild(gameContainer);
    drawGrid(tileEventCallback);
    callback(playerName);
  }

  function getCurrentShip() {
    return document.querySelector(".ship-placing");
  }

  function placementIsVertical() {
    let vertical = getCurrentShip().dataset.vertical;
    if (vertical == "true") {
      return true;
    } else {
      return false;
    }
  }
  function loadShipSelect(callback, name, length) {
    const infoContainer = document.querySelector(".info-container");
    clearElement(infoContainer);
    let subtitle = document.createElement("h2");
    subtitle.textContent = `Place your ${name} (drag and drop)`;
    let shipRow = document.createElement("div");
    shipRow.classList.add("ship-row");
    let axisButton = document.createElement("button");
    axisButton.textContent = "Change Axis";
    axisButton.classList.add("axis-button");
    let shipDiv = document.createElement("img");
    shipDiv.src = shipImgSrcMap.get(name)[0];
    shipDiv.draggable = "true";
    shipDiv.classList.add("ship-placing");
    shipDiv.dataset.vertical = "true";
    shipDiv.dataset.length = length;
    shipDiv.dataset.name = name;

    shipRow.appendChild(shipDiv);
    shipRow.appendChild(axisButton);
    infoContainer.appendChild(subtitle);
    infoContainer.appendChild(shipRow);
    callback(shipDiv, axisButton);
  }

  function placeShipOnGrid(x, y, isVertical) {
    let image = new Image();
    image.src = getCurrentShip().src;
    let tile = getTile(x, y);
    if (isVertical) {
      image.classList.add("centered-ship-vertical");
    } else {
      image.classList.add("centered-ship-horizontal");
    }

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
  async function fadeIn() {
    let opacity = 0.0;
    mainDiv.style.opacity = opacity;
    return new Promise(function (resolve) {
      let timer = setInterval(() => {
        if (opacity >= 1) {
          clearInterval(timer);
          resolve(true);
        }
        opacity += 0.05;
        mainDiv.style.opacity = opacity;
      }, 50);
    });
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
    loadShipSelect,
    getCurrentShip,
    placementIsVertical,
    getTile,
    placeShipOnGrid,
    changeAxis,
  };
}

module.exports = DOMControllerFactory;
