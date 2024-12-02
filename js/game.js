// game.js

import { Player } from './player.js';
import { Battle } from './battle.js';
import { itemList } from './item.js';
import { weapons, armors } from './equipments.js';
import { monsterList } from './monster.js';
import { gameConsole } from './console.js';

import { EventManager } from './event.js';
import { CanvasManager } from './canvasManager.js';
import { DialogueManager } from './dialogueManager.js';
import { GameEventManager } from './eventManager.js';  // 이건 DOM 이벤트 리스너 관리 매니저인데 게임 이벤트 매니저랑 겹치네...

export class Game {
  constructor() {
    this.initializeManagers();
    this.initializeGameState();
    this.initializeUI();
    this.setupEventListeners();
  }

  initializeManagers() {
    this.canvasManager = new CanvasManager("gameCanvas");
    this.dialogueManager = new DialogueManager(this);
    this.eventManager = new EventManager(this);
    this.gameEventManager = new GameEventManager(this);
    this.player = new Player();
  }

  initializeGameState() {
    this.currentFloor = 0;
    this.maxFloorReached = 0;
    this.exploration = 0;
    this.currentLocation = "start";
    this.inDungeon = false;
    this.gameStarted = false;
    this.currentMonster = null;
    this.isInBattle = false;
    this.currentBattle = null;
    this.isGameOver = false;
  }

  initializeUI() {
    this.townButtons = document.getElementById("townButtons");
    this.dungeonButtons = document.getElementById("dungeonButtons");
    this.exploreButton = document.getElementById("exploreButton");
    this.battleButtons = document.getElementById("battleButtons");
    this.nextFloorButton = document.getElementById("nextFloorButton");
    this.returnTownButton = document.getElementById("returnTownButton");
    this.skillPanel = document.getElementById('skill-panel');
    this.spellPanel = document.getElementById('spell-panel');
    this.skillGrid = document.getElementById('skill-grid');
    this.spellGrid = document.getElementById('spell-grid');
    this.toggleSkillBtn = document.getElementById('toggleSkill');
    this.toggleSpellBtn = document.getElementById('toggleSpell');
    this.inventoryContent = document.getElementById('inventory-content');
    this.toggleInventoryBtn = document.getElementById('toggleInventory');
    this.loadingScreen = document.getElementById('loading-screen');
    this.restartButton = {x: 0, y: 0, width: 200, height: 50,  text: "다시 시작하기",};
  }

  setupEventListeners() {
    this.canvasClickListener = this.handleCanvasClick.bind(this);
    this.canvasManager.getMainCanvas().addEventListener('click', this.canvasClickListener);
  }

  async initialize() {
    gameConsole.clear();
    this.player.initializeInventory();
    this.gameEventManager.setupEventListeners();  // DOM 이벤트 리스너
    this.showLoadingScreen();
    await this.loadAllImages();
    this.hideLoadingScreen();
    this.updateCanvas();
    if (!this.gameStarted) {
      this.townButtons.style.display = "none";
      this.eventManager.startCharacterCreationEvent();
    } else {
      gameConsole.log("더2N전에 오신 것을 환영합니다!");
    }
  }

  showLoadingScreen() {
    this.loadingScreen.style.display = 'flex';
  }

  hideLoadingScreen() {
      this.loadingScreen.style.display = 'none';
  }

