class Monster {
  constructor(name, ename, size, type, stats, ac, hp, xp, cr, weapon, armor) {
      this.name = name;
      this.ename = ename;
      this.size = size;
      this.type = type;
      this.stats = stats;
      this.ac = ac;
      this.hp = hp;
      this.maxHp = hp;
      this.xp = xp;
      this.cr = cr;  // 도전 지수 추가
      this.weapon = weapon;
      this.armor = armor;
  }

  getModifier(stat) {
      return Math.floor((stat - 10) / 2);
  }
  
  resetHp() {
    this.hp = this.maxHp;
  }

  getAttackBonus() {
    return this.weapon ? this.weapon.attackBonus : 0;
  }

  getDefenseBonus() {
      return this.armor ? this.armor.defenseBonus : 0;
  }
}

// 몬스터 크기 열거형
const MonsterSize = {
  TINY: '초소형',
  SMALL: '소형',
  MEDIUM: '중형',
  LARGE: '대형',
  HUGE: '거대형',
  GARGANTUAN: '초대형'
};

// 몬스터 종류 열거형
const MonsterType = {
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
function createMonster(name, ename, size, type, stats, ac, hp, xp, cr, weapon, armor) {
  return new Monster(name, ename, size, type, stats, ac, hp, xp, cr, weapon, armor);
}

// 몇 가지 예시 몬스터
// 숫자는  ac, hp, xp, cr 순
const frog = createMonster(
  "개구리", 'frog',
  MonsterSize.TINY,
  MonsterType.BEAST,
  { strength: 1, dexterity: 13, constitution: 8, intelligence: 1, wisdom: 8, charisma: 3 },
  11, 1, 0, 0
);

const goblin = createMonster(
  "고블린", 'goblin',
  MonsterSize.SMALL,
  MonsterType.HUMANOID,
  { strength: 8, dexterity: 14, constitution: 10, intelligence: 10, wisdom: 8, charisma: 8 },
  15, 7, 50, 1/4,
  new Equipment("짧은 검", "weapon", 1, 0, "고블린의 기본 무기"),
  new Equipment("가죽 조끼", "armor", 0, 1, "고블린의 기본 방어구")
);

const giantfrog = createMonster(
  "거대 개구리", 'giantfrog',
  MonsterSize.MEDIUM,
  MonsterType.BEAST,
  { strength: 12, dexterity: 13, constitution: 11, intelligence: 2, wisdom: 10, charisma: 3 },
  11, 18, 50, 1/4,
  new Equipment("짧은 검", "weapon", 1, 0, "고블린의 기본 무기"),
  new Equipment("가죽 조끼", "armor", 0, 1, "고블린의 기본 방어구")
);

const brownbear = createMonster(
  "갈색 곰", 'brownbear',
  MonsterSize.LARGE,
  MonsterType.BEAST,
  { strength: 19, dexterity: 10, constitution: 16, intelligence: 2, wisdom: 13, charisma: 7 },
  11,
  34,
  200,
  1
);

const owlbear = createMonster(
  "아울베어", 'owlbear',
  MonsterSize.LARGE,
  MonsterType.MONSTROSITY,
  { strength: 20, dexterity: 12, constitution: 17, intelligence: 3, wisdom: 12, charisma: 7 },
  13,
  59,
  700,
  3
);

const goblinboss = createMonster(
  "고블린 두목", 'goblinboss',
  MonsterSize.SMALL,
  MonsterType.HUMANOID,
  { strength: 10, dexterity: 14, constitution: 12, intelligence: 10, wisdom: 8, charisma: 10 },
  17,
  21,
  200,
  1
);

const giantelk = createMonster(
  "거대 엘크", 'giantelk',
  MonsterSize.HUGE,
  MonsterType.BEAST,
  { strength: 19, dexterity: 16, constitution: 14, intelligence: 7, wisdom: 14, charisma: 10 },
  14,
  42,
  450,
  2
);

const troll = createMonster(
  "트롤", 'troll', 
  MonsterSize.LARGE,
  MonsterType.GIANT,
  { strength: 18, dexterity: 13, constitution: 20, intelligence: 7, wisdom: 9, charisma: 7 },
  15,
  84,
  1800,
  5
);

// 몬스터 목록
const monsterList = {
  frog: frog,
  goblin: goblin,
  giantfrog: giantfrog,
  brownbear: brownbear,
  owlbear: owlbear,
  giantelk: giantelk,
  goblinboss: goblinboss,
  troll: troll,
  // 추가 몬스터들...
};