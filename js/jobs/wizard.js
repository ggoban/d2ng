// wizard.js

export class Wizard {
  constructor(level = 1) {
      this.className = "Wizard";
      this.level = level;
      this.hitDice = "1d6";
      this.armorProficiencies = [];
      this.weaponProficiencies = ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"];
      this.savingThrows = ["Intelligence", "Wisdom"];
      this.skills = this.chooseSkills(2, [
          "Arcana", "History", "Insight", "Investigation",
          "Medicine", "Religion"
      ]);
      this.features = this.getFeatures();
      this.spellcastingAbility = "Intelligence";
  }

  chooseSkills(count, availableSkills) {
      // 실제 구현에서는 사용자 입력을 받아 스킬을 선택하도록 해야 합니다.
      return availableSkills.slice(0, count);
  }

  getFeatures() {
      const features = {
          1: ["Spellcasting", "Arcane Recovery"],
          2: ["Arcane Tradition"],
          3: [],
          4: ["Ability Score Improvement"],
          5: [],
          6: ["Arcane Tradition feature"],
          8: ["Ability Score Improvement"],
          10: ["Arcane Tradition feature"],
          12: ["Ability Score Improvement"],
          14: ["Arcane Tradition feature"],
          16: ["Ability Score Improvement"],
          18: ["Spell Mastery"],
          19: ["Ability Score Improvement"],
          20: ["Signature Spells"]
      };

      return Object.entries(features)
          .filter(([level, _]) => parseInt(level) <= this.level)
          .reduce((acc, [_, feats]) => acc.concat(feats), []);
  }
}