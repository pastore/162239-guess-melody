import levelType from './types/levelType';

export const COUNT_GAME_LEVELS = 3;
export const COUNT_GAME_TIME = 120;
export const TIME_GAME_OVER = 0;

const initialState = {
  level: levelType.Artist,
  lives: 3,
  time: COUNT_GAME_TIME,
  countPassedLevels: 0
};

export {initialState};

export const setNextLevel = (state) => {
  const level = state.level === levelType.Artist ? levelType.Genre : levelType.Artist;
  return Object.assign({}, state, {level});
};

export const addPassedLevel = (state) => {
  return Object.assign({}, state, {countPassedLevels: ++state.countPassedLevels});
};

export const setLives = (state, lives) => {
  if (lives < 0) {
    throw new RangeError(`Can not set negative lives`);
  }
  return Object.assign({}, state, {lives});
};

export const setTime = (state, time) => {
  return Object.assign({}, state, {time});
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


