import BaseView from '../../../core/BaseView';
import {getStatistics} from '../../../core/statistics';
import gameConstans from '../../../core/types/gameConstans';
import App from '../../../main';

export default class SuccessResultView extends BaseView {
    constructor(statistics) {
        super();
        debugger;
    this.statistics = statistics;
    this.lastStat = this.statistics[this.statistics.length - 1];
  }
  get template() {
    return `<section class="main main--result">
      ${this.logoTemplate()}
      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;${gameConstans.COUNT_GAME_TIME - this.lastStat.time}&nbsp;секунд<br>вы&nbsp;набрали ${this.lastStat.answers}&nbsp;балов</div>
      <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${this.formatStatistics()}%&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }

  logoTemplate() {
    return `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>`;
  }

  bind() {
    const playAgainButton = this.element.querySelector(`.main-replay`);
    playAgainButton.addEventListener(`click`, () => {
      this.onRepeat();
    });
  }

  formatStatistics() {
    this.statistics.sort((a, b) => {
      if (b.answers > a.answers) {
          return 1;
      } else if (b.answers < a.answers) {
          return -1;
      }

      if (b.time < a.time) {
          return 1;
      } else if (b.time > a.time) {
          return -1;
      } else {
          return 0;
      }
    });
    return Math.floor(((this.statistics.length - 1) - this.statistics.indexOf(this.lastStat)) * (100 / this.statistics.length));
  }
}

