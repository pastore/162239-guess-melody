import AbstractView from '../../../utils/AbstractView';
import {tick} from '../../../data/data';
import createGameLevel from '../../../data/createGameLevel';

export default class GenreLevelView extends AbstractView {
    constructor(state) {
        super();
        this.state = state;
    }
    get template() {
        this._level = createGameLevel(this.state.level);
        let minutes = Math.floor(this.state.time / 60);
        let secundes = this.state.time % 60;
        return `<section class="main main--level main--level-genre">
          <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">${this._utils.addLeadingZero(minutes)}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${this._utils.addLeadingZero(secundes)}</span>
        </div>
        </svg>

        <div class="main-wrap">
        <div class="main-timer"></div>

          <h2 class="title">Выберите ${this._level.rightAnswer.genre} треки</h2>
          <form class="genre">
          ${this._utils.createGenreAnswers(this._level)}
           <button class="genre-answer-send" type="submit">Ответить</button>
          </form>
          </section>`;
    }

    get _utils() {
        return {
            createGenreAnswers: (level) => {
                return level.answers.map((answer) => {
                    return `<div class="genre-answer">
                    <div class="player-wrapper"></div>
                    <input type="checkbox" name="answer" value="${answer.genre === level.rightAnswer.genre}" id="a-${answer.id}">
                    <label class="genre-answer-check" for="a-${answer.id}"></label>
                    </div>`;
                }).join(``);
            },
            addLeadingZero: (val) => val < 10 ? `0${val}` : val
        };
    }

    bind() {
        const sendAnswerButton = this.element.querySelector(`.genre-answer-send`);
        const palyerWrappers = this.element.querySelectorAll(`.player-wrapper`);
        [...palyerWrappers].forEach((wrapper, index) => {
            window.initializePlayer(wrapper, this._level.answers[index].path);
        });

        sendAnswerButton.addEventListener(`click`, (e) => {
            e.preventDefault();
            const checkedAnswers = document.querySelectorAll(`input[name='answer']:checked`);
            let isRightAnswer = false;

            if (checkedAnswers.length > 0) {
                isRightAnswer = [...checkedAnswers].every(function (input) {
                    return input.value === `true`;
                });

                const timer = document.querySelector(`.timer-value`);
                let minutes = timer.querySelector(`.timer-value-mins`).textContent;
                let secundes = timer.querySelector(`.timer-value-secs`).textContent;
                let time = (parseInt(minutes, 10) * 60) + parseInt(secundes);
                this.state = tick(this.state, time);

                this.onAnswer(isRightAnswer);
                [...checkedAnswers].forEach((item) => {
                    item.checked = false;
                });
            }
        });
    }
}