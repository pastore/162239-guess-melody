import logoTemplate from '../parts/logoTemplate';
import renderScreen from '../../utils/renderScreen';

const welcomeTemplate = (level) => `<section class="main main--welcome">
  ${logoTemplate()}
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;2 минуты дать
    максимальное количество правильных ответов.<br>
    Удачи!
  </p>
  </section>`;

export default welcomeTemplate;

export const welcomeHandler = function (template, state) {
    const playButton = document.querySelector(`.main-play`);
    playButton.addEventListener(`click`, startGame.bind(playButton, template, state));
};

const startGame = function (...args) {
    const [template, state] = args;
    renderScreen(template, Object.assign({}, state, {}));
    this.removeEventListener(`click`, startGame.bind(this, template, state));
};