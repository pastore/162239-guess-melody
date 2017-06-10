import levelType from './types/levelType';
import createLevelType from './createLevelType';

const initialState = {
  level: levelType.Artist,
  lives: 3,
  time: 0
};

Object.freeze(initialState);

const levels = {};
levels[levelType.Artist] = createLevelType(levelType.Artist);
levels[levelType.Genre] = createLevelType(levelType.Genre);

export {initialState, levels};


