// game.js
import { Player } from './player.js';
import { CanvasManager } from './canvasManager.js';
import { DialogueManager } from './dialogueManager.js';
import { EventManager } from './event.js';
import { Battle } from './battle.js';
import { monsterList } from './monster.js';
import { gameConsole } from './console.js';
import { itemList } from './item.js';
import { GameEventManager } from './eventManager.js';  // import 문 수정

export class Game {
  constructor() {
    this.canvasManager = new CanvasManager("gameCanvas");
    this.dialogueManager = new DialogueManager(this);
    this.gameEventManager = new GameEventManager(this);  // 이름 변경
    this.player = new Player();
    this.currentFloor = 0;
    this.maxFloorReached = 0;
    this.exploration = 0;
    this.currentLocation = "town";
    this.inDungeon = false;
    this.gameStarted = false;
    this.currentMonster = null;
    this.isInBattle = false;
    this.currentBattle = null;
    this.isGameOver = false;
    this.eventManager = new EventManager(this);
    this.canvasClickListener = this.handleCanvasClick.bind(this);
    this.canvasManager.getMainCanvas().addEventListener('click', this.handleCanvasClick.bind(this));
    this.townButtons = document.getElementById("townButtons");
    this.dungeonButtons = document.getElementById("dungeonButtons");
    this.exploreButton = document.getElementById("exploreButton");
    this.battleButtons = document.getElementById("battleButtons");
    this.nextFloorButton = document.getElementById("nextFloorButton");
    this.returnTownButton = document.getElementById("returnTownButton");
    this.restartButton = {x: 0, y: 0, width: 200, height: 50,  text: "다시 시작하기",};
    this.loadingScreen = document.getElementById('loading-screen');
  }

  async initialize() {
    gameConsole.clear();
    this.gameEventManager.setupEventListeners();  // 이름 변경
    //this.updateCanvas();
    //this.player.updateInfo();
    this.player.initializeInventory();
    this.setupBattleButtons();
    this.showLoadingScreen();
    await this.loadAllImages();
    this.hideLoadingScreen();
    this.updateCanvas();
    if (!this.gameStarted) {
      this.townButtons.style.display = "none";
      this.eventManager.startCharacterCreationEvent();
    } else {
      gameConsole.log(
        "더2N전에 오신 것을 환영합니다!"
      );
    }
    //this.resetGame();
  }

  showLoadingScreen() {
    this.loadingScreen.style.display = 'flex';
  }

  hideLoadingScreen() {
      this.loadingScreen.style.display = 'none';
  }

  async loadAllImages() {
    const imagesToLoad = [
      { name: "town", src: "images/town.jpg" },
      { name: "inn", src: "images/inn.jpg" },
      { name: "shop", src: "images/shop.jpg" },
      { name: "guild", src: "images/guild.jpg" },
      { name: "dungeon", src: "images/dungeon.jpg" },
      { name: "blacksmith", src: "images/blacksmith.jpg" },
      { name: "innkeeper", src: "images/portrait/innkeeper.jpg" },
      { name: "shopkeeper", src: "images/portrait/shopkeeper.jpg" },
      { name: "guildmaster", src: "images/portrait/guildmaster.jpg" },
      { name: "blacksmitchmen", src: "images/portrait/blacksmith.jpg" },
      { name: "goblin", src: "images/monster/goblin.png" },
      { name: "frog", src: "images/monster/frog.png" },
      { name: "giantfrog", src: "images/monster/giantfrog.png" },
      { name: "brownbear", src: "images/monster/brownbear.png" },
      { name: "hobgoblin", src: "images/monster/hobgoblin.png" },
      { name: "owlbear", src: "images/monster/owlbear.png" },
    ];

    const loadPromises = imagesToLoad.map((img) =>
      this.canvasManager.loadImage(img.name, img.src)
    );

    await Promise.all(loadPromises);
  }

  setupBattleButtons() {
    const attackButton = document.createElement("button");
    attackButton.textContent = "공격";
    attackButton.onclick = () => this.attack();

    const fleeButton = document.createElement("button");
    fleeButton.textContent = "도망";
    fleeButton.onclick = () => this.flee();

    this.battleButtons.appendChild(attackButton);
    this.battleButtons.appendChild(fleeButton);
  }

  resetGame() {
    this.currentFloor = 0;
    this.maxFloorReached = 0;
    this.exploration = 0;
    this.inDungeon = false;
    this.currentLocation = "town";
    this.currentBattle = null;
    this.isInBattle = false;
    this.isGameOver = false;

    // 플레이어 리셋
    this.player.reset();

    // 버튼 상태 초기화
    this.townButtons.style.display = "flex";
    this.dungeonButtons.style.display = "none";
    this.exploreButton.style.display = "inline";
    this.nextFloorButton.style.display = "none";
    this.returnTownButton.style.display = "none";
    this.battleButtons.style.display = "none";
    
    this.gameEventManager.removeAllListeners();  // 이름 변경
    this.gameEventManager.setupEventListeners();  // 이름 변경
    
    gameConsole.clear();
    this.updateCanvas();
  }

