// equipment.js

class Equipment {
  constructor(name, type, attackBonus, defenseBonus, description) {
      this.name = name;
      this.type = type; // 'weapon' 또는 'armor'
      this.attackBonus = attackBonus;
      this.defenseBonus = defenseBonus;
      this.description = description;
  }
}

// 무기 설정
class Weapon {
  constructor(name, price, damage, damageType, weight, properties) {
      this.name = name;
      this.price = price;
      this.damage = damage;
      this.damageType = damageType;
      this.weight = weight;
      this.properties = properties;
  }
}

const WeaponType = {
  SIMPLE_MELEE: 'Simple Melee',
  SIMPLE_RANGED: 'Simple Ranged',
  MARTIAL_MELEE: 'Martial Melee',
  MARTIAL_RANGED: 'Martial Ranged'
};

const DamageType = {
  BLUDGEONING: 'bludgeoning', // 타격
  PIERCING: 'piercing', // 관통
  SLASHING: 'slashing' // 참격
};

const WeaponProperty = {
  VERSATILE: 'versatile', // 다용도
  LIGHT: 'light', // 경량
  HEAVY: 'heavy', // 중량
  FINESSE: 'finesse', // 교묘함
  TWO_HANDED: 'two-handed', // 양손
  THROWN: 'thrown', // 투척
  REACH: 'reach', // 간격
  LOADING: 'loading', // 장전
  SPECIAL: 'special', // 특별
  AMMUNITION: 'ammunition' // 탄약
};

//무기 {이름, 가격, 피해(타격, 관통, 참격), 무게, 속성}
const weapons = {
  // Simple Melee Weapons
  greatclub: new Weapon("Greatclub", "2sp", "1d8", DamageType.BLUDGEONING, 10, [WeaponProperty.TWO_HANDED]),
  dagger: new Weapon("Dagger", "2gp", "1d4", DamageType.PIERCING, 1, [WeaponProperty.FINESSE, WeaponProperty.LIGHT, WeaponProperty.THROWN]),
  lightHammer: new Weapon("Light Hammer", "2gp", "1d4", DamageType.BLUDGEONING, 2, [WeaponProperty.LIGHT, WeaponProperty.THROWN]),
  mace: new Weapon("Mace", "5gp", "1d6", DamageType.BLUDGEONING, 4, []),
  spear: new Weapon("Spear", "1gp", "1d6", DamageType.PIERCING, 3, [WeaponProperty.THROWN, WeaponProperty.VERSATILE]),
  sickle: new Weapon("Sickle", "1gp", "1d4", DamageType.SLASHING, 2, [WeaponProperty.LIGHT]),
  javelin: new Weapon("Javelin", "5sp", "1d6", DamageType.PIERCING, 2, [WeaponProperty.THROWN]),
  quarterstaff: new Weapon("Quarterstaff", "2sp", "1d6", DamageType.BLUDGEONING, 4, [WeaponProperty.VERSATILE]),
  club: new Weapon("Club", "1sp", "1d4", DamageType.BLUDGEONING, 2, [WeaponProperty.LIGHT]),
  handaxe: new Weapon("handaxe", "5gp", "1d6", DamageType.SLASHING, 2, [WeaponProperty.LIGHT, WeaponProperty.THROWN]),
  
  // Simple Ranged Weapons
  dart: new Weapon("Dart", "5cp", "1d4", DamageType.PIERCING, 0.25, [WeaponProperty.FINESSE, WeaponProperty.THROWN]),
  lightCrossbow: new Weapon("Light Crossbow", "25gp", "1d8", DamageType.PIERCING, 5, [WeaponProperty.AMMUNITION, WeaponProperty.LOADING, WeaponProperty.TWO_HANDED]),
  shortbow: new Weapon("Shortbow", "25gp", "1d6", DamageType.PIERCING, 2, [WeaponProperty.AMMUNITION, WeaponProperty.TWO_HANDED]),
  sling: new Weapon("Sling", "1sp", "1d4", DamageType.BLUDGEONING, 0, [WeaponProperty.AMMUNITION]),
  
  // Martial Melee Weapons
  greatsword: new Weapon("Greatsword", "50gp", "2d6", DamageType.SLASHING, 6, [WeaponProperty.HEAVY, WeaponProperty.TWO_HANDED]),
  greataxe: new Weapon("Greataxe", "30gp", "1d12", DamageType.SLASHING, 7, [WeaponProperty.HEAVY, WeaponProperty.TWO_HANDED]),
  glaive: new Weapon("Glaive", "20gp", "1d10", DamageType.SLASHING, 7, [WeaponProperty.HEAVY, WeaponProperty.REACH, WeaponProperty.TWO_HANDED]),
  lance: new Weapon("Lance", "10gp", "1d12", DamageType.PIERCING, 6, [WeaponProperty.REACH, WeaponProperty.SPECIAL]),
  rapier: new Weapon("Rapier", "25gp", "1d8", DamageType.PIERCING, 2, [WeaponProperty.FINESSE]),
  longsword: new Weapon("Longsword", "15gp", "1d8", DamageType.SLASHING, 3, [WeaponProperty.VERSATILE]),
  maul: new Weapon("Maul", "10gp", "2d6", DamageType.BLUDGEONING, 10, [WeaponProperty.HEAVY, WeaponProperty.TWO_HANDED]),
  morningstar: new Weapon("Morningstar", "15gp", "1d8", DamageType.PIERCING, 4, []),
  battleaxe: new Weapon("Battleaxe", "10gp", "1d8", DamageType.PIERCING, 4, [WeaponProperty.VERSATILE]),
  shortsword: new Weapon("Shortsword", "10gp", "1d6", DamageType.PIERCING, 2, [WeaponProperty.FINESSE, WeaponProperty.LIGHT]),
  scimitar: new Weapon("Scimitar", "25gp", "1d6", DamageType.SLASHING, 3, [WeaponProperty.FINESSE, WeaponProperty.LIGHT]),
  warpick: new Weapon("War Pick", "5gp", "1d8", DamageType.PIERCING, 2, []),
  warhammer: new Weapon("Warhammer", "15gp", "1d8", DamageType.BLUDGEONING, 2, [WeaponProperty.VERSATILE]),
  whip: new Weapon("Whip", "2gp", "1d4", DamageType.SLASHING, 3, [WeaponProperty.FINESSE, WeaponProperty.REACH]),
  trident: new Weapon("Trident", "5gp", "1d6", DamageType.PIERCING, 4, [WeaponProperty.THROWN, WeaponProperty.VERSATILE]),
  pike: new Weapon("Pike", "5gp", "1d10", DamageType.PIERCING, 18, [WeaponProperty.HEAVY, WeaponProperty.REACH, WeaponProperty.TWO_HANDED]),
  flail: new Weapon("Flail", "10gp", "1d8", DamageType.BLUDGEONING, 2, []),
  halberd: new Weapon("Halberd", "20gp", "1d10", DamageType.SLASHING, 6, [WeaponProperty.HEAVY, WeaponProperty.REACH, WeaponProperty.TWO_HANDED]),

  // Martial Ranged Weapons
  net: new Weapon("Net", "1gp", "1d1", DamageType.BLUDGEONING, 3, [WeaponProperty.SPECIAL, WeaponProperty.THROWN]),
  longbow: new Weapon("Longbow", "50gp", "1d8", DamageType.PIERCING, 2, [WeaponProperty.AMMUNITION, WeaponProperty.HEAVY, WeaponProperty.TWO_HANDED]),
  blowgun: new Weapon("Blowgun", "10gp", "1d1", DamageType.PIERCING, 1, [WeaponProperty.AMMUNITION, WeaponProperty.LOADING]),
  handcrossbow: new Weapon("Hand Crossbow", "75gp", "1d6", DamageType.PIERCING, 3, [WeaponProperty.AMMUNITION, WeaponProperty.LIGHT, WeaponProperty.LOADING]),
  heavycrossbow: new Weapon("Heavy Crossbow", "50gp", "1d0", DamageType.PIERCING, 18, [WeaponProperty.AMMUNITION, WeaponProperty.HEAVY, WeaponProperty.LOADING, WeaponProperty.TWO_HANDED]),

  // Monster Special Weapons
  claws: new Weapon("Claws", "Natural", "2d6", DamageType.SLASHING, 0, []),
};

