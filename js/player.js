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
    this.inventorySize = 20;
    this.inventory = new Array(this.inventorySize).fill(null);
    this.stats = {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10
    };
    //this.xp = 0;
    this.xp = 290; // 임시 세팅
    this.nextLevelXp = 300; // 다음 레벨까지 필요한 경험치
    this.proficiencyBonus = 2;
    this.xpTable = [
      0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000,
      85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
    ];
    this.skillPoints = 0;
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
        charisma: 10
    };
    this.xp = 0;
    this.nextLevelXp = 300;
    this.proficiencyBonus = 2;
    this.skillPoints = 0;
    this.equippedWeapon = null;
    this.equippedArmor = null;
    this.resetInventory();
    this.updateInfo();
  }

  setCharacter(name, race, characterClass) {
    this.name = name;
    this.race = race;
    this.class = characterClass;
    this.setRacialBonuses();
    this.setClassSuggestions();
    this.setInitialHp();
    this.setInitialAc(); // AC 초기화 메서드 호출
    this.setInitialEquipment(); // 새로운 메서드 호출
    this.updateInfo();
  }

  setRacialBonuses() {
    switch (this.race) {
        case 'Dwarf':
            this.stats.constitution += 2;
            break;
        case 'Elf':
            this.stats.dexterity += 2;
            break;
        case 'Human':
            for (let stat in this.stats) {
                this.stats[stat] += 1;
            }
            break;
        case 'Halfling':
            this.stats.dexterity += 2;
            break;
    }
  }

  setClassSuggestions() {
    switch (this.class) {
        case 'Fighter':
            this.stats.strength += 2;
            this.stats.constitution += 1;
            break;
        case 'Rogue':
            this.stats.dexterity += 2;
            this.stats.intelligence += 1;
            break;
        case 'Wizard':
            this.stats.intelligence += 2;
            this.stats.wisdom += 1;
            break;
        case 'Cleric':
            this.stats.wisdom += 2;
            this.stats.charisma += 1;
            break;
    }
  }

  setInitialHp() {
    let baseHp;
    switch (this.class) {
        case 'Fighter':
            baseHp = 10;
            break;
        case 'Rogue':
            baseHp = 7;
            break;
        case 'Cleric':
            baseHp = 8;
            break;
        case 'Wizard':
            baseHp = 6;
            break;
    }
    this.maxHp = baseHp + this.getModifier(this.stats.constitution);
    this.hp = this.maxHp;
  }

  setInitialAc() {
    // 기본 AC 10에 민첩 수정치를 더합니다.
    this.ac = 10 + this.getModifier(this.stats.dexterity);
    
    // 직업에 따라 추가 보너스를 줄 수 있습니다.
    switch (this.class) {
        case 'Fighter':
            this.ac += 2; // 파이터는 기본적으로 방어구를 착용한다고 가정
            break;
        case 'Rogue':
            this.ac += 1; // 로그는 민첩함으로 인한 추가 보너스
            break;
        // 다른 직업에 대한 추가 보너스도 여기에 추가할 수 있습니다.
    }
  }

  setInitialEquipment() {
    // 기본 무기 장착
    this.equipWeapon(equipmentList.basicSword);
    
    // 기본 방어구 장착
    this.equipArmor(equipmentList.basicArmor);

    // 직업에 따라 추가 장비 제공 (선택사항)
    /*switch (this.class) {
        case 'Fighter':
            this.equipWeapon(equipmentList.sword);
            this.equipArmor(equipmentList.plateArmor);
            break;
        case 'Rogue':
            this.equipWeapon(equipmentList.sword);
            this.equipArmor(equipmentList.leatherArmor);
            break;
        // 다른 직업들에 대한 케이스 추가 가능
    }*/
  }

  getModifier(stat) {
    return Math.floor((stat - 10) / 2);
  }

  initializeInventory() {
    const inventoryGrid = document.getElementById('inventory-grid');
    inventoryGrid.innerHTML = '';
    for (let i = 0; i < this.inventorySize; i++) {
        const slot = document.createElement('div');
        slot.className = 'inventory-slot empty';
        slot.dataset.index = i;
        inventoryGrid.appendChild(slot);
    }
  }

  resetInventory() {
    this.inventory = new Array(this.inventorySize).fill(null);
    this.updateInventoryUI();
  }

  updateInventoryUI() {
      const inventoryGrid = document.getElementById('inventory-grid');
      inventoryGrid.innerHTML = '';
      for (let i = 0; i < this.inventorySize; i++) {
          const slot = document.createElement('div');
          slot.className = 'inventory-slot empty';
          slot.dataset.index = i;
          if (this.inventory[i]) {
              slot.textContent = this.inventory[i].name;
              slot.className = 'inventory-slot';
              slot.title = this.inventory[i].description;
              slot.onclick = () => this.useItem(i);
          }
          inventoryGrid.appendChild(slot);
      }
  }

  addItem(item) {
    const emptySlot = this.inventory.findIndex(slot => slot === null);
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

  equipWeapon(weapon) {
    if (weapon.type === 'weapon') {
        this.equippedWeapon = weapon;
        gameConsole.log(`${weapon.name}을(를) 장착했습니다.`);
        this.updateInfo();
    } else {
        gameConsole.log("이 아이템은 무기가 아닙니다.");
    }
  }

  equipArmor(armor) {
      if (armor.type === 'armor') {
          this.equippedArmor = armor;
          gameConsole.log(`${armor.name}을(를) 장착했습니다.`);
          this.updateInfo();
      } else {
          gameConsole.log("이 아이템은 방어구가 아닙니다.");
      }
  }

  unequipWeapon() {
      if (this.equippedWeapon) {
          gameConsole.log(`${this.equippedWeapon.name}을(를) 해제했습니다.`);
          this.equippedWeapon = null;
          this.updateInfo();
      }
  }

  unequipArmor() {
      if (this.equippedArmor) {
          gameConsole.log(`${this.equippedArmor.name}을(를) 해제했습니다.`);
          this.equippedArmor = null;
          this.updateInfo();
      }
  }

  getAttackBonus() {
    return this.equippedWeapon ? this.equippedWeapon.attackBonus : 0;
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
    gameConsole.log(`${xp} 경험치를 획득했습니다! (총 경험치: ${this.xp})`);
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
        gameConsole.log(`레벨 업! 현재 레벨: ${this.level}, 다음 필요 경험치는 ${this.xpTable[newLevel]}XP`);
        gameConsole.log(`스킬 포인트 2개 획득했습니다.`);
        this.nextLevelXp = this.xpTable[newLevel];
        this.updateInfo();
        this.showSkillPointAllocationUI();
    }
  }

  showSkillPointAllocationUI() {
    const allocationUI = document.getElementById('skill-point-allocation');
    allocationUI.style.display = 'block';
    allocationUI.innerHTML = `
        <h3>스킬 포인트 할당</h3>
        <p>남은 스킬 포인트: <span id="remaining-skill-points">${this.skillPoints}</span></p>
        <div class="skill-buttons">
            <button id="str-up">근력 +</button>
            <button id="dex-up">민첩 +</button>
            <button id="con-up">건강 +</button>
            <button id="int-up">지능 +</button>
            <button id="wis-up">지혜 +</button>
            <button id="cha-up">매력 +</button>
        </div>
    `;

    const updateRemainingPoints = () => {
        document.getElementById('remaining-skill-points').textContent = this.skillPoints;
        if(this.skillPoints===0) allocationUI.style.display = 'none';
    };

    const allocatePoint = (stat) => {
        if (this.allocateSkillPoint(stat)) {
            updateRemainingPoints();
        }
    };

    document.getElementById('str-up').addEventListener('click', () => allocatePoint('strength'));
    document.getElementById('dex-up').addEventListener('click', () => allocatePoint('dexterity'));
    document.getElementById('con-up').addEventListener('click', () => allocatePoint('constitution'));
    document.getElementById('int-up').addEventListener('click', () => allocatePoint('intelligence'));
    document.getElementById('wis-up').addEventListener('click', () => allocatePoint('wisdom'));
    document.getElementById('cha-up').addEventListener('click', () => allocatePoint('charisma'));
  }

  allocateSkillPoint(stat) {
    if (this.skillPoints > 0 && this.stats[stat] < 20) {
        this.stats[stat]++;
        this.skillPoints--;
        gameConsole.log(`${stat} 능력치가 1 증가했습니다. 현재 ${stat}: ${this.stats[stat]}`);
        this.updateInfo();
        return true;
    }
    return false;
  }

  updateProficiencyBonus() {
    this.proficiencyBonus = 2 + Math.floor((this.level - 1) / 4);
  }

  increaseHitPoints(levelsGained) {
    let hpIncrease = 0;
    for (let i = 0; i < levelsGained; i++) {
        switch (this.class) {
            case 'Fighter':
                hpIncrease += 10 + this.getModifier(this.stats.constitution);
                break;
            case 'Rogue':
                hpIncrease += 7 + this.getModifier(this.stats.constitution);
                break;
            case 'Cleric':
                hpIncrease += 8 + this.getModifier(this.stats.constitution);
                break;
            case 'Wizard':
                hpIncrease += 6 + this.getModifier(this.stats.constitution);
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

  updateInfo() {
    document.getElementById('player-name').textContent = this.name;
    document.getElementById('player-race').textContent = this.race;
    document.getElementById('player-class').textContent = this.class;
    document.getElementById('player-level').textContent = this.level;
    const hpElement = document.getElementById('player-hp');
    hpElement.textContent = this.hp;
    if (this.hp < this.maxHp) {
      if (this.hp < this.maxHp / 2) {
        hpElement.style.color = 'red';  // 50% 미만일 때 빨간색
      } else {
        hpElement.style.color = 'yellow';  // 50% 이상 100% 미만일 때 노란색
      }
    } else {
      hpElement.style.color = 'white';  // 100%일 때 흰색
    }
    document.getElementById('player-max-hp').textContent = this.maxHp;
    document.getElementById('player-gold').textContent = this.gold;
    document.getElementById('player-ac').textContent = this.ac; // AC 정보 업데이트
    document.getElementById('player-xp').textContent = this.xp;
    document.getElementById('player-next-level-xp').textContent = this.nextLevelXp;
    document.getElementById('player-proficiency').textContent = this.proficiencyBonus;
    document.getElementById('player-skill-points').textContent = this.skillPoints;
    document.getElementById('player-weapon').textContent = this.equippedWeapon ? this.equippedWeapon.name+"(+"+this.equippedWeapon.attackBonus+")" : "없음";
    document.getElementById('player-armor').textContent = this.equippedArmor ? this.equippedArmor.name+"(+"+this.equippedArmor.defenseBonus+")" : "없음";

    // Update stats
    for (let stat in this.stats) {
        document.getElementById(`player-${stat}`).textContent = this.stats[stat]+`(${this.getModifier(this.stats[stat])})`;
    }
  }
}