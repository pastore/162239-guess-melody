import levelType from './types/levelType';
import createLevelType from './createLevelType';

const initialState = {
  level: levelType.Artist,
  lives: 3,
  time: 0,
  countPassedLevels: 0
};

Object.freeze(initialState);

export const COUNT_GAME_LEVELS = 10;
export const COUNT_GAME_TIME = 120;

const levels = {};
levels[levelType.Artist] = createLevelType(levelType.Artist);
levels[levelType.Genre] = createLevelType(levelType.Genre);

export {initialState, levels};

export const setLevels = (state, level) => {
  state = Object.assign({}, state);
  state.level = level;
  return state;
};

export const addPassedLevel = (state) => {
  state = Object.assign({}, state);
  state.countPassedLevels++;
  return state;
};

export const setLives = (state, lives) => {
  state = Object.assign({}, state);
  state.lives = lives;
  return state;
};

export const tick = (state) => {
  state = Object.assign({}, state);
  state.time++;
  return state;
};

export const statistics = [
  {id: 1, time: 110, answers: 3},
  {id: 2, time: 92, answers: 2},
  {id: 3, time: 84, answers: 2},
  {id: 4, time: 60, answers: 2},
  {id: 5, time: 50, answers: 1}
];

export const getStatistics = (state) => {
  const randomId = Math.floor(Math.random() * (100 - 5 + 1)) + 5;
  statistics.push({id: randomId, time: state.time, answers: state.countPassedLevels});
  statistics.sort((a, b) => {
    if (b.answers > a.answers) {
      return 1;
    } else if (b.answers < a.answers) {
      return -1;
    }

    if (b.time < a.time) {
      return 1;
    } else if (b.time > a.time) {
      return -1;
    } else {
      return 0;
    }
  });
  let tempStatistics = statistics.map((item) => {
    return item.id;
  });
  return Math.floor(((statistics.length - 1) - tempStatistics.indexOf(randomId)) * (100 / statistics.length));
};
