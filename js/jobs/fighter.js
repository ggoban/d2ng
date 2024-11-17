export class Fighter {
  constructor(level = 1) {
      this.className = "Fighter";
      this.level = level;
      this.hitDice = "1d10";
      this.armorProficiencies = ["Light Armor", "Medium Armor", "Heavy Armor", "Shields"];
      this.weaponProficiencies = ["Simple Weapons", "Martial Weapons"];
      this.savingThrows = ["Strength", "Constitution"];
      this.skills = this.chooseSkills(2, [
          "Acrobatics", "Animal Handling", "Athletics", "History",
          "Insight", "Intimidation", "Perception", "Survival"
      ]);
      this.features = this.getFeatures();
  }

  chooseSkills(count, availableSkills) {
      // 실제 구현에서는 사용자 입력을 받아 스킬을 선택하도록 해야 합니다.
      return availableSkills.slice(0, count);
  }

  getFeatures() {
      const features = {
          1: ["Fighting Style", "Second Wind"],
          2: ["Action Surge"],
          3: ["Martial Archetype"],
          4: ["Ability Score Improvement"],
          5: ["Extra Attack"],
          6: ["Ability Score Improvement"],
          7: ["Martial Archetype feature"],
          8: ["Ability Score Improvement"],
          9: ["Indomitable"],
          10: ["Martial Archetype feature"],
          11: ["Extra Attack (2)"],
          12: ["Ability Score Improvement"],
          13: ["Indomitable (two uses)"],
          14: ["Ability Score Improvement"],
          15: ["Martial Archetype feature"],
          16: ["Ability Score Improvement"],
          17: ["Action Surge (two uses)", "Indomitable (three uses)"],
          18: ["Martial Archetype feature"],
          19: ["Ability Score Improvement"],
          20: ["Extra Attack (3)"]
      };

      return Object.entries(features)
          .filter(([level, _]) => parseInt(level) <= this.level)
          .reduce((acc, [_, feats]) => acc.concat(feats), []);
  }
}