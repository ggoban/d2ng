// battle.js

import { Utils } from './utils.js';
import { gameConsole } from './console.js';
import { Spell } from './spells.js';
import { Skill } from './skills.js';
import { Rogue } from './jobs/rogue.js';
import { Fighter } from './jobs/fighter.js';

export class Battle {
  constructor(game, player, monster, explorationGain) {
    this.game = game;
    this.player = player;
    this.monster = monster;
    this.resetOneTimeAbilities();
    this.explorationGain = explorationGain;
    this.round = 1;
    this.turnCount = 0;
    this.initiativeOrder = [];
  }

  start() {
    this.game.isInBattle = true;
    gameConsole.log(`${this.monster.name}과(와) 조우했습니다! 전투가 시작됩니다.`);
    this.displayMonsterInfo();
    this.determineInitiative();
    this.game.exploreButton.style.display = "none";
    this.game.battleButtons.style.display = "block";
    this.game.updateInventoryUI();
    this.game.updateCanvas();
    this.nextTurn();
  }

  resetOneTimeAbilities() {
    // 다른 한 번만 사용 가능한 기술들도 초기화
    Fighter.secondWindReset();
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
    `);
  }

  determineInitiative() {
    const playerInitiative = this.rollInitiative(this.player);
    const monsterInitiative = this.rollInitiative(this.monster);

    this.initiativeOrder = playerInitiative >= monsterInitiative 
      ? [this.player, this.monster] 
      : [this.monster, this.player];
    gameConsole.log(`${this.initiativeOrder[0].name}이(가) 선공합니다!`);
  }
  
  rollInitiative(character) {
    const dexModifier = Math.floor((character.stats.dexterity - 10) / 2);
    return Utils.rollDice(20, character.name) + dexModifier;
  }

  nextTurn() {
    const currentCharacter = this.initiativeOrder[0];
    gameConsole.log(`-----------------------------------------------`);
    gameConsole.log(`${currentCharacter.name}의 턴입니다.`);
    
    if (currentCharacter === this.player) {
      this.playerTurn();
    } else {
      this.monsterTurn();
    }

    this.game.updateCanvas();
  }

  playerTurn() {
    gameConsole.log("행동을 선택하세요.");
    this.turnCount++;
    this.updatePlayerPanels();
  }

  updatePlayerPanels() {
    if (this.player.class === "Wizard" || this.player.class === "Cleric") {
      this.game.updateSpellPanel();
    }
    if (this.player.class === "Fighter" || this.player.class === "Rogue") {
      this.game.updateSkillPanel();
    }
  }

  monsterTurn() {
    const attackResult = this.performAttack(this.monster, this.player);
    const extra = 0;
    this.handleAttackResult(attackResult, extra, this.monster, this.player);

    if (this.player.hp <= 0) {
      this.end(false);
    } else {
      this.endTurn();
    }
  }

  performAttack(attacker, defender) {
    const attackRollDice = Utils.rollDice(20, attacker.name);
    const attackRoll = attackRollDice + attacker.getAttackBonus();
    let damage = 0;
    let effect = '';

    if (attackRollDice === 20) {
      effect = 'Critical!';
      damage = attacker.getAttackDamage() * 2;
    } else if (attackRollDice === 1) {
      effect = 'Miss!';
    } else if (attackRoll < defender.ac) {
      effect = 'Miss!';
    } else {
      effect = 'Hit!';
      damage = attacker.getAttackDamage();
    }

    return { effect, damage };
  }

  addAttack(result, attacker) {
    const { effect, damage } = result;
    let sneakDamage = 0;
    if (effect != 'Miss!') {
      if (attacker.class === 'Rogue') {
        sneakDamage = Rogue.sneakAttack(attacker.level, attacker.name);
        if (effect === 'Critical!') sneakDamage *= 2;
        gameConsole.log("클래스 효과로 암습 공격 발동!");
        return sneakDamage;
      }
    }
    return 0;
  }
  // 여기서 실제 데미지 입고 바로 0보다 작아지면 아래 displayeffect를 호출하지 않게 수정하자
  handleAttackResult(result, extra, attacker, defender) {
    const { effect, damage } = result;
    const weaponName = attacker.equippedWeapon ? attacker.equippedWeapon.name : '맨손';

    if (effect === 'Critical!') {
      gameConsole.log(`${attacker.name}의 크리티컬 공격이 성공했습니다! ${weaponName}으로 ${damage}의 피해를 입혔습니다!`);
    } else if (effect === 'Miss!') {
      gameConsole.log(`${attacker.name}의 공격이 빗나갔습니다.`);
    } else {
      gameConsole.log(`${attacker.name}의 공격이 성공했습니다. ${weaponName}으로 ${damage}의 피해를 입혔습니다.`);
      if (extra) {
        gameConsole.log(`추가 데미지 ${extra}의 피해를 입혔습니다.`);
      }
    }

    if (damage > 0) defender.takeDamage(damage+extra);
    if (defender.hp > 0 && defender.class === 'Monster') this.displayAttackEffect(effect);
  }

  displayAttackEffect(effect) {
    const effectX = this.game.canvasManager.width / 2;
    const effectY = this.game.canvasManager.height / 2 - 50;
    this.game.canvasManager.drawAttackEffect(effect, effectX, effectY);
    setTimeout(() => this.game.canvasManager.clearAttackEffect(), 200);
  }

  playerAttack() {
    const attackResult = this.performAttack(this.player, this.monster);
    const addDamage = this.addAttack(attackResult, this.player);
    this.handleAttackResult(attackResult, addDamage, this.player, this.monster);

    if (this.monster.hp <= 0) {
      this.clearAttackEffectAndEnd(true);
    } else {
      this.clearAttackEffectAndContinue();
    }
  }

  clearAttackEffectAndEnd(playerWon) {
    setTimeout(() => {
      this.game.canvasManager.clearAttackEffect();
      this.end(playerWon);
    }, 200);
  }
  
  clearAttackEffectAndContinue() {
    setTimeout(() => {
      this.game.canvasManager.clearAttackEffect();
      this.game.updateCanvas();
      this.initiativeOrder.push(this.initiativeOrder.shift());
      this.nextTurn();
    }, 200);
  }

  playerFlee() {
    if (Math.random() < 0.5) {
      gameConsole.log("도망에 성공했습니다!");
      this.end(false);
    } else {
      gameConsole.log("도망에 실패했습니다.");
      this.endTurn();
    }
  }

  useItem(index) {
    const item = this.player.inventory[index];
    if (item) {
      item.use(this);
      this.player.removeItem(index);
      this.game.updateInventoryUI();
      this.player.updateInfo();
      this.game.updateCanvas();
      return true;
    }
    return false;
  }

  useSkillOrSpell(item) {
    if (!this.game.isInBattle || !this.game.currentBattle) {
      gameConsole.log("전투 중에만 사용할 수 있습니다.");
      return;
    }

    if (item instanceof Spell) {
      this.useSpell(item);
    } else if (item instanceof Skill) {
      this.useSkill(item);
    }
  }

  useSpell(spell) {
    gameConsole.log(`${this.player.name}이(가) ${spell.name} 주문을 시전 중입니다.`);
    if (spell.target === "Enemy" && this.player.spellBook.slots[spell.level - 1] > 0) {
      const spellRollDice = Utils.rollDice(20, this.player.name);
      const spellRoll = spellRollDice + this.player.getSpellBonus();
      let damage = 0;

      if (spellRollDice === 20) {
        damage = this.player.getSpellDamage(spell) * 2;
        gameConsole.log(`${this.player.name}의 ${spell.name} 주문이 대성공했습니다! ${damage}의 피해를 입혔습니다!`);
      } else if (spellRollDice === 1 || spellRoll < this.monster.ac) {
        gameConsole.log(`${this.player.name}의 ${spell.name} 주문이 실패했습니다.`);
      } else {
        damage = this.player.getSpellDamage(spell);
        gameConsole.log(`${this.player.name}의 ${spell.name} 주문이 성공했습니다. ${damage}의 피해를 입혔습니다.`);
      }

      this.player.spellBook.slots[spell.level - 1] -= 1;
      const remainSlots = this.player.spellBook.getAvailableSlots();
      gameConsole.log(
        `${this.player.name}의 주문 슬롯이 ${remainSlots} 남았습니다.`
      );
      this.monster.takeDamage(damage);

      if (this.monster.hp <= 0) {
        this.end(true);
      } else {
        this.endTurn();
      }
    } else if (spell.target === "Self" && this.player.spellBook.slots[spell.level - 1] > 0) {
      let damage = 0;
      if (spell.addEffectType === 'heal') {
        damage = this.player.getSpellDamage(spell);
        gameConsole.log(
          `${this.player.name}이(가) ${spell.name} 주문을 시전하여 ${damage}만큼 회복했습니다.`
        );
        this.player.heal(damage);
        this.player.spellBook.slots[spell.level - 1] -= 1;
        const remainSlots = this.player.spellBook.getAvailableSlots();
        gameConsole.log(
          `${this.player.name}의 주문 슬롯이 ${remainSlots} 남았습니다.`
        );
      }
      this.endTurn();
    } else {
      const remainSlots = this.player.spellBook.getAvailableSlots();
      gameConsole.log(
        `${this.player.name}의 주문 슬롯이 충분하지 않습니다! 남은 슬롯: ${remainSlots}.`
      );
    }
  }

  useSkill(skill) {
    if (skill.type === 'active') {
      switch (skill.ename) {
        case 'secondWind':
          const result = Fighter.secondWind(this.player.level, this.player.name);
          if (result) {
            gameConsole.log(
              `${this.player.name}이(가) ${skill.name}을 시전하여 ${result}만큼 회복했습니다.`
            );
            this.player.heal(result);
            this.endTurn();
          } else {
            gameConsole.log(`전투 중 한번만 사용 가능합니다.`);
          }
          break;
      }
    } else {
      gameConsole.log("패시브 스킬은 직접 사용할 수 없습니다.");
    }
  }

  endTurn() {
    this.turnCount++;
    if (this.turnCount >= this.initiativeOrder.length) {
      this.round++;
      this.turnCount = 0;
    }
    this.game.updateCanvas();
    this.initiativeOrder.push(this.initiativeOrder.shift());
    this.nextTurn();
  }

  end(isVictory) {
    this.game.isInBattle = false;
    if (isVictory) {
      gameConsole.log(`${this.monster.name}을(를) 물리쳤습니다!`);
      this.player.gainExperience(this.monster.xp);
      this.game.increaseExploration(this.explorationGain);
      // this.dropEquipment(); 장비 드랍 관련 기능 추후 고도화
      // this.game.exploreButton.style.display = 'inline';
      // this.game.battleButtons.style.display = 'none';
    } else {
      if (this.player.hp <= 0) {
        // 여기에 패배 시 처리 로직을 추가할 수 있습니다.
        this.game.battleButtons.style.display = "none";
        gameConsole.log(
          `당신은 ${this.monster.name}에게 패배했습니다. 당신의 이번 여정은 여기까지 입니다...`
        );
        this.game.gameOver();
      } else {
        gameConsole.log(`전투가 종료되었습니다.`);
      }
    }
    this.game.skillPanel.style.display = "none";
    this.game.spellPanel.style.display = "none";
    this.game.battleButtons.style.display = "none";

    this.monster.resetHp();
    this.game.currentMonster = null;
    //this.game.updateExplorationButtons();
    //this.game.updateCanvas();
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
}