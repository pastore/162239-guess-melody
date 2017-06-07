const createArtistAnswers = (level) => {
  return level.answers.map((answer) => {
    return `<div class="main-answer-wrapper">
    <input class="main-answer-r" type="radio" id="a-${answer.id}" name="answer" value="${answer.id}" />
    <label class="main-answer" for="a-${answer.id}">
    <img class="main-answer-preview" src="">
    ${answer.author}
    </div>`;
  }).join(``);
};

export default createArtistAnswers;
