import createGenreAnswers from '../../utils/createGenreAnswers';

const genreLevelTemplate = (level) => {
  return `<section class="main main--level main--level-genre">
  <h2 class="title">Выберите ${level.rightAnswer.genre} треки</h2>
  <form class="genre">
  
  ${createGenreAnswers(level)}

   <button class="genre-answer-send" type="submit">Ответить</button>
  </form>
  </section>`;
};

export default genreLevelTemplate;


