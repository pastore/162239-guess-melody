import AbstractView from '../../../utils/AbstractView';
import {tick, COUNT_GAME_TIME} from '../../../data/data';
import createGameLevel from '../../../data/createGameLevel';
import initializeCountdown from '../../../timer';
import initializePlayer from '../../../player';

export default class ArtistLevelView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    this._level = createGameLevel(this.state.level);
    let minutes = Math.floor(this.state.time / 60);
    let secundes = this.state.time % 60;

    const length = 2 * Math.PI * 370;
    const stepLength = length / COUNT_GAME_TIME;
    const lengthToClear = stepLength * (COUNT_GAME_TIME - this.state.time);

    return `<section class="main main--level main--level-artist">
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
    <circle
      cx="390" cy="390" r="370"
      class="timer-line"
      style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center" stroke-dasharray=${length.toString()} stroke-dashoffset=${lengthToClear.toString()}></circle>

    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins">${this._utils.addLeadingZero(minutes)}</span><!--
      --><span class="timer-value-dots">:</span><!--
      --><span class="timer-value-secs">${this._utils.addLeadingZero(secundes)}</span>
    </div>
    </svg>

    <div class="main-wrap">
    <div class="main-timer"></div>

    <h2 class="title main-title">Кто исполняет эту песню?</h2>
    <div class="player-wrapper" data-right-answer="${this._level.rightAnswer.id}"></div>
    <form class="main-list">
    ${this._utils.createArtistAnswers(this._level)}
    </form>
    </div>
    </section>`;
  }

  get _utils() {
    return {
      createArtistAnswers: (level) => {
        return level.answers.map((answer) => {
          return `<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="a-${answer.id}" name="answer" value="${answer.id}" />
          <label class="main-answer" for="a-${answer.id}">
          <img class="main-answer-preview" src="" data-answer="${answer.id}">
          ${answer.author}
          </label>
          </div>`;
        }).join(``);
      },
      addLeadingZero: (val) => val < 10 ? `0${val}` : val
    };
  }

  bind() {
    const answerButtonsWrapper = this.element.querySelector(`.main-list`);
    const rightAnswer = this.element.querySelector(`[data-right-answer]`);

    initializePlayer(rightAnswer, this._level.rightAnswer.path);
    initializeCountdown(this.element, (COUNT_GAME_TIME - this.state.time), COUNT_GAME_TIME);

    answerButtonsWrapper.addEventListener(`click`, (event) => {
      const itemValue = event.target.dataset.answer;
      if (event.target.tagName.toLowerCase() === `img`) {

        const timer = document.querySelector(`.timer-value`);
        let minutes = timer.querySelector(`.timer-value-mins`).textContent;
        let secundes = timer.querySelector(`.timer-value-secs`).textContent;
        let time = (parseInt(minutes, 10) * 60) + parseInt(secundes, 10);
        this.state = tick(this.state, time);

        this.onAnswer(itemValue === rightAnswer.dataset.rightAnswer);
      }
    });
  }
}

