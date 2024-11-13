// spells.js
export class Spell {
  constructor(name, level, effect, description) {
      this.name = name;
      this.level = level;
      this.effect = effect;
      this.description = description;
  }
}

export class SpellBook {
  constructor() {
    this.knownSpells = new Map();
    this.preparedSpells = new Map();
    this.slots = new Map();
  }

  learnSpell(spell) {
    this.knownSpells.set(spell.name, spell);
  }

  prepareSpell(spellName) {
    const spell = this.knownSpells.get(spellName);
    if (spell) {
      this.preparedSpells.set(spellName, spell);
    }
  }

  unprepareSpell(spellName) {
    this.preparedSpells.delete(spellName);
  }

  setSlots(level, count) {
    this.slots.set(level, count);
  }

  useSlot(level) {
    if (this.slots.has(level) && this.slots.get(level) > 0) {
      this.slots.set(level, this.slots.get(level) - 1);
      return true;
    }
    return false;
  }

  resetSlots() {
    for (let [level, count] of this.slots) {
      this.slots.set(level, count);
    }
  }

  getPreparedSpells() {
    return Array.from(this.preparedSpells.values());
  }

  getAvailableSlots() {
    return Array.from(this.slots.entries());
  }
}

// 예시 주문들
export const magicMissile = new Spell("매직 미사일", 1, (caster, target) => {
  const damage = 3 + Math.floor(caster.stats.intelligence / 2);
  target.takeDamage(damage);
  return `${caster.name}의 매직 미사일! ${target.name}에게 ${damage}의 피해를 입혔습니다.`;
}, "실패하지 않는 마법 화살을 발사합니다.");

export const cureLightWounds = new Spell("경상 치료", 1, (caster, target) => {
  const healAmount = 5 + Math.floor(caster.stats.wisdom / 2);
  target.heal(healAmount);
  return `${caster.name}의 경상 치료! ${target.name}의 체력을 ${healAmount} 회복했습니다.`;
}, "가벼운 상처를 치료합니다.");