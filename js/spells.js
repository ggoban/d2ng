// spell.js

// 위저드 클래스의 레벨별 주문 슬롯 정의
export const spellSlots = {
  1:  [2, 0, 0, 0, 0, 0, 0, 0, 0],
  2:  [3, 0, 0, 0, 0, 0, 0, 0, 0],
  3:  [4, 2, 0, 0, 0, 0, 0, 0, 0],
  4:  [4, 3, 0, 0, 0, 0, 0, 0, 0],
  5:  [4, 3, 2, 0, 0, 0, 0, 0, 0],
  6:  [4, 3, 3, 0, 0, 0, 0, 0, 0],
  7:  [4, 3, 3, 1, 0, 0, 0, 0, 0],
  8:  [4, 3, 3, 2, 0, 0, 0, 0, 0],
  9:  [4, 3, 3, 3, 1, 0, 0, 0, 0],
  10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
  11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
  19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
  20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
};

// 주문 슬롯을 가져오는 함수
export function getSpellSlots(level) {
  return spellSlots[level] || spellSlots[1]; // 레벨이 없으면 1레벨 슬롯 반환
}

// 주문 클래스 (기존 코드에 추가)
export class Spell {
  constructor(name, ename, level, damage, addEffectType, addEffect, target, school, castingTime, range, components, duration, description) {
      this.name = name;
      this.ename = ename;
      this.level = level;
      this.damage = damage;
      this.addEffectType = addEffectType;
      this.addEffect = addEffect;
      this.target = target;
      this.school = school;
      this.castingTime = castingTime;
      this.range = range;
      this.components = components;
      this.duration = duration;
      this.description = description;
  }
}

export class SpellBook {
  constructor() {
    this.knownSpells = new Map();
    this.preparedSpells = new Map();
    this.slots = JSON.parse(JSON.stringify(getSpellSlots()));
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

  useSlot(level) {   
      this.slots[level-1] -= 1;
      return true;
  }

  resetSlots(characterLevel) {
    this.slots = getSpellSlots(characterLevel);
  }

  castSpell(spellName, slotLevel) {
    const spell = this.preparedSpells.get(spellName);
    if (spell && this.slots[slotLevel - 1] > 0) {
        this.slots[slotLevel - 1]--;
        return spell;
    }
    return null;
  }

  getPreparedSpells() {
    return Array.from(this.preparedSpells.values());
  }

  getAvailableSlots() {
    return this.slots;
  }
}

// 주문 이름, 주문 영어 이름, 레벨, 데미지, 부가효과타입, 부과효과, 타겟
// 학파(방출학파-Evocation, 방호학파-Abjuration, 변환학파-Transmutation, 사령학파-Necromancy, 예지학파-Divination, 조형학파-Transmutation, 환영학파-Illusion, 환혹학파-Enchantment), 
// 캐스팅 타임, 사거리, 구성요소, 지속시간, 설명
// 예시 주문들
const magicMissile = new Spell(
  "마법 화살", "magicMissile", 1, "3d4", "addDamage", 3, "Enemy",
  "Evocation", "1 action", "120 feet", "V, S",
  "Instantaneous", "당신은 세 개의 빛나는 화살을 만들어 낸다. 각 화살은 자동으로 명중하며 1d4+1의 역능 피해를 준다."
);

const cureWounds = new Spell(
  "상처 치료", "cureWounds", 1, "1d8", "heal", 0, "Self",
  "Evocation", "1 action", "0 feet", "V, S",
  "Instantaneous", "당신은 접촉한 크리쳐를 치유하여 1d8 + 당신의 주문시전 능력 수정치만큼 hp를 회복시킵니다. 이 주문은 언데드나 구조물에는 효력이 없습니다."
);

export const spellList = {
  magicMissile: magicMissile,
  cureWounds: cureWounds,
  // 추가 몬스터들...
};