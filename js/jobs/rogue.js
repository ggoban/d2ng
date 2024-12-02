// rouge.js

import { Utils } from '../utils.js';

export const Rogue = {
  sneakAttack: function(level, name) {
    const diceCount = Math.max(1, Math.min(10, Math.floor(level / 2)));
    const damage = Utils.rollMultipleDice(diceCount, 6, name);
    
    return damage;
  },
};