// console.js

class GameConsole {
  constructor() {
      this.consoleElement = document.getElementById('console');
  }

  log(message) {
      this.consoleElement.innerHTML += `<span>던전마스터: ${message}</span><br>`;
      this.consoleElement.scrollTop = this.consoleElement.scrollHeight;
  }

  clear() {
      this.consoleElement.innerHTML = '';
  }
}

export const gameConsole = new GameConsole();