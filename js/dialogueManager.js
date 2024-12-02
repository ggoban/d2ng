// dialogueManager.js

import { gameConsole } from './console.js';

export class DialogueManager {
  constructor(game) {
      this.game = game;
      this.currentDialogue = null;
      this.options = [];
      this.clickHandler = this.handleClick.bind(this);
  }

  startDialogue(npc, initialMessage) {
      this.currentDialogue = { npc, message: initialMessage };
      this.options = [
          { text: "1. 인사한다.", action: () => this.greet(npc) },
          { text: "2. 나간다.", action: () => this.exit(npc) }
      ];
      this.game.updateCanvas();
      this.addClickListener();
  }

  greet(npc) {
      let greeting;
      switch(npc) {
          case 'innkeeper':
              greeting = "안녕하세요! 편안한 휴식을 원하시나요?";
              gameConsole.log2("여관주인: 안녕하세요! 편안한 휴식을 원하시나요?");
              break;
          case 'shopkeeper':
              greeting = "어서오세요! 무엇을 구매하고 싶으신가요?";
              gameConsole.log2("상점주인: 어서오세요! 무엇을 구매하고 싶으신가요?");
              break;
          case 'guildmaster':
              greeting = "모험가님, 어떤 퀘스트에 관심이 있으신가요?";
              gameConsole.log2("길드마스터: 안녕하세요! 모험가님, 어떤 퀘스트에 관심이 있으신가요?");
              break;
          case 'blacksmith':
              greeting = "대장장이의 열정이 느껴지시나요? 어떤 장비를 원하십니까?";
              gameConsole.log2("대장장이: 대장장이의 열정이 느껴지시나요? 어떤 장비를 원하십니까?");
              break;
          default:
              greeting = "안녕하세요!";
      }
      this.currentDialogue.message = greeting;
      this.game.updateCanvas();
  }

  exit(npc) {
    gameConsole.log2(`${npc}: 모험가님 다음에 또 방문해 주세요.`);
    this.removeClickListener();
    this.game.backToTown();
  }

  getDialogueText() {
    if (!this.currentDialogue) return "";
    return this.currentDialogue.message;
  }

  handleClick(e) {
    const canvas = this.game.canvasManager.getMainCanvas();
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const dialogueHeight = this.game.canvasManager.height / 3;
    const startY = this.game.canvasManager.height - 40;
    const availableWidth = this.game.canvasManager.width - (dialogueHeight - 20) - 30;
    const optionWidth = availableWidth / this.options.length;
    const optionHeight = 30;

    if (y >= startY - optionHeight / 2 && y <= startY + optionHeight / 2) {
      const adjustedX = x - 15; // 왼쪽 여백 고려
      const clickedOptionIndex = Math.floor(adjustedX / optionWidth);
      if (clickedOptionIndex >= 0 && clickedOptionIndex < this.options.length) {
          console.log(`Option clicked: ${this.options[clickedOptionIndex].text}`);
          this.options[clickedOptionIndex].action();
      }
    }
  }

  addClickListener() {
    this.game.canvasManager.getMainCanvas().addEventListener('click', this.clickHandler);
  }

  removeClickListener() {
      this.game.canvasManager.getMainCanvas().removeEventListener('click', this.clickHandler);
  }
}