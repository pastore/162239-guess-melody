const template = document.querySelector(`#templates`);
const screens = template.content.querySelectorAll(`.main`);
const sectionMain = document.querySelector(`section.main`);
const arrowKeys = {Left: 37, Right: 39};
let currentScreen = 4;
const showScreen = (numberScreen = currentScreen) => {
  const parse = parseInt(numberScreen, 10) || 4;
  if (parse >= 0 && parse < screens.length) {
    sectionMain.innerHTML = screens[parse].innerHTML;
  }
};

document.addEventListener(`keyup`, function (e) {
  const keyCode = e.keyCode;
  if (e.altKey) {
    switch (keyCode) {
      case arrowKeys.Left:
        --currentScreen;
        if (currentScreen === -1) {
          currentScreen = screens.length - 1;
        }
        showScreen();
        break;
      case arrowKeys.Right:
        ++currentScreen;
        if (currentScreen === screens.length) {
          currentScreen = 0;
        }
        showScreen();
        break;
    }
  }
});

showScreen();
