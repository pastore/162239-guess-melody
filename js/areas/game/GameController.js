import ManageState, {initialState} from '../../core/state';
import ArtistLevelView from './views/ArtistLevelView';
import GenreLevelView from './views/GenreLevelView';
import SuccessResultView from '../result/views/SuccessResultView';
import FailResultView from '../result/views/FailResultView';
import levelType from '../../core/types/levelType';
import resultType from '../../core/types/resultType';
import gameConstans from '../../core/types/gameConstans';
import changeView from '../../utils/changeView';
import initializeCountdown from '../../timer';

export default class GameController {
  constructor(model, state = initialState) {
    this.model = model;
    this.state = state;
    this.setLevelView();
  }

  init() {
    this._removeTimer = initializeCountdown(this.view.element, (gameConstans.COUNT_GAME_TIME - this.state.time), gameConstans.COUNT_GAME_TIME, this.fail.bind(this));
    changeView(this.view);

    this.view.onAnswer = (answer) => {
      this.view.unbind();
      this.state = ManageState.setTime(this.state, this.view.state.time);
      this.state = ManageState.addPassedLevel(this.state);
      const result = this.getResult(answer);

      switch (result) {
        case resultType.SUCCESS:
          this.view = new SuccessResultView(this.state);
          this.view.onRepeat = this.onRepeat.bind(this);
          this._removeTimer();
          changeView(this.view);
          break;
        case resultType.FAIL:
          this.fail();
          break;
        case resultType.NEXT:
          this.state = ManageState.setNextLevel(this.state);
          this.setLevelView();
          this.init();
          break;
      }
    };
  }

  getResult(answer) {
    if (answer === `true`) {
      if (this.state.time === gameConstans.TIME_GAME_OVER) {
        return resultType.FAIL;
      } else {
        if (this.state.countPassedLevels === gameConstans.COUNT_GAME_LEVELS) {
          return resultType.SUCCESS;
        } else {
          return resultType.NEXT;
        }
      }
    } else {
      if (this.state.time === gameConstans.TIME_GAME_OVER) {
        return resultType.FAIL;
      } else {
        let tempLives = this.state.lives - 1;
        this.state = ManageState.setLives(this.state, tempLives);
        if (this.state.lives === gameConstans.COUNT_LIVES_GAME_OVER) {
          return resultType.FAIL;
        } else {
          return resultType.NEXT;
        }
      }
    }
  }

  onRepeat() {
    this.state = Object.assign({}, initialState);
    this.model.shuffle();
    this.setLevelView();
    this.init();
  }

  setLevelView() {
    let question = this.model.getNextQuestion();
    switch (question.type) {
      case levelType.Artist:
        this.view = new ArtistLevelView(this.state, question);
        break;
      case levelType.Genre:
        this.view = new GenreLevelView(this.state, question);
        break;
    }
  }

  fail() {
    this.view = new FailResultView(this.state);
    this.view.onRepeat = this.onRepeat.bind(this);
    this._removeTimer();
    changeView(this.view);
  }
}


