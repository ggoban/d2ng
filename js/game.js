class Game {
  constructor() {
      this.canvas = document.getElementById('gameCanvas');
      this.ui = new UI(this.canvas);
      this.townButtons = document.getElementById('townButtons');
      this.dungeonButtons = document.getElementById('dungeonButtons');
      this.exploreButton = document.getElementById('exploreButton');
      this.battleButtons = document.getElementById('battleButtons');
      this.nextFloorButton = document.getElementById('nextFloorButton');
      this.returnTownButton = document.getElementById('returnTownButton');
      this.currentFloor = 0;
      this.maxFloorReached = 0;
      this.exploration = 0;
      this.inDungeon = false;
      this.currentLocation = 'town';
      this.player = new Player();
      this.eventManager = new EventManager(this);
      this.gameStarted = false;
      this.currentMonster = null;
      this.isInBattle = false;
      this.currentBattle = null;
      this.isGameOver = false;
  }

  initialize() {
      gameConsole.clear();
      this.setupEventListeners();
      //this.updateCanvas();
      //this.player.updateInfo();
      this.player.initializeInventory();
      this.setupBattleButtons();
      if (!this.gameStarted) {
        this.townButtons.style.display = 'none';
        this.eventManager.startCharacterCreationEvent();
      } else {
        gameConsole.log('더2N전에 오신 것을 환영합니다! 이동할 장소를 선택하세요.');
      }
      //this.resetGame();
  }

  setupBattleButtons() {
    const attackButton = document.createElement('button');
    attackButton.textContent = '공격';
    attackButton.onclick = () => this.attack();
    
    const fleeButton = document.createElement('button');
    fleeButton.textContent = '도망';
    fleeButton.onclick = () => this.flee();

    this.battleButtons.appendChild(attackButton);
    this.battleButtons.appendChild(fleeButton);
  }

  resetGame() {
    this.currentFloor = 0;
    this.maxFloorReached = 0;
    this.exploration = 0;
    this.inDungeon = false;
    this.currentLocation = 'town';
    this.currentBattle = null;
    this.isInBattle = false;
    this.isGameOver = false;

    // 플레이어 리셋
    this.player.reset();

    // 버튼 상태 초기화
    this.townButtons.style.display = 'flex';
    this.dungeonButtons.style.display = 'none';
    this.exploreButton.style.display = 'inline';
    this.nextFloorButton.style.display = 'none';
    this.returnTownButton.style.display = 'none';
    this.battleButtons.style.display = 'none';

    document.getElementById('skill-point-allocation').style.display = 'none';

    // 캔버스 이벤트 리스너 제거
    this.canvas.removeEventListener('click', this.handleCanvasClick);
    gameConsole.clear();
    this.updateCanvas();
  }

  startGame() {
    this.gameStarted = true;
    this.townButtons.style.display = 'flex';
    this.goToLocation('town', `${this.player.name}님의 앞으로의 여정에 ···의 축복이 함께하길...`)
    this.addTestItem();
    // 여기에 게임 시작 후 추가적인 초기화 로직을 넣을 수 있습니다.
  }

  gameOver() {
    gameConsole.log('게임 오버! 캐릭터가 사망했습니다.');
    this.player.reset(); // player reset 호출 추가
    this.isGameOver = true; // 게임 오버 상태 추가
    this.updateCanvas();
    this.showRestartButton();
  }

  showRestartButton() {
    const restartButton = {
        x: this.canvas.width / 2 - 100,
        y: this.canvas.height / 2 + 25,
        width: 200,
        height: 50,
        text: "다시 시작하기"
    };

    this.ui.drawButton(restartButton);

    const handleClick = (event) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (x > restartButton.x && x < restartButton.x + restartButton.width &&
            y > restartButton.y && y < restartButton.y + restartButton.height) {
            this.resetGame();
            this.eventManager.startCharacterCreationEvent();
        }
    };

    this.canvas.addEventListener('click', handleClick);
  }

  setupEventListeners() {
      document.getElementById('innButton').addEventListener('click', () => this.goToInn());
      document.getElementById('shopButton').addEventListener('click', () => this.goToShop());
      document.getElementById('guildButton').addEventListener('click', () => this.goToGuild());
      document.getElementById('blacksmithButton').addEventListener('click', () => this.goToBlacksmith());
      document.getElementById('dungeonButton').addEventListener('click', () => this.goToDungeon());
      document.getElementById('exploreButton').addEventListener('click', () => this.explore());
      document.getElementById('nextFloorButton').addEventListener('click', () => this.goToNextFloor());
      document.getElementById('returnTownButton').addEventListener('click', () => this.returnToTown());
  }

  updateCanvas() {
    if (this.isGameOver) {
        this.ui.drawGameOver();
    } else {
        this.ui.updateCanvas(this.currentLocation, this.exploration, this.inDungeon, this.currentFloor);
        if (this.isInBattle && this.currentBattle) {
            this.ui.drawMonster(this.currentBattle.monster);
        }
    }
  }

  goToLocation(location, message) {
      this.currentLocation = location;
      this.updateCanvas();
      gameConsole.log(message);
  }

  goToInn() {
      this.goToLocation('inn', '여관으로 이동했습니다. 여기서 휴식을 취할 수 있습니다.');
  }

  goToShop() {
      this.goToLocation('shop', '상점으로 이동했습니다. 다양한 아이템을 구매할 수 있습니다.');
  }

  goToGuild() {
      this.goToLocation('guild', '길드로 이동했습니다. 퀘스트를 받거나 스킬을 배울 수 있습니다.');
  }

  goToBlacksmith() {
      this.goToLocation('blacksmith', '대장간으로 이동했습니다. 무기와 방어구를 제작하거나 강화할 수 있습니다.');
  }

  goToDungeon() {
    this.inDungeon = true;
    this.currentLocation = 'dungeon';
    if (this.maxFloorReached === 0) {
        this.currentFloor = 1;
        this.maxFloorReached = 1;
        gameConsole.log('던전에 처음 입장했습니다. 1층부터 탐험을 시작하세요!');
    } else {
        this.currentFloor = this.maxFloorReached;
        gameConsole.log(`이전에 도달한 ${this.maxFloorReached}층부터 탐험을 재개합니다.`);
    }
    this.exploration = 0;
    this.updateCanvas();
    this.townButtons.style.display = 'none';
    this.dungeonButtons.style.display = 'flex';
    this.exploreButton.style.display = 'inline';
    this.nextFloorButton.style.display = 'none';
    this.returnTownButton.style.display = 'none';
  }

  explore() {
    if (this.isInBattle) return;

    const explorationGain = Math.floor(Math.random() * 20) + 1; // 1-20 사이의 랜덤 값

    // 랜덤 전투 발생
    if (Math.random() < 0.99) { // 30% 확률로 전투 발생
        this.startBattle(explorationGain);
    } else {
        this.increaseExploration(explorationGain);
    }
  }

  startBattle(explorationGain) {
    this.isInBattle = true;
    const monster = this.getRandomMonster();
    this.currentBattle = new Battle(this, this.player, monster, explorationGain);
    this.currentBattle.start();
    this.exploreButton.style.display = 'none';
    this.battleButtons.style.display = 'block';
    this.updateCanvas();
  }

  increaseExploration(explorationGain) {
    this.exploration += explorationGain;
    if (this.exploration >= 100) {
        this.exploration = 100;
        // this.exploreButton.style.display = 'none';
        // this.nextFloorButton.style.display = 'inline';
        // this.returnTownButton.style.display = 'inline';
    }
    gameConsole.log(`탐험을 진행했습니다. 탐사도가 ${explorationGain}% 증가했습니다.`);
    this.updateExplorationButtons();
    this.updateCanvas();
  }

  updateExplorationButtons() {
    if (this.exploration >= 100) {
        this.exploreButton.style.display = 'none';
        this.nextFloorButton.style.display = 'inline';
        this.returnTownButton.style.display = 'inline';
    } else {
        this.exploreButton.style.display = 'inline';
        this.nextFloorButton.style.display = 'none';
        this.returnTownButton.style.display = 'none';
    }
  }
  
  attack() {
    if (this.currentBattle && this.currentBattle.initiativeOrder[0] === this.player) {
        this.currentBattle.playerAttack();
    }
  }

  flee() {
    if (this.currentBattle && this.currentBattle.initiativeOrder[0] === this.player) {
        this.currentBattle.playerFlee();
    }
  }

  getRandomMonster() {
    const appropriateMonsters = Object.values(monsterList).filter(monster => {
        return monster.cr <= this.currentFloor / 2 && monster.cr >= this.currentFloor / 4;
    });

    if (appropriateMonsters.length === 0) {
        return Object.values(monsterList)[0];  // 적절한 몬스터가 없으면 첫 번째 몬스터 반환
    }

    return appropriateMonsters[Math.floor(Math.random() * appropriateMonsters.length)];
  }

  displayMonsterInfo() {
    gameConsole.log(`
        몬스터 정보:
        이름: ${this.currentMonster.name}
        크기: ${this.currentMonster.size}
        종류: ${this.currentMonster.type}
        AC: ${this.currentMonster.ac}
        HP: ${this.currentMonster.hp}/${this.currentMonster.maxHp}
    `);
  }

  goToNextFloor() {
    this.currentFloor++;
    if (this.currentFloor > this.maxFloorReached) {
        this.maxFloorReached = this.currentFloor;
    }
    this.exploration = 0;
    this.updateCanvas();
    gameConsole.log(`던전 ${this.currentFloor}층으로 올라왔습니다. 새로운 탐험을 시작하세요!`);
    this.exploreButton.style.display = 'inline';
    this.nextFloorButton.style.display = 'none';
    this.returnTownButton.style.display = 'none';
  }

  returnToTown() {
      this.inDungeon = false;
      this.currentLocation = 'town';
      this.updateCanvas();
      gameConsole.log(`마을로 귀환했습니다. 던전 ${this.maxFloorReached}층까지 도달했습니다.`);
      this.townButtons.style.display = 'flex';
      this.dungeonButtons.style.display = 'none';
  }

// 테스트용 아이템 추가 메서드
addTestItem() {
  const potion = itemList.smallHealingPotion;
  if (this.player.addItem(potion)) {
    this.player.addItem(potion);
    this.player.addItem(potion);
    this.player.addItem(potion);
    this.player.addItem(potion);
    gameConsole.log(`${potion.name}을 인벤토리에 추가했습니다.`);
  } else {
    gameConsole.log("인벤토리가 가득 찼습니다.");
  }
}

  // 예시: 아이템 획득 메서드
  addItemToInventory(item) {
    this.player.addItem(item);
    gameConsole.log(`${item.name}을(를) 획득했습니다!`);
  }
}

// 게임 인스턴스 생성 및 초기화
const game = new Game();
game.initialize();