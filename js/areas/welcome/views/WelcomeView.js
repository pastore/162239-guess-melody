import BaseView from '../../../core/BaseView';
import logoTemplate from '../../../templates/logoTemplate';

export default class WelcomeView extends BaseView {
  get template() {
    return `<section class="main main--welcome">
      ${logoTemplate()}
      <button class="main-play">Начать игру</button>
      <h2 class="title main-title">Правила игры</h2>
      <p class="text main-text">
        Правила просты&nbsp;— за&nbsp;2 минуты дать
        максимальное количество правильных ответов.<br>
        Удачи!
      </p>
    </section>`;
  }

  bind() {
    const playButton = this.element.querySelector(`.main-play`);
    playButton.addEventListener(`click`, () => {
      this.onStart();
    });
  }
}
