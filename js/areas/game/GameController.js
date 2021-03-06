import ManageState, {initialState} from '../../core/state';
import ArtistLevelView from './views/ArtistLevelView';
import GenreLevelView from './views/GenreLevelView';
import SuccessResultView from '../result/views/SuccessResultView';
import FailResultView from '../result/views/FailResultView';
import levelType from '../../core/types/levelType';
import resultType from '../../core/types/resultType';
import pointType from '../../core/types/pointType';
import gameConstans from '../../core/types/gameConstans';
import GameAdapter from '../../core/GameAdapter';
import changeView from '../../utils/changeView';
import shuffleArray from '../../utils/shuffleArray';
import initializeCountdown from '../../timer';

export default class GameController {
  constructor(model, state = initialState) {
    this.model = model;
    this.state = state;
    this._prevTimeAnswer = gameConstans.COUNT_GAME_TIME;
    this._setLevelView();
  }

  init() {
    this._removeTimer = initializeCountdown(this.view.element, (gameConstans.COUNT_GAME_TIME - this.state.time), gameConstans.COUNT_GAME_TIME, this.fail.bind(this));
    changeView(this.view);

    this.view.onAnswer = (answer) => {
      this.view.unbind();
      this.state = ManageState.setTime(this.state, this.view.state.time);
      this.state = ManageState.addPassedLevel(this.state);
      const result = this._getResult(answer);

      switch (result) {
        case resultType.SUCCESS:
          this.success();
          break;
        case resultType.FAIL:
          this.fail();
          break;
        case resultType.NEXT:
          this.next();
          break;
      }
    };
  }

  success() {
    this.state = ManageState.setPoints(this.state, (this._prevTimeAnswer - this.state.time) < gameConstans.TIME_DOUBLE_POINTS ? pointType.DOUBLE : pointType.ONE);
    this.model.sendResult(this.state, GameAdapter).then(() => {
      this.model
        .loadResults()
        .then((data) => {
          this.view = new SuccessResultView(data);
          this.view.onRepeat = this._onRepeat.bind(this);
          this._removeTimer();
          this._prevTimeAnswer = gameConstans.COUNT_GAME_TIME;
        })
        .then(() => {
          changeView(this.view);
        });
    });
  }

  fail() {
    this.view = new FailResultView(this.state);
    this.view.onRepeat = this._onRepeat.bind(this);
    this._removeTimer();
    this._prevTimeAnswer = gameConstans.COUNT_GAME_TIME;
    changeView(this.view);
  }

  next() {
    this.state = ManageState.setPoints(this.state, (this._prevTimeAnswer - this.state.time) < gameConstans.TIME_DOUBLE_POINTS ? pointType.DOUBLE : pointType.ONE);
    this._removeTimer();
    this._prevTimeAnswer = this.state.time;
    this._setLevelView();
    this.init();
  }

  _getResult(isAnswerTrue) {
    if (this.state.time === gameConstans.TIME_GAME_OVER) {
      return resultType.FAIL;
    }
    if (isAnswerTrue) {
      if (this.state.countPassedLevels === gameConstans.COUNT_GAME_LEVELS) {
        return resultType.SUCCESS;
      } else {
        return resultType.NEXT;
      }
    } else {
      const tempLives = this.state.lives - 1;
      this.state = ManageState.setLives(this.state, tempLives);
      if (this.state.lives === 0) {
        return resultType.FAIL;
      } else {
        return resultType.NEXT;
      }
    }
  }

  _onRepeat() {
    this.state = Object.assign({}, initialState);
    this.model.questions = shuffleArray(this.model.questions);
    this._setLevelView();
    this.init();
  }

  _setLevelView() {
    const question = this.model.getNextQuestion();
    switch (question.type) {
      case levelType.Artist:
        this.view = new ArtistLevelView(this.state, question);
        break;
      case levelType.Genre:
        this.view = new GenreLevelView(this.state, question);
        break;
    }
    this.state = ManageState.setNextLevel(this.state, question.type);
  }
}


