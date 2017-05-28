import createElementFromTemplate from './createElementFromTemplate';
import showScreen from './showScreen';
import screenLevelArtist from './main--level-artist';

const screenWelcome = createElementFromTemplate(`<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;2 минуты дать
    максимальное количество правильных ответов.<br>
    Удачи!
  </p>
  </section>`);

const playButton = screenWelcome.querySelector(`.main-play`);

playButton.addEventListener(`click`, () => {
  showScreen(screenLevelArtist);
});

export default screenWelcome;