  startGame() {
    this.gameStarted = true;
    this.townButtons.style.display = "flex";
    this.currentLocation = "town";
    gameConsole.log(
      `${this.player.name}님의 앞으로의 여정에 ···의 축복이 함께하길...`
    );
    this.updateCanvas();
    this.addTestItem();
    // 여기에 게임 시작 후 추가적인 초기화 로직을 넣을 수 있습니다.
  }

  gameOver() {
    if (this.isGameOver) return;
    gameConsole.log("게임 오버! 캐릭터가 사망했습니다.");
    this.player.reset(); // player reset 호출 추가
    this.isGameOver = true; // 게임 오버 상태 추가
    this.updateCanvas();
    this.showRestartButton();
  }

  showRestartButton() {
    // 버튼 위치 업데이트
    this.restartButton.x =
      this.canvasManager.width / 2 - this.restartButton.width / 2;
    this.restartButton.y = this.canvasManager.height / 2 + 25;

    // 이전 이벤트 리스너 제거
    if (this.canvasClickListener) {
      this.canvasManager
        .getMainCanvas()
        .removeEventListener("click", this.canvasClickListener);
    }

    // 새 이벤트 리스너 추가
    this.canvasClickListener = this.handleCanvasClick.bind(this);
    this.canvasManager
      .getMainCanvas()
      .addEventListener("click", this.canvasClickListener);

    this.updateCanvas(); // 캔버스 업데이트 호출
  }

  handleCanvasClick(e) {
    //const canvas = this.canvasManager.getMainCanvas();
    const rect = this.canvasManager.getMainCanvas().getBoundingClientRect();
  //  const rect = canvas.getBoundingClientRect();
    const scaleX = this.canvasManager.width / rect.width;
    const scaleY = this.canvasManager.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (['inn', 'shop', 'guild', 'blacksmith'].includes(this.currentLocation)) {
      this.dialogueManager.handleClick(x, y);
    } else if (this.isGameOver) {
      // 게임 오버 상태에서의 클릭 처리
      if (x > this.restartButton.x && x < this.restartButton.x + this.restartButton.width &&
          y > this.restartButton.y && y < this.restartButton.y + this.restartButton.height) {
          this.resetGame();
          this.eventManager.startCharacterCreationEvent();
      }
    }
  }

  backToTown() {
    this.currentLocation = 'town';
    this.dialogueManager.removeClickListener();
    this.updateCanvas();
  }

  updateCanvas() {
    this.canvasManager.clear();
    if (this.isGameOver) {
      this.canvasManager.drawGameOver();
      this.canvasManager.drawButton(this.restartButton);
    } else {
      this.canvasManager.drawBackground(
        this.currentLocation,
        this.inDungeon ? this.currentFloor : null
      );
      switch (this.currentLocation) {
        case 'inn':
        case 'shop':
        case 'guild':
        case 'blacksmith':
          this.canvasManager.drawBackground(this.currentLocation);
          this.canvasManager.drawDialogueBox(this.dialogueManager.getDialogueText(), this.currentLocation + 'keeper');
          this.canvasManager.drawDialogueOptions(this.dialogueManager.options);
          break;
        case "town":
          // 마을 특정 UI 요소를 그릴 수 있습니다.
          break;
        case "dungeon":
          if (this.isInBattle && this.currentBattle) {
            this.canvasManager.drawBattleScene(
              this.player,
              this.currentBattle.monster
            );
          } else {
            this.canvasManager.drawExplorationProgress(this.exploration);
          }
          break;
        default:
          console.log(`Unknown location: ${this.currentLocation}`);
      } 
    } this.canvasManager.render();
  }

  goToInn() {
    this.currentLocation = "inn";
    this.dialogueManager.startDialogue('innkeeper', "안녕하세요, 여행자님. 휴식을 취하시겠습니까? 10골드에 체력을 모두 회복할 수 있습니다.");
    this.updateCanvas();
    // 여기에 휴식 기능 추가
  }

  goToShop() {
    this.currentLocation = "shop";
    this.dialogueManager.startDialogue('shopkeeper', "어서오세요. 저희 상점에 오신 것을 환영합니다. 어떤 물건을 구매하시겠습니까?");
    this.updateCanvas();
    // 여기에 상점 기능 추가
  }

  goToGuild() {
    this.currentLocation = "guild";
    this.dialogueManager.startDialogue('guildmaster', "모험가 길드에 오신 것을 환영합니다. 어떤 퀘스트를 받고 싶으신가요? 난이도별로 다양한 퀘스트가 준비되어 있습니다.");
    this.updateCanvas();
    // 여기에 길드 기능 추가
  }

