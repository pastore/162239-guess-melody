import WelcomeController from './areas/welcome/WelcomeController';
import GameController from './areas/game/GameController';
import BaseModel from './core/BaseModel';
import controllerType from './core/types/controllerType';

const getContollerTypeFromHash = (hash) => hash.replace(`#`, ``);

class App {
  constructor() {
    this.model = new class extends BaseModel {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/questions`;
      }

      get urlWrite() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/stats/id162239`;
      }
    }();
    this.model
      .load(this.model.urlRead)
      .then((data) => this.setup(data))
      .then(() => this.changeController(getContollerTypeFromHash(location.hash)))
      .catch(window.console.error);
  }

  setup(data) {
    this.model.questions = data;
    this.routes = {
      [controllerType.WELCOME]: new WelcomeController(),
      [controllerType.GAME]: new GameController(this.model)
    };
    window.onhashchange = () => {
      this.changeController(getContollerTypeFromHash(location.hash));
    };
  }

  changeController(route = ``) {
    this.routes[route].init();
  }

  changeHash(hash) {
    location.hash = hash;
  }

  init() {
    this.changeController(getContollerTypeFromHash(location.hash));
  }
}

const app = new App();

export default app;


