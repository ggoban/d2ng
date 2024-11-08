// event.js

class EventManager {
  constructor(game) {
    this.game = game;
    this.createCharacterButton = null;
  }

  startCharacterCreationEvent() {
    gameConsole.log("우리 더2N전 마을에 방문하신 여행자여 환영합니다.");
    gameConsole.log("던전에 입장하시려면 여행자분의 이름과 직업을 길드에 등록해야 합니다.");
    gameConsole.log("먼저 길드로 안내 해드리겠습니다. 이후 천천히 마을을 둘러봐주세요.");
    gameConsole.log("길드에 방문했습니다. 캐릭터 생성을 시작합니다.");
    this.game.currentLocation = "guild";
    this.game.updateCanvas();

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
            <option value="Fighter">파이터 (+2 근력, +1 건강)</option>
            <option value="Rogue">로그 (+2 민첩, +1 지능)</option>
            <option value="Wizard">위저드 (+2 지능, +1 지혜)</option>
            <option value="Cleric">클레릭 (+2 지혜, +1 매력)</option>
          </select>
          <p>선택한 종족과 직업에 따라 초기 능력치가 조정됩니다.</p>
          <button id="create-character">캐릭터 생성</button>
        `;

    document.body.appendChild(creationUI);

    // 이전 이벤트 리스너 제거
    if (this.createCharacterButton) {
      this.createCharacterButton.removeEventListener(
        "click",
        this.handleCreateCharacter
      );
    }

    // 새 이벤트 리스너 등록
    this.createCharacterButton = document.getElementById("create-character");
    this.handleCreateCharacter = this.handleCreateCharacter.bind(this);
    this.createCharacterButton.addEventListener(
      "click",
      this.handleCreateCharacter
    );
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