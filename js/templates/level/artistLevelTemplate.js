import createArtistAnswers from '../../utils/createArtistAnswers';
import renderScreen from '../../utils/renderScreen';
import levelType from '../../data/types/levelType';
import createElementFromTemplate from '../../utils/createElementFromTemplate';
import failResultTemplate from '../../templates/result/failResultTemplate';
import headerTemplate from '../../templates/parts/headerTemplate';
import {levels} from '../../data/data';

const artistLevelTemplate = (level) => {
  return `<section class="main main--level main--level-artist">
  <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
  <circle
    cx="390" cy="390" r="370"
    class="timer-line"
    style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

  <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
    <span class="timer-value-mins">02</span><!--
    --><span class="timer-value-dots">:</span><!--
    --><span class="timer-value-secs">00</span>
  </div>
  </svg>

  <div class="main-wrap">
  <div class="main-timer"></div>

  <h2 class="title main-title">Кто исполняет эту песню?</h2>
  <div class="player-wrapper" data-right-answer="${level.rightAnswer.id}"></div>
  <form class="main-list">

  ${createArtistAnswers(level)}

  </form>
  </div>
  </section>`;
};

export default artistLevelTemplate;

export const artistLevelHandler = (template, state, sectionMain) => {
  const answerButtonsWrapper = sectionMain.querySelector(`.main-list`);
  const rightAnswer = sectionMain.querySelector(`[data-right-answer]`);

  window.initializePlayer(rightAnswer, levels[state.level].rightAnswer.path);
  answerButtonsWrapper.addEventListener(`click`, handleAwnswer.bind(answerButtonsWrapper, template, state, rightAnswer, sectionMain));
};

const handleAwnswer = function (...args) {
  const [template, state, rightAnswer, sectionMain, event] = args;
  const itemValue = event.target.dataset.answer;
  if (event.target.tagName.toLowerCase() === `img`) {
    if (itemValue === rightAnswer.dataset.rightAnswer) {
      renderScreen(template, Object.assign({}, state, {level: levelType.Genre}));
    } else {
      state.lives--;
      if (state.lives === 0) {
        renderScreen(failResultTemplate, state);
      } else {
        sectionMain.replaceChild(createElementFromTemplate(headerTemplate(state)), sectionMain.firstChild);
      }
    }
  }
  this.removeEventListener(`click`, handleAwnswer.bind(this, template, state, rightAnswer, sectionMain));
};