// 방어구 설정

class Armor {
  constructor(name, type, price, ac, strength, stealth, weight) {
      this.name = name;
      this.type = type;
      this.price = price;
      this.ac = ac;
      this.strength = strength;
      this.stealth = stealth;
      this.weight = weight;
  }
}

const ArmorType = {
  LIGHT: 'Light',
  MEDIUM: 'Medium',
  HEAVY: 'Heavy',
  SHIELD: 'Shield'
};

const armors = {
  // Light Armor
  padded: new Armor("Padded", ArmorType.LIGHT, "5gp", 11, 0, "Disadvantage", 8),
  leather: new Armor("Leather", ArmorType.LIGHT, "10gp", 11, 0, "", 10),
  studdedLeather: new Armor("Studded Leather", ArmorType.LIGHT, "45gp", 12, 0, "", 13),

  // Medium Armor
  hide: new Armor("Hide", ArmorType.MEDIUM, "10gp", 12, 0, "", 12),
  chainShirt: new Armor("Chain Shirt", ArmorType.MEDIUM, "50gp", 13, 0, "", 20),
  scaleMail: new Armor("Scale Mail", ArmorType.MEDIUM, "50gp", 14, 0, "Disadvantage", 45),
  breastplate: new Armor("Breastplate", ArmorType.MEDIUM, "400gp", 14, 0, "", 20),
  halfPlate: new Armor("Half Plate", ArmorType.MEDIUM, "750gp", 15, 0, "Disadvantage", 40),

  // Heavy Armor
  ringMail: new Armor("Ring Mail", ArmorType.HEAVY, "30gp", 14, 0, "Disadvantage", 40),
  chainMail: new Armor("Chain Mail", ArmorType.HEAVY, "75gp", 16, 13, "Disadvantage", 55),
  splint: new Armor("Splint", ArmorType.HEAVY, "200gp", 17, 15, "Disadvantage", 60),
  plate: new Armor("Plate", ArmorType.HEAVY, "1500gp", 18, 15, "Disadvantage", 65),

  // Shield
  shield: new Armor("Shield", ArmorType.SHIELD, "10gp", 2, 0, "", 6),

  // Monster Special Armor
  naturalArmor: new Armor("Natural Armor", ArmorType.NATURAL, "0", 13, 0, "", 0),
};