  async loadAllImages() {
    const imagesToLoad = [
      { name: "start", src: "images/start.jpg" },
      { name: "town", src: "images/town.jpg" },
      { name: "inn", src: "images/inn.jpg" },
      { name: "shop", src: "images/shop.jpg" },
      { name: "guild", src: "images/guild.jpg" },
      { name: "dungeon", src: "images/dungeon.jpg" },
      { name: "forge", src: "images/forge.jpg" },
      { name: "npc_inn", src: "images/portrait/innkeeper.jpg" },
      { name: "npc_shop", src: "images/portrait/shopkeeper.jpg" },
      { name: "npc_guild", src: "images/portrait/guildmaster.jpg" },
      { name: "npc_forge", src: "images/portrait/blacksmith.jpg" },
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

  resetGame() {
    this.currentFloor = 0;
    this.maxFloorReached = 0;
    this.exploration = 0;
    this.inDungeon = false;
    this.currentLocation = "start";
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
    gameConsole.log(`${this.player.name}님의 앞으로의 여정에 ···의 축복이 함께하길...`);
    this.updateSpellPanel();
    this.updateSkillPanel();
    this.updateCanvas();
    this.addTestItem();
    this.updateInventoryUI();
    // 여기에 게임 시작 후 추가적인 초기화 로직을 넣을 수 있습니다.
  }

  gameOver() {
    if (this.isGameOver) return;
    this.isGameOver = true; // 게임 오버 상태 추가
    //this.saveConsoleToFile();
    //this.gameEventManager.removeListener("attckButton","click");
    this.player.reset(); // player reset 호출 추가
    this.player.updateInfo();
    this.updateInventoryUI();
    this.updateSpellPanel();
    this.updateSkillPanel();
    this.showRestartButton();
  }

  saveConsoleToFile() {
    const consoleElement = document.getElementById('console');
    const consoleText = consoleElement.innerText || consoleElement.textContent;
    
    const blob = new Blob([consoleText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'game_log.txt';
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    URL.revokeObjectURL(url);
  }

  showRestartButton() {
    // 버튼 위치 업데이트
    this.restartButton.x = this.canvasManager.width / 2 - this.restartButton.width / 2;
    this.restartButton.y = this.canvasManager.height / 2 + 25;

    // 이전 이벤트 리스너 제거
    if (this.canvasClickListener) {
      this.canvasManager.getMainCanvas().removeEventListener("click", this.canvasClickListener);
    }

    // 새 이벤트 리스너 추가
    this.canvasClickListener = this.handleCanvasClick.bind(this);
    this.canvasManager.getMainCanvas().addEventListener("click", this.canvasClickListener);

    this.updateCanvas(); // 캔버스 업데이트 호출
  }

  handleCanvasClick(e) {
    const rect = this.canvasManager.getMainCanvas().getBoundingClientRect();
    const scaleX = this.canvasManager.width / rect.width;
    const scaleY = this.canvasManager.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (['inn', 'shop', 'guild', 'forge'].includes(this.currentLocation)) {
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
        case 'forge':
          this.canvasManager.drawBackground(this.currentLocation);
          this.canvasManager.drawDialogueBox(this.dialogueManager.getDialogueText(), 'npc_'+this.currentLocation);
          this.canvasManager.drawDialogueOptions(this.dialogueManager.options);
          break;
        case "town":
          // 마을 특정 UI 요소를 그릴 수 있습니다.
          break;
        case "start":
            // 마을 특정 UI 요소를 그릴 수 있습니다.
          break;
        case "dungeon":
          if (this.isInBattle && this.currentBattle) {
            this.canvasManager.drawBattleScene(this.player, this.currentBattle.monster);
            this.canvasManager.drawRound(this.currentBattle.round);
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
    this.dialogueManager.options = [
      { text: "1. 인사한다", action: () => this.dialogueManager.greet('innkeeper') },
      { text: "2. 휴식한다(10골드)", action: () => this.rest() },
      { text: "3. 나간다", action: () => this.backToTown() }
    ];
    this.updateCanvas();
  }

  rest() {
    if (this.player.gold >= 10) {
      this.player.gold -= 10;
      this.player.hp = this.player.maxHp;
      this.player.spellBook.resetSlots(this.player.level);
      // 기술 횟수 초기화 (예: Fighter의 Second Wind)
      if (this.player.class === "Fighter") {
        //Fighter.secondWindReset();
      }
      gameConsole.log("휴식을 취했습니다. 체력과 주문 슬롯이 모두 회복되었습니다.");
      this.player.updateInfo();
      //this.updateCanvas();
    } else {
      gameConsole.log("골드가 부족합니다.");
    }
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

  goToForge() {
    this.currentLocation = "forge";
    this.dialogueManager.startDialogue('blacksmith', "대장간에 오신 것을 환영합니다. 무엇을 도와드릴까요?");
    this.dialogueManager.options = [
      { text: "1. 무기 구매", action: () => this.showForgeItems('weapon') },
      { text: "2. 방어구 구매", action: () => this.showForgeItems('armor') },
      { text: "3. 나가기", action: () => this.backToTown() }
    ];
    this.updateCanvas();
    // 여기에 대장간 기능 추가
  }

  showForgeItems(type) {
    const items = type === 'weapon' ? this.getAvailableWeapons() : this.getAvailableArmors();
    this.canvasManager.drawForgeItems(items, type);
    this.canvasManager.getMainCanvas().addEventListener('click', this.handleForgeItemClick.bind(this));
  }
  
  handleForgeItemClick(e) {
    const rect = this.canvasManager.getMainCanvas().getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const clickedItem = this.canvasManager.getClickedItem(x, y);
    if (clickedItem) {
      this.buyItem(clickedItem);
    }
  }
  
  buyItem(item) {
    if (this.player.gold >= item.price) {
      this.player.gold -= item.price;
      this.player.addItem(item);
      gameConsole.log(`${item.name}을(를) 구매했습니다.`);
      this.updateCanvas();
    } else {
      gameConsole.log("골드가 부족합니다.");
    }
  }

  getAvailableWeapons() {
    return [weapons.longsword, weapons.shortsword, weapons.dagger, weapons.mace];
  }
  
  getAvailableArmors() {
    return [armors.leather, armors.chainShirt, armors.shield];
  }
   
  sellItem(index) {
    const item = this.player.inventory[index];
    const sellPrice = Math.floor(item.price / 2);
    this.player.gold += sellPrice;
    this.player.removeItem(index);
    gameConsole.log(`${item.name}을(를) ${sellPrice}골드에 판매했습니다.`);
    this.updateCanvas();
  }

  goToDungeon() {
    if (this.inDungeon) return; // 이미 던전에 있다면 메서드 실행을 중단

    this.inDungeon = true;
    this.currentLocation = "dungeon";
    if (this.maxFloorReached === 0) {
      this.currentFloor = 1;
      this.maxFloorReached = 1;
      gameConsole.log("던전에 처음 입장했습니다. 1층부터 탐험을 시작하세요!");
    } else {
      this.currentFloor = this.maxFloorReached;
      gameConsole.log(`당신은 ${this.maxFloorReached}층부터 탐험을 재개합니다.`);
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
  
    const eventRoll = Math.random();
    // 전투 60%, 돌발이벤트 30%, 그냥 탐사 10%
    if (eventRoll < 0.6) {
      this.startBattle(explorationGain);
    } else if (eventRoll < 0.9) {
      this.triggerRandomEvent();
    }else {
      this.increaseExploration(explorationGain);
    }
  }

  triggerRandomEvent() {
    const eventRoll = Math.random();
    if (eventRoll < 0.5) {
      this.trapEvent();
    } else {
      this.treasureEvent();
    }
  }

  trapEvent() {
    const damage = Math.floor(Math.random() * 5) + 1; // 1-5 사이의 랜덤 데미지
    this.player.takeDamage(damage);
    gameConsole.log(`던전을 탐사하다 함정에 걸려 ${damage}의 피해를 입었습니다.`);
    this.updateCanvas();
  }

  treasureEvent() {
    gameConsole.log("숨겨진 보물 상자를 발견했습니다. 상자를 열어보시겠습니까?");
    
    // 여기서 플레이어의 선택을 기다리는 로직이 필요합니다.
    // 예를 들어, 버튼을 생성하고 클릭 이벤트를 처리할 수 있습니다.
    
    const openTreasure = () => {
      const dcCheck = Utils.rollDice(20) + this.player.getModifier("dexterity");
      if (dcCheck >= 12) { // DC 12로 가정
        const gold = Math.floor(Math.random() * 50) + 10; // 10-59 골드
        this.player.gainGold(gold);
        gameConsole.log(`상자를 성공적으로 열었습니다! ${gold} 골드를 획득했습니다.`);
      } else {
        gameConsole.log("상자를 여는데 실패했습니다.");
      }
      this.updateCanvas();
    };
  
    // 여기서 openTreasure 함수를 호출하는 버튼을 생성하고 이벤트 리스너를 추가합니다.
  }

  startBattle(explorationGain) {
    if (!this.isGameOver) {
      this.isInBattle = true;
      const monster = this.getRandomMonster();
      this.currentBattle = new Battle(this, this.player, monster, explorationGain);
      this.currentBattle.start();
      this.exploreButton.style.display = "none";
      this.battleButtons.style.display = "block";
      this.updateCanvas();
    }
    return;
  }

  increaseExploration(explorationGain) {
    this.exploration += explorationGain;
    if (this.exploration >= 100) {
      this.exploration = 100;
      gameConsole.log(`던전 ${this.currentFloor}층 탐험을 완료했습니다.`);
    }
    gameConsole.log(`탐험을 진행했습니다. 탐사도가 ${explorationGain}% 증가했습니다.`);
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
    const appropriateMonsters = Object.values(monsterList).filter((monster) => {
      return (monster.cr <= this.currentFloor / 2 && monster.cr >= this.currentFloor / 4);
    });

    if (appropriateMonsters.length === 0) {
      return Object.values(monsterList)[0]; // 적절한 몬스터가 없으면 첫 번째 몬스터 반환
    }

    return appropriateMonsters[Math.floor(Math.random() * appropriateMonsters.length)];
  }

  goToNextFloor() {
    this.currentFloor++;
    if (this.currentFloor > this.maxFloorReached) this.maxFloorReached = this.currentFloor;
    this.exploration = 0;
    this.updateCanvas();
    gameConsole.log(`던전 ${this.currentFloor}층으로 올라왔습니다. 새로운 탐험을 시작하세요!`);
    this.exploreButton.style.display = "inline";
    this.nextFloorButton.style.display = "none";
    this.returnTownButton.style.display = "none";
  }

  returnToTown() {
    this.currentFloor++;
    if (this.currentFloor > this.maxFloorReached) this.maxFloorReached = this.currentFloor;
    this.inDungeon = false;
    this.currentLocation = "town";
    this.updateCanvas();
    gameConsole.log(`탐사를 성공적으로 마치고 마을로 귀환했습니다.`);
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
      gameConsole.log(`당신의 여정을 축복하며 ${potion.name}을 선물로 드리겠습니다.`);
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

  updateInventoryUI() {
    const inventoryGrid = document.getElementById("inventory-grid");
    inventoryGrid.innerHTML = "";
    for (let i = 0; i < this.player.inventorySize; i++) {
      const slot = document.createElement("div");
      slot.className = "inventory-slot empty";
      slot.dataset.index = i;
      if (this.player.inventory[i]) {
        slot.textContent = this.player.inventory[i].name;
        slot.className = "inventory-slot";
        slot.title = this.player.inventory[i].description;
        if (this.isInBattle) slot.onclick = () => this.currentBattle.useItem(i);
        else slot.onclick = () => this.useItem(i);
      }
      inventoryGrid.appendChild(slot);
    }
  }

  useItem() {
    gameConsole.log("우리 마을에서는 아이템 사용이 허용되지 않습니다.");
  }

  updateSkillPanel() {
    this.skillGrid.innerHTML = '';
    if (this.player.class === "Fighter" || this.player.class === "Rogue") {
      this.player.skills.forEach((skill, index) => {
          const skillSlot = document.createElement('div');
          skillSlot.className = 'skill-slot';
          skillSlot.textContent = skill.name;
          skillSlot.title = skill.description;
          if( this.currentBattle != null) skillSlot.onclick = () => this.currentBattle.useSkillOrSpell(skill);
          this.skillGrid.appendChild(skillSlot);
      });
      this.skillPanel.style.display = 'block';
    } else {
      this.skillPanel.style.display = 'none';
    }
  }

  updateSpellPanel() {
    this.spellGrid.innerHTML = '';
    if (this.player.class === "Wizard" || this.player.class === "Cleric") {
        this.player.spellBook.getPreparedSpells().forEach((spell, index) => {
            const spellSlot = document.createElement('div');
            spellSlot.className = 'spell-slot';
            spellSlot.textContent = spell.name;
            spellSlot.title = spell.description;
            if( this.currentBattle != null) spellSlot.onclick = () => this.currentBattle.useSkillOrSpell(spell);
            this.spellGrid.appendChild(spellSlot);
        });
        this.spellPanel.style.display = 'block';
    } else {
        this.spellPanel.style.display = 'none';
    }
  }

  togglePanel(panelType) {
    const panel = panelType === 'skill' ? this.skillPanel : this.spellPanel;
    const content = panel.querySelector(`#${panelType}-content`);
    const toggleBtn = panelType === 'skill' ? this.toggleSkillBtn : this.toggleSpellBtn;

    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggleBtn.textContent = '▼';
    } else {
        content.style.display = 'none';
        toggleBtn.textContent = '▶';
    }
  }

  toggleInventory() {
      if (this.inventoryContent.style.display === 'none') {
          this.inventoryContent.style.display = 'block';
          this.toggleInventoryBtn.textContent = '▼';
      } else {
          this.inventoryContent.style.display = 'none';
          this.toggleInventoryBtn.textContent = '▶';
      }
  }
}