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
    this.addListener("blacksmithButton", "click", () => this.game.goToBlacksmith());
    this.addListener("dungeonButton", "click", () => this.game.goToDungeon());
    this.addListener("exploreButton", "click", () => this.game.explore());
    this.addListener("nextFloorButton", "click", () => this.game.goToNextFloor());
    this.addListener("returnTownButton", "click", () => this.game.returnToTown());
    this.addListener('attackButton', 'click', () => this.game.attack());
    this.addListener('skillButton', 'click', () => this.game.updateSkillPanel('기술'));
    this.addListener('spellButton', 'click', () => this.game.updateSpellPanel('주문'));
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