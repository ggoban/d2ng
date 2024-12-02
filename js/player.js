// player.js


import { skillList } from './skills.js';
import { gameConsole } from './console.js';
import { Utils, Constants } from './utils.js';
import { SpellBook, spellList  } from './spells.js';
import { weapons, armors, ArmorType, WeaponProperty  } from './equipments.js';

export class Player {
  constructor() {
    this.initializeBaseStats();
    this.initializeInventory();
    this.initializeEquipment();
    this.initializeSkillsAndSpells();
  }

  initializeBaseStats() {
    this.name = "";
    this.race = "";
    this.class = "";
    this.level = 1;
    this.xp = 290; // 임시
    this.nextLevelXp = 300; // 다음 레벨까지 필요한 경험치
    this.hp = 0;
    this.maxHp = 0;
    this.ac = 10;
    this.proficiencyBonus = 2;
    this.gold = 100;
    this.skillPoints = 0;
    this.stats = {strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10};
    this.xpTable = [
      0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000,
      120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000,
    ];
  }

  initializeInventory() {
    this.inventorySize = 20;
    this.inventory = new Array(this.inventorySize).fill(null);
  }

  initializeEquipment() {
    this.equippedWeapon = null;
    this.equippedArmor = null;
    this.equippedShield = null;
  }

  initializeSkillsAndSpells() {
    this.skills = [];
    this.spellBook = new SpellBook();
  }

  reset() {
    this.initializeBaseStats();
    this.initializeInventory();
    this.initializeEquipment();
    this.initializeSkillsAndSpells();
  }

  setCharacter(name, race, characterClass) {
    this.name = name;
    this.race = race;
    this.class = characterClass;
    this.setClassSuggestions();
    this.setRacialBonuses();
    this.setInitialHp();
    this.setInitialEquipment(); // 새로운 메서드 호출
    this.setInitialSkills();
    this.setInitialSpells();
    this.updateInfo();
  }

  // 직업별 표준 능력치 셋 사용
  setClassSuggestions() {
    switch (this.class) {
      case "Fighter":
        this.stats = {strength: 15, dexterity: 13, constitution: 14, intelligence: 10, wisdom: 12, charisma: 8};
        break;
      case "Rogue":
        this.stats = {strength: 8, dexterity: 15, constitution: 14, intelligence: 12, wisdom: 13, charisma: 10};
        break;
      case "Wizard":
        this.stats = {strength: 8, dexterity: 13, constitution: 14, intelligence: 15, wisdom: 10, charisma: 12};
        break;
      case "Cleric":
        this.stats = {strength: 13, dexterity: 12, constitution: 14, intelligence: 10, wisdom: 15, charisma: 8};
        break;
    }
  }

  setRacialBonuses() {
    switch (this.race) {
      case "Dwarf":
        this.stats.constitution += 2;
        break;
      case "Elf":
        this.stats.dexterity += 2;
        break;
      case "Human":
        for (let stat in this.stats) {
          this.stats[stat] += 1;
        }
        break;
      case "Halfling":
        this.stats.dexterity += 2;
        break;
    }
  }

  setInitialHp() {
    let baseHp;
    switch (this.class) {
      case "Fighter":
        baseHp = 10;
        break;
      case "Rogue":
        baseHp = 8;
        break;
      case "Cleric":
        baseHp = 8;
        break;
      case "Wizard":
        baseHp = 6;
        break;
    }
    this.maxHp = baseHp + this.getModifier("constitution");
    this.hp = this.maxHp;
  }

  setInitialEquipment() {
    // 직업에 따라 추가 장비 제공
    switch (this.class) {
      case "Fighter":
        this.equipItem("Weapon", weapons["longsword"]);
        this.equipItem("Shield", armors["shield"]);
        break;
      case "Rogue":
        this.equipItem("Weapon", weapons["dagger"]);
        this.equipItem("Armor", armors["leather"]);
        break;
      case "Wizard":
        this.equipItem("Weapon", weapons["quarterstaff"]);
        break;
      case "Cleric":
        this.equipItem("Weapon", weapons["mace"]);
        this.equipItem("Armor", armors["leather"]);
        break;
    }
  }

  setInitialSkills() {
    // 클래스에 따라 다른 기술을 추가할 수 있습니다
    switch (this.class) {
      case "Fighter":
        this.skills.push(skillList.secondWind);
        break;
      case "Rogue":
        this.skills.push(skillList.sneakAttack);
    }
  }

  setInitialSpells() {
    switch (this.class) {
      case "Wizard":
        this.spellBook.learnSpell(spellList.magicMissile);
        this.spellBook.prepareSpell("마법 화살");
        this.spellBook.getAvailableSlots;  // 1레벨 주문 슬롯 2개
        break;
      case "Cleric":
        this.spellBook.learnSpell(spellList.cureWounds);
        this.spellBook.prepareSpell("상처 치료");
        this.spellBook.getAvailableSlots;  // 1레벨 주문 슬롯 2개
        break;
    }
  }

  getModifier(stat) {
    return Utils.calculateModifier(this.stats[stat]);
  }

