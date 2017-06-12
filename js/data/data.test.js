import assert from 'assert';
import {initialState, setLives} from './data';

describe(`Array`, () => {
  describe(`#indexOf()`, () => {
    it(`should return -1 when the value is not present`, () => {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});

describe(`State`, () => {
  describe(`Lives`, () => {
    it(`Should update lives`, () => {
      assert.equal(2, setLives(initialState, 1));
    });
  });
});
