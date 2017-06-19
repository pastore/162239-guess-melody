import WelcomeController from './areas/welcome/WelcomeController';
import GameController from './areas/game/GameController';

const ControllerType = {
    WELCOME: ``,
    GAME: `game`
};
export {ControllerType};
const getContollerTypeFromHash = (hash) => hash.replace(`#`, ``);

class App {
    constructor() {
        this.routes = {
            [ControllerType.WELCOME]: WelcomeController,
            [ControllerType.GAME]: GameController
        };
        window.onhashchange = () => {
            this.changeController(getContollerTypeFromHash(location.hash));
        };
    }

    changeController(route = ``) {
        var Controller = this.routes[route];
        new Controller().init();
    }

    changeHash(hash) {
        location.hash = hash;
    }

    init() {
        this.changeController(getContollerTypeFromHash(location.hash));
    }
}

const app = new App();
app.init();

export default app;

