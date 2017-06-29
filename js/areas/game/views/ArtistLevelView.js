import BaseView from '../../../core/BaseView';
import ManageState from '../../../core/state';
import initializePlayer from '../../../player';
import timerTemplate from '../../../templates/timerTemplate';

export default class ArtistLevelView extends BaseView {
  constructor(state, question) {
    super();
    this.state = state;
    this.question = question;
  }

  get template() {
    return `<section class="main main--level main--level-artist">
    ${timerTemplate(this.state.time)}
    <div class="main-wrap">
      <div class="main-timer"></div>
      <h2 class="title main-title">${this.question.question}</h2>
      <div class="player-wrapper"></div>
      <form class="main-list">
        ${this._createArtistAnswers(this.question)}
      </form>
    </div>
    </section>`;
  }

  bind() {
    this._answerButtonsWrapper = this.element.querySelector(`.main-list`);
    this._player = this.element.querySelector(`.player-wrapper`);

    this._removePlayer = initializePlayer(this._player, this.question.src);
    this._answerButtonsWrapper.addEventListener(`click`, this._handleAnswer.bind(this));
  }

  unbind() {
    this._answerButtonsWrapper.removeEventListener(`click`, this._handleAnswer.bind(this));
    this._removePlayer();
  }

  _createArtistAnswers(question) {
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

  _handleAnswer(event) {
    const itemValue = event.target.dataset.answer;
    if (event.target.tagName.toLowerCase() === `img`) {
      const timer = document.querySelector(`.timer-value`);
      const minutes = timer.querySelector(`.timer-value-mins`).textContent;
      const secundes = timer.querySelector(`.timer-value-secs`).textContent;
      const time = (parseInt(minutes, 10) * 60) + parseInt(secundes, 10);
      this.state = ManageState.setTime(this.state, time);

      this.onAnswer(itemValue === `true`);
    }
  }
}
