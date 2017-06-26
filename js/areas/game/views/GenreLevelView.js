import BaseView from '../../../core/BaseView';
import ManageState from '../../../core/state';
import gameConstans from '../../../core/types/gameConstans';
import {addLeadingZero} from '../../../timer';
import initializePlayer from '../../../player';

export default class GenreLevelView extends BaseView {
  constructor(state, question) {
    super();
    this.state = state;
    this.question = question;
  }
  get template() {
    let minutes = Math.floor(this.state.time / 60);
    let secundes = this.state.time % 60;

    const length = 2 * Math.PI * 370;
    const stepLength = length / gameConstans.COUNT_GAME_TIME;
    const lengthToClear = stepLength * (gameConstans.COUNT_GAME_TIME - this.state.time);

    return `<section class="main main--level main--level-genre">
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
    <circle
      cx="390" cy="390" r="370"
      class="timer-line"
      style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center" stroke-dasharray=${length.toString()} stroke-dashoffset=${lengthToClear.toString()}></circle>

    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins">${addLeadingZero(minutes)}</span><!--
      --><span class="timer-value-dots">:</span><!--
      --><span class="timer-value-secs">${addLeadingZero(secundes)}</span>
    </div>
    </svg>

    <div class="main-wrap">
    <div class="main-timer"></div>

    <h2 class="title">${this.question.question}</h2>
    <form class="genre">
    ${this.createGenreAnswers(this.question)}
      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
    </section>`;
  }

  createGenreAnswers(question) {
    return question.answers.map((answer) => {
      let randomId = Math.random().toString(36).substr(2, 9);
      return `<div class="genre-answer">
      <div class="player-wrapper"></div>
      <input type="checkbox" name="answer" value="${answer.genre === question.genre}" id="a-${randomId}">
      <label class="genre-answer-check" for="a-${randomId}"></label>
      </div>`;
    }).join(``);
  }

  bind() {
    this._sendAnswerButton = this.element.querySelector(`.genre-answer-send`);
    this._palyerWrappers = this.element.querySelectorAll(`.player-wrapper`);
    this.removePlayers = [];
    [...this._palyerWrappers].forEach((wrapper, index) => {
      this.removePlayers[index] = initializePlayer(wrapper, this.question.answers[index].src);
    });

    this._sendAnswerButton.addEventListener(`click`, this.handleAnswer.bind(this));
  }

  unbind() {
    this._sendAnswerButton.removeEventListener(`click`, this.handleAnswer.bind(this));
    this.removePlayers.forEach((item, index) => {
      item();
    });
  }

  handleAnswer(event) {
    event.preventDefault();
    const checkedAnswers = document.querySelectorAll(`input[name='answer']:checked`);
    let isRightAnswer = false;

    if (checkedAnswers.length > 0) {
      isRightAnswer = [...checkedAnswers].every(function (input) {
        return input.value === `true`;
      });

      const timer = document.querySelector(`.timer-value`);
      let minutes = timer.querySelector(`.timer-value-mins`).textContent;
      let secundes = timer.querySelector(`.timer-value-secs`).textContent;
      let time = (parseInt(minutes, 10) * 60) + parseInt(secundes, 10);
      this.state = ManageState.setTime(this.state, time);

      this.onAnswer(isRightAnswer);
      [...checkedAnswers].forEach((item) => {
        item.checked = false;
      });
    }
  }
}


