export class CanvasManager {
  constructor(canvasId) {
      this.mainCanvas = document.getElementById(canvasId);
      this.mainCtx = this.mainCanvas.getContext('2d');
      this.width = this.mainCanvas.width;
      this.height = this.mainCanvas.height;

      // 레이어드 캔버스 생성
      this.backgroundCanvas = this.createCanvas();
      this.characterCanvas = this.createCanvas();
      this.uiCanvas = this.createCanvas();

      this.backgroundCtx = this.backgroundCanvas.getContext('2d');
      this.characterCtx = this.characterCanvas.getContext('2d');
      this.uiCtx = this.uiCanvas.getContext('2d');

      this.images = {};
  }

  getMainCanvas() {
    return this.mainCanvas;
  }

  createCanvas() {
      const canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      return canvas;
  }

  clear() {
      this.mainCtx.clearRect(0, 0, this.width, this.height);
      this.backgroundCtx.clearRect(0, 0, this.width, this.height);
      this.characterCtx.clearRect(0, 0, this.width, this.height);
      this.uiCtx.clearRect(0, 0, this.width, this.height);
  }

  drawBackground(location, floor = null) {
      if(location === 'Battle') location = 'dungeon';
      const image = this.getImage(location);
      if (image) {
          this.backgroundCtx.drawImage(image, 0, 0, this.width, this.height);
      } else {
          this.backgroundCtx.fillStyle = '#2A2A2A';
          this.backgroundCtx.fillRect(0, 0, this.width, this.height);
      }

      // 위치 정보 그리기
      this.backgroundCtx.save();
      this.backgroundCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.backgroundCtx.fillRect(0, 0, this.width, 50);
      this.backgroundCtx.fillStyle = '#FFFFFF';
      this.backgroundCtx.font = '30px Arial';
      this.backgroundCtx.textAlign = 'center';
      this.backgroundCtx.textBaseline = 'middle';
      let displayText = location.charAt(0).toUpperCase() + location.slice(1);
      if (floor !== null && location.toLowerCase() !== 'battle') {
          displayText += ` ${floor}F`;
      }
      this.backgroundCtx.fillText(displayText, this.width / 2, 25);
      this.backgroundCtx.restore();
  }

  drawMonster(monster) {
      this.characterCtx.save();

      const monsterImage = this.getImage(monster.ename);
      if (monsterImage) {
          const scaleFactor = 0.8;
          const width = this.width * 0.3 * scaleFactor;
          const height = this.height * 0.4 * scaleFactor;
          const x = this.width / 2 - width / 2;
          const y = this.height / 2 - height / 2 + 25;
          
          this.characterCtx.drawImage(monsterImage, x, y, width, height);
      }

      // 몬스터 정보 텍스트 그리기
      this.characterCtx.fillStyle = 'white';
      this.characterCtx.font = '20px Arial';
      this.characterCtx.textAlign = 'center';
      this.characterCtx.fillText(monster.name, this.width / 2, this.height / 2 + 120);

      // HP 그리기
      let hpColor = monster.hp < monster.maxHp ? 
          (monster.hp < monster.maxHp / 2 ? 'red' : 'yellow') : 'white';
      this.characterCtx.fillStyle = hpColor;
      this.characterCtx.fillText(`HP: ${monster.hp}/${monster.maxHp}`, this.width / 2, this.height / 2 + 150);
      
      this.characterCtx.restore();
  }

  drawPlayer(player) {
      this.characterCtx.save();

      // 플레이어 정보 그리기
      this.characterCtx.fillStyle = 'white';
      this.characterCtx.font = '16px Arial';
      this.characterCtx.textAlign = 'left';
      this.characterCtx.fillText(`HP: ${player.hp}/${player.maxHp}`, 10, 20);
      this.characterCtx.fillText(`Level: ${player.level}`, 10, 40);
      this.characterCtx.fillText(`XP: ${player.xp}/${player.nextLevelXp}`, 10, 60);

      this.characterCtx.restore();
  }

  drawBattleScene(player, monster) {
      this.clear();
      this.drawBackground('Battle');
      //this.drawPlayer(player);
      this.drawMonster(monster);
  }

  drawGameOver() {
      this.uiCtx.save();

      this.uiCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      this.uiCtx.fillRect(0, 0, this.width, this.height);

      this.uiCtx.fillStyle = 'white';
      this.uiCtx.font = '48px Arial';
      this.uiCtx.textAlign = 'center';
      this.uiCtx.fillText('게임 오버', this.width / 2, this.height / 2 - 50);

      this.uiCtx.font = '24px Arial';
      this.uiCtx.fillText('다시 시작하시겠습니까?', this.width / 2, this.height / 2 + 10);

      this.uiCtx.restore();
  }

