const headerTemplate = (state) => {
  return `<div class ="game_header">
  <div class="game_header__item">Level: ${state.level}</div>
  <div class="game_header__item">Lives: ${state.lives} </div>
  <div class="game_header__item">Time: ${state.time}</div>
  </div>`;
};

export default headerTemplate;
