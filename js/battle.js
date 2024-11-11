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
      gameConsole.log(`(System) ${this.monster.name}과(와) 조우했습니다! 전투가 시작됩니다.`);
      this.displayMonsterInfo();
      this.determineInitiative();
      this.game.exploreButton.style.display = 'none';
      this.game.battleButtons.style.display = 'block';
      this.game.updateCanvas();
      this.nextTurn();
  }

  displayMonsterInfo() {
    gameConsole.log(`
        (System)
        몬스터 정보:
        이름: ${this.monster.name}
        크기: ${this.monster.size}
        종류: ${this.monster.type}
        AC: ${this.monster.ac}
        HP: ${this.monster.hp}/${this.monster.maxHp}
        도전 지수: ${this.monster.cr},
    `)
  }

  determineInitiative() {
    const playerInitiative = this.rollInitiative(this.player);
    const monsterInitiative = this.rollInitiative(this.monster);

    if (playerInitiative >= monsterInitiative) {
        this.initiativeOrder = [this.player, this.monster];
        gameConsole.log("(System) 플레이어가 선공합니다!");
    } else {
        this.initiativeOrder = [this.monster, this.player];
        gameConsole.log(`(System) ${this.monster.name}이(가) 선공합니다!`);
    }
  }

  rollInitiative(character) {
    const dexModifier = Math.floor((character.stats.dexterity - 10) / 2);
    return Utils.rollDice(20, character.name) + dexModifier;
  }

  nextTurn() {
    const currentCharacter = this.initiativeOrder[0];
    if (currentCharacter === this.player) {
        gameConsole.log(`(System) ------------------------------------`);
        gameConsole.log("(System) 플레이어의 턴입니다. 행동을 선택하세요.");
        // 플레이어의 행동은 버튼 클릭으로 처리됩니다.
    } else {
        gameConsole.log(`(System) -------------------------------`);
        gameConsole.log(`(System) ${this.monster.name}의 턴입니다.`);
        this.monsterAction();
    }
  }
  
  monsterAction() {
    const attackRollDice = Utils.rollDice(20, this.monster.name);
    const attackRoll = attackRollDice + this.monster.getAttackBonus();
        
    if (attackRollDice === 20 || (attackRollDice !== 1 && attackRoll >= this.player.ac)) {
        let damage = this.monster.getAttackDamage();
        
        if (attackRollDice === 20) {
            damage *= 2;  // 크리티컬 히트 시 데미지 2배
            gameConsole.log("(System) 크리티컬 히트! 몬스터의 공격이 치명적입니다!");
        }

        const playerSurvived = this.player.takeDamage(damage);
        gameConsole.log(`(System) ${this.monster.name}의 공격이 성공했습니다! ${this.monster.equippedWeapon ? this.monster.equippedWeapon.name : '맨손'}으로 ${damage}의 피해를 입혔습니다.`);
        
        if (!playerSurvived) {
            this.end(false);
            return;
        }
    } else if (attackRollDice === 1) {
        gameConsole.log("(System) 크리티컬 미스! 몬스터의 공격이 완전히 빗나갔습니다.");
    } else {
        gameConsole.log(`(System) ${this.monster.name}의 공격이 빗나갔습니다.`);
    }    
    this.game.updateCanvas();
    this.initiativeOrder.push(this.initiativeOrder.shift());
    this.nextTurn();
  }

  playerAttack() {
    const attackRollDice = Utils.rollDice(20, this.player.name);
    const attackRoll = attackRollDice + this.player.getAttackBonus();
    if (attackRollDice === 20 || (attackRollDice !== 1 && attackRoll >= this.monster.ac)) {
        let damage = this.player.getAttackDamage();
        if (attackRollDice === 20) {
          damage *= 2;  // 크리티컬 히트 시 데미지 2배
          gameConsole.log("(System) 크리티컬 히트! 데미지가 2배가 됩니다!");
        }
        this.monster.hp = Math.max(0, this.monster.hp - damage);
        gameConsole.log(`(System) 플레이어의 공격이 성공했습니다! ${this.player.equippedWeapon ? this.player.equippedWeapon.name : '맨손'}으로 ${damage}의 피해를 입혔습니다.`);
        if (this.monster.hp <= 0) {
            this.end(true);
            return;
        }
    } else if (attackRollDice === 1) {
      gameConsole.log("(System) 크리티컬 미스! 플레이어의 공격이 완전히 빗나갔습니다.");
    } else {
        gameConsole.log("(System) 플레이어의 공격이 빗나갔습니다.");
    }
    this.game.updateCanvas();
    this.initiativeOrder.push(this.initiativeOrder.shift());
    this.nextTurn();
  }

  playerFlee() {
    if (Math.random() < 0.5) {
        gameConsole.log("(System) 도망에 성공했습니다!");
        this.end(false);
    } else {
        gameConsole.log("(System) 도망에 실패했습니다.");
        this.initiativeOrder.push(this.initiativeOrder.shift());
        this.nextTurn();
    }
  }

  end(isVictory) {
    this.game.isInBattle = false;
    if (isVictory) {
        gameConsole.log(`(System) ${this.monster.name}을(를) 물리쳤습니다!`);
        this.player.gainExperience(this.monster.xp);
        this.game.increaseExploration(this.explorationGain);
        // this.dropEquipment(); 장비 드랍 관련 기능 추후 고도화
        // this.game.exploreButton.style.display = 'inline';
        // this.game.battleButtons.style.display = 'none';
    } else {
        if (this.player.hp <= 0) {
            // 여기에 패배 시 처리 로직을 추가할 수 있습니다.
            gameConsole.log(`DM: 당신은 ${this.monster.name}에게 패배했습니다. 당신의 이번 여정은 여기까지 입니다...`);
            this.game.gameOver();
            return;
        } else {
            gameConsole.log(`(System) 전투가 종료되었습니다.`);
            // this.game.exploreButton.style.display = 'inline';
            // this.game.battleButtons.style.display = 'none';
        }
    }
    
    /* 추후 고도화
    dropEquipment() {
      if (Math.random() < 0.3) { // 30% 확률로 장비 드롭
          const droppedEquipment = Math.random() < 0.5 ? this.monster.equippedWeapon : this.monster.equippedArmor;
          if (droppedEquipment) {
              gameConsole.log(`${this.monster.name}이(가) ${droppedEquipment.name}을(를) 떨어뜨렸습니다!`);
              // 여기에 플레이어가 장비를 획득하는 로직을 추가
          }
      }
    }*/
    
    this.monster.resetHp();
    this.game.currentMonster = null;
    this.game.updateExplorationButtons();
    this.game.battleButtons.style.display = 'none';
    this.game.updateCanvas();
  }
}