  drawButton(button) {
      this.uiCtx.save();

      this.uiCtx.fillStyle = '#4CAF50';
      this.uiCtx.fillRect(button.x, button.y, button.width, button.height);

      this.uiCtx.fillStyle = 'white';
      this.uiCtx.font = '20px Arial';
      this.uiCtx.textAlign = 'center';
      this.uiCtx.textBaseline = 'middle';
      this.uiCtx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);

      this.uiCtx.restore();
  }

  drawExplorationProgress(exploration) {
      this.uiCtx.save();

      this.uiCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.uiCtx.fillRect(this.width - 150, 0, 150, 40);
      this.uiCtx.fillStyle = '#FFFFFF';
      this.uiCtx.font = '20px Arial';
      this.uiCtx.textAlign = 'right';
      this.uiCtx.fillText(`탐사도: ${exploration}%`, this.width - 20, 30);

      this.uiCtx.restore();
  }

  drawDialogueBox(text, npcImageName) {
    const dialogueHeight = this.height / 3;
    const dialogueY = this.height - dialogueHeight;

    this.uiCtx.save();

    // 대화 상자 배경
    this.uiCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.uiCtx.fillRect(0, dialogueY, this.width, dialogueHeight);

    // NPC 초상화
    const portraitSize = dialogueHeight - 20;
    const portraitX = this.width - portraitSize - 10;
    const portraitY = dialogueY + 10;

    const npcImage = this.getImage(npcImageName);
    if (npcImage) {
        this.uiCtx.drawImage(npcImage, portraitX, portraitY, portraitSize, portraitSize);
    }

    // 텍스트 렌더링
    this.uiCtx.fillStyle = 'white';
    this.uiCtx.font = '16px Arial';
    this.uiCtx.textAlign = 'left';
    this.uiCtx.textBaseline = 'top';

    const textX = 20;
    const textY = dialogueY + 20;
    const maxWidth = this.width - portraitSize - 50;

    this.wrapText(this.uiCtx, text, textX, textY, maxWidth, 24);

    this.uiCtx.restore();
  }

  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
      const words = text.split(' ');
      let line = '';

      for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;

          if (testWidth > maxWidth && n > 0) {
              ctx.fillText(line, x, y);
              line = words[n] + ' ';
              y += lineHeight;
          } else {
              line = testLine;
          }
      }
      ctx.fillText(line, x, y);
  }

  drawDialogueOptions(options) {
    const dialogueHeight = this.height / 3;
    const startY = this.height - 40;
    const availableWidth = this.width - (dialogueHeight - 20) - 30;
    const optionWidth = availableWidth / options.length;
    const optionHeight = 30;

    this.uiCtx.save();
    this.uiCtx.font = '16px Arial';
    this.uiCtx.textAlign = 'center';
    this.uiCtx.textBaseline = 'middle';

    options.forEach((option, index) => {
      const optionX = index * optionWidth + 15;
      const optionY = startY - optionHeight / 2;

      // 옵션 배경 그리기
      this.uiCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.uiCtx.fillRect(optionX, optionY, optionWidth, optionHeight);

      // 옵션 테두리 그리기
      this.uiCtx.strokeStyle = 'white';
      this.uiCtx.strokeRect(optionX, optionY, optionWidth, optionHeight);

      // 옵션 텍스트 그리기
      this.uiCtx.fillStyle = 'white';
      this.uiCtx.fillText(option.text, optionX + optionWidth / 2, startY);
    });

    this.uiCtx.restore();
  }

  drawAttackEffect(effect, x, y) {
    this.uiCtx.save();
    this.uiCtx.font = 'bold 36px Arial';
    this.uiCtx.textAlign = 'center';
    this.uiCtx.textBaseline = 'middle';

    switch(effect) {
        case 'Hit!':
            this.uiCtx.fillStyle = 'yellow';
            break;
        case 'Miss!':
            this.uiCtx.fillStyle = 'white';
            break;
        case 'Critical!':
            this.uiCtx.fillStyle = 'red';
            break;
    }

    this.uiCtx.fillText(effect, x, y);
    this.uiCtx.restore();
    this.render();
  }

  clearAttackEffect() {
      this.uiCtx.clearRect(0, 0, this.width, this.height);
      this.render();
  }

  render() {
      this.mainCtx.clearRect(0, 0, this.width, this.height);
      this.mainCtx.drawImage(this.backgroundCanvas, 0, 0);
      this.mainCtx.drawImage(this.characterCanvas, 0, 0);
      this.mainCtx.drawImage(this.uiCanvas, 0, 0);
  }

  loadImage(name, src) {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
              this.images[name] = img;
              resolve(img);
          };
          img.onerror = reject;
          img.src = src;
      });
  }

  getImage(name) {
      return this.images[name];
  }
}