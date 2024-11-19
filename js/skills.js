// skills.js

// 스킬 클래스 (기존 코드에 추가)
export class Skill {
  constructor(name, ename, type, description) {
      this.name = name;
      this.ename = ename;
      this.type = type;
      this.description = description;
  }
}

// 주문 이름, 주문 영어 이름, 레벨, 데미지, 부가효과타입, 부과효과, 타겟
// 학파(방출학파-Evocation, 방호학파-Abjuration, 변환학파-Transmutation, 사령학파-Necromancy, 예지학파-Divination, 조형학파-Transmutation, 환영학파-Illusion, 환혹학파-Enchantment), 
// 캐스팅 타임, 사거리, 구성요소, 지속시간, 설명
// 예시 주문들
const secondWind = new Skill(
  "재기의 바람", "secondWind", "active",
  "전투에 단 한번씩 1d10+레벨만큼 hp를 회복합니다."
);

const sneakAttack = new Skill(
  "암습 공격", "sneakAttack", "passive",
  "턴마다 한번 추가로 명중 굴림을 굴려 1d6점의 피해를 줍니다."
);

export const skillList = {
  secondWind: secondWind,
  sneakAttack: sneakAttack,
  // 추가 몬스터들...
};