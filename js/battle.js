class Battle {
  constructor(game, player, monster, explorationGain) {
      this.game = game;
      this.player = player;
      this.monster = monster;
      this.explorationGain = explorationGain;
      this.initiativeOrder = [];
  }

  start() {
      this.game.isInBattle = true;
      gameConsole.log(`${this.monster.name}과(와) 조우했습니다! 전투가 시작됩니다.`);
      this.displayMonsterInfo();
      this.determineInitiative();
      this.game.exploreButton.style.display = 'none';
      this.game.battleButtons.style.display = 'block';
      this.game.updateCanvas();
      this.nextTurn();
  }

  displayMonsterInfo() {
    gameConsole.log(`
        몬스터 정보:
        이름: ${this.monster.name}
        크기: ${this.monster.size}
        종류: ${this.monster.type}
        AC: ${this.monster.ac}
        HP: ${this.monster.hp}/${this.monster.maxHp}
        도전 지수: ${this.monster.cr},
        무기: ${this.monster.weapon.name},
        방어구: ${this.monster.armor.name}
    `);
  }

  determineInitiative() {
    const playerInitiative = this.rollInitiative(this.player);
    const monsterInitiative = this.rollInitiative(this.monster);

    if (playerInitiative >= monsterInitiative) {
        this.initiativeOrder = [this.player, this.monster];
        gameConsole.log("플레이어가 선공합니다!");
    } else {
        this.initiativeOrder = [this.monster, this.player];
        gameConsole.log(`${this.monster.name}이(가) 선공합니다!`);
    }
  }

  rollInitiative(character) {
    const dexModifier = Math.floor((character.stats.dexterity - 10) / 2);
    return Math.floor(Math.random() * 20) + 1 + dexModifier;
  }

  nextTurn() {
    const currentCharacter = this.initiativeOrder[0];
    if (currentCharacter === this.player) {
        gameConsole.log("플레이어의 턴입니다. 행동을 선택하세요.");
        // 플레이어의 행동은 버튼 클릭으로 처리됩니다.
    } else {
        this.monsterAction();
    }
  }
  
  monsterAction() {
    gameConsole.log(`${this.monster.name}의 턴입니다.`);
    const attackRoll = Math.floor(Math.random() * 20) + 1 + Math.floor((this.monster.stats.strength - 10) / 2) + this.monster.getAttackBonus();
    if (attackRoll >= this.player.ac + this.player.getDefenseBonus()) {
        const damage = Math.max(1, Math.floor(Math.random() * 6) + 1 + Math.floor((this.monster.stats.strength - 10) / 2) + this.monster.getAttackBonus());
        const playerSurvived = this.player.takeDamage(damage);
        gameConsole.log(`${this.monster.name}의 공격이 성공했습니다! 플레이어가 ${damage}의 피해를 입었습니다.`);
        if (!playerSurvived) {
            this.end(false);
            return;
        }
    } else {
        gameConsole.log(`${this.monster.name}의 공격이 빗나갔습니다.`);
    }
    this.game.updateCanvas();
    this.initiativeOrder.push(this.initiativeOrder.shift());
    this.nextTurn();
  }

  playerAttack() {
    const attackRoll = Math.floor(Math.random() * 20) + 1 + this.player.getModifier(this.player.stats.strength) + this.player.getAttackBonus();
    if (attackRoll >= this.monster.ac + this.monster.getDefenseBonus()) {
        const damage = Math.max(1, Math.floor(Math.random() * 6) + 1 + this.player.getModifier(this.player.stats.strength) + this.player.getAttackBonus());
        this.monster.hp = Math.max(0, this.monster.hp - damage);
        gameConsole.log(`플레이어의 공격이 성공했습니다! ${damage}의 피해를 입혔습니다.`);
        if (this.monster.hp <= 0) {
            this.end(true);
            return;
        }
    } else {
        gameConsole.log("플레이어의 공격이 빗나갔습니다.");
    }
    this.game.updateCanvas();
    this.initiativeOrder.push(this.initiativeOrder.shift());
    this.nextTurn();
  }

  playerFlee() {
    if (Math.random() < 0.5) {
        gameConsole.log("도망에 성공했습니다!");
        this.end(false);
    } else {
        gameConsole.log("도망에 실패했습니다.");
        this.initiativeOrder.push(this.initiativeOrder.shift());
        this.nextTurn();
    }
  }

  end(isVictory) {
    this.game.isInBattle = false;
    if (isVictory) {
        gameConsole.log(`${this.monster.name}을(를) 물리쳤습니다!`);
        this.player.gainExperience(this.monster.xp);
        this.game.increaseExploration(this.explorationGain);
        // this.game.exploreButton.style.display = 'inline';
        // this.game.battleButtons.style.display = 'none';
    } else {
        if (this.player.hp <= 0) {
            // 여기에 패배 시 처리 로직을 추가할 수 있습니다.
            gameConsole.log(`당신은 ${this.monster.name}에게 패배했습니다. 이번 모험은 여기까지 입니다...`);
            this.game.gameOver();
            return;
        } else {
            gameConsole.log(`전투가 종료되었습니다.`);
            // this.game.exploreButton.style.display = 'inline';
            // this.game.battleButtons.style.display = 'none';
        }
    }
    
    this.monster.resetHp();
    this.game.currentMonster = null;
    this.game.updateExplorationButtons();
    this.game.battleButtons.style.display = 'none';
    this.game.updateCanvas();
  }
}