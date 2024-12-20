// utils.js

import { gameConsole } from "./console.js";

export const Utils = {
  // 주사위 굴림 함수
  rollDice: function(sides, roller = "Unknown") {
    const rollValue = Math.floor(Math.random() * sides) + 1;
    gameConsole.log(`${roller}이(가) `+sides+`면 주사위를 굴립니다. 결과: `+rollValue);
    return rollValue;
  },

  // 여러 개의 주사위를 굴리고 합을 반환하는 함수
  rollMultipleDice: function(number, sides, roller = "Unknown") {
    let total = 0;
    for (let i = 0; i < number; i++) {
      total += this.rollDice(sides, roller);
    }
    return total;
  },

  // 문자열로 된 피해량을 주사위 굴림으로 반환하는 함수 (예: "3d6" -> 3개 6면)
  rollDiceWithNotation: function(notation, roller = "Unknown") {
    const [number, sides] = notation.toLowerCase().split('d').map(Number);
    return this.rollMultipleDice(number, sides, roller);
  },

  // 능력치 점수에 따른 수정치를 계산합니다.
  calculateModifier: function(score) {
    return Math.floor((score - 10) / 2);
  },
};

export const Constants = {
  MAX_LEVEL: 20,
  MAX_STAT: 20,
  STAT_INCREASE_THRESHOLD: 14
};