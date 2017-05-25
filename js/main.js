'use strict';

let template = document.querySelector("#templates"),
    screens = template.content.querySelectorAll(".main"),
    sectionMain = document.querySelector("section.main"),
    arrowKeys = { Left: 37, Right: 39 },
    currentScreen = 4,
    showScreen = (numberScreen = currentScreen) => {
        var parse = parseInt(numberScreen) || 4;
        if (parse >= 0 && parse < screens.length) {
            sectionMain.innerHTML = screens[parse].innerHTML;
        }
    };

document.addEventListener("keyup", function (e) {
    let keyCode = e.keyCode;

    if (e.altKey){
        switch (keyCode){
            case arrowKeys.Left:
                --currentScreen;
                if (currentScreen == -1){
                    currentScreen = screens.length - 1;;
                }
                showScreen();
                break;
            case arrowKeys.Right:
                ++currentScreen;
                if (currentScreen == screens.length) {
                    currentScreen = 0;
                }
                showScreen();
                break;
        }
    }
});

showScreen();
