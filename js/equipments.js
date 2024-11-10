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

// 예시 장비들 
const sword = new Equipment("롱소드", "weapon", 2, 0, "기본적인 장검입니다.");
const leatherArmor = new Equipment("가죽 갑옷", "armor", 0, 1, "가벼운 가죽 갑옷입니다.");
const plateArmor = new Equipment("판금 갑옷", "armor", 0, 3, "무겁지만 방어력이 뛰어난 갑옷입니다.");
const basicSword = new Equipment("기본 검", "weapon", 1, 0, "모든 모험가의 기본 무기입니다.");
const basicArmor = new Equipment("기본 갑옷", "armor", 0, 1, "기본적인 보호를 제공하는 갑옷입니다.");

// 장비 목록
const equipmentList = {
  basicSword: basicSword,
  basicArmor: basicArmor,
  sword: sword,
  leatherArmor: leatherArmor,
  plateArmor: plateArmor,
  // 추가 장비들...
};