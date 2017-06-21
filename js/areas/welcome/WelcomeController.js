import changeView from '../../utils/changeView';
import WelcomeView from './views/WelcomeView';
import App, {ControllerType} from '../../main';

export default class WelcomeController {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    changeView(this.view);

    this.view.onStart = () => {
      App.changeHash(ControllerType.GAME);
    };
  }
}
