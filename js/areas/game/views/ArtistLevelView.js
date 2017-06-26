import BaseView from '../../../core/BaseView';
import ManageState from '../../../core/state';
import gameConstans from '../../../core/types/gameConstans';
import {addLeadingZero} from '../../../timer';
import initializePlayer from '../../../player';

export default class ArtistLevelView extends BaseView {
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

    return `<section class="main main--level main--level-artist">
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

    <h2 class="title main-title">${this.question.question}</h2>
    <div class="player-wrapper"></div>
    <form class="main-list">
    ${this.createArtistAnswers(this.question)}
    </form>
    </div>
    </section>`;
  }

  createArtistAnswers(question) {
    return question.answers.map((answer) => {
      return `<div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="a-${answer.title}" name="answer" value="${answer.isCorrect}" />
      <label class="main-answer" for="a-${answer.title}">
      <img class="main-answer-preview" src="${answer.image.url}" data-answer="${answer.isCorrect}"  width="${answer.image.width}" height="${answer.image.height}">
      ${answer.title}
      </label>
      </div>`;
    }).join(``);
  }

  bind() {
    this._answerButtonsWrapper = this.element.querySelector(`.main-list`);
    this._player = this.element.querySelector(`.player-wrapper`);

    this._removePlayer = initializePlayer(this._player, this.question.src);
    // this._removeTimer = initializeCountdown(this.element, (gameConstans.COUNT_GAME_TIME - this.state.time), gameConstans.COUNT_GAME_TIME);
    this._answerButtonsWrapper.addEventListener(`click`, this.handleAnswer.bind(this));
  }

  unbind() {
    this._answerButtonsWrapper.removeEventListener(`click`, this.handleAnswer.bind(this));
    // this._removeTimer();
    this._removePlayer();
  }

  handleAnswer(event) {
    const itemValue = event.target.dataset.answer;
    if (event.target.tagName.toLowerCase() === `img`) {
      const timer = document.querySelector(`.timer-value`);
      let minutes = timer.querySelector(`.timer-value-mins`).textContent;
      let secundes = timer.querySelector(`.timer-value-secs`).textContent;
      let time = (parseInt(minutes, 10) * 60) + parseInt(secundes, 10);
      this.state = ManageState.setTime(this.state, time);

      this.onAnswer(itemValue);
    }
  }
}


