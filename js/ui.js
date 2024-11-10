class UI {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.images = {};
    this.imageUrls = {
        town: 'town.jpg',
        inn: 'inn.jpg',
        shop: 'shop.jpg',
        guild: 'guild.jpg',
        blacksmith: 'blacksmith.jpg',
        dungeon: 'dungeon.jpg'
    };
    this.monsterImages = {};
  }

  loadImage(location) {
    if (this.images[location]) {
        return this.images[location];
    }
    const img = new Image();
    img.src = 'images/'+this.imageUrls[location];
    this.images[location] = img;
    return img;
  }

  drawBackground(location) {
    const image = this.loadImage(location);
    if (image.complete) {
        this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        return true;
    } else {
        // 이미지가 로드되지 않았을 경우 대체 배경
        this.ctx.fillStyle = '#2A2A2A';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
            this.drawLocation(location.charAt(0).toUpperCase() + location.slice(1));
            if (this.inDungeon) {
                this.drawExplorationProgress(this.exploration);
            }
        };
        return false;
    }
  }

  drawLocation(name, floor = null) {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, 50);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '30px Arial';
    this.ctx.textAlign = 'center';
    let displayText = name;
    if (floor !== null) {
        displayText += ` ${floor}F`;
    }
    this.ctx.fillText(displayText, this.canvas.width / 2, 34);
  }

  drawExplorationProgress(exploration) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(this.canvas.width - 150, 0, 150, 40);
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.font = '20px Arial';
      this.ctx.textAlign = 'right';
      this.ctx.fillText(`탐사도: ${exploration}%`, this.canvas.width - 20, 30);
  }

  drawMonster(monster) {
    this.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    this.ctx.fillRect(this.canvas.width / 2 - 50, this.canvas.height / 2 - 50, 100, 100);
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(monster.name, this.canvas.width / 2, this.canvas.height / 2 + 70);
    this.ctx.fillText(`HP: ${monster.hp}/${monster.maxHp}`, this.canvas.width / 2, this.canvas.height / 2 + 100);
  }

  drawGameOver() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = 'white';
    this.ctx.font = '48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('게임 오버', this.canvas.width / 2, this.canvas.height / 2 - 50);

    this.ctx.font = '24px Arial';
    this.ctx.fillText('다시 시작하시겠습니까?', this.canvas.width / 2, this.canvas.height / 2 + 10);
  }

  drawButton(button) {
    this.ctx.fillStyle = '#4CAF50';
    this.ctx.fillRect(button.x, button.y, button.width, button.height);

    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
  }

  loadMonsterImage(monster) {
    if (this.monsterImages[monster.ename]) {
        return this.monsterImages[monster.ename];
    }

    const img = new Image();
    img.src = `./images/monster/${monster.ename.toLowerCase()}.png`;
    this.monsterImages[monster.ename] = img;
    return img;
  }

  drawMonster(monster) {
    const image = this.loadMonsterImage(monster);
    if (image.complete) {
        const scaleFactor = 0.8;
        const width = this.canvas.width * 0.3 * scaleFactor;
        const height = this.canvas.height * 0.4 * scaleFactor;
        const x = this.canvas.width / 2 - width / 2;
        const y = this.canvas.height / 2 - height / 2 + 25;
        
        this.ctx.drawImage(image, x, y, width, height);
    } else {
        image.onload = () => {
            this.drawMonster(monster);
        };
        image.onerror = () => {
            console.error(`Failed to load image for monster: ${monster.ename}`);
            // 여기에 기본 이미지를 그리는 로직을 추가할 수 있습니다.
        };
    }

    // 몬스터 정보 텍스트 그리기 (한글 이름 사용)
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(monster.name, this.canvas.width / 2, this.canvas.height / 2 + 120);
    // HP 그리기
    let hpColor;
    if (monster.hp < monster.maxHp) {
        if (monster.hp < monster.maxHp / 2) {
            hpColor = 'red';  // 50% 미만일 때 빨간색
        } else {
            hpColor = 'yellow';  // 50% 이상 100% 미만일 때 노란색
        }
    } else {
        hpColor = 'white';  // 100%일 때 흰색
    }
    this.ctx.fillStyle = hpColor;
    this.ctx.fillText(`HP: ${monster.hp}/${monster.maxHp}`, this.canvas.width / 2, this.canvas.height / 2 + 150);
  }

  updateCanvas(location, exploration, inDungeon, currentFloor) {
    this.inDungeon = inDungeon;
    this.exploration = exploration;
    const backgroundDrawn = this.drawBackground(location);
    if (backgroundDrawn) {
        this.drawLocation(
            location.charAt(0).toUpperCase() + location.slice(1),
            inDungeon ? currentFloor : null
        );
        if (inDungeon) {
            this.drawExplorationProgress(exploration);
        }
    }
  }
}