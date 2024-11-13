// dialogueManager.js

class DialogueManager {
  constructor(game) {
      this.game = game;
      this.currentDialogue = null;
      this.options = [];
  }

  startDialogue(npc, initialMessage) {
      this.currentDialogue = { npc, message: initialMessage };
      this.options = [
          { text: "1. 인사한다.", action: () => this.greet(npc) },
          { text: "2. 나간다.", action: () => this.exit() }
      ];
      this.game.updateCanvas();
  }

  greet(npc) {
      let greeting;
      switch(npc) {
          case 'innkeeper':
              greeting = "안녕하세요! 편안한 휴식을 원하시나요?";
              break;
          case 'shopkeeper':
              greeting = "어서오세요! 무엇을 구매하고 싶으신가요?";
              break;
          case 'guildmaster':
              greeting = "모험가님, 어떤 퀘스트에 관심이 있으신가요?";
              break;
          case 'blacksmitchmen':
              greeting = "대장장이의 열정이 느껴지시나요? 어떤 장비를 원하십니까?";
              break;
          default:
              greeting = "안녕하세요!";
      }
      this.currentDialogue.message = greeting;
      this.game.updateCanvas();
  }

  exit() {
      this.game.backToTown();
  }

  getDialogueText() {
    if (!this.currentDialogue) return "";
    return this.currentDialogue.message;
  }

  handleClick(x, y) {
    const dialogueHeight = this.game.canvasManager.height / 3;
    const portraitSize = dialogueHeight - 20;
    const startY = this.game.canvasManager.height - 40;
    const availableWidth = this.game.canvasManager.width - portraitSize - 30;
    const optionWidth = availableWidth / this.options.length;
    const optionHeight = 30;

    if (y >= startY - optionHeight / 2 && y <= startY + optionHeight / 2) {
        const adjustedX = x - 15; // 왼쪽 여백 고려
        const clickedOptionIndex = Math.floor(adjustedX / optionWidth);
        if (clickedOptionIndex >= 0 && clickedOptionIndex < this.options.length) {
            console.log(`Option clicked: ${this.options[clickedOptionIndex].text}`); // 디버깅용
            this.options[clickedOptionIndex].action();
        }
    }
  }
}