import assert from 'assert';
import ManageState, {initialState} from './state';
import levelType from './types/levelType';

describe(`State`, () => {
  describe(`Lives`, () => {
    it(`Should update lives`, () => {
      assert(2, ManageState.setLives(initialState, 1));
    });
    it(`Should not allow set negative lives`, () => {
      const setNegativeLives = () => {
        ManageState.setLives(initialState, -1);
      };
      assert.throws(setNegativeLives);
    });
    it(`Should have 3 lives on start`, () => {
      assert.equal(initialState.lives, 3);
    });
  });
  describe(`Level`, () => {
    it(`Should level artist on start`, () => {
      assert.equal(initialState.level, levelType.Artist);
    });
  });
  describe(`Time`, () => {
    it(`Should update time`, () => {
      assert(1, ManageState.setTime(initialState));
    });
    it(`Should time 120 on start`, () => {
      assert.equal(initialState.time, 120);
    });
  });
  describe(`Passedlevels`, () => {
    it(`Should add passed level`, () => {
      assert(1, ManageState.addPassedLevel(initialState));
    });
  });
});


