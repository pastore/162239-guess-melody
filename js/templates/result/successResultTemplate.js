import logoTemplate from '../parts/logoTemplate';
import {getStatistics} from '../../data/data';

const successResultTemplate = (level, state) => {
  const tempStatistics = getStatistics(state);
  return `<section class="main main--result">
  ${logoTemplate()}
  <h2 class="title">Вы настоящий меломан!</h2>
  <div class="main-stat">За&nbsp;${state.time}&nbsp;секунд<br>вы&nbsp;отгадали ${state.countPassedLevels}&nbsp;мелодии</div>
  <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${tempStatistics}%&nbsp;игроков</span>
  <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;
};

export default successResultTemplate;
