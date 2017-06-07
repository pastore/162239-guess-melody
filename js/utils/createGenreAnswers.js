const createGenreAnswers = (level) => {
  return level.answers.map((answer) => {
    return `<div class="genre-answer">
    <div class="player-wrapper"></div>
    <input type="checkbox" name="answer" value="${answer.genre === level.rightAnswer.genre}" id="a-${answer.id}">
    <label class="genre-answer-check" for="a-${answer.id}"></label>
    </div>`;
  }).join(``);
};

export default createGenreAnswers;
