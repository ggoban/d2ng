// item.js

class Item {
  constructor(name, description, useEffect) {
      this.name = name;
      this.description = description;
      this.useEffect = useEffect;
  }

  use(player) {
      this.useEffect(player);
  }
}

// 힐링포션(소) 정의
const smallHealingPotion = new Item(
  "힐링포션(소)",
  "HP를 10 회복시킵니다.",
  (player) => {
      const healAmount = 10;
      player.heal(healAmount);
      gameConsole.log(`(System) 힐링포션(소)를 사용하여 ${player.name}의 HP가 ${healAmount} 회복되었습니다.`);
  }
);

// 아이템 목록
const itemList = {
  smallHealingPotion: smallHealingPotion,
};