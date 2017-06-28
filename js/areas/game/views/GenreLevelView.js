import BaseView from '../../../core/BaseView';
import ManageState from '../../../core/state';
import initializePlayer from '../../../player';
import timerTemplate from '../../../templates/timerTemplate';

export default class GenreLevelView extends BaseView {
  constructor(state, question) {
    super();
    this.state = state;
    this.question = question;
  }
  get template() {
    return `<section class="main main--level main--level-genre">
     ${timerTemplate(this.state.time)}

    <div class="main-wrap">
    <div class="main-timer"></div>

    <h2 class="title">${this.question.question}</h2>
    <form class="genre">
      ${this._createGenreAnswers(this.question)}
      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
    </section>`;
  }

  bind() {
    this._sendAnswerButton = this.element.querySelector(`.genre-answer-send`);
    this._palyerWrappers = this.element.querySelectorAll(`.player-wrapper`);
    this.removePlayers = [];
    [...this._palyerWrappers].forEach((wrapper, index) => {
      this.removePlayers[index] = initializePlayer(wrapper, this.question.answers[index].src);
    });

    this._sendAnswerButton.addEventListener(`click`, this._handleAnswer.bind(this));
  }

  unbind() {
    this._sendAnswerButton.removeEventListener(`click`, this._handleAnswer.bind(this));
    this.removePlayers.forEach((item, index) => {
      item();
    });
  }

  _createGenreAnswers(question) {
    return question.answers.map((answer) => {
      let randomId = Math.random().toString(36).substr(2, 9);
      return `<div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="${answer.genre === question.genre}" id="a-${randomId}">
        <label class="genre-answer-check" for="a-${randomId}"></label>
        </div>`;
    }).join(``);
  }

  _handleAnswer(event) {
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


