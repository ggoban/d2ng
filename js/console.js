// console.js

class GameConsole {
  constructor() {
      this.consoleElement = document.getElementById('console');
  }

  log(message) {
      this.consoleElement.innerHTML += `<span>&gt; ${message}</span><br>`;
      this.consoleElement.scrollTop = this.consoleElement.scrollHeight;
  }

  clear() {
      this.consoleElement.innerHTML = '';
  }
}

const gameConsole = new GameConsole();