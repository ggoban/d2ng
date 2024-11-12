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
      this.game.returnToTown();
  }

  getDialogueText() {
    if (!this.currentDialogue) return "";
    return this.currentDialogue.message;
  }

  handleClick(x, y) {
    const optionHeight = 30;
    const startY = this.game.canvasManager.height - 70; // drawDialogueOptions와 일치하도록 수정
    
    this.options.forEach((option, index) => {
        const optionY = startY + index * optionHeight;
        if (y >= optionY && y < optionY + optionHeight) {
            console.log(`Option clicked: ${option.text}`); // 디버깅용
            option.action();
        }
    });
  }
}