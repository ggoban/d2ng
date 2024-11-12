// canvasManager.js
class CanvasManager {
  constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.images = {};
  }

  clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawBackground(location, floor = null) {
    if(location==='Battle') location = 'dungeon';
    const image = this.getImage(location);
    if (image) {
        this.ctx.drawImage(image, 0, 0, this.width, this.height);
    } else {
        this.ctx.fillStyle = '#2A2A2A';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    // 위치 정보 그리기
    this.ctx.save(); // 현재 컨텍스트 상태 저장
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.width, 50);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '30px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    let displayText = location.charAt(0).toUpperCase() + location.slice(1);
    if (floor !== null && location.toLowerCase() !== 'battle') {
        displayText += ` ${floor}F`;
    }
    this.ctx.fillText(displayText, this.width / 2, 25);
    this.ctx.restore(); // 이전 컨텍스트 상태로 복원
  }

  drawMonster(monster) {
    this.ctx.save();

    const monsterImage = this.getImage(monster.ename);
    if (monsterImage) {
        const scaleFactor = 0.8;
        const width = this.width * 0.3 * scaleFactor;
        const height = this.height * 0.4 * scaleFactor;
        const x = this.width / 2 - width / 2;
        const y = this.height / 2 - height / 2 + 25;
        
        this.ctx.drawImage(monsterImage, x, y, width, height);
    }

    // 몬스터 정보 텍스트 그리기
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(monster.name, this.width / 2, this.height / 2 + 120);

    // HP 그리기
    let hpColor = monster.hp < monster.maxHp ? 
        (monster.hp < monster.maxHp / 2 ? 'red' : 'yellow') : 'white';
    this.ctx.fillStyle = hpColor;
    this.ctx.fillText(`HP: ${monster.hp}/${monster.maxHp}`, this.width / 2, this.height / 2 + 150);
    
    this.ctx.restore();
  }

  drawPlayer(player) {
      this.ctx.save();

      // 플레이어 정보 그리기
      this.ctx.fillStyle = 'white';
      this.ctx.font = '16px Arial';
      this.ctx.textAlign = 'left';
      this.ctx.fillText(`HP: ${player.hp}/${player.maxHp}`, 10, 20);
      this.ctx.fillText(`Level: ${player.level}`, 10, 40);
      this.ctx.fillText(`XP: ${player.xp}/${player.nextLevelXp}`, 10, 60);

      this.ctx.restore();
  }

  drawBattleScene(player, monster) {
      this.clear();
      this.drawBackground('Battle');
      this.drawPlayer(player);
      this.drawMonster(monster);
  }

  drawGameOver() {
      this.ctx.save();

      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      this.ctx.fillRect(0, 0, this.width, this.height);

      this.ctx.fillStyle = 'white';
      this.ctx.font = '48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('게임 오버', this.width / 2, this.height / 2 - 50);

      this.ctx.font = '24px Arial';
      this.ctx.fillText('다시 시작하시겠습니까?', this.width / 2, this.height / 2 + 10);

      this.ctx.restore();
  }

  drawButton(button) {
      this.ctx.save();

      this.ctx.fillStyle = '#4CAF50';
      this.ctx.fillRect(button.x, button.y, button.width, button.height);

      this.ctx.fillStyle = 'white';
      this.ctx.font = '20px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);

      this.ctx.restore();
  }

  drawExplorationProgress(exploration) {
      this.ctx.save();

      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(this.width - 150, 0, 150, 40);
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.font = '20px Arial';
      this.ctx.textAlign = 'right';
      this.ctx.fillText(`탐사도: ${exploration}%`, this.width - 20, 30);

      this.ctx.restore();
  }

  drawDialogueBox(text, npcImageName) {
    const dialogueHeight = this.height / 3;
    const dialogueY = this.height - dialogueHeight;

    this.ctx.save(); // 현재 컨텍스트 상태 저장

    // 대화 상자 배경
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, dialogueY, this.width, dialogueHeight);

    // NPC 초상화
    const portraitSize = dialogueHeight - 20;
    const portraitX = this.width - portraitSize - 10;
    const portraitY = dialogueY + 10;

    const npcImage = this.getImage(npcImageName);
    if (npcImage) {
        this.ctx.drawImage(npcImage, portraitX, portraitY, portraitSize, portraitSize);
    }

    // 텍스트 렌더링
    this.ctx.fillStyle = 'white';
    this.ctx.font = '16px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';

    const textX = 20;
    const textY = dialogueY + 20;
    const maxWidth = this.width - portraitSize - 50;

    this.wrapText(text, textX, textY, maxWidth, 24);

    this.ctx.restore(); // 이전 컨텍스트 상태로 복원
  }

  wrapText(text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = this.ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
            this.ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    this.ctx.fillText(line, x, y);
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