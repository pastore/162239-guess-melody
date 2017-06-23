import {initialState, setNextLevel, setLives, addPassedLevel, setTime, COUNT_GAME_LEVELS, TIME_GAME_OVER} from '../../data/data';
import ArtistLevelView from './views/ArtistLevelView';
import GenreLevelView from './views/GenreLevelView';
import SuccessResultView from '../result/views/SuccessResultView';
import FailResultView from '../result/views/FailResultView';
import levelType from '../../data/types/levelType';
import changeView from '../../utils/changeView';

export default class GameController {
  constructor(state = initialState) {
    this.state = state;
    this.setLevelView();
  }

  init() {
    changeView(this.view);

    this.view.onAnswer = (answer) => {
      this.view.unbind();
      if (answer === true) {
        this.state = setTime(this.state, this.view.state.time);
        if (this.state.time === TIME_GAME_OVER) {
          this.view = new FailResultView(this.state);
          this.view.onRepeat = this.onRepeat.bind(this);
        } else {
          this.state = addPassedLevel(this.state);
          if (this.state.countPassedLevels === COUNT_GAME_LEVELS) {
            this.view = new SuccessResultView(this.state);
            this.view.onRepeat = this.onRepeat.bind(this);
          } else {
            this.state = setNextLevel(this.state);
            this.setLevelView();
          }
        }
      } else {
        this.state = setTime(this.state, this.view.state.time);
        if (this.state.time === TIME_GAME_OVER) {
          this.view = new FailResultView(this.state);
          this.view.onRepeat = this.onRepeat.bind(this);
        } else {
          let tempLives = this.state.lives - 1;
          this.state = setLives(this.state, tempLives);
          if (this.state.lives === 0) {
            this.view = new FailResultView(this.state);
            this.view.onRepeat = this.onRepeat.bind(this);
          } else {
            this.state = setNextLevel(this.state);
            this.setLevelView();
          }
        }
      }
      this.init();
    };
  }

  onRepeat() {
    this.state = Object.assign({}, initialState);
    this.setLevelView();
    this.init();
  }

  setLevelView() {
    switch (this.state.level) {
      case levelType.Artist:
        this.view = new ArtistLevelView(this.state);
        break;
      case levelType.Genre:
        this.view = new GenreLevelView(this.state);
        break;
    }
  }
}