  resetInventory() {
    this.inventory = new Array(this.inventorySize).fill(null);
    this.updateInventoryUI();
  }

  addItem(item) {
    const emptySlot = this.inventory.findIndex((slot) => slot === null);
    if (emptySlot !== -1) {
      this.inventory[emptySlot] = item;
      return true;
    }
    return false;
  }

  removeItem(index) {
    if (this.inventory[index]) {
      this.inventory[index] = null;
      return;
    }
    return;
  }

  equipItem(itemType, item) {
    if (this[`equipped${itemType}`]) {
      gameConsole.log(`${this[`equipped${itemType}`].name}을(를) 해제했습니다.`);
    }
    this[`equipped${itemType}`] = item;
    gameConsole.log(`${item.name}을(를) 장착했습니다.`);
    this.updateAC();
    this.updateInfo();
  }

  unequipItem(itemType) {
    if (this[`equipped${itemType}`]) {
      gameConsole.log(`${this[`equipped${itemType}`].name}을(를) 해제했습니다.`);
      this[`equipped${itemType}`] = null;
      this.updateAC();
      this.updateInfo();
    }
  }

  getAttackDamage() {
    if (this.equippedWeapon) {
      const [diceCount, diceSides] = this.equippedWeapon.damage.split("d").map(Number);
      let damage = 0;
      for (let i = 0; i < diceCount; i++) {
        damage += Utils.rollDice(diceSides, this.name);
      }
      // 힘 또는 민첩 수정치 추가 (교묘함 무기의 경우 더 높은 것 사용)
      const strMod = this.getModifier("strength");
      const dexMod = this.getModifier("dexterity");
      if (this.equippedWeapon.properties.includes(WeaponProperty.FINESSE)) {
        damage += Math.max(strMod, dexMod);
      } else {
        damage += strMod;
      }
      return damage;
    }
    return 1; // 맨손 공격
  }

  getSpellDamage(item) {
    let damage = Utils.rollDiceWithNotation(item.damage, this.name);
    const intMod = this.getModifier("intelligence");
    const wisMod = this.getModifier("wisdom");
    //console.log(damage);
    if(item.addEffect) damage += item.addEffect;
    if(this.class === 'Wizard') damage += intMod;
    if(this.class === 'Cleric') damage += wisMod;
    
    return damage;
    //return 1; // 맨손 공격
  }

  getAttackBonus() {
    let bonus = this.proficiencyBonus; // 숙련도 보너스
    if (this.equippedWeapon) {
      if (this.equippedWeapon.properties.includes(WeaponProperty.FINESSE)) {
        // 교묘함 무기는 힘이나 민첩 중 높은 것을 사용
        bonus += Math.max(
          this.getModifier("strength"),
          this.getModifier("dexterity")
        );
      } else if (
        this.equippedWeapon.properties.includes(WeaponProperty.AMMUNITION)
      ) {
        // 탄환 무기는 민첩 수정치 사용
        bonus += this.getModifier("dexterity");
      } else {
        // 그 외의 경우 힘 수정치 사용
        bonus += this.getModifier("strength");
      }
    } else {
      // 맨손 공격의 경우 힘 수정치 사용
      bonus += this.getModifier("strength");
    }
    return bonus;
  }

