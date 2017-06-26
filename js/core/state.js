import levelType from './types/levelType';

export const initialState = {
  level: levelType.Artist,
  lives: 3,
  time: 120,
  points: 0,
  countPassedLevels: 0
};

class ManageState {
  setNextLevel(state) {
    const level = state.level === levelType.Artist ? levelType.Genre : levelType.Artist;
    return Object.assign({}, state, {level});
  }

  addPassedLevel(state) {
    return Object.assign({}, state, {countPassedLevels: ++state.countPassedLevels});
  }

  setLives(state, lives) {
    if (lives < 0) {
      throw new RangeError(`Can not set negative lives`);
    }
    return Object.assign({}, state, {lives});
  }

  setTime(state, time) {
    return Object.assign({}, state, {time});
  }

  setPoints(state, points) {
    const tempPoints = state.points + points;
    return Object.assign({}, state, {points: tempPoints});
  }
}

export default new ManageState();

