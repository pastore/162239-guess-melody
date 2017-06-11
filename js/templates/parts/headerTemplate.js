const headerTemplate = (state) => {
  return `<div class ="game_header">
    <div class="game_header__item">Уровень игры: ${state.level}</div>
    <div class="game_header__item">Количество жизней: ${state.lives} </div>
    <div class="game_header__item">Время: ${state.time}</div>
  </div>`;
};

export default headerTemplate;
