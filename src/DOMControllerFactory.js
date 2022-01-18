function DOMControllerFactory() {
  const mainDiv = document.querySelector('main');
  function loadStartScreen(callback) {
    let subtitle = document.createElement('h2');
    let input = document.createElement('input');
    let button = document.createElement('button');
    subtitle.textContent = 'Enter Player Name:';
    input.type = 'text';
    input.id = 'player-name-input';
    button.id = 'start-game-button';
    button.textContent = 'Start Game';
    mainDiv.appendChild(subtitle);
    mainDiv.appendChild(input);
    mainDiv.appendChild(button);
    callback(button);
  }

  function loadGameScreen(callback) {
    let playerName = document.querySelector('#player-name-input').value;
    mainDiv.innerHTML = '';
    mainDiv.innerHTML = 'Loaded';
    callback();
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
    const logoDiv = document.querySelector('header');
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
  return { loadStartScreen, fadeIn, fadeInLogo, fadeOut, loadGameScreen };
}

module.exports = DOMControllerFactory;
