import BaseView from '../../../core/BaseView';
import gameConstans from '../../../core/types/gameConstans';
import logoTemplate from '../../../templates/logoTemplate';

export default class SuccessResultView extends BaseView {
  constructor(statistics) {
    super();
    this._statistics = statistics;
    this._lastStat = this._statistics[this._statistics.length - 1];
  }
  get template() {
    return `<section class="main main--result">
      ${logoTemplate()}
      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;${gameConstans.COUNT_GAME_TIME - this._lastStat.time}&nbsp;секунд<br>вы&nbsp;набрали ${this._lastStat.answers}&nbsp;балов</div>
      <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${this._formatStatistics()}%&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }

  bind() {
    const playAgainButton = this.element.querySelector(`.main-replay`);
    playAgainButton.addEventListener(`click`, () => {
      this.onRepeat();
    });
  }

  _formatStatistics() {
    let countWorseResults = this._statistics.reduce((count, current) => {
      if (current.answers < this._lastStat.answers) {
        return ++count;
      } else if (current.answers === this._lastStat.answers && current.time < this._lastStat.time) {
        return ++count;
      }
      return count;
    }, 0);
    return Math.floor((countWorseResults) * (100 / this._statistics.length));
  }
}
