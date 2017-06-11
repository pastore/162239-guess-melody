import logoTemplate from '../parts/logoTemplate';

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

