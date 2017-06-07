import createElementFromTemplate from './createElementFromTemplate';
import levelType from '../data/types/levelType';
import templateType from '../data/types/templateType';
import {levels, initialState} from '../data/data';
import createLevelType from '../data/createLevelType';
import artistLevelTemplate from '../templates/level/artistLevelTemplate';
import genreLevelTemplate from '../templates/level/genreLevelTemplate';
import successResultTemplate from '../templates/result/successResultTemplate';
import failResultTemplate from '../templates/result/failResultTemplate';
import welcomeTemplate from '../templates/start/welcomeTemplate';
import headerTemplate from '../templates/parts/headerTemplate';

const sectionMain = document.querySelector(`section.main`);
const renderScreen = (template = welcomeTemplate, state = initialState) => {

  sectionMain.innerHTML = ``;
  let sectionHeader = createElementFromTemplate(headerTemplate(state));
  if (template.name === templateType.ArtistLevel || template.name === templateType.GenreLevel) {
    sectionMain.appendChild(sectionHeader);
  }
  sectionMain.appendChild(createElementFromTemplate(template(template.name === templateType.Welcome ? null : levels[state.level])));

  switch (template.name) {
    case templateType.Welcome:
      const playButton = sectionMain.querySelector(`.main-play`);
      playButton.addEventListener(`click`, () => {
        renderScreen(artistLevelTemplate, Object.assign({}, state, {}));
      });
      break;
    case templateType.ArtistLevel:
      const answerButtons = sectionMain.querySelectorAll(`.main-answer-r`);
      const rightAnswer = sectionMain.querySelector(`[data-right-answer]`);

      window.initializePlayer(rightAnswer, levels[state.level].rightAnswer.path);

      answerButtons.forEach(function (item) {
        item.addEventListener(`click`, function (evt) {
          const itemValue = evt.target.value;
          if (itemValue === rightAnswer.dataset.rightAnswer) {
            renderScreen(genreLevelTemplate, Object.assign({}, state, {level: levelType.Genre}));
          } else {
            state.lives--;
            if (state.lives === 0) {
              renderScreen(failResultTemplate, state);
            } else {
              sectionMain.replaceChild(createElementFromTemplate(headerTemplate(state)), sectionMain.firstChild);
            }
          }
        });
      });
      break;
    case templateType.GenreLevel:
      const sendAnswerButton = sectionMain.querySelector(`.genre-answer-send`);
      const palyerWrappers = sectionMain.querySelectorAll(`.player-wrapper`);
      [...palyerWrappers].forEach((wrapper, index) => {
        window.initializePlayer(wrapper, levels[state.level].answers[index].path);
      });

      sendAnswerButton.addEventListener(`click`, (e) => {
        e.preventDefault();
        const checkedAnswers = sectionMain.querySelectorAll(`input[name='answer']:checked`);
        let isRightAnswer = false;

        if (checkedAnswers.length > 0) {
          isRightAnswer = [...checkedAnswers].every(function (input) {
            return input.value === `true`;
          });
        }

        if (isRightAnswer) {
          renderScreen(successResultTemplate, state);
        } else {
          state.lives--;
          if (state.lives === 0) {
            renderScreen(failResultTemplate, state);
          } else {
            sectionMain.replaceChild(createElementFromTemplate(headerTemplate(state)), sectionMain.firstChild);
          }
        }
        [...checkedAnswers].forEach((item) => {
          item.checked = false;
        });
      });
      break;
    case templateType.SuccessResult:
    case templateType.FailREsult:
      levels[levelType.Artist] = createLevelType(levelType.Artist);
      levels[levelType.Genre] = createLevelType(levelType.Genre);

      const playAgainButton = sectionMain.querySelector(`.main-replay`);
      playAgainButton.addEventListener(`click`, () => {
        renderScreen(welcomeTemplate, initialState);
      });
      break;
  }
};

export default renderScreen;


