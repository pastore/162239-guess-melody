import BaseView from '../../../core/BaseView';
import { getStatistics } from '../../../core/statistics';
import gameConstans from '../../../core/types/gameConstans';

export default class SuccessResultView extends BaseView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    const tempStatistics = getStatistics(this.state);
    return `<section class="main main--result">
      ${this.logoTemplate()}
      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;${gameConstans.COUNT_GAME_TIME - this.state.time}&nbsp;секунд<br>вы&nbsp;отгадали ${this.state.countPassedLevels}&nbsp;мелодии</div>
      <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${tempStatistics}%&nbsp;игроков</span>
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
}

