// player.js

class Player {
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
    this.stats = {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    };
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
    this.stats = {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    };
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
        this.equipWeapon("longsword");
        this.equipArmor("shield");
        break;
      case "Rogue":
        this.equipWeapon("dagger");
        this.equipArmor("leather");
        break;
      case "Wizard":
        this.equipWeapon("quarterstaff");
        break;
      case "Cleric":
        this.equipWeapon("mace");
        this.equipArmor("leather");
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

  equipWeapon(weaponName) {
    const weapon = weapons[weaponName];
    if (weapon) {
      this.equippedWeapon = weapon;
      gameConsole.log(`(System) ${weapon.name}을(를) 장착했습니다.`);
      this.updateInfo();
    } else {
      gameConsole.log("(System) 해당 무기를 찾을 수 없습니다.");
    }
  }

  equipArmor(armorName) {
    const armor = armors[armorName];
    if (armor) {
      if (armor.type === ArmorType.SHIELD) {
        this.equippedShield = armor;
        gameConsole.log(`(System) ${armor.name}을(를) 장착했습니다.`);
      } else {
        this.equippedArmor = armor;
        gameConsole.log(`(System) ${armor.name}을(를) 착용했습니다.`);
      }
      this.updateAC();
      this.updateInfo();
    } else {
      gameConsole.log("(System) 해당 갑옷을 찾을 수 없습니다.");
    }
  }

  unequipWeapon() {
    if (this.equippedWeapon) {
      gameConsole.log(`(System) ${this.equippedWeapon.name}을(를) 해제했습니다.`);
      this.equippedWeapon = null;
      this.updateInfo();
    }
  }

  unequipArmor() {
    if (this.equippedArmor) {
      gameConsole.log(`(System) ${this.equippedArmor.name}을(를) 해제했습니다.`);
      this.equippedArmor = null;
      this.updateAC();
      this.updateInfo();
    }
  }

  unequipShield() {
    if (this.equippedShield) {
      gameConsole.log(`(System) ${this.equippedShield.name}을(를) 해제했습니다.`);
      this.equippedShield = null;
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

  getDefenseBonus() {
    return this.equippedArmor ? this.equippedArmor.defenseBonus : 0;
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
    gameConsole.log(`(System) ${xp} 경험치를 획득했습니다! (총 경험치: ${this.xp})`);
    this.updateInfo();
    this.checkLevelUp();
  }

  checkLevelUp() {
    let newLevel = this.level;
    while (newLevel < 20 && this.xp >= this.xpTable[newLevel]) {
      newLevel++;
    }

    if (newLevel > this.level) {
      const levelsGained = newLevel - this.level;
      this.level = newLevel;
      this.updateProficiencyBonus();
      this.increaseHitPoints(levelsGained);
      this.skillPoints += 2;
      gameConsole.log(
        `(System) 레벨 업! 현재 레벨: ${this.level}, 다음 필요 경험치는 ${this.xpTable[newLevel]}XP`
      );
      gameConsole.log(`(System) 스킬 포인트 2개 획득했습니다.`);
      this.nextLevelXp = this.xpTable[newLevel];
      this.updateInfo();
    }
  }

  allocateSkillPoint(stat) {
    const cost = this.stats[stat] >= 14 ? 2 : 1;
    if (this.skillPoints = cost && this.stats[stat] < 20) {
      this.stats[stat]++;
      this.skillPoints -= cost;
      gameConsole.log(`(System) ${this.name}의 ${stat} 능력치가 1 증가했습니다. 현재 ${stat}: ${this.stats[stat]}`);
      this.updateInfo();
      return true;
    }
    gameConsole.log("(System) 스킬 포인트가 충분하지 않거나 능력치 최대치에 도달했습니다.");
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
          hpIncrease += 7 + this.getModifier("constitution");
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
    document.getElementById("player-name").textContent = this.name;
    document.getElementById("player-race").textContent = this.race;
    document.getElementById("player-class").textContent = this.class;
    document.getElementById("player-level").textContent = this.level;
    const hpElement = document.getElementById("player-hp");
    hpElement.textContent = this.hp;
    if (this.hp < this.maxHp) {
      if (this.hp < this.maxHp / 2) {
        hpElement.style.color = "red"; // 50% 미만일 때 빨간색
      } else {
        hpElement.style.color = "yellow"; // 50% 이상 100% 미만일 때 노란색
      }
    } else {
      hpElement.style.color = "white"; // 100%일 때 흰색
    }
    document.getElementById("player-max-hp").textContent = this.maxHp;
    document.getElementById("player-gold").textContent = this.gold;
    document.getElementById("player-weapon").textContent = this.equippedWeapon
      ? this.equippedWeapon.name + "(+" + this.equippedWeapon.damage + ")"
      : "없음";
    document.getElementById("player-ac").textContent = this.ac; // AC 정보 업데이트
    document.getElementById("player-armor").textContent = this.equippedArmor
      ? this.equippedArmor.name + "(+" + this.equippedArmor.ac + ")"
      : "없음";
    document.getElementById("player-shield").textContent = this.equippedShield
      ? this.equippedShield.name + "(+" + this.equippedShield.ac + ")"
      : "없음";
    document.getElementById("player-xp").textContent = this.xp;
    document.getElementById("player-next-level-xp").textContent =
      this.nextLevelXp;
    document.getElementById("player-proficiency").textContent =
      this.proficiencyBonus;
    document.getElementById("player-skill-points").textContent =
      this.skillPoints;

    // 스탯 업데이트 및 스킬 포인트 버튼 표시/숨김
    for (let stat in this.stats) {
      const statElement = document.getElementById(`player-${stat}`);
      statElement.textContent = `${this.stats[stat]} (${this.getModifier(stat)})`;
      
      const increaseBtn = statElement.nextElementSibling;
      const cost = this.stats[stat] >= 14 ? 2 : 1;
      if (this.skillPoints >= cost && this.stats[stat] < 20) {
        increaseBtn.style.display = 'inline';
        increaseBtn.textContent = `+${cost}SP`;
      } else {
        increaseBtn.style.display = 'none';
      }
    }
    // 스킬 포인트 표시
    document.getElementById("player-skill-points").textContent = this.skillPoints;
  }
}
