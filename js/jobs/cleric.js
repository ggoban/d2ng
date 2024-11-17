// cleric.js

export class Cleric {
  constructor(level = 1) {
      this.className = "Cleric";
      this.level = level;
      this.hitDice = "1d8";
      this.armorProficiencies = ["Light Armor", "Medium Armor", "Shields"];
      this.weaponProficiencies = ["Simple Weapons"];
      this.savingThrows = ["Wisdom", "Charisma"];
      this.skills = this.chooseSkills(2, [
          "History", "Insight", "Medicine", "Persuasion", "Religion"
      ]);
      this.features = this.getFeatures();
      this.spellcastingAbility = "Wisdom";
  }

  chooseSkills(count, availableSkills) {
      // 실제 구현에서는 사용자 입력을 받아 스킬을 선택하도록 해야 합니다.
      return availableSkills.slice(0, count);
  }

  getFeatures() {
      const features = {
          1: ["Spellcasting", "Divine Domain"],
          2: ["Channel Divinity (1/rest)", "Divine Domain feature"],
          3: [],
          4: ["Ability Score Improvement"],
          5: ["Destroy Undead (CR 1/2)"],
          6: ["Channel Divinity (2/rest)", "Divine Domain feature"],
          7: [],
          8: ["Ability Score Improvement", "Destroy Undead (CR 1)", "Divine Domain feature"],
          9: [],
          10: ["Divine Intervention"],
          11: ["Destroy Undead (CR 2)"],
          12: ["Ability Score Improvement"],
          13: [],
          14: ["Destroy Undead (CR 3)"],
          15: [],
          16: ["Ability Score Improvement"],
          17: ["Destroy Undead (CR 4)", "Divine Domain feature"],
          18: ["Channel Divinity (3/rest)"],
          19: ["Ability Score Improvement"],
          20: ["Divine Intervention Improvement"]
      };

      return Object.entries(features)
          .filter(([level, _]) => parseInt(level) <= this.level)
          .reduce((acc, [_, feats]) => acc.concat(feats), []);
  }

  // 클레릭 주문 준비
  prepareSpells(wisdomModifier) {
      const preparedSpellsCount = this.level + wisdomModifier;
      console.log(`You can prepare ${preparedSpellsCount} spells.`);
      // 실제 구현에서는 사용자가 주문을 선택할 수 있도록 해야 합니다.
  }

  // Channel Divinity 사용
  useChannelDivinity() {
      const uses = this.level >= 18 ? 3 : (this.level >= 6 ? 2 : 1);
      console.log(`You can use Channel Divinity ${uses} time(s) between rests.`);
      // 실제 구현에서는 Channel Divinity 효과를 적용해야 합니다.
  }

  // Divine Intervention 사용
  useDivineIntervention() {
      const successChance = this.level >= 20 ? 100 : this.level;
      console.log(`You have a ${successChance}% chance of Divine Intervention succeeding.`);
      // 실제 구현에서는 성공 여부를 결정하고 효과를 적용해야 합니다.
  }
}