  goToBlacksmith() {
    this.currentLocation = "blacksmith";
    this.dialogueManager.startDialogue('blacksmitchmen', "대장간에 오신 것을 환영합니다. 무기를 강화하시겠습니까? 아니면 새로운 방어구를 제작하시겠습니까?");
    this.updateCanvas();
    // 여기에 대장간 기능 추가
  }

  goToDungeon() {
    if (this.inDungeon) return; // 이미 던전에 있다면 메서드 실행을 중단

    this.inDungeon = true;
    this.currentLocation = "dungeon";
    if (this.maxFloorReached === 0) {
      this.currentFloor = 1;
      this.maxFloorReached = 1;
      gameConsole.log(
        "던전에 처음 입장했습니다. 1층부터 탐험을 시작하세요!"
      );
    } else {
      this.currentFloor = this.maxFloorReached;
      gameConsole.log(
        `이전에 도달한 ${this.maxFloorReached}층부터 탐험을 재개합니다.`
      );
    }
    this.exploration = 0;
    this.updateCanvas();
    this.townButtons.style.display = "none";
    this.nextFloorButton.style.display = "none";
    this.returnTownButton.style.display = "none";
    this.dungeonButtons.style.display = "flex";
    this.exploreButton.style.display = "inline";
  }

  explore() {
    if (this.isInBattle) return;

    const explorationGain = Math.floor(Math.random() * 20) + 5; // 5-20 사이의 랜덤 값

    // 랜덤 전투 발생
    if (Math.random() < 0.99) {
      // 30% 확률로 전투 발생
      this.startBattle(explorationGain);
    } else {
      this.increaseExploration(explorationGain);
    }
  }

  startBattle(explorationGain) {
    this.isInBattle = true;
    const monster = this.getRandomMonster();
    this.currentBattle = new Battle(
      this,
      this.player,
      monster,
      explorationGain
    );
    this.currentBattle.start();
    this.exploreButton.style.display = "none";
    this.battleButtons.style.display = "block";
    this.updateCanvas();
  }

  increaseExploration(explorationGain) {
    this.exploration += explorationGain;
    if (this.exploration >= 100) {
      this.exploration = 100;
    }
    gameConsole.log(
      `탐험을 진행했습니다. 탐사도가 ${explorationGain}% 증가했습니다.`
    );
    this.updateExplorationButtons();
    this.updateCanvas();
  }

  updateExplorationButtons() {
    if (this.exploration >= 100) {
      this.exploreButton.style.display = "none";
      this.nextFloorButton.style.display = "inline";
      this.returnTownButton.style.display = "inline";
    } else {
      this.exploreButton.style.display = "inline";
      this.nextFloorButton.style.display = "none";
      this.returnTownButton.style.display = "none";
    }
  }

  attack() {
    if (
      this.currentBattle &&
      this.currentBattle.initiativeOrder[0] === this.player
    ) {
      this.currentBattle.playerAttack();
    }
  }

  flee() {
    if (
      this.currentBattle &&
      this.currentBattle.initiativeOrder[0] === this.player
    ) {
      this.currentBattle.playerFlee();
    }
  }

  getRandomMonster() {
    const appropriateMonsters = Object.values(monsterList).filter((monster) => {
      return (
        monster.cr <= this.currentFloor / 2 &&
        monster.cr >= this.currentFloor / 4
      );
    });

    if (appropriateMonsters.length === 0) {
      return Object.values(monsterList)[0]; // 적절한 몬스터가 없으면 첫 번째 몬스터 반환
    }

    return appropriateMonsters[
      Math.floor(Math.random() * appropriateMonsters.length)
    ];
  }

  goToNextFloor() {
    this.currentFloor++;
    if (this.currentFloor > this.maxFloorReached) {
      this.maxFloorReached = this.currentFloor;
    }
    this.exploration = 0;
    this.updateCanvas();
    gameConsole.log(
      `던전 ${this.currentFloor}층으로 올라왔습니다. 새로운 탐험을 시작하세요!`
    );
    this.exploreButton.style.display = "inline";
    this.nextFloorButton.style.display = "none";
    this.returnTownButton.style.display = "none";
  }

  returnToTown() {
    this.currentFloor++;
    if (this.currentFloor > this.maxFloorReached) {
      this.maxFloorReached = this.currentFloor;
    }
    this.inDungeon = false;
    this.currentLocation = "town";
    this.updateCanvas();
    gameConsole.log(
      `마을로 귀환했습니다. 던전 ${this.maxFloorReached}층 끝까지 도달했습니다.`
    );
    this.townButtons.style.display = "flex";
    this.dungeonButtons.style.display = "none";
  }

  // 테스트용 아이템 추가 메서드
  addTestItem() {
    const potion = itemList.smallHealingPotion;
    if (this.player.addItem(potion)) {
      this.player.addItem(potion);
      this.player.addItem(potion);
      this.player.addItem(potion);
      this.player.addItem(potion);
      gameConsole.log(
        `당신의 여정을 축복하며 ${potion.name}을 선물로 드리겠습니다.`
      );
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