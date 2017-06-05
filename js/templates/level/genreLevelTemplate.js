const genreLevelTemplate = (level) => {
  return `<section class="main main--level main--level-genre">
  <h2 class="title">Выберите ${level.rightAnswer.genre} треки</h2>
  <form class="genre">
  
  ${ level.answers.map((answer) => {
    return `<div class="genre-answer">
      <div class="player-wrapper"></div>
      <input type="checkbox" name="answer" value="${answer.genre === level.rightAnswer.genre}" id="a-${answer.id}">
      <label class="genre-answer-check" for="a-${answer.id}"></label>
    </div>`;
  }).join(``)}

    <button class="genre-answer-send" type="submit">Ответить</button>
  </form>
  </section>`;
};

export default genreLevelTemplate;


