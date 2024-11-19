// rouge.js
import { Utils } from '../utils.js';

export const Rogue = {
  sneakAttack: function(level, name) {
    const diceCount = Math.max(1, Math.min(10, Math.floor(level / 2)));
    const damage = Utils.rollMultipleDice(diceCount, 6, name);
    
    return damage;
  },
};

// export class Rogue {
//   constructor(level = 1) {
//       this.className = "Rogue";
//       this.level = level;
//       this.hitDice = "1d8";
//       this.armorProficiencies = ["Light Armor"];
//       this.weaponProficiencies = ["Simple Weapons", "Hand Crossbows", "Longswords", "Rapiers", "Shortswords"];
//       this.toolProficiencies = ["Thieves' Tools"];
//       this.savingThrows = ["Dexterity", "Intelligence"];
//       this.skills = this.chooseSkills(4, [
//           "Acrobatics", "Athletics", "Deception", "Insight",
//           "Intimidation", "Investigation", "Perception", "Performance",
//           "Persuasion", "Sleight of Hand", "Stealth"
//       ]);
//       this.features = this.getFeatures();
//   }

//   chooseSkills(count, availableSkills) {
//       // 실제 구현에서는 사용자 입력을 받아 스킬을 선택하도록 해야 합니다.
//       return availableSkills.slice(0, count);
//   }

//   getFeatures() {
//       const features = {
//           1: ["Expertise", "Sneak Attack", "Thieves' Cant"],
//           2: ["Cunning Action"],
//           3: ["Roguish Archetype"],
//           4: ["Ability Score Improvement"],
//           5: ["Uncanny Dodge"],
//           6: ["Expertise"],
//           7: ["Evasion"],
//           8: ["Ability Score Improvement"],
//           9: ["Roguish Archetype feature"],
//           10: ["Ability Score Improvement"],
//           11: ["Reliable Talent"],
//           12: ["Ability Score Improvement"],
//           13: ["Roguish Archetype feature"],
//           14: ["Blindsense"],
//           15: ["Slippery Mind"],
//           16: ["Ability Score Improvement"],
//           17: ["Roguish Archetype feature"],
//           18: ["Elusive"],
//           19: ["Ability Score Improvement"],
//           20: ["Stroke of Luck"]
//       };

//       return Object.entries(features)
//           .filter(([level, _]) => parseInt(level) <= this.level)
//           .reduce((acc, [_, feats]) => acc.concat(feats), []);
//   }
// }