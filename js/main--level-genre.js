import createElementFromTemplate from './createElementFromTemplate';
import showScreen from './showScreen';
import screenResultSuccess from './main--result-success';
import screenResultFail from './main--result-fail';

const screenLevelGenre = createElementFromTemplate(`<section class="main main--level main--level-genre">
  <h2 class="title">Выберите инди-рок треки</h2>
  <form class="genre">
    <div class="genre-answer">
      <div class="player-wrapper"></div>
      <input type="checkbox" name="answer" value="answer-1" id="a-1">
      <label class="genre-answer-check" for="a-1"></label>
    </div>

    <div class="genre-answer">
      <div class="player-wrapper"></div>
      <input type="checkbox" name="answer" value="answer-1" id="a-2">
      <label class="genre-answer-check" for="a-2"></label>
    </div>

    <div class="genre-answer">
      <div class="player-wrapper"></div>
      <input type="checkbox" name="answer" value="answer-1" id="a-3">
      <label class="genre-answer-check" for="a-3"></label>
    </div>

    <div class="genre-answer">
      <div class="player-wrapper"></div>
      <input type="checkbox" name="answer" value="answer-1" id="a-4">
      <label class="genre-answer-check" for="a-4"></label>
    </div>

    <button class="genre-answer-send" type="submit">Ответить</button>
  </form>
  </section>`);

const sendAnswerButton = screenLevelGenre.querySelector(`.genre-answer-send`);
sendAnswerButton.disabled = true;

const screenResults = [screenResultSuccess, screenResultFail];

const checkedAnswers = screenLevelGenre.querySelectorAll(`input[name='answer']`);
[...checkedAnswers].forEach((item) => {
  item.addEventListener(`click`, () => {
    sendAnswerButton.disabled = ![...checkedAnswers].some(function (input) {
      return input.checked;
    });
  });
});

sendAnswerButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  [...checkedAnswers].forEach((item) => {
    item.checked = false;
  });
  sendAnswerButton.disabled = true;
  const randomScreenResult = screenResults[Math.floor(Math.random() * screenResults.length)];
  showScreen(randomScreenResult);
});

export default screenLevelGenre;