  getSpellBonus() {
    let bonus = this.proficiencyBonus; // 숙련도 보너스
    if (this.class === 'Wizard') bonus += this.getModifier("intelligence");
    if (this.class === 'Cleric') bonus += this.getModifier("wisdom");
    return bonus;
  }

  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
    this.updateInfo();
    return this.hp > 0;
  }

  heal(amount) {
    this.hp = Math.min(this.maxHp, this.hp + amount);
    this.updateInfo();
  }

  gainGold(amount) {
    this.gold += amount;
    this.updateInfo();
  }

  gainExperience(xp) {
    this.xp += xp;
    gameConsole.log(`${xp} 경험치를 획득했습니다! (총 경험치: ${this.xp})`);
    this.updateInfo();
    this.checkLevelUp();
  }

  checkLevelUp() {
    let newLevel = this.level;
    while (newLevel < Constants.MAX_LEVEL && this.xp >= this.xpTable[newLevel]) {
      newLevel++;
    }

    if (newLevel > this.level) {
      const levelsGained = newLevel - this.level;
      this.level = newLevel;
      this.updateProficiencyBonus();
      this.increaseHitPoints(levelsGained);
      this.skillPoints += 2;
      gameConsole.log(`레벨 업! 현재 레벨: ${this.level}, 다음 필요 경험치는 ${this.xpTable[newLevel]}XP`);
      gameConsole.log(`스킬 포인트 2개 획득했습니다.`);
      this.nextLevelXp = this.xpTable[newLevel];
      this.updateInfo();
    }
  }

  allocateSkillPoint(stat) {
    const cost = this.stats[stat] >= 14 ? 2 : 1;
    if (this.skillPoints >= cost && this.stats[stat] < 20) {
      this.stats[stat]++;
      this.skillPoints -= cost;
      gameConsole.log(`${this.name}의 ${stat} 능력치가 1 증가했습니다. 현재 ${stat}: ${this.stats[stat]}`);
      this.updateInfo();
      return true;
    }
    gameConsole.log("스킬 포인트가 충분하지 않거나 능력치 최대치에 도달했습니다.");
    return false;
  }

  updateProficiencyBonus() {
    this.proficiencyBonus = 2 + Math.floor((this.level - 1) / 4);
  }

  increaseHitPoints(levelsGained) {
    let hpIncrease = 0;
    for (let i = 0; i < levelsGained; i++) {
      switch (this.class) {
        case "Fighter":
          hpIncrease += 10 + this.getModifier("constitution");
          break;
        case "Rogue":
          hpIncrease += 8 + this.getModifier("constitution");
          break;
        case "Cleric":
          hpIncrease += 8 + this.getModifier("constitution");
          break;
        case "Wizard":
          hpIncrease += 6 + this.getModifier("constitution");
          break;
      }
    }
    this.maxHp += hpIncrease;
    this.hp += hpIncrease;
  }

  spendGold(amount) {
    if (this.gold >= amount) {
      this.gold -= amount;
      this.updateInfo();
      return true;
    }
    return false;
  }

  levelUp() {
    this.level++;
    this.maxHp += 10;
    this.hp = this.maxHp;
    this.updateInfo();
  }

  updateAC() {
    let baseAC = 10;
    const dexMod = this.getModifier("dexterity");

    if (this.equippedArmor) {
      switch (this.equippedArmor.type) {
        case ArmorType.LIGHT:
          baseAC = this.equippedArmor.ac + dexMod;
          break;
        case ArmorType.MEDIUM:
          baseAC = this.equippedArmor.ac + Math.min(dexMod, 2);
          break;
        case ArmorType.HEAVY:
          baseAC = this.equippedArmor.ac;
          break;
      }
    } else {
      // 갑옷을 입지 않은 경우
      baseAC += dexMod;
    }
    if (this.equippedShield) {
      baseAC += this.equippedShield.ac;
    }
    this.ac = baseAC;
  }

  learnSpell(spellName) {
    this.spellBook.learnSpell(spellName);
  }

  updateInfo() {
    this.updateBasicInfo();
    this.updateStats();
    this.updateEquipment();
    this.updateExperience();
    this.updateSkillPoints();
  }

  updateBasicInfo() {
    this.updateElement("player-name", this.name);
    this.updateElement("player-race", this.race);
    this.updateElement("player-class", this.class);
    this.updateElement("player-level", this.level);
    this.updateElement("player-gold", this.gold);
    this.updateHP();
  }

  updateHP() {
    const hpElement = document.getElementById("player-hp");
    hpElement.textContent = this.hp;
    this.updateElement("player-max-hp", this.maxHp);

    if (this.hp < this.maxHp) {
      hpElement.style.color = this.hp < this.maxHp / 2 ? "red" : "yellow";
    } else {
      hpElement.style.color = "white";
    }

    // 캔버스 업데이트 추가
    if (this.game && this.game.canvasManager) {
      this.game.canvasManager.updateCharacterCanvas(this);
    }
  }

  updateStats() {
    for (let stat in this.stats) {
      this.updateStatElement(stat);
    }
  }

  updateStatElement(stat) {
    const element = document.getElementById(`player-${stat}`);
    const value = this.stats[stat];
    const modifier = this.getModifier(stat);
    element.textContent = `${value} (${modifier >= 0 ? "+" : ""}${modifier})`;

    this.updateStatIncreaseButton(stat, element);
  }

  updateStatIncreaseButton(stat, statElement) {
    const increaseBtn = statElement.nextElementSibling;
    const cost = this.stats[stat] >= 14 ? 2 : 1;
    if (this.skillPoints >= cost && this.stats[stat] < 20) {
      increaseBtn.style.display = "inline";
      increaseBtn.textContent = `+${cost}SP`;
    } else {
      increaseBtn.style.display = "none";
    }
  }

  updateEquipment() {
    this.updateElement(
      "player-weapon",
      this.equippedWeapon
        ? `${this.equippedWeapon.name} (+${this.equippedWeapon.damage})`
        : "없음"
    );
    this.updateElement("player-ac", this.ac);
    this.updateElement(
      "player-armor",
      this.equippedArmor
        ? `${this.equippedArmor.name} (+${this.equippedArmor.ac})`
        : "없음"
    );
    this.updateElement(
      "player-shield",
      this.equippedShield
        ? `${this.equippedShield.name} (+${this.equippedShield.ac})`
        : "없음"
    );
  }

  updateExperience() {
    this.updateElement("player-xp", this.xp);
    this.updateElement("player-next-level-xp", this.nextLevelXp);
    this.updateElement("player-proficiency", this.proficiencyBonus);
  }

  updateSkillPoints() {
    this.updateElement("player-skill-points", this.skillPoints);
  }

  updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    } else {
      console.warn(`Element with id '${id}' not found.`);
    }
  }
}