const template = document.querySelector(`#templates`);
const screens = template.content.querySelectorAll(`.main`);
const arrayOrders = [4, 3, 0, 1, 2];
const orderedScreens = [];
[...screens].forEach((screen, indexScreen) => {
  const tempIndex = arrayOrders.indexOf(indexScreen);
  orderedScreens[tempIndex] = screen;
});
const sectionMain = document.querySelector(`section.main`);
const arrowKeys = {Left: 37, Right: 39};
const SCREEN_WELCOME_INDEX = 0;
let currentScreen = SCREEN_WELCOME_INDEX;
const showScreen = (numberScreen = currentScreen) => {
  const parse = isNaN(parseInt(numberScreen, 10)) ? SCREEN_WELCOME_INDEX : parseInt(numberScreen, 10);
  if (parse >= 0 && parse < orderedScreens.length) {
    sectionMain.innerHTML = orderedScreens[parse].innerHTML;
  }
};

document.addEventListener(`keyup`, function (e) {
  const keyCode = e.keyCode;
  if (e.altKey) {
    switch (keyCode) {
      case arrowKeys.Left:
        currentScreen--;
        if (currentScreen === -1) {
          currentScreen = orderedScreens.length - 1;
        }
        showScreen();
        break;
      case arrowKeys.Right:
        currentScreen++;
        if (currentScreen === orderedScreens.length) {
          currentScreen = 0;
        }
        showScreen();
        break;
    }
  }
});

showScreen();
