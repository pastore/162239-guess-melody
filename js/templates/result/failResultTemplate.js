import logoTemplate from '../parts/logoTemplate';

const failResultTemplate = (level) => {
  return `<section class="main main--result">
  ${logoTemplate()}
  <h2 class="title">Вы проиграли</h2>
  <div class="main-stat">Ничего, вам повезет в следующий раз</div>
  <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;
};

export default failResultTemplate;


