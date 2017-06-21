import AbstractView from '../../../utils/AbstractView';
import {getStatistics} from '../../../data/data';

export default class SuccessResultView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    const tempStatistics = getStatistics(this.state);
    return `<section class="main main--result">
      ${this._utils.logoTemplate()}
      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;${this.state.time}&nbsp;секунд<br>вы&nbsp;отгадали ${this.state.countPassedLevels}&nbsp;мелодии</div>
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

