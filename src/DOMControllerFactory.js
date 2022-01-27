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

  function gameover(winner, callback) {
    let infoContainer = document.querySelector(".info-container");
    let winnerText = document.createElement("h2");
    clearElement(infoContainer);

    winnerText.textContent = `${winner} has won!`;

    let playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";

    infoContainer.appendChild(winnerText);
    infoContainer.appendChild(playAgainButton);
    callback(playAgainButton);
  }
  function loadStartScreen() {
    clearElement(mainDiv);
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
    let axisButton = document.querySelector(".axis-button");
    if (placementIsVertical()) {
      currentShip.dataset.vertical = "false";
      currentShip.src = shipImgSrcMap.get(currentShip.dataset.name)[1];
      axisButton.textContent = "Axis: X";
    } else {
      currentShip.dataset.vertical = "true";
      currentShip.src = shipImgSrcMap.get(currentShip.dataset.name)[0];
      axisButton.textContent = "Axis: Y";
    }
  }

  function loadGameScreen(callback, tileEventCallback) {
    let playerName = document.querySelector("#player-name-input").value;
    clearElement(mainDiv);
    let gameContainer = document.createElement("div");
    gameContainer.classList.add("game-container");
    let infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");
    let gridsContainer = document.createElement("div");
    gridsContainer.classList.add("grids-container");
    let grid = drawGrid(tileEventCallback);
    grid.classList.add("player-grid");
    gridsContainer.appendChild(grid);
    gameContainer.appendChild(infoContainer);
    gameContainer.appendChild(gridsContainer);
    mainDiv.appendChild(gameContainer);

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
    axisButton.textContent = "Axis: Y";
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

  function aiming(name) {
    setInfoContainerText(`${name} is taking aim...`);
  }
  function tileHit(x, y, isPlayer, name) {
    let tile = getTile(x, y, isPlayer);
    let hitMarker = document.createElement("div");
    hitMarker.classList.add("tile-hit");
    tile.appendChild(hitMarker);

    setInfoContainerText(
      `${name} fires at (${x},${y}) and scores a direct hit!`
    );
  }

  function tileMiss(x, y, isPlayer, name) {
    let tile = getTile(x, y, isPlayer);
    let missMarker = document.createElement("div");
    missMarker.classList.add("tile-miss");
    tile.appendChild(missMarker);

    setInfoContainerText(`${name} fires at (${x},${y}) and misses.`);
  }

  function setInfoContainerText(text) {
    const infoContainer = document.querySelector(".info-container");
    clearElement(infoContainer);
    let textEle = document.createElement("h2");
    textEle.textContent = text;
    infoContainer.appendChild(textEle);
  }
  function setGameLoopScreen(computerTileEventAttacher) {
    let gridsContainer = document.querySelector(".grids-container");
    let infoContainer = document.querySelector(".info-container");
    clearElement(gridsContainer);
    clearElement(infoContainer);
    infoContainer.style.height = "100px";
    let playerGrid = drawGrid();
    let computerGrid = drawGrid(computerTileEventAttacher);
    let playerGridTitle = document.createElement("h3");
    let computerGridTitle = document.createElement("h3");
    playerGridTitle.textContent = "Friendly Water";
    computerGridTitle.textContent = "Enemy Water";

    let playerGridContainer = document.createElement("div");
    let computerGridContainer = document.createElement("div");
    playerGridContainer.classList.add("player-grid-container");
    computerGridContainer.classList.add("computer-grid-container");
    playerGrid.classList.add("player-grid");
    playerGridContainer.appendChild(playerGridTitle);
    playerGridContainer.appendChild(playerGrid);

    computerGrid.classList.add("computer-grid");
    computerGridContainer.appendChild(computerGridTitle);
    computerGridContainer.appendChild(computerGrid);
    gridsContainer.appendChild(computerGridContainer);
    gridsContainer.appendChild(playerGridContainer);
  }
  function placeShipOnGrid(x, y, isVertical) {
    let image = new Image();
    image.src = getCurrentShip().src;
    let tile = getTile(x, y, true);
    if (isVertical) {
      image.classList.add("centered-ship-vertical");
    } else {
      image.classList.add("centered-ship-horizontal");
    }

    tile.appendChild(image);
  }

  function placeShipOnGridGameLoop(ship) {
    console.log(ship);
    let image = new Image();
    let tile = getTile(ship.startPosX, ship.startPosY);
    if (ship.isVertical) {
      image.src = shipImgSrcMap.get(ship.name)[0];
      image.classList.add("centered-ship-vertical");
    } else {
      image.src = shipImgSrcMap.get(ship.name)[1];
      image.classList.add("centered-ship-horizontal");
    }

    tile.appendChild(image);
  }
  function drawGrid(callback) {
    let grid = document.createElement("div");
    grid.classList.add("grid");

    for (let y = 10; y > 0; y--) {
      for (let x = 1; x < 11; x++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.x = x;
        tile.dataset.y = y;
        if (callback) {
          callback(tile);
        }
        grid.appendChild(tile);
      }
    }

    return grid;
  }

  function getTile(x, y, isPlayer = true) {
    let array = [];
    let nodeList = null;
    if (isPlayer) {
      let playerGrid = document.querySelector(".player-grid");
      nodeList = playerGrid.querySelectorAll(`[data-x="${x}"]`);
    } else {
      let computerGrid = document.querySelector(".computer-grid");
      nodeList = computerGrid.querySelectorAll(`[data-x="${x}"]`);
    }

    array = Array.from(nodeList);
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
    setGameLoopScreen,
    clearElement,
    placeShipOnGridGameLoop,
    tileHit,
    tileMiss,
    gameover,
    aiming,
  };
}

module.exports = DOMControllerFactory;
