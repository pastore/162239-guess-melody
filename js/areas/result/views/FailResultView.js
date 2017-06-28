import BaseView from '../../../core/BaseView';
import logoTemplate from '../../../templates/logoTemplate';

export default class FailResultView extends BaseView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    return `<section class="main main--result">
      ${logoTemplate()}
      <h2 class="title">Вы проиграли</h2>
      <div class="main-stat">Ничего, вам повезет в следующий раз</div>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }

  bind() {
    const playAgainButton = this.element.querySelector(`.main-replay`);
    playAgainButton.addEventListener(`click`, () => {
      this.onRepeat();
    });
  }
}
