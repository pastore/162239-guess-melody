import AbstractView from '../../../utils/AbstractView';

export default class FailResultView extends AbstractView {
    constructor(state) {
        super();
        this.state = state;
    }
    get template() {
        return `<section class="main main--result">
          ${this._utils.logoTemplate()}
          <h2 class="title">Вы проиграли</h2>
          <div class="main-stat">Ничего, вам повезет в следующий раз</div>
          <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
        </section>`;
    }

    get _utils() {
        return {
            logoTemplate: () => {
                return `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>`;
            }
        };
    }

    bind() {
        const playAgainButton = this.element.querySelector(`.main-replay`);
        playAgainButton.addEventListener(`click`, () => {
            this.onRepeat();
        });
    }
}