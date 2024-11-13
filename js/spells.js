// spells.js
import { gameConsole } from './console.js';

export class Spell {
  constructor(name, level, castingTime, range, components, duration, description, effect) {
      this.name = name;
      this.level = level;
      this.castingTime = castingTime;
      this.range = range;
      this.components = components;
      this.duration = duration;
      this.description = description;
      this.effect = effect;
  }

  cast(caster, target) {
      // 주문 시전 로직
      gameConsole.log(`${caster.getName()}이(가) ${this.name} 주문을 시전합니다.`);
      this.effect(caster, target);
  }
}

export const spellList = {
  // 0레벨 주문 (캔트립)
  lightCantrip: new Spell(
      "빛", 0, "1 행동", "접촉", "V, M (반딧불이 또는 빛나는 이끼)", "1시간", "당신이 터치한 물체에서 빛이 나옵니다.",
      (caster, target) => {
          gameConsole.log(`${target}에 빛이 밝혀집니다.`);
          // 빛 효과 구현
      }
  ),

  // 1레벨 주문
  magicMissile: new Spell(
      "마법 화살", 1, "1 행동", "120피트", "V, S", "즉시", "3개의 빛나는 화살을 만들어 목표물에게 발사합니다.",
      (caster, target) => {
          const damage = 3 * (Utils.rollDice(4) + 1);
          target.takeDamage(damage);
          gameConsole.log(`${target.getName()}에게 ${damage}의 피해를 입혔습니다.`);
      }
  ),

  // 추가 주문들...
};

export class SpellBook {
  constructor() {
      this.knownSpells = [];
  }

  learnSpell(spellName) {
      if (spellList[spellName] && !this.knownSpells.includes(spellName)) {
          this.knownSpells.push(spellName);
          gameConsole.log(`${spellName} 주문을 배웠습니다.`);
      } else {
          gameConsole.log("해당 주문을 배울 수 없습니다.");
      }
  }

  castSpell(spellName, caster, target) {
      if (this.knownSpells.includes(spellName)) {
          spellList[spellName].cast(caster, target);
      } else {
          gameConsole.log("알지 못하는 주문입니다.");
      }
  }
}