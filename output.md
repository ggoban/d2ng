# Table of Contents

- [index.html](#index.html)
- [styles.css](#styles.css)
- [player.css](#player.css)
- [main.js](#main.js)
- [console.js](#console.js)
- [equipments.js](#equipments.js)
- [skills.js](#skills.js)
- [mobile-sidebar.js](#mobile-sidebar.js)
- [eventManager.js](#eventManager.js)
- [player.js](#player.js)
- [dialogueManager.js](#dialogueManager.js)
- [canvasManager.js](#canvasManager.js)
- [item.js](#item.js)
- [game.js](#game.js)
- [battle.js](#battle.js)
- [monster.js](#monster.js)
- [event.js](#event.js)
- [utils.js](#utils.js)
- [spells.js](#spells.js)
- [rogue.js](#rogue.js)
- [wizard.js](#wizard.js)
- [fighter.js](#fighter.js)
- [cleric.js](#cleric.js)



# index.html

```
<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>더2N전</title>
  <link rel="stylesheet" href="./css/styles.css">
  <link rel="stylesheet" href="./css/player.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200..900&display=swap" rel="stylesheet">
</head>

<body>
  <div id="game-container">
    <div id="left-sidebar" class="sidebar">
      <!-- 플레이어 정보 영역 -->
      <div id="player-info">
        <div id="player-basic-info">
          <h3 style="text-align: center;">플레이어 정보</h3>
          <p>이름: <span id="player-name">?</span></p>
          <p>종족: <span id="player-race">?</span></p>
          <p>직업: <span id="player-class">?</span></p>
          <p>레벨: <span id="player-level">1</span></p>
          <p>HP: <span id="player-hp">0</span>/<span id="player-max-hp">0</span></p>
          <p>무기: <span id="player-weapon">0</span></p>
          <p>AC: <span id="player-ac">10</span></p>
          <p>갑옷: <span id="player-armor">없음</span></p>
          <p>방패: <span id="player-shield">없음</span></p>
          <p>경험치: <span id="player-xp">0</span>/<span id="player-next-level-xp">300</span></p>
          <p>숙련 보너스: +<span id="player-proficiency">2</span></p>
          <p>스킬 포인트: <span id="player-skill-points">0</span></p>
          <p>골드: <span id="player-gold">0</span></p>
        </div>
        <div id="player-stats">
          <h3 style="text-align: center;">능력치</h3>
          <div id="player-stats-grid">
            <p>근력: <span id="player-strength">10</span> <button id="increase-strength" class="stat-increase-btn"
                data-stat="strength" style="display:none;">+</button></p>
            <p>민첩: <span id="player-dexterity">10</span> <button id="increase-dexterity" class="stat-increase-btn"
                data-stat="dexterity" style="display:none;">+</button></p>
            <p>건강: <span id="player-constitution">10</span> <button id="increase-constitution"
                class="stat-increase-btn" data-stat="constitution" style="display:none;">+</button></p>
            <p>지능: <span id="player-intelligence">10</span> <button id="increase-intelligence"
                class="stat-increase-btn" data-stat="intelligence" style="display:none;">+</button></p>
            <p>지혜: <span id="player-wisdom">10</span> <button id="increase-wisdom" class="stat-increase-btn"
                data-stat="wisdom" style="display:none;">+</button></p>
            <p>매력: <span id="player-charisma">10</span> <button id="increase-charisma" class="stat-increase-btn"
                data-stat="charisma" style="display:none;">+</button></p>
          </div>
        </div>
      </div>
    </div>
    <div id="main-content">
      <h1>더2N전</h1>
      <canvas id="gameCanvas" width="800" height="400"></canvas>
      <div id="console"></div>
      <div id="action-buttons">
        <div id="townButtons" style="display: flex;">
          <button id="innButton">여관</button>
          <button id="shopButton">상점</button>
          <button id="guildButton">길드</button>
          <button id="forgeButton">대장간</button>
          <button id="dungeonButton">던전</button>
        </div>
        <div id="dungeonButtons" style="display: none;">
          <button id="exploreButton">탐험 시작</button>
          <button id="nextFloorButton" style="display: none;">다음 층으로</button>
          <button id="returnTownButton" style="display: none;">마을 귀환</button>
        </div>
        <div id="battleButtons" style="display: none;">
          <button id="attackButton">공격</button>
          <!--<button id="skillButton" class="sidebar-toggle">기술</button>
          <button id="spellButton" class="sidebar-toggle">주문</button>-->
          <button id="fleeButton">도망</button>
        </div>
      </div>
    </div>
    <div id="right-sidebar" class="sidebar">
      <div id="skill-panel" style="display: none;">
        <h3 class="panel-header">
          <span>기술</span>
          <button id="toggleSkill">▼</button>
        </h3>
        <div id="skill-content">
          <div id="skill-grid"></div>
        </div>
      </div>
      <div id="spell-panel" style="display: none;">
        <h3 class="panel-header">
          <span>주문</span>
          <button id="toggleSpell">▼</button>
        </h3>
        <div id="spell-content">
          <div id="spell-grid"></div>
        </div>
      </div>
      <!-- 인벤토리 영역 -->
      <div id="inventory">
        <h3 class="inventory-header">
          <span>인벤토리</span>
          <button id="toggleInventory">▼</button>
        </h3>
        <div id="inventory-content">
          <div id="inventory-grid"></div>
        </div>
      </div>
    </div>
  </div>
  <div id="mobile-sidebar-controls" class="mobile-only">
    <button id="toggle-left-sidebar">플레이어 정보</button>
    <button id="toggle-right-sidebar">인벤토리/스킬</button>
  </div>
  <div id="loading-screen" style="display: none;">
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>로딩 중...</p>
    </div>
  </div>
  <script type='module' src="./js/main.js"></script>
  <script src="./js/mobile-sidebar.js"></script>
</body>

</html>
```


# styles.css

```
/* styles.css */

/* Global Variables */
:root {
  --color-background: #1E1E1E;
  --color-text: #FFFFFF;
  --color-primary: #4CAF50;
  --color-secondary: #2A2A2A;
  --color-hover: #45a049;
  --color-border: #4A4A4A;
  --font-size-base: 16px;
  --font-size-vsmall: 0.700rem;
  --font-size-small: 0.875rem;
  --font-size-medium: 1rem;
  --font-size-large: 1.2rem;
  --spacing-small: 5px;
  --spacing-medium: 10px;
  --spacing-large: 20px;
  --border-radius: 5px;
  --transition-speed: 0.3s;
}

/* Global Styles */
body {
  font-family: "Noto Serif KR", Arial, sans-serif;
  font-size: var(--font-size-base);
  margin: 0;
  padding: 0;
  background-color: var(--color-background);
  color: var(--color-text);
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

*, *:before, *:after {
  box-sizing: inherit;
}

/* Layout */
#game-container {
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
  overflow-x: hidden;
}

#main-content {
  flex-grow: 1;
  padding: var(--spacing-large);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  overflow-y: auto;
}

.sidebar {
  width: 300px;
  background-color: var(--color-secondary);
  padding: var(--spacing-large);
  overflow-y: auto;
  box-sizing: border-box;
}

/* Typography */
h1 {
  color: var(--color-primary);
  margin-top: 0;
  text-align: center;
  font-size: var(--font-size-large);
}

/* Components */
.button {
  margin: var(--spacing-small);
  padding: var(--spacing-medium) var(--spacing-large);
  font-size: var(--font-size-medium);
  background-color: var(--color-primary);
  color: var(--color-text);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color var(--transition-speed);
}

.button:hover {
  background-color: var(--color-hover);
}

/* Loading Screen */
#loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Game Canvas */
#gameCanvas {
  border: 2px solid var(--color-primary);
  max-width: 100%;
  height: auto;
}

/* Console */
#console {
  width: 100%;
  max-width: 800px;
  height: 194px;
  border: 2px solid var(--color-primary);
  background-color: var(--color-secondary);
  color: var(--color-text);
  overflow-y: scroll;
  padding: var(--spacing-medium);
  font-family: "Noto Serif KR", Arial, sans-serif;
  margin-top: var(--spacing-medium);
  font-size: var(--font-size-small);
}

/* Action Buttons */
#action-buttons {
  width: 100%;
  max-width: 800px;
  margin: var(--spacing-medium) auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#townButtons, #dungeonButtons, #battleButtons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  text-align: center;
}

#action-buttons button {
  margin: var(--spacing-small);
  padding: var(--spacing-medium) var(--spacing-large);
  font-size: var(--font-size-medium);
  background-color: var(--color-primary);
  color: var(--color-text);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color var(--transition-speed);
}

#action-buttons button:hover {
  background-color: var(--color-hover);
}

/* Tooltip */
#tooltip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: var(--color-text);
  padding: var(--spacing-medium);
  border-radius: var(--border-radius);
  font-size: var(--font-size-small);
  z-index: 1000;
  max-width: 250px;
  pointer-events: none;
}

#mobile-sidebar-controls {
  display: none;
}

.mobile-only {
  display: none;
}

#left-sidebar, #right-sidebar {
  transition: transform 0.3s ease-in-out;
}

/* Media Queries */
@media (max-width: 1200px) {
  .mobile-only {
    display: block;
  }

  body {
    display: flex;
    flex-direction: column;
  }

  #game-container {
    flex-direction: column;
    flex: 1;
  }

  #main-content {
    order: 1;
    width: 100%;
    flex: 1;
    padding: var(--spacing-medium);
  }

  .sidebar {
    position: fixed;
    top: 0;
    height: 100%;
    width: 80%;
    max-width: 300px;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
  }

  #left-sidebar, #right-sidebar {
    position: fixed;
    top: 0;
    height: 100vh;
    width: 80%;
    max-width: 300px;
    z-index: 1000;
    background-color: var(--color-secondary);
    overflow-y: auto;
    transition: transform 0.3s ease-in-out;
  }

  #left-sidebar {
    left: 0;
    transform: translateX(-100%);
  }

  #right-sidebar {
    right: 0;
    transform: translateX(100%);
  }

  #left-sidebar.active {
    transform: translateX(0);
  }

  #right-sidebar.active {
    transform: translateX(0);
  }

  #mobile-sidebar-controls {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-medium);
    background-color: var(--color-secondary);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1001;
  }

  #mobile-sidebar-controls button {
    padding: var(--spacing-small) var(--spacing-medium);
    background-color: var(--color-primary);
    color: var(--color-text);
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
  }
}

@media (max-width: 600px) {
  #main-content {
    padding: var(--spacing-small);
  }

  #gameCanvas {
    width: 100%;
    height: auto;
    max-height: 50vh;
  }

  #action-buttons button {
    flex: 1 1 calc(50% - 10px);
    max-width: calc(50% - 10px);
    font-size: var(--font-size-small);
    padding: var(--spacing-small) var(--spacing-medium);
  }

  #player-info, #skill-panel, #spell-panel, #inventory {
    margin-bottom: var(--spacing-medium);
  }
}
```


# player.css

```
/* player.js */

/* Player Info */
#player-info {
  background-color: var(--color-secondary);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
  padding: var(--spacing-medium);
  margin-bottom: var(--spacing-large);
  box-sizing: border-box;
}

#player-info h3 {
  color: var(--color-primary);
  margin-top: 0;
  font-size: var(--font-size-large);
}

#player-basic-info, #player-stats {
  border: 1px solid var(--color-border);
  padding: var(--spacing-medium);
  border-radius: var(--border-radius);
}

#player-basic-info p, #player-stats p {
  margin: var(--spacing-small) 0;
  font-size: var(--font-size-small);
}

#player-stats h4 {
  margin-top: 0;
  margin-bottom: var(--spacing-medium);
  color: var(--color-primary);
  font-size: var(--font-size-medium);
}

#player-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-small);
}

#player-hp {
  transition: color var(--transition-speed) ease;
}

.stat-increase-btn {
  margin-left: var(--spacing-small);
  padding: 0 var(--spacing-small);
  background-color: var(--color-primary);
  color: var(--color-text);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: var(--font-size-small);
  transition: background-color var(--transition-speed) ease;
}

.stat-increase-btn:hover {
  background-color: var(--color-hover);
}

/* Skills and Spells */
.panel-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  margin-bottom: var(--spacing-medium);
}

.panel-header span {
  color: var(--color-primary);
  font-size: var(--font-size-large);
  margin-right: var(--spacing-small);
}

.toggle-button {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: var(--font-size-large);
  padding: 0;
}

.toggle-button:hover {
  color: var(--color-hover);
}

#skill-panel, #spell-panel, #inventory {
  background-color: var(--color-secondary);
  border-radius: var(--border-radius);
  padding: var(--spacing-medium);
  margin-bottom: var(--spacing-large);
  box-sizing: border-box;
}

#skill-content, #spell-content, #inventory-content {
  border: 1px solid var(--color-border);
  padding: var(--spacing-medium);
  border-radius: var(--border-radius);
}

#skill-grid, #spell-grid, #inventory-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-small);
}

.skill-slot, .spell-slot, .inventory-slot {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-vsmall);
  text-align: center;
  color: var(--color-text);
  word-break: break-all;
  overflow: hidden;
  cursor: pointer;
}

.skill-slot:hover, .spell-slot:hover, .inventory-slot:hover {
  background-color: var(--color-hover);
}

/* Inventory */
#inventory, #skill-panel, #spell-panel {
  border: 1px solid var(--color-border);
}

#inventory h3 {
  color: var(--color-primary);
  margin-top: 0;
  font-size: var(--font-size-large);
  margin-bottom: var(--spacing-medium);
}

.inventory-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--spacing-medium);
}

.inventory-header span {
  color: var(--color-primary);
  font-size: var(--font-size-large);
  margin-right: var(--spacing-small);
}

#toggleInventory, #toggleSpell, #toggleSkill {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: var(--font-size-large);
  padding: 0;
  margin: 0;
}

#toggleInventory:hover {
  color: var(--color-hover);
}

#inventory-list {
  list-style-type: none;
  padding: 0;
}

#inventory-list li {
  margin-bottom: var(--spacing-small);
  background-color: #444444;
  padding: var(--spacing-small);
  border-radius: var(--border-radius);
}

.inventory-slot.empty::after {
  content: 'Empty';
  color: #888;
}

.inventory-slot:not(.empty) {
  cursor: pointer;
}

/* Character Creation */
#character-creation {
  position: fixed;
  top: 27%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-secondary);
  padding: var(--spacing-large);
  border-radius: var(--border-radius);
  text-align: center;
  border: 2px solid var(--color-primary);
}

#character-creation h2 {
  margin-top: 0;
}

#character-creation input,
#character-creation select,
#character-creation button {
  display: block;
  width: 100%;
  margin: var(--spacing-medium) 0;
  padding: var(--spacing-small);
}

#character-creation button {
  background-color: var(--color-primary);
  color: var(--color-text);
  border: none;
  padding: var(--spacing-medium);
  cursor: pointer;
}

#character-creation button:hover {
  background-color: var(--color-hover);
}

/* Media Queries */
@media (max-width: 1200px) {
  #player-info {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-medium);
    margin-bottom: 0;
  }

  #player-basic-info, #player-stats {
    flex: 1;
    min-width: 200px;
  }

  #player-stats-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  #inventory-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 600px) {
  #player-info {
    flex-direction: column;
  }

  #player-stats {
    margin-top: var(--spacing-medium);
  }

  #inventory-grid {
    grid-template-columns: repeat(5, 1fr);
  }

  #skill-grid, #spell-grid, #inventory-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```


# main.js

```
// main.js

import { Game } from './game.js';

const game = new Game();
game.initialize().catch(error => console.error('Game initialization failed:', error));
```


# console.js

```
// console.js

class GameConsole {
  constructor() {
      this.consoleElement = document.getElementById('console');
  }

  log(message) {
      this.consoleElement.innerHTML += `<span>던전마스터: ${message}</span><br>`;
      this.consoleElement.scrollTop = this.consoleElement.scrollHeight;
  }

  log2(message) {
    this.consoleElement.innerHTML += `<span>${message}</span><br>`;
    this.consoleElement.scrollTop = this.consoleElement.scrollHeight;
  }

  clear() {
      this.consoleElement.innerHTML = '';
  }
}

export const gameConsole = new GameConsole();
```


# equipments.js

```
// equipment.js

export class Equipment {
  constructor(name, type, attackBonus, defenseBonus, description) {
      this.name = name;
      this.type = type; // 'weapon' 또는 'armor'
      this.attackBonus = attackBonus;
      this.defenseBonus = defenseBonus;
      this.description = description;
  }
}

// 무기 설정
export class Weapon {
  constructor(name, price, damage, damageType, weight, properties) {
      this.name = name;
      this.price = price;
      this.damage = damage;
      this.damageType = damageType;
      this.weight = weight;
      this.properties = properties;
  }
}

export const WeaponType = {
  SIMPLE_MELEE: 'Simple Melee',
  SIMPLE_RANGED: 'Simple Ranged',
  MARTIAL_MELEE: 'Martial Melee',
  MARTIAL_RANGED: 'Martial Ranged'
};

export const DamageType = {
  BLUDGEONING: 'bludgeoning', // 타격
  PIERCING: 'piercing', // 관통
  SLASHING: 'slashing' // 참격
};

export const WeaponProperty = {
  VERSATILE: 'versatile', // 다용도
  LIGHT: 'light', // 경량
  HEAVY: 'heavy', // 중량
  FINESSE: 'finesse', // 교묘함
  TWO_HANDED: 'two-handed', // 양손
  THROWN: 'thrown', // 투척
  REACH: 'reach', // 간격
  LOADING: 'loading', // 장전
  SPECIAL: 'special', // 특별
  AMMUNITION: 'ammunition' // 탄약
};

//무기 {이름, 가격, 피해(타격, 관통, 참격), 무게, 속성}
export const weapons = {
  // Simple Melee Weapons
  greatclub: new Weapon("Greatclub", "2sp", "1d8", DamageType.BLUDGEONING, 10, [WeaponProperty.TWO_HANDED]),
  dagger: new Weapon("Dagger", "2gp", "1d4", DamageType.PIERCING, 1, [WeaponProperty.FINESSE, WeaponProperty.LIGHT, WeaponProperty.THROWN]),
  lightHammer: new Weapon("Light Hammer", "2gp", "1d4", DamageType.BLUDGEONING, 2, [WeaponProperty.LIGHT, WeaponProperty.THROWN]),
  mace: new Weapon("Mace", "5gp", "1d6", DamageType.BLUDGEONING, 4, []),
  spear: new Weapon("Spear", "1gp", "1d6", DamageType.PIERCING, 3, [WeaponProperty.THROWN, WeaponProperty.VERSATILE]),
  sickle: new Weapon("Sickle", "1gp", "1d4", DamageType.SLASHING, 2, [WeaponProperty.LIGHT]),
  javelin: new Weapon("Javelin", "5sp", "1d6", DamageType.PIERCING, 2, [WeaponProperty.THROWN]),
  quarterstaff: new Weapon("Quarterstaff", "2sp", "1d6", DamageType.BLUDGEONING, 4, [WeaponProperty.VERSATILE]),
  club: new Weapon("Club", "1sp", "1d4", DamageType.BLUDGEONING, 2, [WeaponProperty.LIGHT]),
  handaxe: new Weapon("handaxe", "5gp", "1d6", DamageType.SLASHING, 2, [WeaponProperty.LIGHT, WeaponProperty.THROWN]),
  
  // Simple Ranged Weapons
  dart: new Weapon("Dart", "5cp", "1d4", DamageType.PIERCING, 0.25, [WeaponProperty.FINESSE, WeaponProperty.THROWN]),
  lightCrossbow: new Weapon("Light Crossbow", "25gp", "1d8", DamageType.PIERCING, 5, [WeaponProperty.AMMUNITION, WeaponProperty.LOADING, WeaponProperty.TWO_HANDED]),
  shortbow: new Weapon("Shortbow", "25gp", "1d6", DamageType.PIERCING, 2, [WeaponProperty.AMMUNITION, WeaponProperty.TWO_HANDED]),
  sling: new Weapon("Sling", "1sp", "1d4", DamageType.BLUDGEONING, 0, [WeaponProperty.AMMUNITION]),
  
  // Martial Melee Weapons
  greatsword: new Weapon("Greatsword", "50gp", "2d6", DamageType.SLASHING, 6, [WeaponProperty.HEAVY, WeaponProperty.TWO_HANDED]),
  greataxe: new Weapon("Greataxe", "30gp", "1d12", DamageType.SLASHING, 7, [WeaponProperty.HEAVY, WeaponProperty.TWO_HANDED]),
  glaive: new Weapon("Glaive", "20gp", "1d10", DamageType.SLASHING, 7, [WeaponProperty.HEAVY, WeaponProperty.REACH, WeaponProperty.TWO_HANDED]),
  lance: new Weapon("Lance", "10gp", "1d12", DamageType.PIERCING, 6, [WeaponProperty.REACH, WeaponProperty.SPECIAL]),
  rapier: new Weapon("Rapier", "25gp", "1d8", DamageType.PIERCING, 2, [WeaponProperty.FINESSE]),
  longsword: new Weapon("Longsword", "15gp", "1d8", DamageType.SLASHING, 3, [WeaponProperty.VERSATILE]),
  maul: new Weapon("Maul", "10gp", "2d6", DamageType.BLUDGEONING, 10, [WeaponProperty.HEAVY, WeaponProperty.TWO_HANDED]),
  morningstar: new Weapon("Morningstar", "15gp", "1d8", DamageType.PIERCING, 4, []),
  battleaxe: new Weapon("Battleaxe", "10gp", "1d8", DamageType.PIERCING, 4, [WeaponProperty.VERSATILE]),
  shortsword: new Weapon("Shortsword", "10gp", "1d6", DamageType.PIERCING, 2, [WeaponProperty.FINESSE, WeaponProperty.LIGHT]),
  scimitar: new Weapon("Scimitar", "25gp", "1d6", DamageType.SLASHING, 3, [WeaponProperty.FINESSE, WeaponProperty.LIGHT]),
  warpick: new Weapon("War Pick", "5gp", "1d8", DamageType.PIERCING, 2, []),
  warhammer: new Weapon("Warhammer", "15gp", "1d8", DamageType.BLUDGEONING, 2, [WeaponProperty.VERSATILE]),
  whip: new Weapon("Whip", "2gp", "1d4", DamageType.SLASHING, 3, [WeaponProperty.FINESSE, WeaponProperty.REACH]),
  trident: new Weapon("Trident", "5gp", "1d6", DamageType.PIERCING, 4, [WeaponProperty.THROWN, WeaponProperty.VERSATILE]),
  pike: new Weapon("Pike", "5gp", "1d10", DamageType.PIERCING, 18, [WeaponProperty.HEAVY, WeaponProperty.REACH, WeaponProperty.TWO_HANDED]),
  flail: new Weapon("Flail", "10gp", "1d8", DamageType.BLUDGEONING, 2, []),
  halberd: new Weapon("Halberd", "20gp", "1d10", DamageType.SLASHING, 6, [WeaponProperty.HEAVY, WeaponProperty.REACH, WeaponProperty.TWO_HANDED]),

  // Martial Ranged Weapons
  net: new Weapon("Net", "1gp", "1d1", DamageType.BLUDGEONING, 3, [WeaponProperty.SPECIAL, WeaponProperty.THROWN]),
  longbow: new Weapon("Longbow", "50gp", "1d8", DamageType.PIERCING, 2, [WeaponProperty.AMMUNITION, WeaponProperty.HEAVY, WeaponProperty.TWO_HANDED]),
  blowgun: new Weapon("Blowgun", "10gp", "1d1", DamageType.PIERCING, 1, [WeaponProperty.AMMUNITION, WeaponProperty.LOADING]),
  handcrossbow: new Weapon("Hand Crossbow", "75gp", "1d6", DamageType.PIERCING, 3, [WeaponProperty.AMMUNITION, WeaponProperty.LIGHT, WeaponProperty.LOADING]),
  heavycrossbow: new Weapon("Heavy Crossbow", "50gp", "1d0", DamageType.PIERCING, 18, [WeaponProperty.AMMUNITION, WeaponProperty.HEAVY, WeaponProperty.LOADING, WeaponProperty.TWO_HANDED]),

  // Monster Special Weapons
  claws: new Weapon("Claws", "Natural", "2d6", DamageType.SLASHING, 0, []),
};

// 방어구 설정

export class Armor {
  constructor(name, type, price, ac, strength, stealth, weight) {
      this.name = name;
      this.type = type;
      this.price = price;
      this.ac = ac;
      this.strength = strength;
      this.stealth = stealth;
      this.weight = weight;
  }
}

export const ArmorType = {
  LIGHT: 'Light',
  MEDIUM: 'Medium',
  HEAVY: 'Heavy',
  SHIELD: 'Shield'
};

export const armors = {
  // Light Armor
  padded: new Armor("Padded", ArmorType.LIGHT, "5gp", 11, 0, "Disadvantage", 8),
  leather: new Armor("Leather", ArmorType.LIGHT, "10gp", 11, 0, "", 10),
  studdedLeather: new Armor("Studded Leather", ArmorType.LIGHT, "45gp", 12, 0, "", 13),

  // Medium Armor
  hide: new Armor("Hide", ArmorType.MEDIUM, "10gp", 12, 0, "", 12),
  chainShirt: new Armor("Chain Shirt", ArmorType.MEDIUM, "50gp", 13, 0, "", 20),
  scaleMail: new Armor("Scale Mail", ArmorType.MEDIUM, "50gp", 14, 0, "Disadvantage", 45),
  breastplate: new Armor("Breastplate", ArmorType.MEDIUM, "400gp", 14, 0, "", 20),
  halfPlate: new Armor("Half Plate", ArmorType.MEDIUM, "750gp", 15, 0, "Disadvantage", 40),

  // Heavy Armor
  ringMail: new Armor("Ring Mail", ArmorType.HEAVY, "30gp", 14, 0, "Disadvantage", 40),
  chainMail: new Armor("Chain Mail", ArmorType.HEAVY, "75gp", 16, 13, "Disadvantage", 55),
  splint: new Armor("Splint", ArmorType.HEAVY, "200gp", 17, 15, "Disadvantage", 60),
  plate: new Armor("Plate", ArmorType.HEAVY, "1500gp", 18, 15, "Disadvantage", 65),

  // Shield
  shield: new Armor("Shield", ArmorType.SHIELD, "10gp", 2, 0, "", 6),

  // Monster Special Armor
  naturalArmor: new Armor("Natural Armor", ArmorType.NATURAL, "0", 13, 0, "", 0),
};
```


# skills.js

```
// skills.js

// 스킬 클래스 (기존 코드에 추가)
export class Skill {
  constructor(name, ename, type, description) {
      this.name = name;
      this.ename = ename;
      this.type = type;
      this.description = description;
  }
}

// 주문 이름, 주문 영어 이름, 레벨, 데미지, 부가효과타입, 부과효과, 타겟
// 학파(방출학파-Evocation, 방호학파-Abjuration, 변환학파-Transmutation, 사령학파-Necromancy, 예지학파-Divination, 조형학파-Transmutation, 환영학파-Illusion, 환혹학파-Enchantment), 
// 캐스팅 타임, 사거리, 구성요소, 지속시간, 설명
// 예시 주문들
const secondWind = new Skill(
  "재기의 바람", "secondWind", "active",
  "전투에 단 한번씩 1d10+레벨만큼 hp를 회복합니다."
);

const sneakAttack = new Skill(
  "암습 공격", "sneakAttack", "passive",
  "턴마다 한번 추가로 명중 굴림을 굴려 1d6점의 피해를 줍니다."
);

export const skillList = {
  secondWind: secondWind,
  sneakAttack: sneakAttack,
  // 추가 몬스터들...
};
```


# mobile-sidebar.js

```
// mobile-sidebar.js

document.addEventListener('DOMContentLoaded', function() {
  const leftSidebar = document.getElementById('left-sidebar');
  const rightSidebar = document.getElementById('right-sidebar');
  const toggleLeftBtn = document.getElementById('toggle-left-sidebar');
  const toggleRightBtn = document.getElementById('toggle-right-sidebar');
  //const skillButton = document.getElementById('skillButton');
  //const spellButton = document.getElementById('spellButton');

  function toggleSidebar(sidebar) {
    sidebar.classList.toggle('active');
    if (sidebar === rightSidebar) {
      leftSidebar.classList.remove('active');
    } else {
      rightSidebar.classList.remove('active');
    }
  }

  toggleLeftBtn.addEventListener('click', () => toggleSidebar(leftSidebar));
  toggleRightBtn.addEventListener('click', () => toggleSidebar(rightSidebar));

  // 사이드바 외부 클릭 시 닫기
  document.addEventListener('click', function(event) {
    if (!leftSidebar.contains(event.target) && !toggleLeftBtn.contains(event.target)) {
      leftSidebar.classList.remove('active');
    }
    if (!rightSidebar.contains(event.target) && !toggleRightBtn.contains(event.target)) {
      rightSidebar.classList.remove('active');
    }
  });
});
```


# eventManager.js

```
// eventManager.js

export class GameEventManager {
  constructor(game) {
    this.game = game;
    this.listeners = new Map();
  }

  addListener(elementId, eventType, handler) {
    const element = document.getElementById(elementId);
    if (element) {
      const boundHandler = handler.bind(this.game);
      element.addEventListener(eventType, boundHandler);

      if (!this.listeners.has(elementId)) {
        this.listeners.set(elementId, new Map());
      }
      this.listeners.get(elementId).set(eventType, boundHandler);
    } else {
      console.warn(`Element with id '${elementId}' not found.`);
    }
  }

  removeListener(elementId, eventType) {
    if (
      this.listeners.has(elementId) &&
      this.listeners.get(elementId).has(eventType)
    ) {
      const element = document.getElementById(elementId);
      const handler = this.listeners.get(elementId).get(eventType);

      if (element) {
        element.removeEventListener(eventType, handler);
      }

      this.listeners.get(elementId).delete(eventType);
      if (this.listeners.get(elementId).size === 0) {
        this.listeners.delete(elementId);
      }
    }
  }

  setupEventListeners() {
    this.addListener("innButton", "click", () => this.game.goToInn());
    this.addListener("shopButton", "click", () => this.game.goToShop());
    this.addListener("guildButton", "click", () => this.game.goToGuild());
    this.addListener("forgeButton", "click", () => this.game.goToForge());
    this.addListener("dungeonButton", "click", () => this.game.goToDungeon());
    this.addListener("exploreButton", "click", () => this.game.explore());
    this.addListener("nextFloorButton", "click", () => this.game.goToNextFloor());
    this.addListener("returnTownButton", "click", () => this.game.returnToTown());
    this.addListener('attackButton', 'click', () => this.game.attack());
    // this.addListener('skillButton', 'click', () => this.game.updateSkillPanel('기술'));
    // this.addListener('spellButton', 'click', () => this.game.updateSpellPanel('주문'));
    this.addListener('fleeButton', 'click', () => this.game.flee());
    this.addListener('toggleInventory', 'click', () => this.game.toggleInventory());
    this.addListener('toggleSkill', 'click', () => this.game.togglePanel('skill'));
    this.addListener('toggleSpell', 'click', () => this.game.togglePanel('spell'));

    // 능력치 증가 버튼에 대한 이벤트 리스너
    document.querySelectorAll(".stat-increase-btn").forEach((button) => {
      const stat = button.getAttribute("data-stat");
      this.addListener(button.id, "click", () =>
        this.game.player.allocateSkillPoint(stat)
      );
    });
  }

  removeAllListeners() {
    for (const [elementId, events] of this.listeners) {
      for (const [eventType, handler] of events) {
        const element = document.getElementById(elementId);
        if (element) {
          element.removeEventListener(eventType, handler);
        }
      }
    }
    this.listeners.clear();
  }
}
```


# player.js

```
// player.js


import { skillList } from './skills.js';
import { gameConsole } from './console.js';
import { Utils, Constants } from './utils.js';
import { SpellBook, spellList  } from './spells.js';
import { weapons, armors, ArmorType, WeaponProperty  } from './equipments.js';

export class Player {
  constructor() {
    this.initializeBaseStats();
    this.initializeInventory();
    this.initializeEquipment();
    this.initializeSkillsAndSpells();
  }

  initializeBaseStats() {
    this.name = "";
    this.race = "";
    this.class = "";
    this.level = 1;
    this.xp = 290; // 임시
    this.nextLevelXp = 300; // 다음 레벨까지 필요한 경험치
    this.hp = 0;
    this.maxHp = 0;
    this.ac = 10;
    this.proficiencyBonus = 2;
    this.gold = 100;
    this.skillPoints = 0;
    this.stats = {strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10};
    this.xpTable = [
      0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000,
      120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000,
    ];
  }

  initializeInventory() {
    this.inventorySize = 20;
    this.inventory = new Array(this.inventorySize).fill(null);
  }

  initializeEquipment() {
    this.equippedWeapon = null;
    this.equippedArmor = null;
    this.equippedShield = null;
  }

  initializeSkillsAndSpells() {
    this.skills = [];
    this.spellBook = new SpellBook();
  }

  reset() {
    this.initializeBaseStats();
    this.initializeInventory();
    this.initializeEquipment();
    this.initializeSkillsAndSpells();
  }

  setCharacter(name, race, characterClass) {
    this.name = name;
    this.race = race;
    this.class = characterClass;
    this.setClassSuggestions();
    this.setRacialBonuses();
    this.setInitialHp();
    this.setInitialEquipment(); // 새로운 메서드 호출
    this.setInitialSkills();
    this.setInitialSpells();
    this.updateInfo();
  }

  // 직업별 표준 능력치 셋 사용
  setClassSuggestions() {
    switch (this.class) {
      case "Fighter":
        this.stats = {strength: 15, dexterity: 13, constitution: 14, intelligence: 10, wisdom: 12, charisma: 8};
        break;
      case "Rogue":
        this.stats = {strength: 8, dexterity: 15, constitution: 14, intelligence: 12, wisdom: 13, charisma: 10};
        break;
      case "Wizard":
        this.stats = {strength: 8, dexterity: 13, constitution: 14, intelligence: 15, wisdom: 10, charisma: 12};
        break;
      case "Cleric":
        this.stats = {strength: 13, dexterity: 12, constitution: 14, intelligence: 10, wisdom: 15, charisma: 8};
        break;
    }
  }

  setRacialBonuses() {
    switch (this.race) {
      case "Dwarf":
        this.stats.constitution += 2;
        break;
      case "Elf":
        this.stats.dexterity += 2;
        break;
      case "Human":
        for (let stat in this.stats) {
          this.stats[stat] += 1;
        }
        break;
      case "Halfling":
        this.stats.dexterity += 2;
        break;
    }
  }

  setInitialHp() {
    let baseHp;
    switch (this.class) {
      case "Fighter":
        baseHp = 10;
        break;
      case "Rogue":
        baseHp = 8;
        break;
      case "Cleric":
        baseHp = 8;
        break;
      case "Wizard":
        baseHp = 6;
        break;
    }
    this.maxHp = baseHp + this.getModifier("constitution");
    this.hp = this.maxHp;
  }

  setInitialEquipment() {
    // 직업에 따라 추가 장비 제공
    switch (this.class) {
      case "Fighter":
        this.equipItem("Weapon", weapons["longsword"]);
        this.equipItem("Shield", armors["shield"]);
        break;
      case "Rogue":
        this.equipItem("Weapon", weapons["dagger"]);
        this.equipItem("Armor", armors["leather"]);
        break;
      case "Wizard":
        this.equipItem("Weapon", weapons["quarterstaff"]);
        break;
      case "Cleric":
        this.equipItem("Weapon", weapons["mace"]);
        this.equipItem("Armor", armors["leather"]);
        break;
    }
  }

  setInitialSkills() {
    // 클래스에 따라 다른 기술을 추가할 수 있습니다
    switch (this.class) {
      case "Fighter":
        this.skills.push(skillList.secondWind);
        break;
      case "Rogue":
        this.skills.push(skillList.sneakAttack);
    }
  }

  setInitialSpells() {
    switch (this.class) {
      case "Wizard":
        this.spellBook.learnSpell(spellList.magicMissile);
        this.spellBook.prepareSpell("마법 화살");
        this.spellBook.getAvailableSlots;  // 1레벨 주문 슬롯 2개
        break;
      case "Cleric":
        this.spellBook.learnSpell(spellList.cureWounds);
        this.spellBook.prepareSpell("상처 치료");
        this.spellBook.getAvailableSlots;  // 1레벨 주문 슬롯 2개
        break;
    }
  }

  getModifier(stat) {
    return Utils.calculateModifier(this.stats[stat]);
  }

  resetInventory() {
    this.inventory = new Array(this.inventorySize).fill(null);
    this.updateInventoryUI();
  }

  addItem(item) {
    const emptySlot = this.inventory.findIndex((slot) => slot === null);
    if (emptySlot !== -1) {
      this.inventory[emptySlot] = item;
      return true;
    }
    return false;
  }

  removeItem(index) {
    if (this.inventory[index]) {
      this.inventory[index] = null;
      return;
    }
    return;
  }

  equipItem(itemType, item) {
    if (this[`equipped${itemType}`]) {
      gameConsole.log(`${this[`equipped${itemType}`].name}을(를) 해제했습니다.`);
    }
    this[`equipped${itemType}`] = item;
    gameConsole.log(`${item.name}을(를) 장착했습니다.`);
    this.updateAC();
    this.updateInfo();
  }

  unequipItem(itemType) {
    if (this[`equipped${itemType}`]) {
      gameConsole.log(`${this[`equipped${itemType}`].name}을(를) 해제했습니다.`);
      this[`equipped${itemType}`] = null;
      this.updateAC();
      this.updateInfo();
    }
  }

  getAttackDamage() {
    if (this.equippedWeapon) {
      const [diceCount, diceSides] = this.equippedWeapon.damage.split("d").map(Number);
      let damage = 0;
      for (let i = 0; i < diceCount; i++) {
        damage += Utils.rollDice(diceSides, this.name);
      }
      // 힘 또는 민첩 수정치 추가 (교묘함 무기의 경우 더 높은 것 사용)
      const strMod = this.getModifier("strength");
      const dexMod = this.getModifier("dexterity");
      if (this.equippedWeapon.properties.includes(WeaponProperty.FINESSE)) {
        damage += Math.max(strMod, dexMod);
      } else {
        damage += strMod;
      }
      return damage;
    }
    return 1; // 맨손 공격
  }

  getSpellDamage(item) {
    let damage = Utils.rollDiceWithNotation(item.damage, this.name);
    const intMod = this.getModifier("intelligence");
    const wisMod = this.getModifier("wisdom");
    //console.log(damage);
    if(item.addEffect) damage += item.addEffect;
    if(this.class === 'Wizard') damage += intMod;
    if(this.class === 'Cleric') damage += wisMod;
    
    return damage;
    //return 1; // 맨손 공격
  }

  getAttackBonus() {
    let bonus = this.proficiencyBonus; // 숙련도 보너스
    if (this.equippedWeapon) {
      if (this.equippedWeapon.properties.includes(WeaponProperty.FINESSE)) {
        // 교묘함 무기는 힘이나 민첩 중 높은 것을 사용
        bonus += Math.max(
          this.getModifier("strength"),
          this.getModifier("dexterity")
        );
      } else if (
        this.equippedWeapon.properties.includes(WeaponProperty.AMMUNITION)
      ) {
        // 탄환 무기는 민첩 수정치 사용
        bonus += this.getModifier("dexterity");
      } else {
        // 그 외의 경우 힘 수정치 사용
        bonus += this.getModifier("strength");
      }
    } else {
      // 맨손 공격의 경우 힘 수정치 사용
      bonus += this.getModifier("strength");
    }
    return bonus;
  }

  getSpellBonus() {
    let bonus = this.proficiencyBonus; // 숙련도 보너스
    if (this.class === 'Wizard') bonus += this.getModifier("intelligence");
    if (this.class === 'Cleric') bonus += this.getModifier("wisdom");
    return bonus;
  }

  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
    this.updateInfo();
    return this.hp > 0;
  }

  heal(amount) {
    this.hp = Math.min(this.maxHp, this.hp + amount);
    this.updateInfo();
  }

  gainGold(amount) {
    this.gold += amount;
    this.updateInfo();
  }

  gainExperience(xp) {
    this.xp += xp;
    gameConsole.log(`${xp} 경험치를 획득했습니다! (총 경험치: ${this.xp})`);
    this.updateInfo();
    this.checkLevelUp();
  }

  checkLevelUp() {
    let newLevel = this.level;
    while (newLevel < Constants.MAX_LEVEL && this.xp >= this.xpTable[newLevel]) {
      newLevel++;
    }

    if (newLevel > this.level) {
      const levelsGained = newLevel - this.level;
      this.level = newLevel;
      this.updateProficiencyBonus();
      this.increaseHitPoints(levelsGained);
      this.skillPoints += 2;
      gameConsole.log(`레벨 업! 현재 레벨: ${this.level}, 다음 필요 경험치는 ${this.xpTable[newLevel]}XP`);
      gameConsole.log(`스킬 포인트 2개 획득했습니다.`);
      this.nextLevelXp = this.xpTable[newLevel];
      this.updateInfo();
    }
  }

  allocateSkillPoint(stat) {
    const cost = this.stats[stat] >= 14 ? 2 : 1;
    if (this.skillPoints >= cost && this.stats[stat] < 20) {
      this.stats[stat]++;
      this.skillPoints -= cost;
      gameConsole.log(`${this.name}의 ${stat} 능력치가 1 증가했습니다. 현재 ${stat}: ${this.stats[stat]}`);
      this.updateInfo();
      return true;
    }
    gameConsole.log("스킬 포인트가 충분하지 않거나 능력치 최대치에 도달했습니다.");
    return false;
  }

  updateProficiencyBonus() {
    this.proficiencyBonus = 2 + Math.floor((this.level - 1) / 4);
  }

  increaseHitPoints(levelsGained) {
    let hpIncrease = 0;
    for (let i = 0; i < levelsGained; i++) {
      switch (this.class) {
        case "Fighter":
          hpIncrease += 10 + this.getModifier("constitution");
          break;
        case "Rogue":
          hpIncrease += 8 + this.getModifier("constitution");
          break;
        case "Cleric":
          hpIncrease += 8 + this.getModifier("constitution");
          break;
        case "Wizard":
          hpIncrease += 6 + this.getModifier("constitution");
          break;
      }
    }
    this.maxHp += hpIncrease;
    this.hp += hpIncrease;
  }

  spendGold(amount) {
    if (this.gold >= amount) {
      this.gold -= amount;
      this.updateInfo();
      return true;
    }
    return false;
  }

  levelUp() {
    this.level++;
    this.maxHp += 10;
    this.hp = this.maxHp;
    this.updateInfo();
  }

  updateAC() {
    let baseAC = 10;
    const dexMod = this.getModifier("dexterity");

    if (this.equippedArmor) {
      switch (this.equippedArmor.type) {
        case ArmorType.LIGHT:
          baseAC = this.equippedArmor.ac + dexMod;
          break;
        case ArmorType.MEDIUM:
          baseAC = this.equippedArmor.ac + Math.min(dexMod, 2);
          break;
        case ArmorType.HEAVY:
          baseAC = this.equippedArmor.ac;
          break;
      }
    } else {
      // 갑옷을 입지 않은 경우
      baseAC += dexMod;
    }
    if (this.equippedShield) {
      baseAC += this.equippedShield.ac;
    }
    this.ac = baseAC;
  }

  learnSpell(spellName) {
    this.spellBook.learnSpell(spellName);
  }

  updateInfo() {
    this.updateBasicInfo();
    this.updateStats();
    this.updateEquipment();
    this.updateExperience();
    this.updateSkillPoints();
  }

  updateBasicInfo() {
    this.updateElement("player-name", this.name);
    this.updateElement("player-race", this.race);
    this.updateElement("player-class", this.class);
    this.updateElement("player-level", this.level);
    this.updateElement("player-gold", this.gold);
    this.updateHP();
  }

  updateHP() {
    const hpElement = document.getElementById("player-hp");
    hpElement.textContent = this.hp;
    this.updateElement("player-max-hp", this.maxHp);

    if (this.hp < this.maxHp) {
      hpElement.style.color = this.hp < this.maxHp / 2 ? "red" : "yellow";
    } else {
      hpElement.style.color = "white";
    }

    // 캔버스 업데이트 추가
    if (this.game && this.game.canvasManager) {
      this.game.canvasManager.updateCharacterCanvas(this);
    }
  }

  updateStats() {
    for (let stat in this.stats) {
      this.updateStatElement(stat);
    }
  }

  updateStatElement(stat) {
    const element = document.getElementById(`player-${stat}`);
    const value = this.stats[stat];
    const modifier = this.getModifier(stat);
    element.textContent = `${value} (${modifier >= 0 ? "+" : ""}${modifier})`;

    this.updateStatIncreaseButton(stat, element);
  }

  updateStatIncreaseButton(stat, statElement) {
    const increaseBtn = statElement.nextElementSibling;
    const cost = this.stats[stat] >= 14 ? 2 : 1;
    if (this.skillPoints >= cost && this.stats[stat] < 20) {
      increaseBtn.style.display = "inline";
      increaseBtn.textContent = `+${cost}SP`;
    } else {
      increaseBtn.style.display = "none";
    }
  }

  updateEquipment() {
    this.updateElement(
      "player-weapon",
      this.equippedWeapon
        ? `${this.equippedWeapon.name} (+${this.equippedWeapon.damage})`
        : "없음"
    );
    this.updateElement("player-ac", this.ac);
    this.updateElement(
      "player-armor",
      this.equippedArmor
        ? `${this.equippedArmor.name} (+${this.equippedArmor.ac})`
        : "없음"
    );
    this.updateElement(
      "player-shield",
      this.equippedShield
        ? `${this.equippedShield.name} (+${this.equippedShield.ac})`
        : "없음"
    );
  }

  updateExperience() {
    this.updateElement("player-xp", this.xp);
    this.updateElement("player-next-level-xp", this.nextLevelXp);
    this.updateElement("player-proficiency", this.proficiencyBonus);
  }

  updateSkillPoints() {
    this.updateElement("player-skill-points", this.skillPoints);
  }

  updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    } else {
      console.warn(`Element with id '${id}' not found.`);
    }
  }
}
```


# dialogueManager.js

```
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
```


# canvasManager.js

```
// canvasManager.js

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
      let displayText = location.charAt(0).toUpperCase() + location.slice(1);
      if(location === 'Battle') {
        location = 'dungeon';
        displayText = 'battle'
      }
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
      this.characterCtx.fillText(`Level: ${player.level}`, 10, 20);
      this.characterCtx.fillText(`HP: ${player.hp}/${player.maxHp}`, 10, 40);
      //this.characterCtx.fillText(`XP: ${player.xp}/${player.nextLevelXp}`, 10, 60);

      this.characterCtx.restore();
  }

  drawBattleScene(player, monster) {
      this.clear();
      this.drawBackground('Battle');
      if(window.innerWidth <= 1400) this.drawPlayer(player);
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
      this.uiCtx.fillStyle = '#FFFFFF';
      this.uiCtx.font = '20px Arial';
      this.uiCtx.textAlign = 'right';
      this.uiCtx.fillText(`탐사도: ${exploration}%`, this.width - 20, 30);

      this.uiCtx.restore();
  }

  drawRound(round) {
    this.uiCtx.save();
    this.uiCtx.font = "20px Arial";
    this.uiCtx.fillStyle = "white";
    this.uiCtx.textAlign = "right";
    this.uiCtx.fillText(`라운드: ${round}`, this.width - 10, 30);
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
```


# item.js

```
// item.js

import { gameConsole } from './console.js';

export class Item {
  constructor(name, description, useEffect) {
      this.name = name;
      this.description = description;
      this.useEffect = useEffect;
  }

  use(player) {
      this.useEffect(player);
  }
}

// 힐링포션(소) 정의
const smallHealingPotion = new Item(
  "힐링포션(소)",
  "HP를 10 회복시킵니다.",
  (player) => {
      const healAmount = 10;
      player.player.heal(healAmount);
      gameConsole.log(`힐링포션(소)를 사용하여 ${player.player.name}의 HP가 ${healAmount} 회복되었습니다.`);
  }
);

// 아이템 목록
export const itemList = {
  smallHealingPotion: smallHealingPotion,
};
```


# game.js

```
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
    this.dialogueManager.startDialogue('blacksmith', "대장간에 오신 것을 환영합니다. 무기를 강화하시겠습니까? 아니면 새로운 방어구를 제작하시겠습니까?");
    this.dialogueManager.options = [
      { text: "1. 무기 구매", action: () => this.showWeapons() },
      { text: "2. 방어구 구매", action: () => this.showArmors() },
      { text: "3. 장비 판매", action: () => this.sellEquipment() },
      { text: "4. 나간다", action: () => this.backToTown() }
    ];
    this.updateCanvas();
    // 여기에 대장간 기능 추가
  }

  showWeapons() {
    const availableWeapons = [
      weapons.longsword,
      weapons.shortsword,
      weapons.dagger,
      weapons.mace
    ];
    this.showEquipmentList(availableWeapons, "무기");
  }
  
  showArmors() {
    const availableArmors = [
      armors.leather,
      armors.chainShirt,
      armors.shield
    ];
    this.showEquipmentList(availableArmors, "방어구");
  }
  
  showEquipmentList(equipmentList, type) {
    this.dialogueManager.options = equipmentList.map(equipment => ({
      text: `${equipment.name} (${equipment.price})`,
      action: () => this.buyEquipment(equipment)
    }));
    this.dialogueManager.options.push({ text: "뒤로", action: () => this.goToForge() });
    this.updateCanvas();
  }
  
  buyEquipment(equipment) {
    if (this.player.gold >= equipment.price) {
      this.player.gold -= equipment.price;
      if (equipment.type === "weapon") {
        this.player.equipItem("Weapon", equipment);
      } else {
        this.player.equipItem("Armor", equipment);
      }
      gameConsole.log(`${equipment.name}을(를) 구매했습니다.`);
    } else {
      gameConsole.log("골드가 부족합니다.");
    }
    this.updateCanvas();
  }
  
  sellEquipment() {
    const sellableEquipment = this.player.inventory.filter(item => item && (item.type === "weapon" || item.type === "armor"));
    this.dialogueManager.options = sellableEquipment.map((equipment, index) => ({
      text: `${equipment.name} (${Math.floor(equipment.price / 2)}골드)`,
      action: () => this.sellItem(index)
    }));
    this.dialogueManager.options.push({ text: "뒤로", action: () => this.goToForge() });
    this.updateCanvas();
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
```


# battle.js

```
// battle.js

import { Utils } from './utils.js';
import { gameConsole } from './console.js';
import { Spell } from './spells.js';
import { Skill } from './skills.js';
import { Rogue } from './jobs/rogue.js';
import { Fighter } from './jobs/fighter.js';

export class Battle {
  constructor(game, player, monster, explorationGain) {
    this.game = game;
    this.player = player;
    this.monster = monster;
    this.resetOneTimeAbilities();
    this.explorationGain = explorationGain;
    this.round = 1;
    this.turnCount = 0;
    this.initiativeOrder = [];
  }

  start() {
    this.game.isInBattle = true;
    gameConsole.log(`${this.monster.name}과(와) 조우했습니다! 전투가 시작됩니다.`);
    this.displayMonsterInfo();
    this.determineInitiative();
    this.game.exploreButton.style.display = "none";
    this.game.battleButtons.style.display = "block";
    this.game.updateInventoryUI();
    this.game.updateCanvas();
    this.nextTurn();
  }

  resetOneTimeAbilities() {
    // 다른 한 번만 사용 가능한 기술들도 초기화
    Fighter.secondWindReset();
  }

  displayMonsterInfo() {
    gameConsole.log(`
      몬스터 정보:
      이름: ${this.monster.name}
      크기: ${this.monster.size}
      종류: ${this.monster.type}
      AC: ${this.monster.ac}
      HP: ${this.monster.hp}/${this.monster.maxHp}
      도전 지수: ${this.monster.cr},
    `);
  }

  determineInitiative() {
    const playerInitiative = this.rollInitiative(this.player);
    const monsterInitiative = this.rollInitiative(this.monster);

    this.initiativeOrder = playerInitiative >= monsterInitiative 
      ? [this.player, this.monster] 
      : [this.monster, this.player];
    gameConsole.log(`${this.initiativeOrder[0].name}이(가) 선공합니다!`);
  }
  
  rollInitiative(character) {
    const dexModifier = Math.floor((character.stats.dexterity - 10) / 2);
    return Utils.rollDice(20, character.name) + dexModifier;
  }

  nextTurn() {
    const currentCharacter = this.initiativeOrder[0];
    gameConsole.log(`-----------------------------------------------`);
    gameConsole.log(`${currentCharacter.name}의 턴입니다.`);
    
    if (currentCharacter === this.player) {
      this.playerTurn();
    } else {
      this.monsterTurn();
    }

    this.game.updateCanvas();
  }

  playerTurn() {
    gameConsole.log("행동을 선택하세요.");
    this.turnCount++;
    this.updatePlayerPanels();
  }

  updatePlayerPanels() {
    if (this.player.class === "Wizard" || this.player.class === "Cleric") {
      this.game.updateSpellPanel();
    }
    if (this.player.class === "Fighter" || this.player.class === "Rogue") {
      this.game.updateSkillPanel();
    }
  }

  monsterTurn() {
    const attackResult = this.performAttack(this.monster, this.player);
    const extra = 0;
    this.handleAttackResult(attackResult, extra, this.monster, this.player);

    if (this.player.hp <= 0) {
      this.end(false);
    } else {
      this.endTurn();
    }
  }

  performAttack(attacker, defender) {
    const attackRollDice = Utils.rollDice(20, attacker.name);
    const attackRoll = attackRollDice + attacker.getAttackBonus();
    let damage = 0;
    let effect = '';

    if (attackRollDice === 20) {
      effect = 'Critical!';
      damage = attacker.getAttackDamage() * 2;
    } else if (attackRollDice === 1) {
      effect = 'Miss!';
    } else if (attackRoll < defender.ac) {
      effect = 'Miss!';
    } else {
      effect = 'Hit!';
      damage = attacker.getAttackDamage();
    }

    return { effect, damage };
  }

  addAttack(result, attacker) {
    const { effect, damage } = result;
    let sneakDamage = 0;
    if (effect != 'Miss!') {
      if (attacker.class === 'Rogue') {
        sneakDamage = Rogue.sneakAttack(attacker.level, attacker.name);
        if (effect === 'Critical!') sneakDamage *= 2;
        gameConsole.log("클래스 효과로 암습 공격 발동!");
        return sneakDamage;
      }
    }
    return 0;
  }
  // 여기서 실제 데미지 입고 바로 0보다 작아지면 아래 displayeffect를 호출하지 않게 수정하자
  handleAttackResult(result, extra, attacker, defender) {
    const { effect, damage } = result;
    const weaponName = attacker.equippedWeapon ? attacker.equippedWeapon.name : '맨손';

    if (effect === 'Critical!') {
      gameConsole.log(`${attacker.name}의 크리티컬 공격이 성공했습니다! ${weaponName}으로 ${damage}의 피해를 입혔습니다!`);
    } else if (effect === 'Miss!') {
      gameConsole.log(`${attacker.name}의 공격이 빗나갔습니다.`);
    } else {
      gameConsole.log(`${attacker.name}의 공격이 성공했습니다. ${weaponName}으로 ${damage}의 피해를 입혔습니다.`);
      if (extra) {
        gameConsole.log(`추가 데미지 ${extra}의 피해를 입혔습니다.`);
      }
    }

    if (damage > 0) defender.takeDamage(damage+extra);
    if (defender.hp > 0 && defender.class === 'Monster') this.displayAttackEffect(effect);
  }

  displayAttackEffect(effect) {
    const effectX = this.game.canvasManager.width / 2;
    const effectY = this.game.canvasManager.height / 2 - 50;
    this.game.canvasManager.drawAttackEffect(effect, effectX, effectY);
    setTimeout(() => this.game.canvasManager.clearAttackEffect(), 200);
  }

  playerAttack() {
    const attackResult = this.performAttack(this.player, this.monster);
    const addDamage = this.addAttack(attackResult, this.player);
    this.handleAttackResult(attackResult, addDamage, this.player, this.monster);

    if (this.monster.hp <= 0) {
      this.clearAttackEffectAndEnd(true);
    } else {
      this.clearAttackEffectAndContinue();
    }
  }

  clearAttackEffectAndEnd(playerWon) {
    setTimeout(() => {
      this.game.canvasManager.clearAttackEffect();
      this.end(playerWon);
    }, 200);
  }
  
  clearAttackEffectAndContinue() {
    setTimeout(() => {
      this.game.canvasManager.clearAttackEffect();
      this.game.updateCanvas();
      this.initiativeOrder.push(this.initiativeOrder.shift());
      this.nextTurn();
    }, 200);
  }

  playerFlee() {
    if (Math.random() < 0.5) {
      gameConsole.log("도망에 성공했습니다!");
      this.end(false);
    } else {
      gameConsole.log("도망에 실패했습니다.");
      this.endTurn();
    }
  }

  useItem(index) {
    const item = this.player.inventory[index];
    if (item) {
      item.use(this);
      this.player.removeItem(index);
      this.game.updateInventoryUI();
      this.player.updateInfo();
      this.game.updateCanvas();
      return true;
    }
    return false;
  }

  useSkillOrSpell(item) {
    if (!this.game.isInBattle || !this.game.currentBattle) {
      gameConsole.log("전투 중에만 사용할 수 있습니다.");
      return;
    }

    if (item instanceof Spell) {
      this.useSpell(item);
    } else if (item instanceof Skill) {
      this.useSkill(item);
    }
  }

  useSpell(spell) {
    gameConsole.log(`${this.player.name}이(가) ${spell.name} 주문을 시전 중입니다.`);
    if (spell.target === "Enemy" && this.player.spellBook.slots[spell.level - 1] > 0) {
      const spellRollDice = Utils.rollDice(20, this.player.name);
      const spellRoll = spellRollDice + this.player.getSpellBonus();
      let damage = 0;

      if (spellRollDice === 20) {
        damage = this.player.getSpellDamage(spell) * 2;
        gameConsole.log(`${this.player.name}의 ${spell.name} 주문이 대성공했습니다! ${damage}의 피해를 입혔습니다!`);
      } else if (spellRollDice === 1 || spellRoll < this.monster.ac) {
        gameConsole.log(`${this.player.name}의 ${spell.name} 주문이 실패했습니다.`);
      } else {
        damage = this.player.getSpellDamage(spell);
        gameConsole.log(`${this.player.name}의 ${spell.name} 주문이 성공했습니다. ${damage}의 피해를 입혔습니다.`);
      }

      this.player.spellBook.slots[spell.level - 1] -= 1;
      const remainSlots = this.player.spellBook.getAvailableSlots();
      gameConsole.log(
        `${this.player.name}의 주문 슬롯이 ${remainSlots} 남았습니다.`
      );
      this.monster.takeDamage(damage);

      if (this.monster.hp <= 0) {
        this.end(true);
      } else {
        this.endTurn();
      }
    } else if (spell.target === "Self" && this.player.spellBook.slots[spell.level - 1] > 0) {
      let damage = 0;
      if (spell.addEffectType === 'heal') {
        damage = this.player.getSpellDamage(spell);
        gameConsole.log(
          `${this.player.name}이(가) ${spell.name} 주문을 시전하여 ${damage}만큼 회복했습니다.`
        );
        this.player.heal(damage);
        this.player.spellBook.slots[spell.level - 1] -= 1;
        const remainSlots = this.player.spellBook.getAvailableSlots();
        gameConsole.log(
          `${this.player.name}의 주문 슬롯이 ${remainSlots} 남았습니다.`
        );
      }
      this.endTurn();
    } else {
      const remainSlots = this.player.spellBook.getAvailableSlots();
      gameConsole.log(
        `${this.player.name}의 주문 슬롯이 충분하지 않습니다! 남은 슬롯: ${remainSlots}.`
      );
    }
  }

  useSkill(skill) {
    if (skill.type === 'active') {
      switch (skill.ename) {
        case 'secondWind':
          const result = Fighter.secondWind(this.player.level, this.player.name);
          if (result) {
            gameConsole.log(
              `${this.player.name}이(가) ${skill.name}을 시전하여 ${result}만큼 회복했습니다.`
            );
            this.player.heal(result);
            this.endTurn();
          } else {
            gameConsole.log(`전투 중 한번만 사용 가능합니다.`);
          }
          break;
      }
    } else {
      gameConsole.log("패시브 스킬은 직접 사용할 수 없습니다.");
    }
  }

  endTurn() {
    this.turnCount++;
    if (this.turnCount >= this.initiativeOrder.length) {
      this.round++;
      this.turnCount = 0;
    }
    this.game.updateCanvas();
    this.initiativeOrder.push(this.initiativeOrder.shift());
    this.nextTurn();
  }

  end(isVictory) {
    this.game.isInBattle = false;
    if (isVictory) {
      gameConsole.log(`${this.monster.name}을(를) 물리쳤습니다!`);
      this.player.gainExperience(this.monster.xp);
      this.game.increaseExploration(this.explorationGain);
      // this.dropEquipment(); 장비 드랍 관련 기능 추후 고도화
      // this.game.exploreButton.style.display = 'inline';
      // this.game.battleButtons.style.display = 'none';
    } else {
      if (this.player.hp <= 0) {
        // 여기에 패배 시 처리 로직을 추가할 수 있습니다.
        this.game.battleButtons.style.display = "none";
        gameConsole.log(
          `당신은 ${this.monster.name}에게 패배했습니다. 당신의 이번 여정은 여기까지 입니다...`
        );
        this.game.gameOver();
      } else {
        gameConsole.log(`전투가 종료되었습니다.`);
      }
    }
    this.game.skillPanel.style.display = "none";
    this.game.spellPanel.style.display = "none";
    this.game.battleButtons.style.display = "none";

    this.monster.resetHp();
    this.game.currentMonster = null;
    //this.game.updateExplorationButtons();
    //this.game.updateCanvas();
  }
  
  /* 추후 고도화
  dropEquipment() {
    if (Math.random() < 0.3) { // 30% 확률로 장비 드롭
      const droppedEquipment = Math.random() < 0.5 ? this.monster.equippedWeapon : this.monster.equippedArmor;
      if (droppedEquipment) {
        gameConsole.log(`${this.monster.name}이(가) ${droppedEquipment.name}을(를) 떨어뜨렸습니다!`);
        // 여기에 플레이어가 장비를 획득하는 로직을 추가
        }
    }
  }*/
}
```


# monster.js

```
// monster.js

import { Utils } from './utils.js';
import { weapons, armors, ArmorType, WeaponProperty } from './equipments.js';

export class Monster {
  constructor(name, ename, size, type, stats, hp, xp, cr) {
    this.name = name;
    this.ename = ename;
    this.class = 'Monster';
    this.size = size;
    this.type = type;
    this.stats = stats;
    this.hp = hp;
    this.maxHp = hp;
    this.xp = xp;
    this.cr = cr; // 도전 지수 추가
    this.equippedWeapon = null;
    this.equippedArmor = null;
    this.equippedShield = null;
    this.proficiencyBonus = Math.floor((cr - 1) / 4) + 2; // CR에 따른 숙련 보너스 계산
    this.updateAC();
  }

  equipWeapon(weapon) {
    this.equippedWeapon = weapon;
  }

  equipArmor(armor) {
    this.equippedArmor = armor;
    this.updateAC();
  }

  equipShield(shield) {
    this.equippedShield = shield;
    this.updateAC();
  }

  updateAC() {
    let baseAC = 10;
    const dexMod = this.getModifier("dexterity");

    if (this.equippedArmor) {
      switch (this.equippedArmor.type) {
        case ArmorType.LIGHT:
          baseAC = this.equippedArmor.ac + dexMod;
          break;
        case ArmorType.MEDIUM:
          baseAC = this.equippedArmor.ac + Math.min(dexMod, 2);
          break;
        case ArmorType.HEAVY:
          baseAC = this.equippedArmor.ac;
          break;
      }
    } else {
      baseAC += dexMod;
    }

    if (this.equippedShield) {
      baseAC += this.equippedShield.ac;
    }

    this.ac = baseAC;
  }

  getModifier(stat) {
    return Utils.calculateModifier(this.stats[stat]);
  }

  resetHp() {
    this.hp = this.maxHp;
  }

  getAttackBonus() {
    let bonus = this.proficiencyBonus;
    if (this.equippedWeapon) {
      if (this.equippedWeapon.properties.includes(WeaponProperty.FINESSE)) {
        bonus += Math.max(
          this.getModifier("strength"),
          this.getModifier("dexterity")
        );
      } else if (
        this.equippedWeapon.properties.includes(WeaponProperty.AMMUNITION)
      ) {
        bonus += this.getModifier("dexterity");
      } else {
        bonus += this.getModifier("strength");
      }
    } else {
      bonus += this.getModifier("strength");
    }
    return bonus;
  }

  getAttackDamage() {
    if (this.equippedWeapon) {
      const [diceCount, diceSides] = this.equippedWeapon.damage.split("d").map(Number);
      let damage = 0;
      for (let i = 0; i < diceCount; i++) {
        damage += Utils.rollDice(diceSides, this.name);
      }
      if (this.equippedWeapon.properties.includes(WeaponProperty.FINESSE)) {
        damage += Math.max(
          this.getModifier("strength"),
          this.getModifier("dexterity")
        );
      } else if (
        this.equippedWeapon.properties.includes(WeaponProperty.AMMUNITION)
      ) {
        damage += this.getModifier("dexterity");
      } else {
        damage += this.getModifier("strength");
      }
      return Math.max(1, damage);
    }
    // 맨손 공격
    return Math.max(1, Utils.rollDice(4, this.name) + this.getModifier("strength"));
  }

  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
    return this.hp > 0;
  }

  getDefenseBonus() {
    return this.armor ? this.armor.defenseBonus : 0;
  }
}

// 몬스터 크기 열거형
export const MonsterSize = {
  TINY: '초소형',
  SMALL: '소형',
  MEDIUM: '중형',
  LARGE: '대형',
  HUGE: '거대형',
  GARGANTUAN: '초대형'
};

// 몬스터 종류 열거형
export const MonsterType = {
  GIANT: '거인',
  MONSTROSITY: '괴물류',
  CONSTRUCT: '구조물',
  ABERRATION: '기괴체',
  PLANT: '식물류',
  FIEND: '악마',
  BEAST: '야수',
  UNDEAD: '언데드',
  FEY: '요정',
  DRAGON: '용족',
  ELEMENTAL: '원소',
  HUMANOID: '인간형',
  OOZE: '점액류',
  CELESTIAL: '천상체'
};

// 몬스터 생성 함수
export function createMonster(name, ename, size, type, stats, hp, xp, cr, weapon, armor, shield) {
  const monster = new Monster(name, ename, size, type, stats, hp, xp, cr);
    if (weapon) monster.equipWeapon(weapon);
    if (armor) monster.equipArmor(armor);
    if (shield) monster.equipShield(shield);
  return monster;
}

// 몇 가지 예시 몬스터
// 숫자는 hp, xp, cr 순이고 장비는 무기, 방어구, 방패
const frog = createMonster(
  "개구리", 'frog', MonsterSize.TINY, MonsterType.BEAST,
  { strength: 1, dexterity: 13, constitution: 8, intelligence: 1, wisdom: 8, charisma: 3 },
  1, 0, 0,
  null, null, null
);

const goblin = createMonster(
  "고블린", 'goblin', MonsterSize.SMALL, MonsterType.HUMANOID,
  { strength: 8, dexterity: 14, constitution: 10, intelligence: 10, wisdom: 8, charisma: 8 },
  7, 50, 1/4,
  weapons.scimitar,
  armors.leather,
  armors.shield
);

const giantfrog = createMonster(
  "거대 개구리", 'giantfrog', MonsterSize.MEDIUM, MonsterType.BEAST,
  { strength: 12, dexterity: 13, constitution: 11, intelligence: 2, wisdom: 10, charisma: 3 },
  18, 50, 1/4,
  null, null, null
);

const brownbear = createMonster(
  "갈색 곰", 'brownbear', MonsterSize.LARGE, MonsterType.BEAST,
  { strength: 19, dexterity: 10, constitution: 16, intelligence: 2, wisdom: 13, charisma: 7 },
  34, 200, 1,
  weapons.claws, // 특별한 "무기"로 발톱을 사용
  null, null
);

const owlbear = createMonster(
  "아울베어", 'owlbear',
  MonsterSize.LARGE, MonsterType.MONSTROSITY,
  { strength: 20, dexterity: 12, constitution: 17, intelligence: 3, wisdom: 12, charisma: 7 },
  59, 700, 3,
  weapons.claws, // 특별한 "무기"로 발톱을 사용
  null, null
);

const hobgoblin = createMonster(
  "홉고블린", 'hobgoblin',
  MonsterSize.MEDIUM, MonsterType.HUMANOID,
  { strength: 13, dexterity: 12, constitution: 12, intelligence: 10, wisdom: 10, charisma: 9 },
  11, 100, 1/2,
  weapons.longsword,
  armors.chainMail,
  armors.shield
);

const giantelk = createMonster(
  "거대 엘크", 'giantelk', MonsterSize.HUGE, MonsterType.BEAST,
  { strength: 19, dexterity: 16, constitution: 14, intelligence: 7, wisdom: 14, charisma: 10 },
  42, 450, 2,
  null, null, null
);

const troll = createMonster(
  "트롤", 'troll', MonsterSize.LARGE, MonsterType.GIANT,
  { strength: 18, dexterity: 13, constitution: 20, intelligence: 7, wisdom: 9, charisma: 7 },
  84, 1800, 5,
  null, null, null
);

// 몬스터 목록
export const monsterList = {
  frog: frog,
  goblin: goblin,
  giantfrog: giantfrog,
  brownbear: brownbear,
  owlbear: owlbear,
  giantelk: giantelk,
  hobgoblin: hobgoblin,
  troll: troll,
  // 추가 몬스터들...
};
```


# event.js

```
// event.js

import { gameConsole } from './console.js';

export class EventManager {
  constructor(game) {
    this.game = game;
    this.createCharacterButton = null;
  }

  startCharacterCreationEvent() {
    gameConsole.log("우리 더2N전 마을에 방문하신 여행자여 환영합니다.");
    gameConsole.log("마을에 입장하시려면 여행자분의 이름과 직업을 알려주셔야 합니다.");
    gameConsole.log("캐릭터 생성을 시작합니다.");
    this.game.updateCanvas();
    
    // 이어하기 후 버튼이 보여서 추가
    const existingTownButton = document.getElementById("townButtons");
    existingTownButton.style.display = 'none';

    // 기존 캐릭터 생성 UI가 있다면 제거
    const existingUI = document.getElementById("character-creation");
    if (existingUI) {
      document.body.removeChild(existingUI);
    }

    // 캐릭터 생성 UI 표시
    const creationUI = document.createElement("div");
    creationUI.id = "character-creation";
    creationUI.innerHTML = `
          <h2>캐릭터 생성</h2>
          <input type="text" id="character-name" placeholder="캐릭터 이름">
          <select id="character-race">
            <option value="">종족 선택</option>
            <option value="Dwarf">드워프 (+2 건강)</option>
            <option value="Elf">엘프 (+2 민첩)</option>
            <option value="Human">인간 (모든 능력치 +1)</option>
            <option value="Halfling">하플링 (+2 민첩)</option>
          </select>
          <select id="character-class">
            <option value="">직업 선택</option>
            <option value="Fighter">파이터(힘+5,민+3,건+4,지능,지혜+2,매력-2)</option>
            <option value="Rogue">로그(힘-2,민+5,건+4,지능+2,지혜+3,매력)</option>
            <option value="Wizard">위저드(힘-2,민+3,건+4,지능+5,지혜,매력+2)</option>
            <option value="Cleric">클레릭(힘+3,민+2,건+4,지능,지혜+5,매력-2)</option>
          </select>
          <p>선택한 종족과 직업에 따라 초기 능력치가 조정됩니다.</p>
          <button id="create-character">캐릭터 생성</button>
        `;

    document.body.appendChild(creationUI);

    // 이전 이벤트 리스너 제거
    if (this.createCharacterButton) {
      this.createCharacterButton.removeEventListener("click", this.handleCreateCharacter);
    }

    // 새 이벤트 리스너 등록
    this.createCharacterButton = document.getElementById("create-character");
    this.handleCreateCharacter = this.handleCreateCharacter.bind(this);
    this.createCharacterButton.addEventListener("click", this.handleCreateCharacter);
  }
  
  handleCreateCharacter() {
    const name = document.getElementById('character-name').value;
    const race = document.getElementById('character-race').value;
    const characterClass = document.getElementById('character-class').value;

    if (name && race && characterClass) {
        this.game.player.setCharacter(name, race, characterClass);
        gameConsole.log(`${name}(${race}/${characterClass})(이)가 생성되었습니다!`);
        const creationUI = document.getElementById('character-creation');
        if (creationUI) {
            document.body.removeChild(creationUI);
        }
        this.game.startGame();
    } else {
        gameConsole.log("이름, 종족, 직업을 모두 선택해주세요.");
    }
  }
}
```


# utils.js

```
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
```


# spells.js

```
// spell.js

// 위저드 클래스의 레벨별 주문 슬롯 정의
export const spellSlots = {
  1:  [2, 0, 0, 0, 0, 0, 0, 0, 0],
  2:  [3, 0, 0, 0, 0, 0, 0, 0, 0],
  3:  [4, 2, 0, 0, 0, 0, 0, 0, 0],
  4:  [4, 3, 0, 0, 0, 0, 0, 0, 0],
  5:  [4, 3, 2, 0, 0, 0, 0, 0, 0],
  6:  [4, 3, 3, 0, 0, 0, 0, 0, 0],
  7:  [4, 3, 3, 1, 0, 0, 0, 0, 0],
  8:  [4, 3, 3, 2, 0, 0, 0, 0, 0],
  9:  [4, 3, 3, 3, 1, 0, 0, 0, 0],
  10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
  11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
  19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
  20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
};

// 주문 슬롯을 가져오는 함수
export function getSpellSlots(level) {
  return spellSlots[level] || spellSlots[1]; // 레벨이 없으면 1레벨 슬롯 반환
}

// 주문 클래스 (기존 코드에 추가)
export class Spell {
  constructor(name, ename, level, damage, addEffectType, addEffect, target, school, castingTime, range, components, duration, description) {
      this.name = name;
      this.ename = ename;
      this.level = level;
      this.damage = damage;
      this.addEffectType = addEffectType;
      this.addEffect = addEffect;
      this.target = target;
      this.school = school;
      this.castingTime = castingTime;
      this.range = range;
      this.components = components;
      this.duration = duration;
      this.description = description;
  }
}

export class SpellBook {
  constructor() {
    this.knownSpells = new Map();
    this.preparedSpells = new Map();
    this.slots = JSON.parse(JSON.stringify(getSpellSlots()));
  }

  learnSpell(spell) {
    this.knownSpells.set(spell.name, spell);
  }

  prepareSpell(spellName) {
    const spell = this.knownSpells.get(spellName);
    if (spell) {
      this.preparedSpells.set(spellName, spell);
    }
  }

  unprepareSpell(spellName) {
    this.preparedSpells.delete(spellName);
  }

  useSlot(level) {   
      this.slots[level-1] -= 1;
      return true;
  }

  resetSlots(characterLevel) {
    this.slots = getSpellSlots(characterLevel);
  }

  castSpell(spellName, slotLevel) {
    const spell = this.preparedSpells.get(spellName);
    if (spell && this.slots[slotLevel - 1] > 0) {
        this.slots[slotLevel - 1]--;
        return spell;
    }
    return null;
  }

  getPreparedSpells() {
    return Array.from(this.preparedSpells.values());
  }

  getAvailableSlots() {
    return this.slots;
  }
}

// 주문 이름, 주문 영어 이름, 레벨, 데미지, 부가효과타입, 부과효과, 타겟
// 학파(방출학파-Evocation, 방호학파-Abjuration, 변환학파-Transmutation, 사령학파-Necromancy, 예지학파-Divination, 조형학파-Transmutation, 환영학파-Illusion, 환혹학파-Enchantment), 
// 캐스팅 타임, 사거리, 구성요소, 지속시간, 설명
// 예시 주문들
const magicMissile = new Spell(
  "마법 화살", "magicMissile", 1, "3d4", "addDamage", 3, "Enemy",
  "Evocation", "1 action", "120 feet", "V, S",
  "Instantaneous", "당신은 세 개의 빛나는 화살을 만들어 낸다. 각 화살은 자동으로 명중하며 1d4+1의 역능 피해를 준다."
);

const cureWounds = new Spell(
  "상처 치료", "cureWounds", 1, "1d8", "heal", 0, "Self",
  "Evocation", "1 action", "0 feet", "V, S",
  "Instantaneous", "당신은 접촉한 크리쳐를 치유하여 1d8 + 당신의 주문시전 능력 수정치만큼 hp를 회복시킵니다. 이 주문은 언데드나 구조물에는 효력이 없습니다."
);

export const spellList = {
  magicMissile: magicMissile,
  cureWounds: cureWounds,
  // 추가 몬스터들...
};
```


# rogue.js

```
// rouge.js

import { Utils } from '../utils.js';

export const Rogue = {
  sneakAttack: function(level, name) {
    const diceCount = Math.max(1, Math.min(10, Math.floor(level / 2)));
    const damage = Utils.rollMultipleDice(diceCount, 6, name);
    
    return damage;
  },
};
```


# wizard.js

```
// wizard.js

export class Wizard {
  constructor(level = 1) {
      this.className = "Wizard";
      this.level = level;
      this.hitDice = "1d6";
      this.armorProficiencies = [];
      this.weaponProficiencies = ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"];
      this.savingThrows = ["Intelligence", "Wisdom"];
      this.skills = this.chooseSkills(2, [
          "Arcana", "History", "Insight", "Investigation",
          "Medicine", "Religion"
      ]);
      this.features = this.getFeatures();
      this.spellcastingAbility = "Intelligence";
  }

  chooseSkills(count, availableSkills) {
      // 실제 구현에서는 사용자 입력을 받아 스킬을 선택하도록 해야 합니다.
      return availableSkills.slice(0, count);
  }

  getFeatures() {
      const features = {
          1: ["Spellcasting", "Arcane Recovery"],
          2: ["Arcane Tradition"],
          3: [],
          4: ["Ability Score Improvement"],
          5: [],
          6: ["Arcane Tradition feature"],
          8: ["Ability Score Improvement"],
          10: ["Arcane Tradition feature"],
          12: ["Ability Score Improvement"],
          14: ["Arcane Tradition feature"],
          16: ["Ability Score Improvement"],
          18: ["Spell Mastery"],
          19: ["Ability Score Improvement"],
          20: ["Signature Spells"]
      };

      return Object.entries(features)
          .filter(([level, _]) => parseInt(level) <= this.level)
          .reduce((acc, [_, feats]) => acc.concat(feats), []);
  }
}
```


# fighter.js

```
// fighter.js

import { Utils } from '../utils.js';

let secondWindUsed = false;

export const Fighter = {
  secondWind: function(level, name) {
    if(!secondWindUsed) {
      const result = Utils.rollDice(10, name) + level;
      secondWindUsed = true;
      return result;
    }
    return 0;
  },
  secondWindReset: function() {
    secondWindUsed = false;
  },
  getSecondWind: function() {
    return secondWindUsed;
  }
};
```


# cleric.js

```
// cleric.js

export class Cleric {
  constructor(level = 1) {
      this.className = "Cleric";
      this.level = level;
      this.hitDice = "1d8";
      this.armorProficiencies = ["Light Armor", "Medium Armor", "Shields"];
      this.weaponProficiencies = ["Simple Weapons"];
      this.savingThrows = ["Wisdom", "Charisma"];
      this.skills = this.chooseSkills(2, [
          "History", "Insight", "Medicine", "Persuasion", "Religion"
      ]);
      this.features = this.getFeatures();
      this.spellcastingAbility = "Wisdom";
  }

  chooseSkills(count, availableSkills) {
      // 실제 구현에서는 사용자 입력을 받아 스킬을 선택하도록 해야 합니다.
      return availableSkills.slice(0, count);
  }

  getFeatures() {
      const features = {
          1: ["Spellcasting", "Divine Domain"],
          2: ["Channel Divinity (1/rest)", "Divine Domain feature"],
          3: [],
          4: ["Ability Score Improvement"],
          5: ["Destroy Undead (CR 1/2)"],
          6: ["Channel Divinity (2/rest)", "Divine Domain feature"],
          7: [],
          8: ["Ability Score Improvement", "Destroy Undead (CR 1)", "Divine Domain feature"],
          9: [],
          10: ["Divine Intervention"],
          11: ["Destroy Undead (CR 2)"],
          12: ["Ability Score Improvement"],
          13: [],
          14: ["Destroy Undead (CR 3)"],
          15: [],
          16: ["Ability Score Improvement"],
          17: ["Destroy Undead (CR 4)", "Divine Domain feature"],
          18: ["Channel Divinity (3/rest)"],
          19: ["Ability Score Improvement"],
          20: ["Divine Intervention Improvement"]
      };

      return Object.entries(features)
          .filter(([level, _]) => parseInt(level) <= this.level)
          .reduce((acc, [_, feats]) => acc.concat(feats), []);
  }

  // 클레릭 주문 준비
  prepareSpells(wisdomModifier) {
      const preparedSpellsCount = this.level + wisdomModifier;
      console.log(`You can prepare ${preparedSpellsCount} spells.`);
      // 실제 구현에서는 사용자가 주문을 선택할 수 있도록 해야 합니다.
  }

  // Channel Divinity 사용
  useChannelDivinity() {
      const uses = this.level >= 18 ? 3 : (this.level >= 6 ? 2 : 1);
      console.log(`You can use Channel Divinity ${uses} time(s) between rests.`);
      // 실제 구현에서는 Channel Divinity 효과를 적용해야 합니다.
  }

  // Divine Intervention 사용
  useDivineIntervention() {
      const successChance = this.level >= 20 ? 100 : this.level;
      console.log(`You have a ${successChance}% chance of Divine Intervention succeeding.`);
      // 실제 구현에서는 성공 여부를 결정하고 효과를 적용해야 합니다.
  }
}
```
