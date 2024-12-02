// fighter.js

import { Utils } from '../utils.js';

let secondWindUsed = false;

export const Fighter = {
  secondWind: function(level, name) {
    if(!secondWindUsed) {
      const result = Utils.rollDice(10, name) + level;
      secondWindUsed = true;
      return result;
    }
    return 0;
  },
  secondWindReset: function() {
    secondWindUsed = false;
  },
  getSecondWind: function() {
    return secondWindUsed;
  }
};