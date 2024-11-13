// monster.js
import { Utils } from './utils.js';
import { weapons, armors, ArmorType, WeaponProperty } from './equipments.js';

export class Monster {
  constructor(name, ename, size, type, stats, hp, xp, cr) {
      this.name = name;
      this.ename = ename;
      this.size = size;
      this.type = type;
      this.stats = stats;
      this.hp = hp;
      this.maxHp = hp;
      this.xp = xp;
      this.cr = cr;  // 도전 지수 추가
      this.equippedWeapon = null;
      this.equippedArmor = null;
      this.equippedShield = null;
      this.proficiencyBonus = Math.floor((cr - 1) / 4) + 2; // CR에 따른 숙련 보너스 계산
      this.updateAC();
  }

  equipWeapon(weapon) {
    this.equippedWeapon = weapon;
  }

  equipArmor(armor) {
      this.equippedArmor = armor;
      this.updateAC();
  }

  equipShield(shield) {
      this.equippedShield = shield;
      this.updateAC();
  }

  updateAC() {
    let baseAC = 10;
    const dexMod = this.getModifier('dexterity');

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
        baseAC += dexMod;
    }

    if (this.equippedShield) {
        baseAC += this.equippedShield.ac;
    }

    this.ac = baseAC;
  }  

  getModifier(stat) {
    return Utils.calculateModifier(this.stats[stat]);
  }
  
  resetHp() {
    this.hp = this.maxHp;
  }

  getAttackBonus() {
    let bonus = this.proficiencyBonus;
    if (this.equippedWeapon) {
        if (this.equippedWeapon.properties.includes(WeaponProperty.FINESSE)) {
            bonus += Math.max(this.getModifier('strength'), this.getModifier('dexterity'));
        } else if (this.equippedWeapon.properties.includes(WeaponProperty.AMMUNITION)) {
            bonus += this.getModifier('dexterity');
        } else {
            bonus += this.getModifier('strength');
        }
    } else {
        bonus += this.getModifier('strength');
    }
    return bonus;
  }

  getAttackDamage() {
    if (this.equippedWeapon) {
        const [diceCount, diceSides] = this.equippedWeapon.damage.split('d').map(Number);
        let damage = 0;
        for (let i = 0; i < diceCount; i++) {
            damage += Utils.rollDice(diceSides, this.name);
        }
        if (this.equippedWeapon.properties.includes(WeaponProperty.FINESSE)) {
            damage += Math.max(this.getModifier('strength'), this.getModifier('dexterity'));
        } else if (this.equippedWeapon.properties.includes(WeaponProperty.AMMUNITION)) {
            damage += this.getModifier('dexterity');
        } else {
            damage += this.getModifier('strength');
        }
        return Math.max(1, damage);
    }
    // 맨손 공격
    return Math.max(1, Utils.rollDice(4, this.name) + this.getModifier('strength'));
  }

  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
    return this.hp > 0;
  }

  getDefenseBonus() {
      return this.armor ? this.armor.defenseBonus : 0;
  }
}

// 몬스터 크기 열거형
export const MonsterSize = {
  TINY: '초소형',
  SMALL: '소형',
  MEDIUM: '중형',
  LARGE: '대형',
  HUGE: '거대형',
  GARGANTUAN: '초대형'
};

// 몬스터 종류 열거형
export const MonsterType = {
  GIANT: '거인',
  MONSTROSITY: '괴물류',
  CONSTRUCT: '구조물',
  ABERRATION: '기괴체',
  PLANT: '식물류',
  FIEND: '악마',
  BEAST: '야수',
  UNDEAD: '언데드',
  FEY: '요정',
  DRAGON: '용족',
  ELEMENTAL: '원소',
  HUMANOID: '인간형',
  OOZE: '점액류',
  CELESTIAL: '천상체'
};

// 몬스터 생성 함수
export function createMonster(name, ename, size, type, stats, hp, xp, cr, weapon, armor, shield) {
  const monster = new Monster(name, ename, size, type, stats, hp, xp, cr);
    if (weapon) monster.equipWeapon(weapon);
    if (armor) monster.equipArmor(armor);
    if (shield) monster.equipShield(shield);
  return monster;
}

// 몇 가지 예시 몬스터
// 숫자는 hp, xp, cr 순
const frog = createMonster(
  "개구리", 'frog', MonsterSize.TINY, MonsterType.BEAST,
  { strength: 1, dexterity: 13, constitution: 8, intelligence: 1, wisdom: 8, charisma: 3 },
  1, 0, 0,
  null, null, null
);

const goblin = createMonster(
  "고블린", 'goblin', MonsterSize.SMALL, MonsterType.HUMANOID,
  { strength: 8, dexterity: 14, constitution: 10, intelligence: 10, wisdom: 8, charisma: 8 },
  7, 50, 1/4,
  weapons.scimitar,
  armors.leather,
  armors.shield
);

const giantfrog = createMonster(
  "거대 개구리", 'giantfrog', MonsterSize.MEDIUM, MonsterType.BEAST,
  { strength: 12, dexterity: 13, constitution: 11, intelligence: 2, wisdom: 10, charisma: 3 },
  18, 50, 1/4,
  null, null, null
);

const brownbear = createMonster(
  "갈색 곰", 'brownbear', MonsterSize.LARGE, MonsterType.BEAST,
  { strength: 19, dexterity: 10, constitution: 16, intelligence: 2, wisdom: 13, charisma: 7 },
  34, 200, 1,
  weapons.claws, // 특별한 "무기"로 발톱을 사용
  null,
  null
);

const owlbear = createMonster(
  "아울베어", 'owlbear',
  MonsterSize.LARGE, MonsterType.MONSTROSITY,
  { strength: 20, dexterity: 12, constitution: 17, intelligence: 3, wisdom: 12, charisma: 7 },
  59, 700, 3,
  weapons.claws, // 특별한 "무기"로 발톱을 사용
  null,
  null
);

const hobgoblin = createMonster(
  "홉고블린", 'hobgoblin',
  MonsterSize.MEDIUM, MonsterType.HUMANOID,
  { strength: 13, dexterity: 12, constitution: 12, intelligence: 10, wisdom: 10, charisma: 9 },
  11, 100, 1/2,
  weapons.longsword,
  armors.chainMail,
  armors.shield
);

const giantelk = createMonster(
  "거대 엘크", 'giantelk', MonsterSize.HUGE, MonsterType.BEAST,
  { strength: 19, dexterity: 16, constitution: 14, intelligence: 7, wisdom: 14, charisma: 10 },
  42, 450, 2,
  null, null, null
);

const troll = createMonster(
  "트롤", 'troll', MonsterSize.LARGE, MonsterType.GIANT,
  { strength: 18, dexterity: 13, constitution: 20, intelligence: 7, wisdom: 9, charisma: 7 },
  84, 1800, 5,
  null, null, null
);

// 몬스터 목록
export const monsterList = {
  frog: frog,
  goblin: goblin,
  giantfrog: giantfrog,
  brownbear: brownbear,
  owlbear: owlbear,
  giantelk: giantelk,
  hobgoblin: hobgoblin,
  troll: troll,
  // 추가 몬스터들...
};