﻿import createElementFromTemplate from './createElementFromTemplate';
import levelType from '../data/types/levelType';
import templateType from '../data/types/templateType';
import {levels, initialState, setLevels, setLives, addPassedLevel, COUNT_GAME_LEVELS} from '../data/data';
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

  switch (template.name) {
    case templateType.Welcome:
      sectionMain.appendChild(createElementFromTemplate(template(null)));

      const playButton = document.querySelector(`.main-play`);
      playButton.addEventListener(`click`, () => {
        renderScreen(artistLevelTemplate, Object.assign({}, state, {}));
      });
      break;
    case templateType.ArtistLevel:
      sectionMain.appendChild(createElementFromTemplate(template(levels[state.level])));

      const answerButtonsWrapper = sectionMain.querySelector(`.main-list`);
      const rightAnswer = sectionMain.querySelector(`[data-right-answer]`);
      window.initializePlayer(rightAnswer, levels[state.level].rightAnswer.path);

      answerButtonsWrapper.addEventListener(`click`, (event) => {
        const itemValue = event.target.dataset.answer;
        if (event.target.tagName.toLowerCase() === `img`) {
          if (itemValue === rightAnswer.dataset.rightAnswer) {
            state = addPassedLevel(state);
            if (state.countRequiredLevels == COUNT_GAME_LEVELS) {
                renderScreen(successResultTemplate, state);
            }
            else {
                renderScreen(genreLevelTemplate, setLevels(state, levelType.Genre));
            }
          } else {
            let tempLives = --state.lives;
            if (state.lives === 0) {
            // renderScreen(failResultTemplate, setLives(state, state.lives--));
              renderScreen(successResultTemplate, setLives(state, tempLives));
            } else {
              sectionMain.replaceChild(createElementFromTemplate(headerTemplate(setLives(state, tempLives))), sectionMain.firstChild);
            }
          }
        }
      });
      break;
    case templateType.GenreLevel:
      sectionMain.appendChild(createElementFromTemplate(template(levels[state.level])));

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
          state = addPassedLevel(state);
          if (state.countRequiredLevels == COUNT_GAME_LEVELS) {
            renderScreen(successResultTemplate, state);
          }
          else {
            renderScreen(artistLevelTemplate, setLevels(state, levelType.Artist));
          }
        } else {
          let tempLives = --state.lives;
          if (state.lives === 0) {
          // renderScreen(failResultTemplate, setLives(state, state.lives--));
            renderScreen(successResultTemplate, setLives(state, tempLives));
          } else {
            sectionMain.replaceChild(createElementFromTemplate(headerTemplate(setLives(state, tempLives))), sectionMain.firstChild);
          }
        }
        [...checkedAnswers].forEach((item) => {
          item.checked = false;
        });
      });
      break;
    case templateType.SuccessResult:
    case templateType.FailREsult:
      sectionMain.appendChild(createElementFromTemplate(template(null, state)));
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


