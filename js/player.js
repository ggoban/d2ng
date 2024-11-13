// player.js

import { Utils, Constants } from './utils.js';
import { SpellBook } from './spells.js';
import { weapons, armors, WeaponProperty  } from './equipments.js';
import { gameConsole } from './console.js';

export class Player {
  constructor() {
    this.name = "";
    this.race = "";
    this.class = "";
    this.level = 1;
    this.maxLevel = 20;
    this.hp = 0;
    this.maxHp = 0;
    this.ac = 10; // 기본 AC 추가
    this.gold = 0;
    this.equippedWeapon = null;
    this.equippedArmor = null;
    this.equippedShield = null;
    this.inventorySize = 20;
    this.inventory = new Array(this.inventorySize).fill(null);
    this.stats = {strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10,};
    //this.xp = 0;
    this.xp = 290; // 임시 세팅
    this.nextLevelXp = 300; // 다음 레벨까지 필요한 경험치
    this.proficiencyBonus = 2;
    this.xpTable = [
      0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000,
      120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000,
    ];
    this.skillPoints = 0;
    this.spellBook = new SpellBook();
  }

  reset() {
    this.name = "";
    this.race = "";
    this.class = "";
    this.level = 1;
    this.hp = 0;
    this.maxHp = 0;
    this.ac = 10;
    this.gold = 0;
    this.inventory = new Array(this.inventorySize).fill(null);
    this.stats = {strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10,};
    this.xp = 0;
    this.nextLevelXp = 300;
    this.proficiencyBonus = 2;
    this.skillPoints = 0;
    this.equippedWeapon = null;
    this.equippedArmor = null;
    this.equippedShield = null;
    this.resetInventory();
    this.updateInfo();
  }

  setCharacter(name, race, characterClass) {
    this.name = name;
    this.race = race;
    this.class = characterClass;
    this.setClassSuggestions();
    this.setRacialBonuses();
    this.setInitialHp();
    this.setInitialAc(); // AC 초기화 메서드 호출
    this.setInitialEquipment(); // 새로운 메서드 호출
    this.updateInfo();
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

  // 직업별 표준 능력치 셋 사용
  setClassSuggestions() {
    switch (this.class) {
      case "Fighter":
        this.stats.strength += 5;
        this.stats.dexterity += 3;
        this.stats.constitution += 4;
        this.stats.intelligence += 0;
        this.stats.wisdom += 2;
        this.stats.charisma -= 2;
        break;
      case "Rogue":
        this.stats.strength -= 2;
        this.stats.dexterity += 5;
        this.stats.constitution += 4;
        this.stats.intelligence += 2;
        this.stats.wisdom += 3;
        this.stats.charisma += 0;
        break;
      case "Wizard":
        this.stats.strength -= 2;
        this.stats.dexterity += 3;
        this.stats.constitution += 4;
        this.stats.intelligence += 5;
        this.stats.wisdom += 0;
        this.stats.charisma += 2;
        break;
      case "Cleric":
        this.stats.strength += 3;
        this.stats.dexterity += 2;
        this.stats.constitution += 4;
        this.stats.intelligence += 0;
        this.stats.wisdom += 5;
        this.stats.charisma -= 2;
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

  setInitialAc() {
    // 기본 AC 10에 민첩 수정치를 더합니다.
    this.ac = 10;
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

  getModifier(stat) {
    return Utils.calculateModifier(this.stats[stat]);
  }

  initializeInventory() {
    const inventoryGrid = document.getElementById("inventory-grid");
    inventoryGrid.innerHTML = "";
    for (let i = 0; i < this.inventorySize; i++) {
      const slot = document.createElement("div");
      slot.className = "inventory-slot empty";
      slot.dataset.index = i;
      inventoryGrid.appendChild(slot);
    }
  }

  resetInventory() {
    this.inventory = new Array(this.inventorySize).fill(null);
    this.updateInventoryUI();
  }

  updateInventoryUI() {
    const inventoryGrid = document.getElementById("inventory-grid");
    inventoryGrid.innerHTML = "";
    for (let i = 0; i < this.inventorySize; i++) {
      const slot = document.createElement("div");
      slot.className = "inventory-slot empty";
      slot.dataset.index = i;
      if (this.inventory[i]) {
        slot.textContent = this.inventory[i].name;
        slot.className = "inventory-slot";
        slot.title = this.inventory[i].description;
        slot.onclick = () => this.useItem(i);
      }
      inventoryGrid.appendChild(slot);
    }
  }

  addItem(item) {
    const emptySlot = this.inventory.findIndex((slot) => slot === null);
    if (emptySlot !== -1) {
      this.inventory[emptySlot] = item;
      this.updateInventoryUI();
      return true;
    }
    return false;
  }

  removeItem(index) {
    if (this.inventory[index]) {
      const item = this.inventory[index];
      this.inventory[index] = null;
      this.updateInventoryUI();
      return item;
    }
    return null;
  }

  equipItem(itemType, item) {
    if (this[`equipped${itemType}`]) {
      gameConsole.log(
        `${this[`equipped${itemType}`].name}을(를) 해제했습니다.`
      );
    }
    this[`equipped${itemType}`] = item;
    gameConsole.log(`${item.name}을(를) 장착했습니다.`);
    this.updateAC();
    this.updateInfo();
  }

  unequipItem(itemType) {
    if (this[`equipped${itemType}`]) {
      gameConsole.log(
        `${this[`equipped${itemType}`].name}을(를) 해제했습니다.`
      );
      this[`equipped${itemType}`] = null;
      this.updateAC();
      this.updateInfo();
    }
  }

  getAttackDamage() {
    if (this.equippedWeapon) {
      const [diceCount, diceSides] = this.equippedWeapon.damage
        .split("d")
        .map(Number);
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

  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
    this.updateInfo();
    return this.hp > 0;
  }

  heal(amount) {
    this.hp = Math.min(this.maxHp, this.hp + amount);
    this.updateInfo();
  }

  useItem(index) {
    const item = this.inventory[index];
    if (item) {
      item.use(this);
      this.removeItem(index);
      return true;
    }
    return false;
  }

  gainGold(amount) {
    this.gold += amount;
    this.updateInfo();
  }

  gainExperience(xp) {
    this.xp += xp;
    gameConsole.log(
      `${xp} 경험치를 획득했습니다! (총 경험치: ${this.xp})`
    );
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
      gameConsole.log(
        `레벨 업! 현재 레벨: ${this.level}, 다음 필요 경험치는 ${this.xpTable[newLevel]}XP`
      );
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
      gameConsole.log(
        `${this.name}의 ${stat} 능력치가 1 증가했습니다. 현재 ${stat}: ${this.stats[stat]}`
      );
      this.updateInfo();
      return true;
    }
    gameConsole.log(
      "스킬 포인트가 충분하지 않거나 능력치 최대치에 도달했습니다."
    );
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

  castSpell(spellName, target) {
    this.spellBook.castSpell(spellName, this, target);
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
    this.updateHP();
    this.updateElement("player-gold", this.gold);
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