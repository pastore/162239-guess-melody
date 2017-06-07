import logoTemplate from '../parts/logoTemplate';

const successResultTemplate = (level) => {
  return `<section class="main main--result">
  ${logoTemplate()}
  <h2 class="title">Вы настоящий меломан!</h2>
  <div class="main-stat">За&nbsp;2&nbsp;минуты<br>вы&nbsp;отгадали 4&nbsp;мелодии</div>
  <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>
  <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;
};

export default successResultTemplate;
