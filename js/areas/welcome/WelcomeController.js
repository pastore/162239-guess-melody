import changeView from '../../utils/changeView';
import WelcomeView from './views/WelcomeView';
import App from '../../main';
import controllerType from '../../core/types/controllerType';

export default class WelcomeController {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    changeView(this.view);

    this.view.onStart = () => {
      App.changeHash(controllerType.GAME);
    };
  }
}
